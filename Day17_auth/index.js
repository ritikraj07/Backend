require('dotenv').config()
const express = require('express');
const cors = require('cors');
const morgan = require('morgan')


const postRouter = require('./routes/post.route.js')
const connectDatabase = require('./db/connectDatabase');
const authRouter = require('./routes/auth.route.js')
var session = require('express-session')
const app = express();


app.use(express.json()); 
// app.use(express.static('static'));
app.use(cors()); 
app.use(morgan('tiny'))

// app.set('trust proxy', 1) // trust first proxy
app.use(session({
    secret: 'tyghjklasf334refd',
    resave: false,
    saveUninitialized: true,
    cookie: { secure: true }
}))

let visit = 0;
app.get('/', (req, res) => {
    let visit = 1;
    if (req.session.visit) {
        visit = req.session.visit
    } else {
        req.session.visit = visit;
    }
    
    req.session.visit++;
    res.send(`
    <div>${visit}</div>
    `)
})

app.use('/auth', authRouter);

app.use('/posts', postRouter)

connectDatabase()
    .then(() => {
        app.listen(8000)
        console.log("server started")
    
})
