require('dotenv').config()
const express = require('express');
const cors = require('cors');
const morgan = require('morgan')


const postRouter = require('./routes/post.route.js')
const connectDatabase = require('./db/connectDatabase');
const authRouter = require('./routes/auth.route.js')
const app = express();

app.use(express.json()); 
app.use(cors()); 
app.use(morgan('tiny'))
app.use('/auth', authRouter);

app.use('/posts', postRouter)

connectDatabase()
    .then(() => {
        app.listen(3000)
    
})
