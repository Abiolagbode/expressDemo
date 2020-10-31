
const express = require("express");
const router = express.Router();

const courses = [
    { id: 1, name: "course 1" },
    { id: 2, name: "course 2" },
    { id: 3, name: "course 3" },
  ];
  

router.get("/", (req, res) => {
    res.send(courses);
  });
  
  router.get("/:id", (req, res) => {
    const course = courses.find((c) => c.id === parseInt(req.params.id));
    if (!course) return res.status(404).send("The course with the given id not found");
    res.send(course);
  });
  
  router.post("/", (req, res) => {
    const { error } = validateCourse(req.body);
    if (error) return res.status(404).send(result.error.details[0].message);
    const course = {
      id: courses.length + 1,
      name: req.body.name,
    };
    courses.push(course);
    res.send(course);
  });
  
  router.put("/:id", (req, res) => {
    const course = courses.find((c) => c.id === parseInt(req.params.id));
    if (!course) return res.status(404).send("Course does not exist");
    const { error } = validateCourse(req.body);
    if (error) return res.status(404).send(result.error.details[0].message);
    course.name = req.body.name;
    res.send(course);
  });
  
  router.delete("/:id", (req, res) => {
    const course = courses.find((c) => c.id === parseInt(req.params.id));
    if (!course) return res.status(404).send("404 Course doesnt exist");
    const index = courses.indexOf(course);
    courses.splice(index, 1);
    res.send(course);
  });
  
  module.exports = router;