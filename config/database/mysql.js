const dotenv         = require("dotenv")
const { DataSource } = require('typeorm');

dotenv.config()

const myDataSource = new DataSource({
    type     : process.env.MYSQL_CONNECTION,
    host     : process.env.MYSQL_HOST,
    port     : process.env.MYSQL_PORT,
    username : process.env.MYSQL_USERNAME,
    password : process.env.MYSQL_PASSWORD,
    database : process.env.MYSQL_DATABASE
})

myDataSource.initialize().then(() => {
    console.log("Data Source has been initialized!")
    }
)

module.exports = myDataSource