const User = require('../models/User');

exports.createNewUser = async (req, res) => {
    const { email, name } = req.body;
    try {
        const oldUser = await User.findOne({ email: email });
        if (!oldUser) {
            const newUser = new User({
                name,
                email
            });
            await newUser.save();

            res.status(201).json(newUser);
        } else {
            res.status(200).json(oldUser);
        }
    } catch (error) {
        console.log(error);
        res.status(500).json(error);
    }
}


// Get All Users
exports.getAllUsers = async (req, res) => {
    try {
        const users = await User.find();
        res.status(200).json(users);
    } catch (error) {
        console.log(error);
        res.status(200).json(error);
    }
}

// Get Single User
exports.getUserByEmail = async (req, res) => {
    const { email } = req.params;
    try {
        const user = await User.findOne({ email: email });

        if (!user) {
            return res.status(400).json({ message: 'User not found' })
        }

        res.status(200).json(user);

    } catch (error) {
        console.log(error);
        res.status(500).json(error);
    }
}


// Update an User
exports.updateUser = async (req, res) => {
    const { email } = req.params;
    try {
        if (req.user.email) {
            const user = await User.findOne({ email: req.user.email });

            if (user && user.role === 'admin') {
                const user = await User.findOne({ email: email });
                if (!user) {
                    return res.status(400).json({ message: 'User not found' })
                }

                const updatedUser = await User.findOneAndUpdate({ email: email }, req.body, { new: true });

                res.status(200).json(updatedUser);
            }else{
                res.status(403).json({
                    message:'You are not allowed to perform this action.'
                })
            }
        }else{
            res.status(404).json({
                message:'You are not allowed to perform this action.'
            })
        }

    } catch (error) {
        console.log(error);
        res.status(500).json(error);
    }
}
