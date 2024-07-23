const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const studentSchema = new Schema({
  stuId: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  age: {
    type: Number,
    required: true,
  },
  gender: {
    type: String,
    required: true,
  },
});

const Student = mongoose.model("Studen", studentSchema);
module.exports = Student;
