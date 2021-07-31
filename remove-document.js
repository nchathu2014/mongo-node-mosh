const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/mongo-exercises')
    .then(() => console.log('Conected to the MongoDB...'))
    .catch((err) => console.log('Error to connect MongoDB...', err));

const courseSchema = new mongoose.Schema({
    tags: [String],
    date: { type: Date, default: Date.now },
    name: String,
    author: String,
    isPublished: Boolean,
    price: Number
});

const Course = mongoose.model('Course', courseSchema);




async function removeCourse(id) {
    const result = await Course.findByIdAndRemove(id)

    console.log(result);


}

removeCourse('5a68fe2142ae6a6482c4c9cb')