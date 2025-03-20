import mongoose from 'mongoose';
const { Schema } = mongoose;

const todoSchema = new Schema({
    title: { type: String, required: true },   // Title is required for every time
    desc: { type: String, required: true },   // Description is required for every time
    isDone: { type: Boolean }
}, {
    timestamps: true, // Automatically adds createdAt and updatedAt timestamps
});

const Todo = mongoose.model('Todo', todoSchema);
export default Todo;
