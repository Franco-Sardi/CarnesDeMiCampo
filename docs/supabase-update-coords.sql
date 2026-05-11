  -- ===========================================================================
  -- Carnes de Mi Campo — Actualización de coordenadas reales (Maps)
  -- ===========================================================================
  -- Pegar en Supabase Dashboard → SQL Editor → Run.
  -- Coordenadas confirmadas por el cliente desde Google Maps (2026-05-11).
  -- ===========================================================================

  UPDATE sucursales SET
    direccion = 'Elpidio González 320, Godoy Cruz, Mendoza',
    ciudad    = 'Godoy Cruz',
    lat       = -32.92659802,
    lng       = -68.83517697
  WHERE nombre = 'Casa Central - Mayorista';

  UPDATE sucursales SET
    direccion = 'Elpidio González 488, Guaymallén, Mendoza',
    ciudad    = 'Guaymallén',
    lat       = -32.92700324,
    lng       = -68.83578523
  WHERE nombre = 'Sucursal Elpidio';

  UPDATE sucursales SET
    direccion = 'Besares 833, Chacras de Coria, Luján de Cuyo, Mendoza',
    ciudad    = 'Luján de Cuyo',
    lat       = -32.98060564,
    lng       = -68.87262348
  WHERE nombre = 'La Bonita - Chacras de Coria';

  UPDATE sucursales SET
    direccion = 'Liniers 1051, Luján de Cuyo, Mendoza',
    ciudad    = 'Luján de Cuyo',
    lat       = -32.98580251,
    lng       = -68.87989240
  WHERE nombre = 'Liniers Green Market';

  UPDATE sucursales SET
    direccion = 'Carril Rodríguez Peña 1412, Godoy Cruz, Mendoza',
    ciudad    = 'Godoy Cruz',
    lat       = -32.92596674,
    lng       = -68.81968151
  WHERE nombre = 'Sucursal Rodríguez Peña';

  UPDATE sucursales SET
    direccion = 'Viamonte 3475, Chacras de Coria, Luján de Cuyo, Mendoza',
    ciudad    = 'Luján de Cuyo',
    lat       = -33.00648925,
    lng       = -68.88713857
  WHERE nombre = 'Sobremonte Market';

  -- Verificación
  SELECT id, nombre, direccion, lat, lng FROM sucursales ORDER BY orden;
