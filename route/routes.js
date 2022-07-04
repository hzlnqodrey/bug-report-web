const express = require('express')
const router = express.Router()
// Import Function
const { getBugReport, getIDBugReport, editStatusBug } = require('../utils/bug-report')
// db initialiaze
const db = require('../utils/firebase-config')

// [1] GET ALL LIST OF BUG REPORTS
router.get('/', async (req, res) => {

    const users = await getBugReport()
    const BugReportData = users.data.getDataFromFirestore

    // res render will rendering .ejs in the views folder
    res.header("Refresh", "10")
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
    editStatusBug(req.body.id, req.body.statusBug)
    res.redirect('/')
})

// [4] Proses Sorting
// [4.1] Proses Sorting Nama
router.post('/sort-name', (req, res) => {
    
    let orderBy = req.body.order === 'descending' ? "asc" : "desc" 

    let BugReportData = []
        db.collection("bugreports")
        .orderBy("name", orderBy).get()
        .then(snapshot => {
            snapshot.forEach((hasil) => {
                BugReportData.push(hasil.data())
            })
            res.render('index', { 
                // View Setting
                layout: 'layouts/main-layout',
        
                // Data Sending
                title: 'Bug Reports Page - Sorted Name',
                BugReportData
            }) 
        })
        .catch((error) => {
            console.log(error);
        })
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