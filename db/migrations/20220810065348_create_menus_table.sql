-- migrate:up
CREATE TABLE menus (
    id BIGINT UNSIGNED AUTO_INCREMENT,
    name VARCHAR(200) NOT NULL,
    description VARCHAR(200),
    is_sold TINYINT(1) UNSIGNED DEFAULT 0 NOT NULL,
    category_id INT UNSIGNED,
    badge_id INT UNSIGNED,
    tag_id INT UNSIGNED,
    created_at TIMESTAMP DEFAULT current_timestamp NOT NULL,
    updated_at TIMESTAMP DEFAULT current_timestamp ON UPDATE current_timestamp NOT NULL,
    deleted_at TIMESTAMP,
    is_deleted TINYINT(1) UNSIGNED DEFAULT 0 NOT NULL,

    PRIMARY KEY (id),
    FOREIGN KEY (category_id) REFERENCES categories(id) ON DELETE SET NULL ON UPDATE CASCADE,
    FOREIGN KEY (badge_id) REFERENCES badges(id) ON DELETE SET NULL ON UPDATE CASCADE,
    FOREIGN KEY (tag_id) REFERENCES tags(id) ON DELETE SET NULL ON UPDATE CASCADE
);
-- migrate:down
DROP TABLE menus;
