-- migrate:up
CREATE TABLE sizes (
    id INT UNSIGNED AUTO_INCREMENT,
    name VARCHAR(50) NOT NULL,
    kor_name VARCHAR(50),

    PRIMARY KEY (id)
);
-- migrate:down
DROP TABLE sizes;
