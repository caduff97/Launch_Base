const { date, grade } = require('../../lib/utils')

module.exports = {
    index(req, res) {
        return res.render('students/index')
    },
    create(req, res) {
        return res.render('students/create')
    },
    form(req, res) {
        keys = Object.keys(req.body)

        for (key of keys) {
    
            if (req.body[key] == '')
                return res.send ('Please, fill all fields!')
        }

        return
    },
    show(req, res) {
        return
    },
    edit(req, res) {
        return
    },
    update(req, res) {
        keys = Object.keys(req.body)

        for (key of keys) {
    
            if (req.body[key] == '')
                return res.send ('Please, fill all fields!')
        }

        return
    },
    delete(req, res) {
        return
    },
}