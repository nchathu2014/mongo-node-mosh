const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/playground')
    .then(() => console.log('Conected to the MongoDB...'))
    .catch((err) => console.log('Error to connect MongoDB...', err));

// Create course Schema

const courseSchema = new mongoose.Schema({
    name: String,
    author: String,
    isPublished: Boolean,
    tags: [String],
    date: { type: Date, default: Date.now }
});

/*
Schema compile to a Class (for that we create a model), 
Class gives us a instance 
Class => Instance
*/

const Course = mongoose.model('Course', courseSchema); //Class

async function createCourse() {
    try {
        const course = new Course({// Instance
            name: 'Angular course',
            author: 'Nuwan',
            isPublished: true,
            tags: ['angular', 'front-end']
        });

        const result = await course.save()
        console.log(result);
    } catch (error) {
        console.log('Error: ', error);
    }
}

//createCourse();

async function getCourses() {

    // eq (equal)
    // ne (not equal)
    // gt (greate than)
    // gte (greate than or equal)
    // lt (less than)
    // lte (less than pr equal)
    // in 
    // nin (not in)

    try {
        const courses = await Course
            //.find({ author: 'Mosh', isPublished: false })
            //.find({ price: { $gte: 10, $lte: 20 } })
            .find({ price: { $in: [10, 20, 30] } })
            .limit(10)
            .sort({ name: 1 })
            .select({
                tags: 1,

                name: 1,

                isPublished: 1,
            })
        console.log(courses);
    } catch (error) {
        console.log('Error: ', error);
    }
}

getCourses();