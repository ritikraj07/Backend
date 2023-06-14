const express = require('express')
const app = express()
const { getAllExployee,
    addEmployee,
    updateEmployee,
    deleteEmployee, getEmployeeID } = require('./employee')
app.use(express.json())
app.get('/employee/all', async (req, res) => {
    try {
        let employees = await getAllExployee()
        res.send({
            data: employees
        })
    } catch (err) {
        res.status(500).send({
            error: 'something went wrong',
            // errorMessage: err.message
        })
    }
})

app.post('/employee',async (req, res) => {
    try {
        let body = req.body
        let data = await addEmployee(body)
        res.status(200).send({
            'data': data,
            'status':'success'
        })
    } catch (err) {
        console.log(err)
        res.status(500).send({
            error: 'something went wrong',
            status:'fail'
        })
    }
})
app.patch('/employee/:id', async (req, res) => {
    try {
        const id = parseInt(req.params.id)
        let data = req.body
        
        let updataedData = await updateEmployee(id, data)
        res.status(200).send({
            data: updataedData,
            status:'success'
        })
    } catch (err) {
        res.status(500).send({
            error: 'something went wrong',
            status: 'fail'
            // errorMessage: err.message
        })
    }
})
app.delete('/employee/:id',async (req, res) => {
    try {
        let id = req.params.id
        let removedEmployee = await deleteEmployee(id)
        res.status(200).send({
            data: removedEmployee
        })
    } catch (err) {
        res.status(500).send({
            error: 'something went wrong',
            // errorMessage: err.message
        })
    }
})

app.get('/employee/:id', async (req, res) => {
    try {
        let id = req.params.id
        let employee = await getAllExployee()
        res.status(200).send({
            data: employee[id],
            status:'success'
        })
        
    } catch (err) {
        res.status(500).send({
            error:'something wrong'
        })
    }
})

app.listen(8000, () => {
    console.log("server stated")
})