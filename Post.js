import mongoose from 'mongoose';

export const Post = mongoose.Schema({
    section: {type: 'string', required: true},
    name: {type: 'string', required: true},
    additional_data: {type: 'string'}
})

