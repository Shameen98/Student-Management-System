const router = require("express").Router();
let Student = require("../models/Student.js");

//student add
router.route("/add").post((req, res) => {
  stuId = req.body.stuId;
  name = req.body.name;
  age = Number(req.body.age);
  gender = req.body.gender;

  const newStudent = new Student({
    stuId,
    name,
    age,
    gender,
  });

  newStudent
    .save()
    .then(() => {
      res.json("Student added");
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

  Student.findOne({ stuId })
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

  const update = await Student.findOneAndUpdate({ stuId }, updateStudent)
    .then(() => {
      res.status(200).send({ status: "user updated" });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).send({ status: "Error with updating data" });
    });
});

//delete student
router.delete("/delete/:id", async (req, res) => {
  let stuId = req.params.id;

  await Student.findOneAndDelete({ stuId })
    .then((result) => {
      if (!result) {
        return res.status(404).send({ status: "Student not found" });
      }
      res.status(200).send({ status: "Student deleted successfully" });
    })
    .catch((err) => {
      console.log(err.message);
      res
        .status(500)
        .send({ status: "Error with delete student", error: err.message });
    });
});
// router.delete("/delete/:id", async (req, res) => {
//   let stuId = req.params.id;

//   await Student.findOneAndDelete({ stuId })
//     .then(() => {
//       res.status(200).send({ status: "Deleted successfully" });
//     })
//     .catch((err) => {
//       console.log(err.message);
//       res
//         .status(500)
//         .send({ status: "Error with delete user", err: err.message });
//     });
// });
// router.route("/delete/:id").delete(async (req, res) => {
//   let stuId = req.params.id;

//   await Student.findOneAndDelete({ stuId })
//     .then(() => {
//       res.status(200).send({ status: "Deleted successfully" });
//     })
//     .catch((err) => {
//       console.log(err.message);
//       res
//         .status(500)
//         .send({ status: "Error with delete user", err: err.message });
//     });
// });

module.exports = router;
