const express = require('express');
const router = express.Router();

const {getTareas} = require('../controllers/tareas.controller');

router.get('/', getTareas);

module.exports = router;