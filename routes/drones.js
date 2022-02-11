const express = require('express');
const router = express.Router();
const Drone = require('../models/Drone.model');

// require the Drone model here

router.get('/drones', (req, res, next) => {
  // Iteration #2: List the drones
  // ... your code here
  Drone.find()
    .then((drones) => {
      res.render("drones/list", { drones })
    }).catch((err) => console.log("Drone search failed:", err))
});

router.get('/drones/create', (req, res, next) => {
  // Iteration #3: Add a new drone
  // ... your code here
  res.render("drones/create-form")
});

router.post('/drones/create', (req, res, next) => {
  // Iteration #3: Add a new drone
  // ... your code here
  const name = req.body.name;
  const propellers = req.body.propellers;
  const maxSpeed = req.body.maxSpeed;

  Drone.create({ name, propellers, maxSpeed })
    .then(() => res.redirect("/drones"))
    .catch((error) => `Error while creating a new DRONE: ${error}`);
});

router.get('/drones/:id/edit', (req, res, next) => {
  // Iteration #4: Update the drone
  // ... your code here
  const id = req.params.id;
  Drone.findById(id).then((drone) => {
    res.render("drones/update-form", drone)
  })
});

router.post('/drones/:id/edit', (req, res, next) => {
  // Iteration #4: Update the drone
  // ... your code here
  const id = req.params.id
  const name = req.body.name;
  const description = req.body.propellers;
  const maxSpeed = req.body.maxSpeed;
  Drone.findByIdAndUpdate(
    id,
    { name, description, maxSpeed },
    { new: true }
  )
    .then(() => {
      res.redirect(`/drones`)
    })
});

router.post('/drones/:id/delete', (req, res, next) => {
  // Iteration #5: Delete the drone
  // ... your code here
  const id = req.params.id
  Drone.findByIdAndDelete(id)
    .then(() => {
      res.redirect(`/drones`)
    }).catch((err)=> console.log("Deleting error: ", err))
});

module.exports = router;
