const { date } = require('../../lib/utils')
const db = require('../../config/db')

module.exports = {
    all(callback) {

        db.query(`
        SELECT students.*, teachers.name AS teacher_name
        FROM students
        LEFT JOIN teachers ON (students.teacher_id = teachers.id)
        ORDER BY students.name ASC`, (err, results) => {
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
            workload,
            teacher_id
        )
        VALUES ($1, $2, $3, $4, $5, $6, $7)
        RETURNING id
        `

        values = [
            data.avatar_url,
            data.name,
            data.email,
            date(data.birth).iso,
            data.schoolyear,
            data.workload,
            data.teacher
        ]

        db.query(query, values, (err, results) => {
            if(err) throw `Database error! ${err}`
            callback(results.rows[0].id)
        })

    },
    find(id, callback) {

        db.query(`
        SELECT students.*, teachers.name AS teacher_name 
        FROM students
        LEFT JOIN teachers ON (students.teacher_id = teachers.id)
        WHERE students.id = $1`, [id], (err, results) => {
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
            workload = $6,
            teacher_id = $7
        WHERE id = $8
        `

        values = [
            data.avatar_url,
            data.name,
            data.email,
            date(data.birth).iso,
            data.schoolyear,
            data.workload,
            data.teacher,
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

    },
    teachersSelectOptions(callback) {

        db.query(`
        SELECT name, id
        FROM teachers
        ORDER BY name ASC`, (err, results) => {
            if(err) throw `Database error! ${err}`
            callback(results.rows)
        })
    }
}