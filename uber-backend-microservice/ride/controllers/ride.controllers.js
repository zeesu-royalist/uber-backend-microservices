const rideModel = require('../models/ride.model')
const { publishtoQueu } = require('../service/rabbit')

module.exports.createRide = async (req, res) => {
    const { pickup, destination } = req.body;

    const newRide = new rideModel({
        user: req.user._id,
        pickup,
        destination
    })

    await newRide.save()
    publishtoQueu("new-ride", JSON.stringify(newRide))
    res.send(newRide)
}

module.exports.acceptRide = async (req, res) => {
    const { rideId } = req.query
    const ride = await rideModel.findById(rideId);

    if(!ride) {
        return res.status(400).json({ message: "Ride not found" })
    }

    ride.status = 'accepted'
    await ride.save()
    publishtoQueu("ride-accepted", JSON.stringify(ride))
    res.send(ride)
}


 