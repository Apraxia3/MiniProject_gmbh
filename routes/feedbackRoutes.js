const express = require('express');
const router = express.Router();
const feedbackController = require('../controllers/feedbackController');
const authMiddleware = require('../middleware/authMiddleware');

router.post('/', authMiddleware, feedbackController.create); // Creating requires authentication
router.get('/', feedbackController.getAll);
router.get('/:id', feedbackController.getById);
router.put('/', authMiddleware, feedbackController.update);
router.delete('/:id', authMiddleware, feedbackController.delete); // Deleting requires authentication

module.exports = router;
