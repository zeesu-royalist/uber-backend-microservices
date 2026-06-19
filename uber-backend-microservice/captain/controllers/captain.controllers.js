const captainModel = require('../models/captain.model')
const blacklisttokenModel = require('../models/blacklisttoken.model')
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken')
const { subscribeTOQeue } = require('../service/rabbit')

const pendingRequests = []

module.exports.register = async (req, res) => {
    try {
        const { name, email, password } = req.body;
        const captain = await captainModel.findOne({ email });

        if(captain) {
            return res.status(400).json({ message: 'captain already exists'});
        }
        
        const hash = await bcrypt.hash(password, 10);
        
        const newCaptain = new captainModel({ name, email, password: hash })
        await newCaptain.save();

        const token = jwt.sign({ id: newCaptain._id }, process.env.JWT_SECRET, { expiresIn: '1h'})

        res.cookie('token', token)

        delete newCaptain._doc.password;   // responce me password na jaye isliye.
        res.send({ newCaptain, token })
    } 
    catch (error) {
        res.status(500).json({ message: error.message })
    }
}

module.exports.login = async (req, res) => {
    try {
        const { email, password } = req.body;
        const captain = await captainModel
        .findOne({ email })
        .select('+password');

        if(!captain) {
            return res.status(400).json({ message: "Invelid email or password" })
        }

        const isMatch = await bcrypt.compare(password, captain.password);

        if(!isMatch) {
            return res.status(400).json({ message: "Invalid credentials"})
        }

        const token = jwt.sign({ id: captain._id }, process.env.JWT_SECRET, { expiresIn: '1h'})
        res.cookie('token', token);

        delete captain._doc.password;

        res.send({ captain, token })

    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}

module.exports.logout = async (req, res) => {
    try {
        const token = req.cookies.token;
        await blacklisttokenModel.create({ token });
        res.clearCookie('token');
        res.send({ message: "captain logged out successfully..."})
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}

module.exports.profile = async (req, res) => {
    try {
        res.send(req.captain);
    }
    catch (error) {
        res.status(500).json({ message: error.message })
    }
}

module.exports.toggleAvailability = async (req, res) => {
    try {
        const captain = await captainModel.findById(req.captain._id)
        captain.isAvailable = !captain.isAvailable;
        await captain.save();
        res.send(captain);
    } 
    catch (error) {
        res.status(500).json({ message: error.message })
    }
}

module.exports.waitForNewRide = async (req, res) => {
    // seting time for long polling 30s
    req.setTimeout(30000, () => {
        res.status(204).end();   // no content
    })

    pendingRequests.push(res)
}

subscribeTOQeue('new-ride', (data) => {
    const rideData = JSON.parse(data)

    // sending all new ride data to all pending requests
    pendingRequests.forEach(res => {
        res.json({ data: rideData })
    })

    pendingRequests.length = 0; // clear the pending requsts
})

subscribeTOQeue("new-ride", (data) => {
    console.log(JSON.stringify(data));
})