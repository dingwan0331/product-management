-- migrate:up
CREATE TABLE badges(
    id INT UNSIGNED AUTO_INCREMENT,
    name VARCHAR(50) NOT NULL,

    PRIMARY KEY (id)
);

-- migrate:down
DROP TABLE badges;