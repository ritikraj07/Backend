
// NODEJS - CALCULATOR
// Create an argument based calculator in nodejs
// the code takes arguments from terminal and then depending on arguments gives output
// eg node index.js add 1 2 will return 3
// support following operations:
// add, sub, mult, divide, sin, cos, tan, random
// eg node index.js random will just generate random number for you
// use crypto module to generate random number.you can also decide to get length from args

const crypto = require('crypto');
const args = process.argv.slice(2);
const operation = args[0];
const operands = args.slice(1)

function add(a, b) {
    return Number(a) + Number(b);
}

function subtract(a, b) {
    return a - b;
}

function multiply(a, b) {
    return a * b;
}

function divide(a, b) {
    return a / b;
}

function sin(a) {
    return Math.sin(a);
}

function cos(a) {
    return Math.cos(a);
}

function tan(a) {
    return Math.tan(a);
}


function random(length) {
    const bytes = crypto.randomBytes(length);
    return parseInt(bytes.toString('hex'), 16);
}

let result;

switch (operation) {
    case 'add':
        result = operands.reduce(add, 0);
        break;
    case 'sub':
        result = operands.reduce(subtract);
        break;
    case 'mult':
        result = operands.reduce(multiply, 1);
        break;
    case 'divide':
        result = operands.reduce(divide);
        break;
    case 'sin':
        result = sin(operands[0]);
        break;
    case 'cos':
        result = cos(operands[0]);
        break;
    case 'tan':
        result = tan(operands[0]);
        break;
    case 'random':
        if (operands.length === 0) {
            result = random(4); // default length is 4
        } else {
            result = random(Number(operands[0]));
        }
        break;
    default:
        console.log(`Invalid operation: ${operation}`);
        process.exit(1);
}

console.log(result);