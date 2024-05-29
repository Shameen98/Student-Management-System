const router = require("express").Router();
let Student = require("../models/Student.js");

//student add
router.route("/add").post((req, res) => {
  name = req.body.name;
  age = Number(req.body.age);
  gender = req.body.gender;

  const newStudent = Student({
    name,
    age,
    gender,
  });

  newStudent
    .save()
    .then(() => {
      console.log("Student added");
    })
    .catch((err) => {
      console.log(err);
    });
});

//display/fetch all students
router.route("/").get((req, res) => {
  Student.find()
    .then((student) => {
      res.json(student);
    })
    .catch((err) => {
      console.log(err);
    });
});

//display/fetch particular student
router.route("/get/:id").get((req, res) => {
  let stuId = req.params.id;

  Student.findById(stuId)
    .then((student) => {
      res.json(student);
    })
    .catch((err) => {
      console.log(err);
    });
});

//update student
router.route("/update/:id").put(async (req, res) => {
  let stuId = req.params.id;
  const { name, age, gender } = req.body;

  const updateStudent = {
    name,
    age,
    gender,
  };

  const update = await Student.findByIdAndUpdate(stuId, updateStudent)
    .then(() => {
      res.status(200).send({ status: "user updated", user: update });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).send({ status: "Error with updating data" });
    });
});

//delete student
router.route("/delete/:id").delete(async (req, res) => {
  let stuId = req.params.id;

  await Student.findByIdAndDelete(stuId)
    .then(() => {
      res.status(200).send({ status: "Deleted successfully" });
    })
    .catch((err) => {
      console.log(err.message);
      res
        .status(500)
        .send({ status: "Error with delete user", err: err.message });
    });
});

module.exports = router;
