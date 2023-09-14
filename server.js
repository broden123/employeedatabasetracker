const inquirer = require("inquirer");
const db = require("./db/connection");

//initialize connection to database

db.connect((err) => {
  if (err) throw err;
  console.log("Connected to Database!");
  employee_database();
});

var employee_database = function () {
  inquirer
    .prompt([
      {
        type: "list",
        name: "prompt",
        message: "What would you like to do?",
        choices: [
          "View All Departments",
          "View All Roles",
          "View All Employees",
          "Add A Department",
          "Add A Role",
          "Add An Employee",
          "Update An Employee Role",
          "End Session",
        ],
      },
    ])
    .then((answers) => {
      //view all departments
      if (answers.prompt === "View All Departments") {
        db.query(`SELECT * FROM department`, (err, result) => {
          if (err) throw err;
          console.log("All Currently Available Departments:");
          console.log("____________________________________");
          console.table(result);
          employee_database();
        });
        //view all roles
      } else if (answers.prompt === "View All Roles") {
        db.query(`SELECT * FROM role`, (err, result) => {
          if (err) throw err;
          console.log("All Currently Available Roles:");
          console.log("______________________________");
          console.table(result);
          employee_database();
        });
        //view all employees
      } else if (answers.prompt === "View All Employees") {
        db.query(`SELECT * FROM employee`, (err, result) => {
          if (err) throw err;
          console.log("All Current Employees:");
          console.log("______________________");
          console.table(result);
          employee_database();
        });
        //add departments
      } else if (answers.prompt === "Add A Department") {
        inquirer
          .prompt([
            {
              type: "input",
              name: "department",
              message: "Department Name?",
              validate: (departmentInput) => {
                if (!departmentInput) {
                  console.log("Please Enter a Name!");
                  return false;
                } else {
                  return true;
                }
              },
            },
          ])
          .then((answers) => {
            db.query(
              `INSERT INTO department (name) VALUES (?)`,
              [answers.department],
              (err, result) => {
                if (err) throw err;
                console.log(`${answers.department} has been created!`);
                employee_database();
              }
            );
          });
        //add roles
      } else if (answers.prompt === "Add A Role") {
        db.query(`SELECT * FROM department`, (err, result) => {
          if (err) throw err;

          inquirer
            .prompt([
              //role name
              {
                type: "input",
                name: "role",
                message: "Role Name?",
                validate: (roleInput) => {
                  if (!roleInput) {
                    console.log("Please Enter a Name!");
                    return false;
                  } else {
                    return true;
                  }
                },
              },
              //role salary
              {
                type: "input",
                name: "salary",
                message: "Role Salary?",
                validate: (salaryInput) => {
                  if (!salaryInput) {
                    console.log("Please Enter a Name!");
                    return false;
                  } else {
                    return true;
                  }
                },
              },
              //role department
              {
                type: "list",
                name: "department",
                message: "Which department does the role belong to?",
                choices: () => {
                  var array = [];
                  for (var i = 0; i < result.length; i++) {
                    array.push(result[i].name);
                  }
                  return array;
                },
              },
            ])
            .then((answers) => {
              for (var i = 0; i < result.length; i++) {
                if (result[i].name === answers.department) {
                  var department = result[i];
                }
              }

              db.query(
                `INSERT INTO role (title, salary, department_id) VALUES (?, ?, ?)`,
                [answers.role, answers.salary, department.id],
                (err, result) => {
                  if (err) throw err;
                  console.log(`${answers.role} added to Roles!`);
                  employee_database();
                }
              );
            });
        });
        //add employee
      } else if (answers.prompt === "Add An Employee") {
        db.query(`SELECT * FROM employee, role`, (err, result) => {
          if (err) throw err;

          inquirer
            .prompt([
              //first name
              {
                type: "input",
                name: "firstName",
                message: "Employees first name?",
                validate: (firstNameInput) => {
                  if (!firstNameInput) {
                    console.log("Please Add A Name!");
                    return false;
                  } else {
                    return true;
                  }
                },
              },
              //last name
              {
                type: "input",
                name: "lastName",
                message: "Employees last name?",
                validate: (lastNameInput) => {
                  if (!lastNameInput) {
                    console.log("Please Add A Name!");
                    return false;
                  } else {
                    return true;
                  }
                },
              },
              //employee role
              {
                type: "list",
                name: "role",
                message: "Employees role?",
                choices: () => {
                  var array = [];
                  for (var i = 0; i < result.length; i++) {
                    array.push(result[i].title);
                  }
                  var newArray = [...new Set(array)];
                  return newArray;
                },
              },
              //employee manager
              {
                type: "input",
                name: "manager",
                message: "Employees manager?",
                validate: (managerInput) => {
                  if (!managerInput) {
                    console.log("Please list A Manager!");
                    return false;
                  } else {
                    return true;
                  }
                },
              },
            ])
            .then((answers) => {
              for (var i = 0; i < result.length; i++) {
                if (result[i].title === answers.role) {
                  var role = result[i];
                }
              }

              db.query(
                `INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES (?, ?, ?, ?)`,
                [
                  answers.firstName,
                  answers.lastName,
                  role.id,
                  answers.manager.id,
                ],
                (err, result) => {
                  if (err) throw err;
                  console.log(
                    `${answers.firstName} ${answers.lastName} has been added as an employee!`
                  );
                  employee_database();
                }
              );
            });
        });
        //update employee role
      } else if (answers.prompt === "Update An Employee Role") {
        db.query(`SELECT * FROM employee, role`, (err, result) => {
          if (err) throw err;

          inquirer
            .prompt([
              //select employee
              {
                type: "list",
                name: "employee",
                message: "Which employees role do you want to update?",
                choices: () => {
                  var array = [];
                  for (var i = 0; i < result.length; i++) {
                    array.push(result[i].last_name);
                  }
                  var employeeArray = [...new Set(array)];
                  return employeeArray;
                },
              },
              //update role
              {
                type: "list",
                name: "role",
                message: "What is their new role?",
                choices: () => {
                  var array = [];
                  for (var i = 0; i < result.length; i++) {
                    array.push(result[i].title);
                  }
                  var newArray = [...new Set(array)];
                  return newArray;
                },
              },
            ])
            .then((answers) => {
              for (var i = 0; i < result.length; i++) {
                if (result[i].last_name === answers.employee) {
                  var name = result[i];
                }
              }

              for (var i = 0; i < result.length; i++) {
                if (result[i].title === answers.role) {
                  var role = result[i];
                }
              }

              db.query(
                `UPDATE employee SET ? WHERE ?`,
                [{ role_id: role }, { last_name: name }],
                (err, result) => {
                  if (err) throw err;
                  console.log(
                    `${answers.employee} has been assigned to new role!`
                  );
                  employee_database();
                }
              );
            });
        });
      } else if (answers.prompt === "End Session") {
        db.end();
        console.log("Logged Out");
      }
    });
};
