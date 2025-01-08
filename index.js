const express = require('express');

const app = express();

const path = require('path');
const fs = require('fs');

const PORT = 3000

// Setup for parsers
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serving static files
app.use(express.static(path.join(__dirname, 'public')))

// Setting up ejs as view engine
app.set('view engine', 'ejs');

app.get('/', (req, res) => {

    fs.readdir(`./files`, (err, files) => {
        res.render("index", { files: files })
    })
})

app.get('/file/:filename', (req, res) => {

    fs.readFile(`./files/${req.params.filename}.txt`, "utf-8", (err, fileData) => {
        res.render("show", { filename: req.params.filename, fileData: fileData })
    })
})

app.get('/edit/:filename', (req, res) => {
    res.render("edit", { filename: req.params.filename })
})

app.post('/edit', (req, res) => {

    fs.rename(`./files/${req.body.previous}.txt`, `./files/${req.body.new}.txt`, (err) => {
        res.redirect('/')
    })
})

app.post('/create', (req, res) => {

    fs.writeFile(`./files/${req.body.title.split(' ').join('')}.txt`, req.body.details, () => {
        res.redirect('/');
    })
})

app.listen(PORT, () => {
    console.log(`\nServer is running on http://localhost:${PORT}`)
})
