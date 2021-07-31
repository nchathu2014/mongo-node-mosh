const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/mongo-exercises')
    .then(() => console.log('Conected to the MongoDB...'))
    .catch((err) => console.log('Error to connect MongoDB...', err));


/*
There are two approaches to update a document in MongoDB
1. Query First approach
    findById()
    Modify the properties
    save()

2. Update first approach
    Update directly
    Optionally: get the updated document
*/

// Query First Approach


const courseSchema = new mongoose.Schema({
    tags: [String],
    date: { type: Date, default: Date.now },
    name: String,
    author: String,
    isPublished: Boolean,
    price: Number
});

const Course = mongoose.model('Course', courseSchema);


//Query First Approach
async function updateCourse(id) {
    const course = await Course.findById(id)
    if (!course) return;

    course.isPublished = false;
    course.author = "Another author :)";
    /*
    OR

    course.set({
        isPublished: false,
        author: "Another authoer"
    });
    */

    const result = await course.save();
    console.log(result);
}



//updateCourse('5a68fe2142ae6a6482c4c9cb')


//Update first approach

async function updateFirstApproach(id) {
    const result = await Course.update({ _id: id }, {
        $set: {
            isPublished: true,
            author: 'I am new user'
        }
    })

    console.log(result);
}

updateFirstApproach('5a68fe2142ae6a6482c4c9cb')