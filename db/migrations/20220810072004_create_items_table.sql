-- migrate:up
CREATE TABLE items (
    id BIGINT UNSIGNED AUTO_INCREMENT,
    menu_id BIGINT UNSIGNED,
    size_id INT UNSIGNED,
    price DECIMAL(10,0) UNSIGNED,
    is_sold TINYINT UNSIGNED DEFAULT 0,
    created_at TIMESTAMP DEFAULT current_timestamp NOT NULL,
    updated_at TIMESTAMP DEFAULT current_timestamp ON UPDATE current_timestamp NOT NULL,
    deleted_at TIMESTAMP ,
    is_deleted TINYINT(1) UNSIGNED DEFAULT 0 NOT NULL,

    PRIMARY KEY (id),
    FOREIGN KEY (menu_id) REFERENCES menus(id) ON DELETE SET NULL ON UPDATE CASCADE,
    FOREIGN KEY (size_id) REFERENCES sizes(id) ON DELETE SET NULL ON UPDATE CASCADE
);
-- migrate:down
DROP TABLE items;