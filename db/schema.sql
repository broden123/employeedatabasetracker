CREATE TABLE department (
    id INTEGER AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(50)
);

CREATE TABLE role (
    id INTEGER AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(30),
    salary INTEGER,
    department_id INTEGER,
    FOREIGN KEY (department_id)
    REFERENCES department(name)
    ON DELETE SET NULL
);

CREATE TABLE employee(
    id INTEGER AUTO_INCREMENT PRIMARY KEY,
    first_name VARCHAR(30) NOT NULL,
    last_name VARCHAR(50) NOT NULL,
    role_id INTEGER,
    FOREIGN KEY (role_id)
    REFERENCES role(name)
    ON DELETE SET NULL,
    manager_id INTEGER
);