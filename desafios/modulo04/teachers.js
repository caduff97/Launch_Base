const fs = require('fs')
const data = require('./data.json')
const { age, graduation, class_type, date } = require('./utils')

// create
exports.form = (req,res) => {
    
    keys = Object.keys(req.body)

    for (key of keys) {

        if (req.body[key] == '')
            return res.send ('Please, fill all fields!')
    }

    let { avatar_url, name, birth, graduation, class_type, occupations } = req.body

    birth = Date.parse(birth)
    const created_at = Date.now()
    const id = Number(data.teachers.length + 1)
    
    data.teachers.push({
        id,
        avatar_url,
        name,
        birth,
        graduation,
        class_type,
        occupations,
        created_at
    })

    fs.writeFile('data.json', JSON.stringify(data, null, 2), (err) => {
        if (err) return res.send('Write file error!')

        return res.redirect('/teachers')
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
        birth: date(foundTeacher.birth)
    }

    return res.render('teachers/edit', { teacher })
}