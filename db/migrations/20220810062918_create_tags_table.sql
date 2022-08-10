-- migrate:up
CREATE TABLE tags(
    id INT UNSIGNED AUTO_INCREMENT,
    name VARCHAR(50) NOT NULL,
    type_id INT UNSIGNED,

    PRIMARY KEY(id),
    FOREIGN KEY(type_id) REFERENCES tag_types(id) ON DELETE SET NULL ON UPDATE CASCADE
);

-- migrate:down
DROP TABLE tags;