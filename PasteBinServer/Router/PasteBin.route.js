const { Router } = require('express')
const { Get_Content, Add_Content } = require('../Controller/PasteBin.Controller')

const PasteBinRouter = Router()

PasteBinRouter.get('/:id',async (req, res) => {
    try {
        let id = req.params.id
        let content = await Get_Content(id);
        res.send({
            status: true, 
            data: content
        })
    } catch (error) {
        res.send({
            status: false,
            data: `${error}`
        })
    }
})

PasteBinRouter.post('/', async (req, res) => {
    try {
        let content = req.body
        content = await Add_Content(content);
        let { _id } = content
        console.log(_id)
        res.send({
            status: true,
            data: content
        })
     } catch (error) {
        res.send({
            status: false,
            data: `${error}`
        })
    }
})




module.exports = PasteBinRouter