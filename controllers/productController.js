const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
const Product = require('../models/product');

dotenv.config();

exports.create = (req, res) => {
    const { name, description, price } = req.body;
    const sellerId = req.user.userId;

    console.log('Seller ID:', sellerId);
    
    const newProduct = {
        p_name: name,
        p_description: description,
        p_price: price,
        p_seller_id: sellerId,
    };

    Product.create(newProduct, (err, result) => {
        if (err) return res.status(500).json(err);
        res.status(201).json({ message: 'Product created successfully', productId: result.insertId });
    });
};

exports.createMultiple = (req, res) => {
    const products = req.body.products.map(product => ({
        p_name: product.name,
        p_description: product.description,
        p_price: product.price,
        p_seller_id: req.user.userId,
    }));

    Product.createMultiple(products, (err, result) => {
        if (err) return res.status(500).json(err);
        res.status(201).json({ message: 'Products created successfully', productIds: result.insertId });
    });
};

exports.getAll = (req, res) => {
    Product.getAll((err, products) => {
        if (err) return res.status(500).json(err);
        res.status(200).json(products);
    });
};

exports.getById = (req, res) => {
    const { id } = req.params;
    Product.getById(id, (err, product) => {
        if (err) return res.status(500).json(err);
        res.status(200).json(product);
    });
};

exports.getBySeller = (req, res) => {
    const { sellerId } = req.params;
    Product.getById(sellerId, (err, product) => {
        if (err) return res.status(500).json(err);
        res.status(200).json(product);
    });
};

exports.update = (req, res) => {
    const { id, name, description, price } = req.body;

    const updatedProduct = {
        p_name: name,
        p_description: description,
        p_price: price,
    };

    Product.getById(id, (err, product) => {
        if (err) return res.status(500).json(err);
        if (!product) return res.status(404).json({ message: 'Product not found' });

        console.log(product);
        console.log(req.user.userId);
        console.log(product.p_seller_id);

        // const sellerIdFromDb = String(product.p_seller_id);
        // const userIdFromToken = String(req.user.userId);

        // if (sellerIdFromDb != userIdFromToken) {
        //     return res.status(403).json({ message: 'Unauthorized' });
        //}
        if (product[0].p_seller_id !== req.user.userId) {
            return res.status(403).json({ message: 'Unauthorized' });
        }

        Product.update(id, updatedProduct, (err) => {
            if (err) return res.status(500).json(err);
            res.status(200).json({ message: 'Product updated successfully' });
        });
    });
};

exports.delete = (req, res) => {
    const { id } = req.body;

    console.log(id);
    for (let i=0; i<id.length; i++){
        Product.getById(id[i], (err, product) => {
            if (err) return res.status(500).json(err);
            // if (!product) return res.status(404).json({ message: 'Product not found' });
    
            if (product[0].p_seller_id !== req.user.userId) {
                // return res.status(403).json({ message: 'Unauthorized for id ' + id[i] });
            } else{
                Product.delete(id[i], (err) => {
                    if (err) return res.status(500).json(err);
                    // res.status(200).json({ message: 'Product deleted successfully for id ' + id[i] });
                });
            }
        });
    }
};

