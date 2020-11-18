const Student = require('../models/Student')

const { date, grade } = require('../../lib/utils')
const db = require('../../config/db')

module.exports = {
    index(req, res) {
        
        Student.all((students) => {

            for (student of students) {
                student.schoolyear = grade(student.schoolyear)
            }

            return res.render('students/index', { students })
        })
        
    },
    create(req, res) {

        Student.teachersSelectOptions((options) => {
            return res.render('students/create', { teacherOptions: options })
        })

    },
    post(req, res) {

        const keys = Object.keys(req.body)

        for (key of keys) {    
            if (req.body[key] == '')
                return res.send ('Please, fill all fields!')
        }

        Student.create((req.body), (student) => {
            return res.redirect(`students/${ student }`)
        })

    },
    show(req, res) {
        
        Student.find(req.params.id, (student) => {
            if(!student) return res.send('Student not found!')
            
            student.birth = date(student.birth).birthDay
            student.schoolyear = grade(student.schoolyear)

            return res.render('students/show', { student })
        })

    },
    edit(req, res) {
        
        Student.find(req.params.id, (student) => {
            if(!student) return res.send('Student not found!')

            student.birth = date(student.birth).iso

            Student.teachersSelectOptions((options) => {
            return res.render('students/edit', { student, teacherOptions: options })
        })

    })

    },
    update(req, res) {

        const keys = Object.keys(req.body)

        for (key of keys) {
            if (req.body[key] == '')
                return res.send ('Please, fill all fields!')
        }

        Student.update(req.body, (id) => {
            return res.redirect(`/students/${id}`)
        })

    },
    delete(req, res) {
        
        Student.delete(req.body.id, () => {
            return res.redirect('/students')
        })

    }
}