const { Pool } = require("pg")

module.exports = new Pool ({
    user: 'postgres',
    password: '190728kf',
    host: 'localhost',
    port: 5432,
    database: 'gymmanager'
})