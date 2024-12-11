const express = require('express');
const router = express.Router();
const formController = require('../controller/form/formController');
const authenticateToken = require('../middleware/authMiddleWare'); // Ensure this path is correct

router.post('/form', authenticateToken, formController.createForm);
router.get('/form', formController.getAllForm);
router.get('/form/:id', formController.getFormById);
router.patch('/form/:id', authenticateToken, formController.updateForm);
router.delete('/form/:id', authenticateToken, formController.deleteForm);

module.exports = router;
