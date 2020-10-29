const { Pool } = require("pb")

module.exports = new Pool({
    user: 'postgres',
    password: '190728kf',
    host: 'localhost',
    port: 5432,
    database: 'my_teacher'
})