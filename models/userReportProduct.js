const connection = require('../config/database');

const UserReportProduct = {
    create: (report, callback) => {
        const query = 'INSERT INTO user_report_product SET ?';
        connection.query(query, report, callback);
    },
    getAll: (id, callback) => {
        const query = 'SELECT * FROM user_report_product WHERE urp_reporter_id = ?';
        connection.query(query, [id], callback);
    },
    getById: (id, callback) => {
        const query = 'SELECT * FROM user_report_product WHERE urp_id = ?';
        connection.query(query, [id], callback);
    },
    update: (id, report, callback) => {
        const query = 'UPDATE user_report_product SET ? WHERE urp_id = ?';
        connection.query(query, [report, id], callback);
    },
    delete: (id, callback) => {
        const query = 'DELETE FROM user_report_product WHERE urp_id = ?';
        connection.query(query, [id], callback);
    },
};

module.exports = UserReportProduct;
