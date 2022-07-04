const fetch = require('cross-fetch')
const { api_url } = require('./auth/auth-key')
// db initialiaze
const db = require('./firebase-config')


// -----------------------------

// List Semua Daftar Bug Reports with FETCH API
const getBugReport = async () => {
    try {
        const response = await fetch(api_url, {
            method: "GET",
            header: {
                "Content-Type" : "application/json"
            }
        })

        if (response.status >= 400) {
            throw new Error("Bad Response from server")
        }

        const data = await response.json()

        return data

    } catch (error) {
        console.log(error);
    }
}

// Cari ID Bug Report Detail
const getIDBugReport = async (id) => {
    const users = await getBugReport()
    let foundID = []
    for (let i = 0; i < users.data.getDataFromFirestore.length; i++) {
        if (users.data.getDataFromFirestore[i].ID_DocumentReport === id) {
            foundID = users.data.getDataFromFirestore[i]
            return foundID
        }
    }
}

// Edit/Ubah Status Bug dengan method PUT [UDAH BEKERJA DENGAN BAIK / WORKING PROPERLY] with FIRESTORE DATABASE
const editStatusBug = async (id, statusBug) => {

    const users = await getBugReport()
    
    for (let i = 0; i < users.data.getDataFromFirestore.length; i++) {
        if (users.data.getDataFromFirestore[i].ID_DocumentReport === id) {
            // Change/Edit the status bug here
            users.data.getDataFromFirestore[i].statusBug = statusBug
            let foundID = users.data.getDataFromFirestore[i]
            db.collection("bugreports").doc(id).set(foundID)
        }
    }
}

module.exports = { getBugReport, getIDBugReport, editStatusBug }