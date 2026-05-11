-- ===========================================================================
-- Carnes de Mi Campo — Migración Supabase Fase 1
-- ===========================================================================
-- Ejecutar en SQL Editor de Supabase. El orden importa.
-- Una vez aplicado, el frontend (carrito + checkout) queda funcional.
-- ===========================================================================

-- ── 1) Tabla sucursales ────────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS sucursales (
  id          BIGSERIAL PRIMARY KEY,
  nombre      TEXT NOT NULL,
  direccion   TEXT NOT NULL,
  ciudad      TEXT NOT NULL DEFAULT 'Mendoza',
  telefono    TEXT,
  whatsapp    TEXT,                 -- formato internacional sin '+': 5492612342674
  horarios    TEXT,
  lat         DOUBLE PRECISION,
  lng         DOUBLE PRECISION,
  activa      BOOLEAN NOT NULL DEFAULT true,
  orden       INTEGER NOT NULL DEFAULT 0,
  created_at  TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- ── 2) Tabla pedidos ───────────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS pedidos (
  id                BIGSERIAL PRIMARY KEY,
  numero_pedido     TEXT UNIQUE NOT NULL,
  sucursal_id       BIGINT REFERENCES sucursales(id),
  nombre_cliente    TEXT NOT NULL,
  telefono_cliente  TEXT NOT NULL,
  origen            TEXT NOT NULL DEFAULT 'web'
                    CHECK (origen IN ('web','agente','manual')),
  estado            TEXT NOT NULL DEFAULT 'pendiente'
                    CHECK (estado IN ('pendiente','confirmado','preparando','listo','entregado','cancelado')),
  total             INTEGER NOT NULL,
  notas             TEXT,
  created_at        TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at        TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_pedidos_estado   ON pedidos(estado, created_at DESC);
CREATE INDEX IF NOT EXISTS idx_pedidos_sucursal ON pedidos(sucursal_id);

-- ── 3) Tabla items_pedido (snapshot de precios) ────────────────────────────
CREATE TABLE IF NOT EXISTS items_pedido (
  id               BIGSERIAL PRIMARY KEY,
  pedido_id        BIGINT NOT NULL REFERENCES pedidos(id) ON DELETE CASCADE,
  producto_id      BIGINT NOT NULL REFERENCES productos(id),
  nombre_producto  TEXT    NOT NULL,
  precio_unitario  INTEGER NOT NULL,
  cantidad_kg      NUMERIC(6,3) NOT NULL,
  subtotal         INTEGER NOT NULL
);

-- ── 4) Row Level Security ──────────────────────────────────────────────────
ALTER TABLE sucursales   ENABLE ROW LEVEL SECURITY;
ALTER TABLE pedidos      ENABLE ROW LEVEL SECURITY;
ALTER TABLE items_pedido ENABLE ROW LEVEL SECURITY;

-- Sucursales: todos pueden leer las activas; solo admin escribe.
DROP POLICY IF EXISTS sucursales_public_read ON sucursales;
DROP POLICY IF EXISTS sucursales_admin_all   ON sucursales;
CREATE POLICY sucursales_public_read ON sucursales FOR SELECT USING (activa = true);
CREATE POLICY sucursales_admin_all   ON sucursales FOR ALL    USING (auth.role() = 'authenticated');

-- Pedidos: público puede insertar (cliente sin login); solo admin lee/actualiza.
DROP POLICY IF EXISTS pedidos_public_insert ON pedidos;
DROP POLICY IF EXISTS pedidos_admin_select  ON pedidos;
DROP POLICY IF EXISTS pedidos_admin_update  ON pedidos;
CREATE POLICY pedidos_public_insert ON pedidos FOR INSERT WITH CHECK (true);
CREATE POLICY pedidos_admin_select  ON pedidos FOR SELECT USING (auth.role() = 'authenticated');
CREATE POLICY pedidos_admin_update  ON pedidos FOR UPDATE USING (auth.role() = 'authenticated');

-- Items: insert público; lectura solo admin.
DROP POLICY IF EXISTS items_public_insert ON items_pedido;
DROP POLICY IF EXISTS items_admin_select  ON items_pedido;
CREATE POLICY items_public_insert ON items_pedido FOR INSERT WITH CHECK (true);
CREATE POLICY items_admin_select  ON items_pedido FOR SELECT USING (auth.role() = 'authenticated');

-- ── 5) Función: generar numero_pedido atómico ──────────────────────────────
CREATE OR REPLACE FUNCTION generar_numero_pedido() RETURNS TEXT AS $$
DECLARE
  fecha TEXT;
  seq   INT;
BEGIN
  fecha := to_char(now() AT TIME ZONE 'America/Argentina/Mendoza', 'YYYYMMDD');
  SELECT COALESCE(MAX(CAST(split_part(numero_pedido, '-', 3) AS INT)), 0) + 1
    INTO seq
  FROM pedidos
  WHERE numero_pedido LIKE 'CMC-' || fecha || '-%';
  RETURN 'CMC-' || fecha || '-' || lpad(seq::TEXT, 4, '0');
END;
$$ LANGUAGE plpgsql VOLATILE;

