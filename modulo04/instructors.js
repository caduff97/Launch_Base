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

    return res.send(req.body)
}


// update

// delete