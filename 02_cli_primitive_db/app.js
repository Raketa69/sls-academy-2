import inquirer from 'inquirer';
import ControllerDB from "./ControllerDB.js"
import Validator from "./Validator.js"

let controllerDB = new ControllerDB()
let v = new Validator()

function startApp() {

    inquirer
        .prompt([
            {
                name: 'user',
                message: 'Enter the users name. To cancel press ENTER:',
                validate: (input) => v.validName(input)
            },
        ])
        .then((answers) => {
            if (answers.user == "") {
                chooseOptions();
            } else {
                addNewUser(answers.user);
            }
        });
}

function addNewUser(user) {
    inquirer
        .prompt([
            {
                name: 'gender',
                message: 'Choose your gender.',
                type: 'list',
                choices: ["male", new inquirer.Separator(), "female"]
            },
            {
                name: 'age',
                message: 'Enter your age:',
                validate: (input) => v.validAge(input)
            }
        ])
        .then((answers) => {
            answers.user = user
            console.log(answers);
            controllerDB.setDB(answers)
            startApp()
        })
}

function chooseOptions() {
    inquirer
        .prompt([
            {
                type: "list",
                name: 'chooseOptions',
                message: 'Would you to search values in DB?',
                choices: ["Yes", new inquirer.Separator(), "No"]
            },
        ])
        .then((answers) => {
            if (answers.chooseOptions == "Yes") {
                console.log(controllerDB.getDB())
                findByUserName()
            }
            else {
                return
            }
        });
}

function findByUserName() {
    inquirer
        .prompt([
            {
                name: 'userName',
                message: 'Enter user`s name you wanna find in DB: ',
                validate: (input) => v.validName(input)
            },
        ])
        .then((answers) => {
            controllerDB.findUser(answers.userName)
        });
}

startApp();