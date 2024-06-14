const connection = require('../config/database');

const User = {
    create: (user, callback) => {
        const query = 'INSERT INTO user SET ?';
        connection.query(query, user, callback);
    },
    findByEmail: (email, callback) => {
        const query = 'SELECT * FROM user WHERE u_email = ? AND u_is_deactivate = 0';
        connection.query(query, [email], callback);
    },
    findByUsername: (username, callback) => {
        const query = 'SELECT * FROM user WHERE u_username = ? AND u_is_deactivate = 0';
        connection.query(query, [username], callback);
    },
    findById: (id, callback) => {
        const query = 'SELECT * FROM user WHERE u_id = ? AND u_is_deactivate = 0';
        connection.query(query, [id], callback);
    },
    getAll: (callback) => {
        const query = 'SELECT * FROM user WHERE u_is_deactivate = 0';
        connection.query(query, callback);
    },
    update: (id, user, callback) => {
        const query = 'UPDATE user SET u_username = ?, u_email = ?, u_salt = ?, u_password = ? WHERE u_id = ?';
        connection.query(query, [user.u_username, user.u_email, user.u_salt, user.u_password, id], callback);
    },
    delete: (id, callback) => {
        const query = 'DELETE FROM user WHERE u_id = ?';
        connection.query(query, [id], callback);
    },
    deactivate: (id, callback) => {
        const query = 'UPDATE user SET u_is_deactivate = 1 WHERE u_id = ?';
        connection.query(query, [id], callback);
    },
};

module.exports = User;
