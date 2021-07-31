const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/playground')
    .then(() => console.log('Conected to the MongoDB...'))
    .catch((err) => console.log('Error to connect MongoDB...', err));

// Create course Schema

const courseSchema = new mongoose.Schema({
    name: { type: String, required: true },
    author: String,
    isPublished: Boolean,
    tags: [String],
    date: { type: Date, default: Date.now }
});

/*
In MongoDB perspective there are no validations/ rules/ restriction for
data, like relational database

Validations mentioned here is for mongoose layer. mongoose validate the data
that eventually persist into the database
*/

const Course = mongoose.model('Course', courseSchema); //Class

async function createCourse() {
    const course = new Course({// Instance
        //name: 'Angular course',
        author: 'Nuwan',
        isPublished: true,
        tags: ['angular', 'front-end']
    });

    try {
        const result = await course.save();
        console.log(result);
    } catch (error) {
        console.log('Error: ', error.message);
    }
}

createCourse();