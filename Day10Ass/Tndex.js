const express = require("express");
const app = express();
const myData = require("./Router/data.route")
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use((req, res, next) => {
    console.log(req.params, new Date())
    let body = req.body;
    try { 
        console.log(typeof body.cast)
        if ((body.ID && body.rating && body.name && body.discription && body.genra && body.cast
        
        ) && ((typeof body.ID == "number") && typeof body.rating == "number" && typeof body.name == "string" && 
        typeof body.discription == "string" && typeof body.genra == "string" && typeof body.cast == "object"

            )) {
            next()
        } else {
            return res.send("Server fail")
        }
    
    } catch (err) {
        res.status(400).send("Something went wrong")
        
    }
    
})
app.use('/data', myData);

app.get('/', (req, res) => {
    res.send("done")
})
app.listen("8000", () => {
    console.log("Server Started")
})