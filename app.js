const express = require('express')
const app = express()
const PORT = 3000;


// Import
const { getBugReport, getIDBugReport, editStatusBug } = require('./utils/bug-report');


// MIDDLEWARE
// allow express use ejs
app.set('view engine', 'ejs')
    // ejs layouts formatting
    const expressLayouts = require('express-ejs-layouts');
    app.use(expressLayouts)

// allow static files to public
app.use(express.static('public')) // built-in middleware

// to parsing body.json
const bodyParser = require('body-parser')
app.use(bodyParser.json())
app.use(express.urlencoded({ extended: true }))

// =======================================================================================================================
// Routing

// GET ALL LIST OF BUG REPORTS
app.get('/', async (req, res) => {

    const users = await getBugReport()
    const BugReportData = users.data.getDataFromFirestore

    // res render will rendering .ejs in the views folder
    res.render('index', { 
        // View Setting
        layout: 'layouts/main-layout',

        // Data Sending
        title: 'Bug Reports Page',
        BugReportData
    })
})

// proses ubah status bug
app.post('/', (req, res) => {
    console.log(req.body);
    editStatusBug(req.body.id, req.body.statusBug)
    res.redirect('/')
})

// GET THE DETAILED ID OF BUG REPORTS
app.get('/id/:id', async (req, res) => {

    // Find the match ID
    const BugReportDataDetail = await getIDBugReport(req.params.id)

    res.render('detail', {
        // View Setting
        layout: 'layouts/main-layout',

        // Data Sending
        title: `Detail Report`,
        BugReportDataDetail
    })
})



// to route request when path is random and unpathable [Use app.use, not app.get]
app.use('/', (req, res) => {
    res.status(404)
    res.send('<h1>404: Page not found</h1>')
})

// =====================================================

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
})
