const express = require('express');
const router = express.Router();

// Import controllers
const userController = require('../controllers/userController');
const levelController = require('../controllers/levelController');

// Route to save user data
router.post('/', userController.createUser); 

// Route to update user level
router.patch('/level', userController.updateUserLevel); // Added PATCH route

// Endpoint for code validation
router.post('/validate-code', levelController.validateCode);        // For Level 1
router.post('/validate-code-level2', levelController.validateCodeLevel2); // For Level 2
router.post('/validate-code-level3', levelController.validateCodeLevel3); // New route for Level 3

module.exports = router;
