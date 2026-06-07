CREATE OR REPLACE FUNCTION decrement_asset_qty(p_asset_id UUID, p_qty INT)
RETURNS void AS $$
BEGIN
  UPDATE assets
  SET available_quantity = available_quantity - p_qty
  WHERE id = p_asset_id AND available_quantity >= p_qty;

  IF NOT FOUND THEN
    RAISE EXCEPTION 'Insufficient available quantity for asset %', p_asset_id;
  END IF;
END;
$$ LANGUAGE plpgsql;