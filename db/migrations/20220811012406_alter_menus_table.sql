-- migrate:up
ALTER TABLE menus DROP CONSTRAINT menus_ibfk_3
ALTER TABLE menus DROP tag_id;

-- migrate:down
ALTER TABLE menus ADD FOREIGN KEY(tag_id) REFERENCES tags(id) ON DELETE SET NULL ON UPDATE CASCADE;
