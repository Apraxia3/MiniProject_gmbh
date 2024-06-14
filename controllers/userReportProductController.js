const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
const UserReportProduct = require('../models/userReportProduct');
const Product = require('../models/product');

dotenv.config();

exports.create = (req, res) => {
    const { description, productId } = req.body;
    const reporterId = req.user.userId;

    const newUserReportProduct = {
        urp_description: description,
        urp_reporter_id: reporterId,
        urp_product_id: productId,
    };

    Product.getById(productId, (err, product) => {
        if (err) return res.status(500).json(err);
        if (!product) return res.status(404).json({ message: 'Product not found' });

        if (product[0].p_seller_id == reporterId) {
        return res.status(403).json({ message: 'You cannot report your own products' });
        }

        UserReportProduct.create(newUserReportProduct, (err, result) => {
            if (err) return res.status(500).json(err);
            res.status(201).json({ message: 'Product report created successfully', reportId: result.id });
        });
    });
};

exports.getAll = (req, res) => {
    const userId = req.user.userId;

    UserReportProduct.getAll(userId, (err, reports) => {
        if (err) return res.status(500).json(err);
        res.status(200).json(reports);
    });
};

exports.getById = (req, res) => {
    const { id } = req.params;
    const userId = req.user.userId;

    UserReportProduct.getById(id, (err, report) => {
        if (err) return res.status(500).json(err);
        if (!report) return res.status(404).json({ message: 'Product report not found' });

        const product = Product.getById(report[0].urp_product_id, (err, product) => {
        if (err) return res.status(500).json(err);

        if (report[0].urp_reporter_id !== userId) {
            return res.status(403).json({ message: 'Unauthorized' });
        }

        res.status(200).json(report);
        });
    });
};

exports.delete = (req, res) => {
    const { id } = req.params;

    UserReportProduct.getById(id, (err, report) => {
        if (err) return res.status(500).json(err);
        if (!report) return res.status(404).json({ message: 'Product report not found' });

        if (report[0].urp_reporter_id !== req.user.userId) {
        return res.status(403).json({ message: 'Unauthorized' });
        }

        UserReportProduct.delete(id, (err) => {
        if (err) return res.status(500).json(err);
        res.status(200).json({ message: 'Product report deleted successfully' });
        });
    });
};
