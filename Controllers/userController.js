const users = require('../Models/userSchema');
const jwt = require('jsonwebtoken');

//register
exports.register = async(req,res)=>{
    const {username, email, password} = req.body;
    try {
        const existingUser = await users.findOne({email});
        if (existingUser) {
            res.status(404).json("User already registered...");
        } else {
            //new user is added to database
            const newUser = await users({username, email, password});
            await newUser.save();
            res.status(200).json("User added successfully!");
        }
    } catch (err) {
        res.status(404).json(err);
    }
}


//login
exports.login = async(req,res)=>{
    const {email, password} = req.body;
    try {
        const existingUser = await users.findOne({email, password});
        if (existingUser) {
            const token = jwt.sign({userId:existingUser._id},process.env.JWT_KEY);
            res.status(200).json({existingUser, token});    //response for client
        } else {
            res.status(404).json("Incorrect email or password!");
        }
    } catch (err) {
        res.status(404).json(err);
    }
}






