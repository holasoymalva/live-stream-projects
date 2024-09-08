const express = require('express');
const router = express.Router();
const { createTask, getAllTasks , getTaskById, updateTask, deleteTasK} = require('../controllers/taskController');
const authMiddleware = require('../middlewares/authMiddleware');

router.use(authMiddleware);

router.post('/tasks', createTask);
router.get('/tasks', getAllTasks);
router.get('/tasks/:id', getTaskById);
router.put('/tasks/:id', updateTask);
router.delete('/tasks/:id', deleteTasK);

module.exports = router;