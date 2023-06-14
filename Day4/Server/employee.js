
const fs = require('fs/promises')

async function getAllExployee() {
    let employees = await fs.readFile('./exployees.json', {
        encoding:'utf-8'
    })
    employees = JSON.parse(employees)
    return employees

}
async function updateFile(employees) {
    employees = JSON.stringify(employees, null, 2)
    await fs.writeFile('./exployees.json', employees)
}
async function updateEmployee(id, data) {
    let employees = await getAllExployee()
    let index = -1;
    
    employees.forEach((element, i) => {
        if (element.id == id) {
            index = i;
        }
    });
    console.log(index)
    if (index == -1) {
        return "No Data found"
    } else {
        let employee = employees[index]
        console.log(employee)
        employee = {
            ...employee,
            ...data
        }
        employees[index] = employee
        await updateFile(employees)
        return employee;
    }
}
async function deleteEmployee(id) {
    let employees = await getAllExployee()
    let index = -1;

    employees.forEach((element, i) => {
        if (element.id == id) {
            index = i;
        }
    });

    if (index == -1) {
        return 'No data found'
    } else {
       let removedEmployee = employees.splice(index, 1)
        await updateFile(employees)
        return removedEmployee
    }
}
// ---- for updating file ---->

async function addEmployee(data) {
    let employees = await getAllExployee()
    let id = 1;
    for (let employee of employees) {
        if (employee.id >= id) {
            id = employee.id+1
        }
    }
    data.id = id;
    employees.push(data)
    await updateFile(employees)
    return data;
}

async function getEmployeeID(id) {
    let employees = await getAllExployee()
    return employees.find(employee => employee.id == id);
}

module.exports = {getAllExployee, addEmployee, updateEmployee, deleteEmployee, getEmployeeID}