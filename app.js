const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");

const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");

const render = require("./lib/htmlRenderer");
const Employee = require("./lib/Employee");

const createTeamRoster = [];


// Write code to use inquirer to gather information about the development team members,
// and to create objects for each team member (using the correct classes as blueprints!)

//FUNCTION TO GENERATE MANAGER
function generateManager() {
     inquirer.prompt([
        { 
            type: "input",
            name: "name",
            message: "What is the manager's name?"
        },
        {
            type: "input",
            name: "id",
            message: "What is the manager's ID number?"
        },
        {
            type: "input",
            name: "email",
            message: "What is the manager's email address?"
        },
        {
            type: "input",
            name: "officeNumber",
            message: "What is the manager's office number?"
        }
    ])
    .then(function (answers) {
        let manager = new Manager(answers.name, answers.id, answers.email, answers.officeNumber);
        createTeamRoster.push(manager);
        addMore();  
        
    })
    .catch(function(err) {
        console.log(err);
      });
}
//FUNCTION TO ASK IF ANOTHER EMPLOYEE SHOULD BE ADDED
function addMore() {
    inquirer.prompt([
        { 
            type: "list",
            name: "role",
            message: "What is the next role you would like created?",
            choices: ["Engineer", "Intern", "No Other Roles"]
        } 
    ])
    .then(answers => {
        if (answers.role === "Engineer") {
            addEngineer();
        } else if (answers.role === "Intern") {
            addIntern();
        } else {generateFile()}
    })
    .catch(function(err) {
        console.log(err);
    })
};
// FUNCTION TO ADD ENGINEER IF SELECTED
function addEngineer() {
    inquirer.prompt([
            { 
                type: "input",
                name: "name",
                message: "What is the engineers's name?"
            },
            {
                type: "input",
                name: "id",
                message: "What is the engineers's ID number?"
            },
            {
                type: "input",
                name: "email",
                message: "What is the engineer's email address?"
            },
            {
                type: "input",
                name: "gitHub",
                message: "What is the Engineer's GitHub username?"
            },
        ])
        .then(answers => {
            let engineer = new Engineer(answers.name, answers.id, answers.email, answers.gitHub);
            createTeamRoster.push(engineer);
            addMore();   
        })
        .catch(function(err) {
            console.log(err);
          });
} 
//FUNCTION TO ADD INTERN IF SELECTED
function addIntern() {
    inquirer.prompt([
        { 
            type: "input",
            name: "name",
            message: "What is the interns's name?"
        },
        {
            type: "input",
            name: "id",
            message: "What is the interns's ID number?"
        },
        {
            type: "input",
            name: "email",
            message: "What is the interns's email address?"
        },
        {
            type: "input",
            name: "school",
            message: "What school is the intern attending?"
        },
    ])
    .then(answers => {
        let intern = new Intern(answers.name, answers.id, answers.email, answers.school);
        createTeamRoster.push(intern);
        addMore();   
    })
    .catch(function(err) {
        console.log(err);
      });
}
 
//CALL FUNCTION
generateManager();




// After the user has input all employees desired, call the `render` function (required
// above) and pass in an array containing all employee objects; the `render` function will
// generate and return a block of HTML including templated divs for each employee!

//function generateFile() {
//    fs.writeFileSync(outputPath, render(createTeamRoster), "utf-8")
//}

function generateFile() {
    const makeit = render(createTeamRoster);
    fs.writeFile(outputPath, makeit, {}, () => console.log("Thanks, your page has been generated"));
}

// After you have your html, you're now ready to create an HTML file using the HTML
// returned from the `render` function. Now write it to a file named `team.html` in the
// `output` folder. You can use the variable `outputPath` above target this location.
// Hint: you may need to check if the `output` folder exists and create it if it
// does not.

// HINT: each employee type (manager, engineer, or intern) has slightly different
// information; write your code to ask different questions via inquirer depending on
// employee type.

// HINT: make sure to build out your classes first! Remember that your Manager, Engineer,
// and Intern classes should all extend from a class named Employee; see the directions
// for further information. Be sure to test out each class and verify it generates an
// object with the correct structure and methods. This structure will be crucial in order
// for the provided `render` function to work! ```

