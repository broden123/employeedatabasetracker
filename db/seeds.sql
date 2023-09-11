-- Inserts names of departments into department table
INSERT INTO department
  (name)
VALUES
  ('Engineering'),
  ('Sales'),
  ('Finance'),
  ('Legal');

-- Inserts roles of employee into role table
INSERT INTO role
  (title, salary, department_id)
VALUES
  ('Salesperson', 80000, 2),
  ('Software Engineer', 120000, 1),
  ('Accountant', 125000, 3),
  ('Lawyer', 190000, 4),
  ('Sales Lead', 100000, 2),
  ('Lead Engineer', 150000, 1),
  ('Account Manager', 160000, 3),
  ('Legal Team Lead', 250000, 4);

-- Inserts employee information into employee table
INSERT INTO employee
  (first_name, last_name, role_id, manager_id)
VALUES
  ('John', 'Doe', 5, 1),
  ('Mike', 'Chan', 1, 1),
  ('Ashley', 'Rodriquez', 6, 3),
  ('Kevin', 'Tupik', 2, 3),
  ('Kunal', 'Singh', 7, 5),
  ('Malia', 'Brown', 3, 5),
  ('Sarah', 'Lourd', 8, 7),
  ('Tom', 'Allen', 4, 7);
