const fs = require('fs')
const data = require('../data.json')
const { age, graduation, class_type, date } = require('../utils')

exports.index = (req, res) => {
    const teachers = []

    for (teacher of data.teachers) {
        const formattedTeacher = {
            ...teacher,
            occupations: teacher.occupations.split(',')
        }

        teachers.push(formattedTeacher)
    }

    return res.render('teachers/index', { teachers })
}

exports.create = (req,res) => {
    return res.render('teachers/create')
}

exports.form = (req,res) => {
    
    keys = Object.keys(req.body)

    for (key of keys) {

        if (req.body[key] == '')
            return res.send ('Please, fill all fields!')
    }

    let { birth } = req.body

    birth = Date.parse(birth)
    const created_at = Date.now()
    
    let id = 1
    const lastTeacher = data.teachers[data.teachers.length -1]
    
    if (lastTeacher) {
        id = lastTeacher.id + 1
    }

    data.teachers.push({
        id,
        ...req.body,
        birth,
        created_at
    })

    fs.writeFile('data.json', JSON.stringify(data, null, 2), (err) => {
        if (err) return res.send('Write file error!')

        return res.redirect(`/teachers/${id}`)
    })
}

exports.show = (req, res) => {
    const { id } = req.params

    const foundTeacher = data.teachers.find((teacher) => {
        return teacher.id == id
    })

    if (!foundTeacher) return res.status(404).render('not-found')

    const teacher = {
        ...foundTeacher,
        age: age(foundTeacher.birth),
        graduation: graduation(foundTeacher.graduation),
        class_type: class_type(foundTeacher.class_type),
        occupations: foundTeacher.occupations.split(','),
        created_at: new Intl.DateTimeFormat('pt-BR').format(foundTeacher.created_at)
    }

    return res.render('teachers/show', { teacher })
}

exports.edit = (req, res) => {
    const { id } = req.params

    const foundTeacher = data.teachers.find((teacher) => {
        return teacher.id == id
    })

    if (!foundTeacher) return res.status(404).render('not-found')

    const teacher = {
        ...foundTeacher,
        birth: date(foundTeacher.birth).iso
    }

    return res.render('teachers/edit', { teacher })
}

exports.update = (req, res) => {    
    const { id } = req.body
    let index

    const foundTeacher = data.teachers.find((teacher, foundIndex) => {
        if (id == teacher.id) {
            index = foundIndex
            return true
        }
    })

    if (!foundTeacher) return res.status(404).render('not-found')

    const teacher = {
        ...foundTeacher,
        ...req.body,
        birth: Date.parse(req.body.birth),
        id: Number(req.body.id)
    }

    data.teachers[index] = teacher

    fs.writeFile('data.json', JSON.stringify(data, null, 2), (err) => {
        if (err) return res.send("Write file error!")

        return res.redirect(`/teachers/${ id }`)
    })

}

exports.delete = (req, res) => {
    const { id } = req.body

    const filteredTeachers = data.teachers.filter((teacher) => {
        return teacher.id != id
    })

    data.teachers = filteredTeachers

    fs.writeFile('data.json', JSON.stringify(data, null, 2), (err) => {
        if (err) return res.send('Write file error!')

        return res.redirect('/teachers')
    })
}
