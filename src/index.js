const dotenv = require("dotenv");
dotenv.config();
const express = require("express");
const app = express()
app.use(express.json())
const mysql = require("./database/mySQL");
const mainRoute = require("./routes/mainRoute");


app.use(mainRoute)

app.use(wrongUrl = (req, res) => {
    res.status(404).json({
        error: "Bad request please use the correct url"
    })
})

app.use((error, req, res, next) => {
    console.log(error);
    let status = error.status || 500
    let data = {
        message: error.message || "internal error",
        originalError: error
    }

    res.status(status).json(data);
})


const port = process.env.PORT
app.listen(port, () => console.log(`Server Start on port ${port}`));




