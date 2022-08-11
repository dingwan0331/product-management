-- migrate:up
CREATE TABLE tag_types(
    id INT UNSIGNED AUTO_INCREMENT,
    name VARCHAR(50) NOT NULL,

    PRIMARY KEY(id)
);

-- migrate:down
DROP TABLE tag_types;