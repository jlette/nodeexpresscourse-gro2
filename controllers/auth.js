const UserModel = require('./../models/User');
const bcrypt = require('bcrypt');
const {verifyUser} = require("../validator/user");

module.exports = {
    // POST / Creer un utilisateur
    register: async (req, res) => {
        verifyUser(req.body);
        const {firstname, lastname, email, password} = req.body;
        const hash = await bcrypt.hash(password, 10);
        const newUser = new UserModel({
            firstname,
            lastname,
            email,
            hash
        });

        newUser.save()
        res.status(201).send({
            id: newUser._id,
            lastname: newUser.lastname,
            firstname: newUser.firstname,
            email: newUser.email
        })

    }
}