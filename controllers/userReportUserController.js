const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
const UserReportUser = require('../models/userReportUser');

dotenv.config();

exports.create = (req, res) => {
    const { description, victimId } = req.body;
    const reporterId = req.user.userId;

    const newUserReportUser = {
        uru_description: description,
        uru_reporter_id: reporterId,
        uru_victim_id: victimId,
    };

    if (victimId == reporterId) {
        return res.status(403).json({ message: 'Cannot report yourself' });
    }

    UserReportUser.create(newUserReportUser, (err, result) => {
        if (err) return res.status(500).json(err);
        res.status(201).json({ message: 'User report created successfully', reportId: result.insertId });
    });
};

exports.getAll = (req, res) => {
    const userId = req.user.userId;

    UserReportUser.getAll(userId, (err, reports) => {
        if (err) return res.status(500).json(err);
        res.status(200).json(reports);
    });
};

exports.getById = (req, res) => {
    const { id } = req.params;
    const userId = req.user.userId;

    UserReportUser.getById(id, (err, report) => {
        if (err) return res.status(500).json(err);
        if (!report) return res.status(404).json({ message: 'User report not found' });

        if (report[0].uru_reporter_id !== userId) {
        return res.status(403).json({ message: 'Unauthorized' });
        }

        res.status(200).json(report);
    });
};

exports.delete = (req, res) => {
    const { id } = req.params;

    UserReportUser.getById(id, (err, report) => {
        if (err) return res.status(500).json(err);
        if (!report) return res.status(404).json({ message: 'User report not found' });

        if (report[0].uru_reporter_id !== req.user.userId) {
        return res.status(403).json({ message: 'Unauthorized' });
        }

        UserReportUser.delete(id, (err) => {
        if (err) return res.status(500).json(err);
        res.status(200).json({ message: 'User report deleted successfully' });
        });
    });
};
