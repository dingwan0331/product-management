-- migrate:up
CREATE TABLE users (
    id BIGINT UNSIGNED AUTO_INCREMENT,
    email VARCHAR(200) UNIQUE NOT NULL,
    password BINARY(60) NOT NULL,
    role_id TINYINT UNSIGNED,
    created_at TIMESTAMP DEFAULT current_timestamp NOT NULL,
    updated_at TIMESTAMP DEFAULT current_timestamp ON UPDATE current_timestamp NOT NULL,
    deleted_at TIMESTAMP NOT NULL,
    is_deleted TINYINT(1) UNSIGNED DEFAULT 0 NOT NULL,

    PRIMARY KEY (id),
    FOREIGN KEY (role_id) REFERENCES roles(id) ON DELETE SET NULL ON UPDATE CASCADE
);
-- migrate:down
DROP TABLE users;