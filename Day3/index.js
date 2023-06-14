const http = require('http');
var url = require('url');
const fs = require('fs')
const path = require('path')
http.createServer(function (req, res) {
    let path = req.url
    let resPath = ""
    if (path === '/') {
        fs.readdir(__dirname, (err, files) => {
            if (err)
                console.log(err);
            else {
                console.log("\nCurrent directory filenames:");
                files.forEach(file => {
                    console.log(file);
                    resPath+=`<li> <a href=${file} >  ${file}   </a> </li>`
                }) 
                res.end(` 
                <html>
                <body>
                 <ul> ${resPath} </ul>
                 </body>
                 </html>
                  `)
            }
        })

    } else if (path === '/Public') {
        fs.readdir(__dirname+'/Public', (err, files) => {
            if (err)
                console.log(err);
            else {
                console.log("\nCurrent directory filenames:");
                files.forEach(file => {
                    console.log(file);
                    resPath += `<li> <a href=${file} >  ${file}   </a> </li>`
                })
                res.end(` 
                <html>
                <body>
                 <ul> ${resPath} </ul>
                 </body>
                 </html>
                  `)
            }
        })
        
        
    } else if (path === '/Public/other' || path ==='/other') {
        fs.readdir(__dirname + '/Public/other', (err, files) => {
            if (err)
                console.log(err);
            else {
                console.log("\nCurrent directory filenames:");
                files.forEach(file => {
                    console.log(file);
                    resPath += `<li> <a href=${file} >  ${file}   </a> </li>`
                })
                res.end(` 
                <html>
                <body>
                 <ul> ${resPath} </ul>
                 </body>
                 </html>
                  `)
            }
        })
        
    } else if (path === '/express') {
        fs.readdir(__dirname + '/express', (err, files) => {
            if (err)
                console.log(err);
            else {
                console.log("\nCurrent directory filenames:");
                files.forEach(file => {
                    console.log(file);
                    resPath += file + "\n"
                })
                res.end(resPath)
            }
        })

    }
    else {
        res.statusCode = 404;
        res.end("")

    }
    

}).listen(3030)