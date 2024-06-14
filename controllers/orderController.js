const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
const Order = require('../models/order');
const Product = require('../models/product');

dotenv.config();

exports.create = (req, res) => {
    const { productId, sellerId } = req.body;
    const buyerId = req.user.userId;

    const newOrder = {
        o_b_id: buyerId,
        o_s_id: sellerId,
        o_p_id: productId,
    };

    Product.getById(productId, (err, product) => {
        if (err) return res.status(500).json(err);
        if (!product) return res.status(404).json({ message: 'Product not found' });

        console.log(product[0].p_seller_id);
        console.log(req.user.userId);

        if (product[0].p_seller_id == req.user.userId) {
            return res.status(403).json({ message: 'Cannot buy your own products' });
        }

        Order.create(newOrder, (err, result) => {
            if (err) return res.status(500).json(err);
            res.status(201).json({ message: 'Order created successfully', orderId: result.insertId });
        });
    });
};

exports.getAll = (req, res) => {
    const userId = req.user.userId;
    
    Order.getAll(userId, (err, order) => {
        if (err) return res.status(500).json(err);
        if (!order) return res.status(404).json({ message: 'Order not found' });

        res.status(200).json(order);
    });
};

exports.getByProduct = (req, res) => {
    const userId = req.user.userId;

    Order.getByProduct(userId, (err, order) => {
        if (err) return res.status(500).json(err);
        if (!order) return res.status(404).json({ message: 'Order not found' });

        res.status(200).json(order);
    });
};

exports.delete = (req, res) => {
    const { id } = req.params;

    Order.getById(id, (err, order) => {
        if (err) return res.status(500).json(err);
        if (!order) return res.status(404).json({ message: 'Order not found' });

        if (order[0].o_b_id !== req.user.userId) {
        return res.status(403).json({ message: 'Unauthorized' });
        }

        Order.delete(id, (err) => {
        if (err) return res.status(500).json(err);
        res.status(200).json({ message: 'Order deleted successfully' });
        });
    });
};
