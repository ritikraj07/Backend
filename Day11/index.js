const express = require('express');
const multer = require('multer');
var morgan = require('morgan')
morgan(function (tokens, req, res) {
    return [
        tokens.method(req, res),
        tokens.url(req, res),
        tokens.status(req, res),
        tokens.res(req, res, 'content-length'), '-',
        tokens['response-time'](req, res), 'ms'
    ].join(' ')
})
const app = express();
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/'); // Specify the directory where you want to store the files
    },
    filename: (req, file, cb) => {
        cb(null, file.originalname); // Use the original file name as the stored file name
    }
});
const upload = multer({ storage });

function middleware() {
    
}

app.post('/upload', upload.single('file'), (req, res) => {
    if (!req.file) {
        return res.status(400).json({ error: 'No file uploaded' });
    }

    // File is stored in req.file
    // You can process or save the file here

    res.json({ message: 'File uploaded successfully' });
});

app.listen(3000, () => {
    console.log('Server is running on port 3000');
});
