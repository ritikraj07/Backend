const express = require('express')
const app = express()
const fs = require('fs/promises')
app.use(express.json())
// GET


async function GETDATA() {
    let data = await fs.readFile('./data.json', {
        encoding: 'utf-8'
    })
    data = JSON.parse(data)
    return data;
}

async function UPDATE(data) {
    data = JSON.stringify(data, null, 2)
    await fs.writeFile('./data.json', data)
}


app.get('/', async (req, res) => {
    try {
        let data = await GETDATA()
        res.status(200).send({ data })
    } catch (err) {
        console.log(err)
        res.status(400)
    }

})

// POST
app.post('/', async (req, res) => {

    try {
        let body = req.body
        let data = await GETDATA()
        let id = 1;
        data.forEach((ele, i) => {
            id = Math.max(id, ele.id + 1)
        });
        data.push({ ...body, id })
        await UPDATE(data)
        res.status(200).send(body)
    } catch (err) {
        res.status(200).send("Something went wrong")
    }
})

// PUT

app.put('/:id', async (req, res) => {
    try {
        let id = parseInt(req.params.id)
        let body = req.body
        let data = await GETDATA()
        data.forEach((ele, i) => {
            if (ele.id == id) {
                data[i] = body
            }
        })
        await UPDATE(data)
        res.status(200).send(body)
    } catch (err) {
        res.status(400).send({
            message: "something went worng",
            error: err
        })
    }
})

// PATCH

app.patch('/:id', async (req, res) => {
    try {
        let id = parseInt(req.params.id)
        let body = req.body
        let data = await GETDATA()

        data.forEach((ele, i) => {
            if (ele.id == id) {
                data[i] = {...ele, ...body}
            }
        })
        console.log(data, body, id)
        await UPDATE(data)
        res.status(200).send(body)
     }
    catch (err) {
        res.send({
            messagea: "something went wrong",
            error: err
        })
    }
})

// DELETE
app.delete('/:id', async (req, res) => {
    try {
        let id = parseInt(req.params.id)
        let data = await GETDATA()
        data.forEach((ele, i) => {
            if (ele.id == id) {
                data.splice(i, 1);
            }
        })
        await UPDATE(data)
        res.send("done")
    } catch (err) {
        res.status(400).send(err)
    }
})

app.listen('8000')


