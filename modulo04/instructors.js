const fs = require('fs')
const data = require('./data.json')

// create
exports.post = (req,res) => {
    //req.body
    // {"avatar":"http://google.com","name":"Carlos Eduardo Fernandes Filho","birth":"1997-12-19","gender":"M","services":"musculação, crossfit"}


    const keys = Object.keys(req.body)
    // ["avatar","name","birth","gender","services"]

    // verificar se alguma chave está vazia
    for (key of keys) {
        if (req.body[key] == '')
            return res.send ('Please, fill all fields!')
    }

    let { avatar_url, birth, name, services, gender } = req.body

    birth = Date.parse(req.body.birth)
    const created_at = Date.now()
    const id = Number(data.instructors.length + 1)

    

    //[{...}]
    data.instructors.push({
        id,
        avatar_url,
        name,
        birth,
        gender,
        services,
        created_at
    }) // [{...},{...}]

    fs.writeFile('data.json', JSON.stringify(data, null, 2), (err) => {
        if (err) return res.send('Write file error!')

        return res.redirect('/instructors')
    })

    //return res.send(req.body)
}


// update

// delete