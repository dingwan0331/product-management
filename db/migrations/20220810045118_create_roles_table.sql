-- migrate:up
CREATE TABLE roles (
    id TINYINT UNSIGNED AUTO_INCREMENT,
    name VARCHAR(30) NOT NULL UNIQUE,

    PRIMARY KEY (id)
);

-- migrate:down
DROP TABLE roles;