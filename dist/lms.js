import inquirer from "inquirer";
class Student {
    constructor(name) {
        this.courses = [];
        this.balance = 0;
        this.id = Student.nextID++;
        this.name = name;
    }
    enrollCourse(course, fee) {
        this.courses.push(course);
        this.balance += fee;
    }
    viewStatus() {
        console.log(`Name: ${this.name}`);
        console.log(`ID: ${this.id}`);
        console.log(`Courses Enrolled: ${this.courses.join(', ')}`);
        console.log(`Balance: $${this.balance}`);
    }
    payFees(amount) {
        if (amount <= this.balance) {
            this.balance -= amount;
            console.log(`Payment of $${amount} received from ${this.name}.`);
        }
        else {
            console.log(`Insufficient balance. Please pay at least $${this.balance} for this transaction.`);
        }
    }
}
Student.nextID = 10000;
const students = [];
function addStudent() {
    inquirer.prompt([
        {
            type: 'input',
            name: 'name',
            message: 'Enter student name:'
        }
    ]).then(answers => {
        const newStudent = new Student(answers['name']);
        students.push(newStudent);
        console.log(`Student ${answers['name']} added with ID ${newStudent.id}.`);
        mainMenu();
    });
}
function enrollStudent() {
    inquirer.prompt([
        {
            type: 'number',
            name: 'id',
            message: 'Enter student ID:'
        },
        {
            type: 'input',
            name: 'course',
            message: 'Enter course name:'
        },
        {
            type: 'number',
            name: 'fee',
            message: 'Enter course fee:'
        }
    ]).then(answers => {
        const student = students.find(s => s.id === answers['id']);
        if (student) {
            student.enrollCourse(answers['course'], answers['fee']);
            console.log(`${answers['course']} enrolled for ${student.name}.`);
        }
        else {
            console.log(`Student with ID ${answers['id']} not found.`);
        }
        mainMenu();
    });
}
function viewBalance() {
    inquirer.prompt([
        {
            type: 'number',
            name: 'id',
            message: 'Enter student ID:'
        }
    ]).then(answers => {
        const student = students.find(s => s.id === answers['id']);
        if (student) {
            student.viewStatus();
        }
        else {
            console.log(`Student with ID ${answers['id']} not found.`);
        }
        mainMenu();
    });
}
function payFees() {
    inquirer.prompt([
        {
            type: 'number',
            name: 'id',
            message: 'Enter student ID:'
        },
        {
            type: 'number',
            name: 'amount',
            message: 'Enter amount to pay:'
        }
    ]).then(answers => {
        const student = students.find(s => s.id === answers['id']);
        if (student) {
            student.payFees(answers['amount']);
        }
        else {
            console.log(`Student with ID ${answers['id']} not found.`);
        }
        mainMenu();
    });
}
function showStatus() {
    inquirer.prompt([
        {
            type: 'number',
            name: 'id',
            message: 'Enter student ID:'
        }
    ]).then(answers => {
        const student = students.find(s => s.id === answers['id']);
        if (student) {
            student.viewStatus();
        }
        else {
            console.log(`Student with ID ${answers['id']} not found.`);
        }
        mainMenu();
    });
}
function mainMenu() {
    inquirer.prompt([
        {
            type: 'list',
            name: 'option',
            message: 'Select an option:',
            choices: [
                'Add Student',
                'Enroll Student',
                'View Balance',
                'Pay Tuition Fees',
                'Show Status',
                'Exit'
            ]
        }
    ]).then(answers => {
        switch (answers['option']) {
            case 'Add Student':
                addStudent();
                break;
            case 'Enroll Student':
                enrollStudent();
                break;
            case 'View Balance':
                viewBalance();
                break;
            case 'Pay Tuition Fees':
                payFees();
                break;
            case 'Show Status':
                showStatus();
                break;
            case 'Exit':
                break;
        }
    });
}
mainMenu();
