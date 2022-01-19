const { signUser } = require('../lib/jwt')
const FS = require('../lib/fsDeal')
const students = new FS('../model/students.json')

module.exports = (req, res) => {
    const { username, password } = req.body

    const allUsers = JSON.parse(students.read())

    const foundUser = allUsers.find(e => e.name == username && e.password == password)
    if(!foundUser) {
        return res.status(401).send({
            message: 'Unauthorized'
        })
    }

    res.status(200).json({
        token: signUser({ id: foundUser.id, username: foundUser.username})
    })
}