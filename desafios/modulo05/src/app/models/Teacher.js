const { date } = require('../../lib/utils')
const db = require('../../config/db')

module.exports = {
    all(callback) {

        db.query(`
        SELECT *
        FROM teachers
        ORDER BY name ASC`, (err, results) => {
            if(err) throw `Database error! ${err}`
            callback(results.rows)
        })

    },
    create(data, callback) {

        query = `
        INSERT INTO teachers (
            avatar_url,
            name,
            birth,
            graduation,
            class_type,
            occupations,
            created_at
        )
        VALUES ($1, $2, $3, $4, $5, $6, $7)
        RETURNING id
        `

        values = [
            data.avatar_url,
            data.name,
            date(data.birth).iso,
            data.graduation,
            data.class_type,
            data.occupations,
            date(Date.now()).iso
        ]

        db.query(query, values, (err, results) => {
            if(err) throw `Database error! ${err}`
            callback(results.rows[0].id)
        })

    },
    find(id, callback) {

        db.query(`
        SELECT *
        FROM teachers
        WHERE id = $1`, [id], (err, results) => {
            if(err) throw `Database error! ${err}`
            callback(results.rows[0])
        })

    },
    update(data, callback) {
        
        query = `
        UPDATE teachers SET
            avatar_url = $1,
            name = $2,
            birth = $3,
            graduation = $4,
            class_type = $5,
            occupations = $6
        WHERE id = $7
        `

        values = [
            data.avatar_url,
            data.name,
            date(data.birth).iso,
            data.graduation,
            data.class_type,
            data.occupations,
            data.id
        ]

        db.query(query, values, (err) => {
            if(err) throw `Database error! ${err}`
            callback(data.id)
        })

    },
    delete(id, callback) {
        
        db.query(`
        DELETE FROM teachers
        WHERE id = $1`, [id], (err) => {
            if(err) throw `Database error! ${err}`
            callback()
        })

    },
    paginate(params) {

        const { filter, limit, offset, callback } = params

        let query = '',
            filterQuery = '',
            totalQuery = `(
                SELECT count(*)
                FROM teachers
                ) AS total
            `
        
        if (filter) {
            filterQuery = `
                WHERE name ILIKE '%${filter}%'
                OR occupations ILIKE '%${filter}%'
            `

            totalQuery = `(
                SELECT count(*)
                FROM teachers
                ${filterQuery}
                ) AS total
            `
        }

        query = `
            SELECT *,
            ${totalQuery}
            FROM teachers
            ${filterQuery}
            ORDER BY name ASC
            LIMIT $1
            OFFSET $2
        `

        db.query(query, [ limit, offset ], (err, results) => {
            if (err) throw `Database error! ${err}`
            callback(results.rows)
        })
    }
}