const express = require('express')
const pdf = require('html-pdf')
const cors = require('cors')

const PDFtemplate = require('./template')

const app = express()
const port = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }))

app.post('/create-pdf', (req, res) => {
    pdf.create(PDFtemplate(req.body), {}).toFile('result.pdf', (err) => {
        if (err) {
            res.send(Promise.reject())
        } res.send(Promise.resolve())
    })
})
app.get('/fetch-pdf', (req, res) => {
    res.sendFile(`${__dirname}/result.pdf`)
})

app.listen(port, () => console.log(`Example app listening on port port!`))