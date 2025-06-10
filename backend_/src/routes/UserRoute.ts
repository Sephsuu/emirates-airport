import express from 'express';
import { createUser, deleteUserById, getAllUsers, getUserById } from '../controller/UserController';

const router = express.Router();

router.get(`/`, getAllUsers);
router.post(`/`, createUser);
router.get('/:id', getUserById);
router.delete('/:id', deleteUserById)

export default router;