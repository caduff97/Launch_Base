const Teacher = require('../models/Teacher')

const { age, class_type, date, grade, graduation } = require('../../lib/utils')

module.exports = {
    index(req, res) {
        
        const { filter } = req.query

        if ( filter ) {
            Teacher.findBy((filter), (teachers) => {
                
                for (teacher of teachers) {
                    teacher.occupations = teacher.occupations.split(',')
                }

                return res.render('teachers/index', { teachers, filter })

            })
        } else {
            Teacher.all((teachers) => {

                for (teacher of teachers) {
                    teacher.occupations = teacher.occupations.split(',')
                }
    
                return res.render('teachers/index', { teachers })
            })
        }
        
        
    },
    create(req, res) {

        return res.render('teachers/create')

    },
    post(req, res) {

        const keys = Object.keys(req.body)

        for (key of keys) {    
            if (req.body[key] == '')
                return res.send ('Please, fill all fields!')
        }

        Teacher.create((req.body), (teacher) => {
            return res.redirect(`teachers/${ teacher }`)
        })

    },
    show(req, res) {
        
        Teacher.find(req.params.id, (teacher) => {
            if(!teacher) return res.send('Teacher not found!')
            
            teacher.age = age(teacher.birth)
            teacher.graduation = graduation(teacher.graduation)
            teacher.class_type = class_type(teacher.class_type)
            teacher.occupations = teacher.occupations.split(',')
            teacher.created_at = date(teacher.created_at).date

            return res.render('teachers/show', { teacher })
        })

    },
    edit(req, res) {
        
        Teacher.find(req.params.id, (teacher) => {
            if(!teacher) return res.send('Teacher not found!')

            teacher.birth = date(teacher.birth).iso

            return res.render('teachers/edit', { teacher })
        })

    },
    update(req, res) {

        const keys = Object.keys(req.body)

        for (key of keys) {
            if (req.body[key] == '')
                return res.send ('Please, fill all fields!')
        }

        Teacher.update(req.body, (id) => {
            return res.redirect(`/teachers/${id}`)
        })

    },
    delete(req, res) {
        
        Teacher.delete(req.body.id, () => {
            return res.redirect('/teachers')
        })

    }
}