-- migrate:up
CREATE TABLE menu_status_logs (
    id BIGINT UNSIGNED AUTO_INCREMENT,
    menu_id BIGINT UNSIGNED,
    user_id BIGINT UNSIGNED,
    log_status ENUM('생성','수정','삭제'),
    created_at TIMESTAMP DEFAULT current_timestamp NOT NULL,
    updated_at TIMESTAMP DEFAULT current_timestamp ON UPDATE current_timestamp NOT NULL,
    deleted_at TIMESTAMP ,
    is_deleted TINYINT(1) UNSIGNED DEFAULT 0 NOT NULL,

    PRIMARY KEY (id),
    FOREIGN KEY (menu_id) REFERENCES menus(id) ON DELETE SET NULL ON UPDATE CASCADE,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE SET NULL ON UPDATE CASCADE
);
-- migrate:down
DROP TABLE menu_status_logs;