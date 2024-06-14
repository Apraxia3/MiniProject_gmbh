const connection = require('../config/database');

const Order = {
    create: (order, callback) => {
        const query = 'INSERT INTO `order` SET ?';
        connection.query(query, order, callback);
    },
    getAll: (id, callback) => {
        const query = 'SELECT * FROM `order` WHERE o_b_id = ?';
        connection.query(query, [id], callback);
    },
    getByProduct: (id, callback) => {
        const query = 'SELECT * FROM `order` WHERE o_b_id = ? ORDER BY o_p_id';
        connection.query(query, [id], callback);
    },
    getById: (id, callback) => {
        const query = 'SELECT * FROM `order` WHERE o_id = ?';
        connection.query(query, [id], callback);
    },
    update: (id, order, callback) => {
        const query = 'UPDATE `order` SET ? WHERE o_id = ?';
        connection.query(query, [order, id], callback);
    },
    delete: (id, callback) => {
        const query = 'DELETE FROM `order` WHERE o_id = ?';
        connection.query(query, [id], callback);
    },
};

module.exports = Order;
