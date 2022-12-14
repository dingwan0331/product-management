-- migrate:up
CREATE TABLE menu_tag(
    id BIGINT UNSIGNED AUTO_INCREMENT,
    menu_id BIGINT UNSIGNED,
    tag_id INT UNSIGNED,

    PRIMARY KEY (id),
    FOREIGN KEY (menu_id) REFERENCES menus(id) ON DELETE CASCADE ON UPDATE CASCADE,
    FOREIGN KEY (tag_id) REFERENCES tags(id) ON DELETE CASCADE ON UPDATE CASCADE
)

-- migrate:down
DROP TABLE menu_tag;