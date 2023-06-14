const mongoose = require('mongoose')

async function connectDatabase() {
    try {
        // await mongoose.connect('mongodb://127.0.0.1:27017/testDrive');
        await mongoose.connect('mongodb+srv://ritikraj07:imritikraj@cluster0.zvx9zpw.mongodb.net/databaseDemo?appName=mongosh+1.8.0');
        console.log('connected')
    } catch (err) {
        console.log('Not connected')
    }
}


const User = mongoose.model('user', {
    name: String,
    age: Number,
    email: String, 
    password: String,
    dob: Date
})
async function create() {
    const user = await User.create({
        name: 'Ritik Raj',
        age: 21,
        email: 'ritikraj@gamil.com',
        password: '123qwe',
        dob: new Date('2004-04-13')
    })
    console.log(user)
}
async function update() {
    //use findOneAndUpdate insted or updateOne no user findByIdAndUpdate()
    // let user = await User.findOneAndUpdate
    let user = await User.findByIdAndUpdate(('643d712b8c96929d51d42c7f'), {
        $set: {
            email: 'ssinghoberoy@gmail.com',
        }
    })
    user = await User.findById('643d712b8c96929d51d42c7f')
    console.log(user)
} 
async function DeleteDoc() {
    let user = User.findByIdAndDelete('')
    console.log(user)
}

connectDatabase()
.then(update)
