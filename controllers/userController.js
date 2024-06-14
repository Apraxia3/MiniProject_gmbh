const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/user');
const dotenv = require('dotenv');

dotenv.config();

exports.register = async (req, res) => {
    const { username, email, password } = req.body;
    const salt = bcrypt.genSaltSync(10);
    const hashedPassword = bcrypt.hashSync(password, salt);
    const newUser = {
        u_username: username,
        u_email: email,
        u_salt: salt,
        u_password: hashedPassword,
        u_member_since: new Date(),
    };

    User.create(newUser, (err, result) => {
        if (err) return res.status(500).json(err);
        res.status(201).json({ message: 'User registered successfully', userId: result.insertId });
    });
};

exports.login = (req, res) => {
    const { email, username, password } = req.body;

    const findUser = (callback) => {
        if (email) {
        User.findByEmail(email, callback);
        } else if (username) {
        User.findByUsername(username, callback);
        } else {
        callback(null, []);
        }
    };

    findUser((err, users) => {
        if (err) {
        console.error("Database error:", err);
        return res.status(500).json(err);
        }

        if (users.length === 0) {
        console.error("User not found");
        return res.status(404).json({ message: 'User not found' });
        }

        const user = users[0];
        console.log("User found:", user);

        bcrypt.compare(password, user.u_password, (err, isMatch) => {
        if (err) {
            console.error("Bcrypt error:", err);
            return res.status(500).json(err);
        }

        if (isMatch) {
            const token = jwt.sign({ userId: user.u_id }, process.env.JWT_SECRET, { expiresIn: '1h' });
            return res.json({ message: 'Login successful', token });
        } else {
            console.error("Invalid credentials");
            return res.status(401).json({ message: 'Invalid credentials' });
        }
        });
    });
};

// exports.getAll = (req, res) => {
//     User.getAll((err, users) => {
//         if (err) return res.status(500).json(err);
//         res.status(200).json(users);
//     });
// };

exports.getById = (req, res) => {
    const { id } = req.params;
    if (id != req.user.userId) {
        return res.status(403).json({ message: 'Looking at other users is strictly prohibited!' });
    }
    User.findById(id, (err, user) => {
        if (err) return res.status(500).json(err);
        res.status(200).json(user);
    });
};

exports.update = (req, res) => {
    const { id, username, email, password } = req.body;
    const salt = bcrypt.genSaltSync(10);
    const hashedPassword = bcrypt.hashSync(password, salt);
    const updatedUser = {
        u_username: username,
        u_email: email,
        u_salt: salt,
        u_password: hashedPassword,
    };

    if (id !== req.user.userId) {
        return res.status(403).json({ message: 'Updating other users\' profiles is strictly prohibited' });
    }

    User.update(id, updatedUser, (err, result) => {
        if (err) return res.status(500).json(err);
        res.status(200).json({ message: 'User updated successfully'});
    });
};

exports.delete = (req, res) => {
    const { id } = req.params;
    if (id !== req.user.userId) {
        return res.status(403).json({ message: 'Cannot delete other user accounts' });
    }
    User.delete(id, (err) => {
        if (err) return res.status(500).json(err);
        res.status(200).json({ message: 'User deleted successfully' });
    });
};

exports.deactivate = (req, res) => {
    const { id } = req.body;
    if (id !== req.user.userId) {
        return res.status(403).json({ message: 'Cannot deactivate other user accounts' });
    }
    User.deactivate(id, (err, result) => {
        if (err) return res.status(500).json(err);
        res.status(200).json({ message: 'User deactivated successfully', userId: result.insertId });
    });
};