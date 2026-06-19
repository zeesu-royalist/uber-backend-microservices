const express = require('express')
const router = express.Router()
const rideController = require('../controllers/ride.controllers')
const authMiddleware = require('../middleware/auth.middleware')

router.post('/create-ride', authMiddleware.userAuth, rideController.createRide)
router.put('/accept-ride', authMiddleware.captainAuth, rideController.acceptRide)

module.exports = router;