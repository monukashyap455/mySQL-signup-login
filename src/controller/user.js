const connection = require("../database/mySQL");
const util = require('util');
// const validation = require("../helpers/validate_schema")


const query = util.promisify(connection.query).bind(connection);


module.exports.userSignup = async (req, res, next) => {
    try {
        const { firstname, lastname, mobile, gender, email, password, city, age } = req.body;
        if (!(firstname && lastname && mobile && gender && email && password && city && age)) {
            return res.status(203).json("all feild are required")
        }
        // console.log(req.body);

        var sql = "INSERT INTO users (firstname, lastname,mobile,gender,email,password,city,age) VALUES (?,?,?,?,?,?,?,?)";
        const data = [firstname, lastname, mobile, gender, email, password, city, age]
        connection.query(sql, data, (err, result) => {
            if (err) {
                return res.send(err)
            }
            res.status(200).json("user register success");

        });


    } catch (err) {
        res.send(err)
    }
}

module.exports.userLogin = async (req, res, next) => {
    try {

        const { email, password } = req.body;

        
        if (!(email && password)) {
            return res.status(203).json("all feild are required")
        }

        const data = await query("SELECT * FROM users WHERE email = ?", email);

        if (data[0] == undefined) {
            return res.send("invalid email ")
        }
        console.log
        if (data[0].password != password) {
            return res.status(402).json("incorrect password")
        }
        res.status(200).json("user login sucessfull ")

    } catch (error) {
        res.send(error)

    }
}