-- ── 6) Función: crear_pedido_completo (RPC público) ────────────────────────
-- El frontend llama esta función vía supabase.rpc(...).
-- Lee precios actuales de la tabla productos y calcula el total server-side
-- (no confiar en valores enviados por el cliente).
CREATE OR REPLACE FUNCTION crear_pedido_completo(
  p_sucursal_id BIGINT,
  p_nombre      TEXT,
  p_telefono    TEXT,
  p_notas       TEXT,
  p_items       JSONB
) RETURNS TABLE (numero_pedido TEXT, pedido_id BIGINT, total INTEGER) AS $$
DECLARE
  new_numero  TEXT;
  new_id      BIGINT;
  total_calc  INTEGER := 0;
  item        JSONB;
  v_precio    INTEGER;
BEGIN
  IF jsonb_array_length(p_items) = 0 THEN
    RAISE EXCEPTION 'El pedido debe tener al menos un ítem';
  END IF;

  new_numero := generar_numero_pedido();

  -- Calcular total leyendo precios actuales
  FOR item IN SELECT * FROM jsonb_array_elements(p_items) LOOP
    SELECT precio INTO v_precio
    FROM productos
    WHERE id = (item->>'producto_id')::BIGINT AND activo = true;

    IF v_precio IS NULL THEN
      RAISE EXCEPTION 'Producto % no disponible', item->>'producto_id';
    END IF;

    total_calc := total_calc + ROUND(v_precio * (item->>'cantidad_kg')::NUMERIC);
  END LOOP;

  -- Insertar el pedido
  INSERT INTO pedidos (numero_pedido, sucursal_id, nombre_cliente, telefono_cliente, total, notas, origen)
  VALUES (new_numero, p_sucursal_id, p_nombre, p_telefono, total_calc, p_notas, 'web')
  RETURNING id INTO new_id;

  -- Insertar los items con snapshot
  INSERT INTO items_pedido (pedido_id, producto_id, nombre_producto, precio_unitario, cantidad_kg, subtotal)
  SELECT
    new_id,
    p.id,
    p.nombre,
    p.precio,
    (i->>'cantidad_kg')::NUMERIC,
    ROUND(p.precio * (i->>'cantidad_kg')::NUMERIC)
  FROM jsonb_array_elements(p_items) AS i
  JOIN productos p ON p.id = (i->>'producto_id')::BIGINT;

  RETURN QUERY SELECT new_numero, new_id, total_calc;
END;
$$ LANGUAGE plpgsql VOLATILE SECURITY DEFINER;

-- Permitir que clientes anónimos invoquen la RPC
GRANT EXECUTE ON FUNCTION crear_pedido_completo(BIGINT, TEXT, TEXT, TEXT, JSONB) TO anon, authenticated;

-- ── 7) Seed: las 6 sucursales actuales ─────────────────────────────────────
-- Migrado del array que estaba en src/data/productos.ts
-- Nota: durante el demo todas las sucursales apuntan al mismo WhatsApp del cliente.
-- Cuando tengamos los números reales de cada local, se actualiza con UPDATE.
INSERT INTO sucursales (nombre, direccion, ciudad, telefono, whatsapp, horarios, lat, lng, orden) VALUES
  ('Casa Central - Mayorista',    'Elpidio González 320, Dorrego - Guaymallén, Mendoza',         'Guaymallén',     '2612 34-2674', '5492612342674', 'Lun-Sáb 8:00-20:00', -32.9282, -68.5017, 1),
  ('Sucursal Elpidio',            'Elpidio González 488, Dorrego - Guaymallén, Mendoza',         'Guaymallén',     '2612 34-2674', '5492612342674', 'Lun-Sáb 8:00-20:00', -32.9270, -68.5000, 2),
  ('La Bonita - Chacras de Coria','Besares 833, Chacras de Coria - Luján, Mendoza',              'Luján de Cuyo',  '2612 34-2674', '5492612342674', 'Lun-Sáb 8:00-20:00', -32.9830, -68.5750, 3),
  ('Liniers Green Market',        'Liniers 1051, Chacras de Coria - Luján, Mendoza',             'Luján de Cuyo',  '2612 34-2674', '5492612342674', 'Lun-Dom 8:00-21:00', -32.9800, -68.5780, 4),
  ('Sucursal Rodríguez Peña',     'Rodríguez Peña 1412, Dorrego - Guaymallén, Mendoza',          'Guaymallén',     '2612 34-2674', '5492612342674', 'Lun-Sáb 8:00-20:00', -32.9250, -68.5050, 5),
  ('Sobremonte Market',           'Viamonte, Luján de Cuyo, Mendoza',                            'Luján de Cuyo',  '2612 34-2674', '5492612342674', 'Lun-Dom 8:00-21:00', -32.9700, -68.5650, 6);

-- ── 8) Verificación ────────────────────────────────────────────────────────
-- Después de aplicar todo lo anterior, probar con:
--
-- SELECT * FROM sucursales;
-- SELECT crear_pedido_completo(
--   1::BIGINT, 'Test', '2611234567', null,
--   '[{"producto_id": 1, "cantidad_kg": 1.5}]'::JSONB
-- );
-- SELECT * FROM pedidos ORDER BY id DESC LIMIT 1;
-- SELECT * FROM items_pedido WHERE pedido_id = (SELECT MAX(id) FROM pedidos);
