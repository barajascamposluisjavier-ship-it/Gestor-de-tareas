const express = require('express');
const router = express.Router();

const { getTareas, getTareaPorId, postTarea} = require('../controllers/tareas.controller');

router.get('/', getTareas);

router.get('/:id', getTareaPorId);

router.post('/', postTarea);

module.exports = router;