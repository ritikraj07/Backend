const express = require('express');
const cors = require('cors');
const morgan = require('morgan')

const postRouter = require('./routes/post.route')
const connectDatabase = require('./db/connectDatabase');

const app = express();

app.use(express.json()); 
app.use(cors()); 
app.use(morgan('tiny'))


app.use('/posts', postRouter)
connectDatabase()
    .then(() => {
        app.listen(3000)
    
})
