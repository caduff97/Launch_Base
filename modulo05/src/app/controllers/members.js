
const { age, blood, date } = require('../../lib/utils')

const Member = require('../models/Member')

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
            callback(members) {
                
                const pagination = {
                    total: Math.ceil( members.length > 0 ? (members[0].total / limit) : 0 ),
                    page
                }
                return res.render('members/index', { members, pagination, filter })   
            }
        }

        Member.paginate(params)

    },
    create(req, res){

        Member.instructorsSelectOptions((options) => {
            return res.render('members/create', { instructorOptions: options })
        })
        
    },
    post(req, res){
        const keys = Object.keys(req.body)

        for (key of keys) {
            if (req.body[key] == '')
                return res.send ('Please, fill all fields!')
        }
    
        Member.create((req.body), (Member) => {
            return res.redirect(`members/${Member.id}`)
        })
    
    },
    show(req, res){
        Member.find(req.params.id, (member) => {
            if(!member) return res.send('Member not found!')

            member.birth = date(member.birth).birthDay
            member.blood = blood(member.blood)
            
            return res.render('members/show', { member })
        })
    },
    edit(req, res){
        Member.find(req.params.id, (member) => {
            if(!member) return res.send('Member not found!')

            member.birth = date(member.birth).iso

            Member.instructorsSelectOptions((options) => {
                return res.render('members/edit', { member, instructorOptions: options })
            })

        })
    },
    put(req, res){
        const keys = Object.keys(req.body)

        for (key of keys) {
            if (req.body[key] == '')
                return res.send ('Please, fill all fields!')
        }

        Member.update(req.body, () => {
            return res.redirect(`/members/${req.body.id}`)
        })
    
    },
    delete(req, res){
        
        Member.delete(req.body.id, () => {
            return res.redirect('/members')
        })

    }
}