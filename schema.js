const {Schema, model} = require('mongoose');
const bookSchema = new Schema(
    {
        title: {
            type: String, required: true,   
        },
        description: {
            type: String, default: "", required: true   
        },
        authors: {
            type: String, default: "", required: true   
        },
        favorite: {
            type: String, default: "", required: true   
        },
        fileCover: {
            type: String, default: "", required: true   
        },
        fileName: {
            type: String, default: "",  required: true  
        }});
module.exports = model('Book', bookSchema);