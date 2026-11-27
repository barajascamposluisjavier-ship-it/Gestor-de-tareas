const express = require('express');
const router = express.Router();

const { getTareas, getTareaPorId } = require('../controllers/tareas.controller');

router.get('/', getTareas);

router.get('/:id', getTareaPorId);

module.exports = router;