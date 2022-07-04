const express = require('express')
const router = express.Router()
// Import Function
const { getBugReport, getIDBugReport, editStatusBug } = require('../utils/bug-report');

// [1] GET ALL LIST OF BUG REPORTS
router.get('/', async (req, res) => {

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

// [2] Proses ubah status bug
router.post('/', (req, res) => {
    console.log(req.body)
    editStatusBug(req.body.id, req.body.statusBug)
    res.redirect('/')
})

// [3] GET THE DETAILED ID OF BUG REPORTS
router.get('/id/:id', async (req, res) => {

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

// [x_x] to route request when path is random and unpathable [Use app.use, not app.get]
router.use('/', (req, res) => {
    res.status(404)
    res.send('<h1>404: Page not found</h1>')
})

module.exports = router