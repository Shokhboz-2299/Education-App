const FS = require('../lib/fsDeal')
const courses = new FS('../model/courses.json')
const tasks = new FS('../model/tasks.json')
const students = new FS('../model/students.json')
const { verifyUser } = require('../lib/jwt')

module.exports = (req, res) => {
    try {
        const { authorization } = req.headers

        const { id } = verifyUser(authorization)

        const student = JSON.parse(students.read())
        const foundStudent = student.find(e => e.id==id)
        const allCourses = JSON.parse(courses.read())

        const studentCourse = allCourses.filter(e => e.id == foundStudent.courseId)
        const allTasks = JSON.parse(tasks.read())
        const foundTasks = allTasks.filter(e => e.courseId == foundStudent.courseId)

       studentCourse[0].tasks = foundTasks

        res.status(200).json(studentCourse) 
    } catch(e) {
        res.status(500).send({
            message: "Pishding uka"
        })
    }
}