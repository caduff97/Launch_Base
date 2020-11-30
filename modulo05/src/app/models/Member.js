const { date } = require('../../lib/utils')
const db = require('../../config/db')

module.exports = {
    all(callback) {
        db.query(`
            SELECT * 
            FROM members
            ORDER BY name ASC`, (err, results) => {
                if(err) throw `Database error! ${err}`
                callback(results.rows)
        })
    },
    create (data, callback) {
        const query = `
            INSERT INTO members (
                name,
                avatar_url,
                email,
                gender,
                birth,
                blood,
                weight,
                height,
                instructor_id
            ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)
            RETURNING id
        `

        const values = [
            data.name,
            data.avatar_url,
            data.email,
            data.gender,
            date(data.birth).iso,
            data.blood,
            data.weight,
            data.height,
            data.instructor
        ]

        db.query(query, values, (err, results) => {
            if(err) throw `Database error! ${err}`
            callback(results.rows[0])
        })
    },
    find(id, callback) {
        db.query(`
            SELECT members.*, instructors.name AS instructor_name 
            FROM members
            LEFT JOIN instructors ON (members.instructor_id = instructors.id)
            WHERE members.id = $1`, [id], (err, results) => {
                if(err) throw `Database error! ${err}`
                callback(results.rows[0])
        })
    },
    update(data, callback) {
        const query = `
            UPDATE members SET 
                name = ($1),
                avatar_url = ($2),
                email = ($3),
                gender = ($4),
                birth = ($5),
                blood = ($6),
                weight = ($7),
                height = ($8),
                instructor_id = ($9)
            WHERE id = $10
            `

        const values = [
            data.name,
            data.avatar_url,
            data.email,
            data.gender,
            date(data.birth).iso,
            data.blood,
            data.weight,
            data.height,
            data.instructor,
            data.id
        ]

        db.query(query, values, (err, results) => {
            if(err) throw `Database error! ${err}`
            callback()
        })
    },
    delete (id, callback) {
        db.query(`
        DELETE FROM members
        WHERE id = $1`, [id], (err, results) => {
            if(err) throw `Database error! ${err}`
            callback()
        })
    },
    instructorsSelectOptions(callback) {
        
        db.query(`
        SELECT name, id
        FROM instructors
        ORDER BY name ASC`, (err, results) => {
            if(err) throw `Database error! ${err}`
            callback(results.rows)
        })

    },
    paginate(params) {
        
        const { filter, limit, offset, callback } = params

        let query = "",
            filterQuery = "",
            totalQuery = `(
                SELECT count(*) FROM members
            ) AS total`

        if ( filter ) {
            filterQuery = `${query}
            WHERE members.name ILIKE '%${filter}%'
            OR members.email ILIKE '%${filter}%'
            `

            totalQuery = `(
                SELECT count(*) FROM members
                ${filterQuery}
            ) AS total`
        }

        query = `
        SELECT members.*,
        ${totalQuery}
        FROM members
        ${filterQuery}
        LIMIT $1
        OFFSET $2
        `
        db.query(query, [ limit, offset ], (err, results) => {
            if (err) throw `Database error! ${err}`
            callback(results.rows)
        })
        
    }
}