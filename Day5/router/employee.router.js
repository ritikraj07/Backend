const express = require('express')
const router = express.Router()


const { getAllExployee,
    addEmployee,
    updateEmployee,
    deleteEmployee, getEmployeeID } = require('../employee')

router.use(express.json())
function employeeRouterMiddleWare(req, res, next) {
    console.log("I am from employee router")
    next()
}
router.use(employeeRouterMiddleWare)
router.get('/all', async (req, res) => {
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

router.post('/', async (req, res) => {
    try {
        let body = req.body
        let data = await addEmployee(body)
        res.status(200).send({
            'data': data,
            'status': 'success'
        })
    } catch (err) {
        console.log(err)
        res.status(500).send({
            error: 'something went wrong',
            status: 'fail'
        })
    }
})
router.patch('/:id', async (req, res) => {
    try {
        const id = parseInt(req.params.id)
        let data = req.body

        let updataedData = await updateEmployee(id, data)
        res.status(200).send({
            data: updataedData,
            status: 'success'
        })
    } catch (err) {
        res.status(500).send({
            error: 'something went wrong',
            status: 'fail'
            // errorMessage: err.message
        })
    }
})
router.delete('/:id', async (req, res) => {
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

router.get('/:id', async (req, res) => {
    try {
        let id = req.params.id
        let employee = await getAllExployee()
        res.status(200).send({
            data: employee[id],
            status: 'success'
        })

    } catch (err) {
        res.status(500).send({
            error: 'something wrong'
        })
    }
})

module.exports = router