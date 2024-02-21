 CREATE TRIGGER add_new_user_to_pages_trg AFTER INSERT ON users
 FOR EACH ROW execute Procedure add_user_to_page();

-- CREATE OR REPLACE FUNCTION add_user_to_page() RETURNS TRIGGER AS $add_new_user_to_pages_trg$
-- DECLARE
--   f_page_id INTEGER;  -- Assuming 'id' is of type INTEGER
-- BEGIN
--   FOR f_page_id IN SELECT page_id FROM app_pages LOOP
--     INSERT INTO user_permissions (user_id, page_id)
--     VALUES (NEW.user_id, f_page_id);
--   END LOOP;

--   RETURN NEW;
-- END;
-- $add_new_user_to_pages_trg$ LANGUAGE plpgsql;


--  CREATE TRIGGER add_page_to_user_trg AFTER INSERT ON app_pages
--  FOR EACH ROW execute Procedure add_page_to_user();

CREATE OR REPLACE FUNCTION add_user_to_page() RETURNS TRIGGER AS $add_new_user_to_user_trg$
DECLARE
  f_user_id INTEGER;  -- Assuming 'id' is of type INTEGER
BEGIN
  FOR f_user_id IN SELECT user_id FROM users LOOP
    INSERT INTO user_permissions (user_id, page_id)
    VALUES (f_user_id, NEW.page_id);
  END LOOP;

  RETURN NEW;
END;
$add_new_page_to_user_trg$ LANGUAGE plpgsql;