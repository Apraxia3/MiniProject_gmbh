const connection = require('../config/database');

const Product = {
    create: (product, callback) => {
        const query = 'INSERT INTO product SET ?';
        connection.query(query, product, callback);
    },
    createMultiple: (products, callback) => {
        const query = 'INSERT INTO product (p_name, p_description, p_price, p_seller_id) VALUES ?';
        const values = products.map(product => [product.p_name, product.p_description, product.p_price, product.p_seller_id]);
        connection.query(query, [values], callback);
    },
    getAll: (callback) => {
        const query = 'SELECT * FROM product';
        connection.query(query, callback);
    },
    getById: (id, callback) => {
        const query = 'SELECT * FROM product WHERE p_id = ?';
        connection.query(query, [id], callback);
    },
    getBySeller: (id, callback) => {
        const query = 'SELECT * FROM product WHERE p_seller_id = ?';
        connection.query(query, [id], callback);
    },
    update: (id, product, callback) => {
        const query = 'UPDATE product SET p_name = ?, p_description = ?, p_price = ? WHERE p_id = ?';
        connection.query(query, [product.p_name, product.p_description, product.p_price, id], callback);
    },
    delete: (id, callback) => {
        const query = 'DELETE FROM product WHERE p_id = ?';
        connection.query(query, [id], callback);
    },
};

module.exports = Product;
