
const Employee = require('./db/employees.model')

async function getAllExployee() {
    let employees = await Employee.find()
    return employees

}

async function updateEmployee(id, data) {
    const employee = await Employee.findByIdAndUpdate(id, {
      $set: data
    })
    if (employee) {
        employee = await Employee.findById(id)
        return employee;
    } else {
        return "No data found"
    }
}
async function deleteEmployee(id) {
    let employees = await Employee.findByIdAndDelete(id)
    return employees || "No data found" ;
}
// ---- for updating file ---->

async function addEmployee(data) {
    let employees = await Employee.create(data)
    return employees
}

async function getEmployeeID(id) {
    let employees = await getAllExployee()
    return employees.find(employee => employee.id == id);
}

module.exports = {getAllExployee, addEmployee, updateEmployee, deleteEmployee, getEmployeeID}