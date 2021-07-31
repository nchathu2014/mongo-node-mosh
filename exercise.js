const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/mongo-exercises')
    .then(rslt => console.log('Connected...'))
    .catch(err => console.log('Error: ', err))


const courseSchema = new mongoose.Schema({
    tags: [String],
    date: { type: Date, default: Date.now },
    name: String,
    author: String,
    isPublished: Boolean,
    price: Number
});

const Course = mongoose.model('Course', courseSchema);

//Exercise 1
async function gerCourses() {
    try {
        return await Course
            .find({ isPublished: true, tags: 'backend' })
            .sort({ name: 1 })
            .select({ name: 1, author: 1 })
    } catch (error) {
        console.log('Error: ', error)
    }
}

async function displayCourses() {
    const courses = await gerCourses();
    console.log(courses);
}


//Exercise 2
async function gerCoursesTwo() {
    try {
        return await Course
            .find({ isPublished: true, tags: { $in: ['frontend', 'backend'] } })// approch 1
            .sort('-price')
            .select('author name')
    } catch (error) {
        console.log('Error: ', error)
    }
}

async function displayCoursesTwo() {
    const courses = await gerCoursesTwo();
    console.log(courses);
}

//Exercise 3

async function gerCoursesThree() {
    try {
        return await Course
            .find({ isPublished: true })
            .or([{ price: { $gte: 15 } }, { title: /.*by.*/i }])

    } catch (error) {
        console.log('Error: ', error)
    }
}

async function displayCoursesThree() {
    const courses = await gerCoursesThree();
    console.log(courses);
}

//displayCourses();
//displayCoursesTwo();
displayCoursesThree();