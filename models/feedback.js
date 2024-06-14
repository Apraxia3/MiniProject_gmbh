const connection = require('../config/database');

const Feedback = {
    create: (feedback, callback) => {
        const query = 'INSERT INTO feedback SET ?';
        connection.query(query, feedback, callback);
    },
    getAll: (callback) => {
        const query = 'SELECT * FROM feedback';
        connection.query(query, callback);
    },
    getById: (id, callback) => {
        const query = 'SELECT * FROM feedback WHERE f_id = ?';
        connection.query(query, [id], callback);
    },
    update: (id, feedback, callback) => {
        const query = 'UPDATE feedback SET ? WHERE f_id = ?';
        connection.query(query, [feedback, id], callback);
    },
    delete: (id, callback) => {
        const query = 'DELETE FROM feedback WHERE f_id = ?';
        connection.query(query, [id], callback);
    },
};

module.exports = Feedback;
