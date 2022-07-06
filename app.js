const express = require('express')
const app = express()
const PORT = 8080
const myRouter = require('./route/routes')

// [*]  MIDDLEWARE [just put middleware on app.js]
    // [#] allow express use ejs
    app.set('view engine', 'ejs')
    // [#] ejs layouts formatting
    const expressLayouts = require('express-ejs-layouts');
    app.use(expressLayouts)

    // [#] allow static files to public
    app.use(express.static('public')) // built-in middleware

    // [#] to parsing body.json
    const bodyParser = require('body-parser')
    app.use(bodyParser.json())
    app.use(express.urlencoded({ extended: true }))

    // [#] to route to file route/router.js
    app.use(myRouter)

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
})
