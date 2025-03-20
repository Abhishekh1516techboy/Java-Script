//Required package
let pdf = require("pdf-node");
let fs = require("fs");

// Read HTML Template
let html = fs.readFileSync("Cwh_ch96_template.html", "utf8");

// ----------------------------------------------------------
let options = {
    format: "A4",
    orientation: "portrait",
    border: "10mm",
    header: {
        height: "45mm",
        contents: '<div style="text-align: center;">Author: Abhishekh1516techboy</div>'
    },
    footer: {
        height: "28mm",
        contents: {
            first: 'Cover page',
            2: 'Second page', // Any page number is working. 1-based index
            default: '<span style="color: #444;">{{page}}</span>/<span>{{pages}}</span>', // fallback value
            last: 'Last Page'
        }
    }
};

// -----------------------------------------------------------
let users = [
    {
        name: "Aman Khan",
        age: "23",
    },
    {
        name: "Baata",
        age: "21",
    },
    {
        name: "roushan kumar",
        age: "22",
    },
    {
        name: "Abhishkeh kuamr",
        age: "22",
    },
    {
        name: "Ankit kumar",
        age: "22",
    },
];
let document = {
    html: html,
    data: {
        users: users,
    },
    path: "./output.pdf",
    type: "pdf",
};

// ----------------------------------------------------------------
pdf(document, options)
    .then((res) => {
        console.log(res);
    })
    .catch((error) => {
        console.error(error);
    });