const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/mongo-exercises')
    .then(() => console.log('Conected to the MongoDB...'))
    .catch((err) => console.log('Error to connect MongoDB...', err));

// Create course Schema
/*
Validation 1: name property is required
Validation 2: 'price' is required when 'isPublished' true 
Validation 3: Custom validations on 'tags'
Validation 4: Async validation
*/
const courseSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        minlength: 5,
        maxlength: 100,
        // /pattern/
    },
    category: {
        type: String,
        required: true,
        enum: ['web', 'mobile', 'network']
    },
    author: String,
    isPublished: Boolean,
    tags: {
        type: Array,
        validate: {
            validator: function (v) {
                return v && v.length > 0
            },
            message: 'A value should have at least one tag'
        }
    },
    tags_async: {
        type: Array,
        validate: {
            isAsync: true,
            validator: function (v, callback) {
                setTimeout(() => {
                    //Do some async work
                    const result = v && v.length > 0;
                    callback(result);
                }, 4000)
            },
            message: 'A value should have at least one tag ###'
        }

    },
    date: { type: Date, default: Date.now },
    price: {
        type: Number,
        min: 10,
        max: 150,
        required: function () {
            return this.isPublished;
        }
    }
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
        name: 'Angular and Web',
        author: 'Nuwan',
        isPublished: true,
        tags: ['angular'],
        price: 19,
        category: 'web',
        tags_async: []
    });

    try {
        const result = await course.save();
        console.log(result);
    } catch (error) {
        console.log('Error: ', error.message);
    }
}

createCourse();




