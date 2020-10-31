const Joi = require("joi");
const express = require("express");
const app = express();

app.use(express.json());

const courses = [
  { id: 1, name: "course 1" },
  { id: 2, name: "course 2" },
  { id: 3, name: "course 3" },
];

app.get("/", (req, res) => {
  res.send("Welcome back again!!!");
});

app.get("/api/courses", (req, res) => {
  res.send(courses);
});

//getting an id
app.get("/api/courses/:id", (req, res) => {
  const course = courses.find((c) => c.id === parseInt(req.params.id));
  if (!course) res.status(404).send("The course with the given id not found");
  res.send(course);
});

app.get("/api/courses/:year/:month", (req, res) => {
  res.send(req.params);
});
app.get("/api/courses/:year/:month", (req, res) => {
  res.send(req.query);
});

//for post request
app.post("/api/courses", (req, res) => {
  // const result = validateCourse(req.body);
  const { error } = validateCourse(req.body);

  if (error) return res.status(404).send(result.error.details[0].message);

  const course = {
    id: courses.length + 1,
    name: req.body.name,
  };
  courses.push(course);
  res.send(course);
});

//Updating the course
app.put("/api/courses/:id", (req, res) => {
  //Look out for the course
  const course = courses.find((c) => c.id === parseInt(req.params.id));
  //if not exist throw 404
  if (!course) return res.status(404).send("Course does not exist");

  //Validation
  // const result = validateCourse(req.body);
  const { error } = validateCourse(req.body);
  if (error) return res.status(404).send(result.error.details[0].message);

  //Updating the course
  course.name = req.body.name;
  res.send(course);
});

//delete request
app.delete("/api/courses/:id", (req, res) => {
  // Look up the course
  const course = courses.find((c) => c.id === parseInt(req.params.id));
  // doesnt exist return 404
  if (!course) return res.status(404).send("404 Course doesnt exist");

  // Delete
  const index = courses.indexOf(course);
  courses.splice(index, 1);

  // Resend the same course
  res.send(course);
});

//Environment variable
const port = process.env.PORT || 3000;
app.listen(port, () => console.log("Listening to port ${port}..."));

// validation logic
function validateCourse(course) {
  const schema = {
    name: Joi.string().min(3).required(),
  };
  return Joi.validate(course, schema);
}
