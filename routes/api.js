import express from 'express';
const router = express.Router();

import * as TasksController from '../app/controllers/TasksController.js';
import * as UsersController from '../app/controllers/UsersController.js';
import AuthMiddleware from "../app/middlewares/AuthMiddleware.js";

// ======================== All Users Routes ========================
router.post('/Registration', UsersController.Registration);
router.post('/Login', UsersController.Login);
router.get('/ProfileDetails', AuthMiddleware , UsersController.ProfileDetails);
router.post('/ProfileUpdate', AuthMiddleware ,UsersController.ProfileUpdate);
router.post('/ProfileDelete', UsersController.ProfileDelete);
router.post('/EmailVerification/:email', UsersController.EmailVerification);
router.post('/OTPVerify', UsersController.OTPVerify);
router.post('/ResetPassword', UsersController.ResetPassword);

// ======================== All Tasks Routes ========================
router.post('/CreateTask',AuthMiddleware, TasksController.CreateTask);
router.post('/UpdateTask/:id/:status',AuthMiddleware, TasksController.UpdateTask);
router.get('/TaskListByStatus/:status',AuthMiddleware, TasksController.TaskListByStatus);
router.get('/DeleteTask/:id',AuthMiddleware, TasksController.DeleteTask);
router.get('/TaskCount',AuthMiddleware, TasksController.TaskCount);


export default router;