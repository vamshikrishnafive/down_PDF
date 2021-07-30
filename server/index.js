const express = require('express')
const pdf = require('html-pdf')
const cors = require('cors')

const PDFtemplate = require('./template.js')

const app = express()
const port = process.env.PORT || 4000;

app.use(cors());
app.use(express.urlencoded({ extended: true }))
app.use(express.json());

app.post('/create-pdf', (req, res) => {
    const { name, price1, price2, receiptId  } = req.body
    pdf.create(PDFtemplate(name, price1, price2, receiptId ), {}).toFile('result.pdf', (err) => {
        if (err) {
            res.send(Promise.reject())
        } res.send(Promise.resolve())
    })
})
app.get('/fetch-pdf', (req, res) => {
    res.sendFile(`${__dirname}/result.pdf`)
})

app.listen(port, () => console.log(`Example app listening on port ${port}!`))