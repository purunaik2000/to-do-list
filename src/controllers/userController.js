const userModel = require('../models/userModel');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const validateUserData = require('../validations/userValidation');

async function register(req, res) {
    try {
        const data = req.body;
        if(!data) return res.status(400).send({
            status: false,
            message: 'User information required'
        });

        // Validate user data
        const isValid = validateUserData(data);
        if(isValid != true) return res.status(400).send(isValid);

        const {name, email, password} = data;

        // check for email duplication
        const oldUser = await userModel.findOne({
            email: email
        })

        if(oldUser) return res.status(400).send({
            status: false,
            message: `${email} is already registered`
        })

        // Hash the password
        const hash = await bcrypt.hash(password, 10);

        // Create new User
        const newUser = await userModel.create({
            name: name,
            email: email,
            password: hash
        })

        return res.status(201).send({
            status: true,
            message: 'User profile created successfully'
        })
    } catch (error) {
        res.status(500).send({
            status: false,
            message: error.message
        })
    }
}

async function login(req, res) {
    try {
        const data = req.body;

        if(!data) return res.status(400).send({
            status: false,
            message: 'Email and password is required'
        })

        const {email, password} = data;

        if(!email) return res.status(400).send({
            status: false,
            message: 'Email is required'
        })

        if(!password) return res.status(400).send({
            status: false,
            message: 'password is required'
        })

        // Find any user is available with this email
        const user = await userModel.findOne({
            email: email
        })

        if(!user) return res.status(400).send({
            status: false,
            message: `${email} is not registered`
        })

        // Match the password
        const isValidPassword = await bcrypt.compare(password, user.password);
        if (!isValidPassword) return res.status(400).send({
            status: false,
            message: 'Password is incorrect'
        })

        const token = jwt.sign({
            _id: user._id,
            name: user.name
        }, process.env.SECRET_KEY,
        { 
            expiresIn: "1h"
        })

        return res.status(200).send({
            status: true,
            message: 'You are logged in',
            data: {
                token: token,
                time: Date.now(),
                name: user.name,
                email: user.email
            }
        })
    } catch (error) {
        res.status(500).send({
            status: false,
            message: error.message
        })
    }
}

module.exports = {
    register,
    login
}