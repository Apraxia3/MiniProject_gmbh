const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
const Feedback = require('../models/feedback');

dotenv.config();

exports.create = (req, res) => {
    const { description, productId } = req.body;
    const userId = req.user.userId;

    const newFeedback = {
        f_description: description,
        f_u_id: userId,
        f_p_id: productId,
    };

    Feedback.create(newFeedback, (err, result) => {
        if (err) return res.status(500).json(err);
        res.status(201).json({ message: 'Feedback created successfully', feedbackId: result.insertId });
    });
};

exports.getAll = (req, res) => {
    Feedback.getAll((err, feedbacks) => {
        if (err) return res.status(500).json(err);
        res.status(200).json(feedbacks);
    });
};

exports.getById = (req, res) => {
    const { id } = req.params;
    Feedback.getById(id, (err, feedback) => {
        if (err) return res.status(500).json(err);
        res.status(200).json(feedback);
    });
};

exports.update = (req, res) => {
    const { id, description, productId } = req.body;
    const userId = req.user.userId;

    const updatedFeedback = {
        f_description: description,
        f_u_id: userId,
        f_p_id: productId,
    };

    Feedback.getById(id, (err, feedback) => {
        if (err) return res.status(500).json(err);
        if (!feedback) return res.status(404).json({ message: 'Feedback not found' });

        if (feedback[0].f_u_id !== req.user.userId) {
        return res.status(403).json({ message: 'Unauthorized' });
        }

        Feedback.update(id, updatedFeedback, (err) => {
        if (err) return res.status(500).json(err);
        res.status(200).json({ message: 'Feedback updated successfully' });
        });
    });
};

exports.delete = (req, res) => {
    const { id } = req.params;

    Feedback.getById(id, (err, feedback) => {
        if (err) return res.status(500).json(err);
        if (!feedback) return res.status(404).json({ message: 'Feedback not found' });

        if (feedback[0].f_u_id !== req.user.userId) {
        return res.status(403).json({ message: 'Unauthorized' });
        }

        Feedback.delete(id, (err) => {
        if (err) return res.status(500).json(err);
        res.status(200).json({ message: 'Feedback deleted successfully' });
        });
    });
};
