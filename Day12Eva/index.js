const { error } = require("console");
const express = require("express");
const fs = require("fs");
const fsp = require("fs/promises");
const app = express();
var cowsay = require("cowsay");
const dns = require("node:dns");

app.get("/", (req, res) => {
  res.send("<h1> WELCOME TO EMPLOYEE MANAGEMENT SYSTEM </h1>");
});

app.get("/writeinfile", (req, res) => {
  fs.appendFile(
    "./employee.txt",
    "Employee names are as follows: \n",
    function (err) {
      if (err) {
        throw err;
      }
      res.send("<h1>Data has been written in the file</h1>");
    }
  );
});

app.get("/enternames", (req, res) => {
  let names = "\nAman\nAlbert\nVarun\nRaja\nNrupul";
  fs.appendFile("./employee.txt", `\n ${names}`, function (err) {
    if (err) {
      throw error;
    }
  });
  res.send("<h1>All the names added in the file</h1>");
});

app.get("/alldetails", (req, res) => {
  fs.readFile("./employee.txt", function (err, data) {
    console.log(
      cowsay.say({
        text: `${data}`,
        e: "oO",
        T: "U ",
      })
    );

    res.send("done");
  });
});

app.get("/address", (req, res) => {
  // dns.lookup(process.argv[2], (err, address, family) => {
  //     // console.log('address: %j family: IPv%s', address, family);
  //     res.send(address)
  // });

  const options = {
    family: 4,
    hints: dns.ADDRCONFIG | dns.V4MAPPED,
  };
    dns.lookup("google.com", options, (err, address, family) =>
    console.log("address: %j family: IPv%s", address, family)
  );
});

app.get("/delete", (req, res) => {
  fs.unlink("./employee.txt", function (err) {
    if (err) throw err;
    console.log("File deleted!");
  });
  res.send("<h1>File has been deleted</h1>");
});

app.listen(3000, () => {
  console.log("Server is ready");
});
