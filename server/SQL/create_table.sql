CREATE TABLE person(
    Id INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
    first_name VARCHAR(100) NOT NULL,
    last_name VARCHAR(100) NOT NULL,
    is_delete BOOL DEFAULT FALSE
);

CREATE TABLE user(
    Id INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
    person_id INT NOT NULL,
    email VARCHAR(120) NOT NULL,
    password VARCHAR(100) NOT NULL,
    registration_time DATETIME NOT NULL,
    status VARCHAR(100) DEFAULT 'Active',
    is_delete BOOL DEFAULT FALSE,
    CONSTRAINT FOREIGN KEY (person_id) REFERENCES person(Id)
            ON UPDATE NO ACTION
            ON DELETE NO ACTION
);

DROP TABLE person;
DROP TABLE user;


CREATE USER 'newuser'@'localhost' IDENTIFIED WITH 'mysql_native_password' BY 'ellez2004';
GRANT ALL PRIVILEGES ON * . * TO 'newuser'@'localhost';
FLUSH PRIVILEGES;