import mongoose from 'mongoose';

const Post = new mongoose.Schema({
    section: {type: 'string', required: true},
    name: {type: 'string', required: true},
    additional_data: {type: 'string'}
})

export default mongoose.model('Post', Post)