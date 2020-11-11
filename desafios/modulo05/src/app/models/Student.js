const { date } = require('../../lib/utils')
const db = require('../../config/db')

module.exports = {
    all(callback) {

        db.query(`
        SELECT *
        FROM students
        ORDER BY name ASC`, (err, results) => {
            if(err) throw `Database error! ${err}`
            callback(results.rows)
        })

    },
    create(data, callback) {

        query = `
        INSERT INTO students (
            avatar_url,
            name,
            email,
            birth,
            schoolyear,
            workload
        )
        VALUES ($1, $2, $3, $4, $5, $6)
        RETURNING id
        `

        values = [
            data.avatar_url,
            data.name,
            data.email,
            date(data.birth).iso,
            data.schoolyear,
            data.workload
        ]

        db.query(query, values, (err, results) => {
            if(err) throw `Database error! ${err}`
            callback(results.rows[0].id)
        })

    },
    find(id, callback) {

        db.query(`
        SELECT *
        FROM students
        WHERE id = $1`, [id], (err, results) => {
            if(err) throw `Database error! ${err}`
            callback(results.rows[0])
        })

    },
    update(data, callback) {
        
        query = `
        UPDATE students SET
            avatar_url = $1,
            name = $2,
            email = $3,
            birth = $4,
            schoolyear = $5,
            workload = $6
        WHERE id = $7
        `

        values = [
            data.avatar_url,
            data.name,
            data.email,
            date(data.birth).iso,
            data.schoolyear,
            data.workload,
            data.id
        ]

        db.query(query, values, (err) => {
            if(err) throw `Database error! ${err}`
            callback(data.id)
        })

    },
    delete(id, callback) {
        
        db.query(`
        DELETE FROM students
        WHERE id = $1`, [id], (err) => {
            if(err) throw `Database error! ${err}`
            callback()
        })

    }
}