
const { age, date } = require('../../lib/utils')

const Instructor = require('../models/Instructor')

module.exports = {
    index(req, res) {

        let { filter, page, limit } = req.query

        page = page || 1
        limit = limit || 2
        let offset = limit * (page - 1)

        const params = {
            filter,
            page,
            limit,
            offset,
            callback(instructors) {

                for (instructor of instructors) {
                    instructor.services = instructor.services.split(',')
                }
            
                const pagination = {
                    total: Math.ceil( instructors.length > 0 ? (instructors[0].total / limit) : 0),
                    page
                }
                return res.render('instructors/index', { instructors, pagination, filter })   
            }
        }

        Instructor.paginate(params)

    },
    create(req, res){
        return res.render('instructors/create')
    },
    post(req, res){
        const keys = Object.keys(req.body)

        for (key of keys) {
            if (req.body[key] == '')
                return res.send ('Please, fill all fields!')
        }
    
        Instructor.create((req.body), (Instructor) => {
            return res.redirect(`instructors/${Instructor.id}`)
        })
    
    },
    show(req, res){
        Instructor.find(req.params.id, (instructor) => {
            if(!instructor) return res.send('Instructor not found!')

            instructor.age = age(instructor.birth)
            instructor.services = instructor.services.split(',')
            instructor.created_at = date(instructor.created_at).format

            return res.render('instructors/show', { instructor })
        })
    },
    edit(req, res){
        Instructor.find(req.params.id, (instructor) => {
            if(!instructor) return res.send('Instructor not found!')

            instructor.birth = date(instructor.birth).iso

            return res.render('instructors/edit', { instructor })
        })
    },
    put(req, res){
        const keys = Object.keys(req.body)

        for (key of keys) {
            if (req.body[key] == '')
                return res.send ('Please, fill all fields!')
        }

        Instructor.update(req.body, () => {
            return res.redirect(`/instructors/${req.body.id}`)
        })
    },
    delete(req, res){
        
        Instructor.delete(req.body.id, () => {
            return res.redirect('/instructors')
        })

    }
}