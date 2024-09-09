// Create Task
import TasksModel from "../models/TasksModel.js";
import mongoose from "mongoose";

export const CreateTask = async (req, res) => {

    try {
        const user_id = req.headers["user_id"];
        const reqBody = req.body;
        reqBody.user_id = user_id;
        const data = await TasksModel.create(reqBody);
        return res.json({status: "success", message: "Task created successfully.", data: data});
    }catch(err) {
        return res.json({status: "fail", message: err.toString()});
    }

}

// Update Task Status
export const UpdateTask = async (req, res) => {

    try {
        const id = req.params.id;
        const status = req.params.status;
        const user_id = req.headers["user_id"];
        const data = await TasksModel.updateOne({"_id": id, "user_id": user_id}, {
            status: status,
        });
        return res.json({status: "success"});
    }catch (err) {
        return res.json({status: "fail", message: err.toString()});
    }

}

// View Task List By List Status
export const TaskListByStatus = async (req, res) => {

    try {
        const status = req.params.status;
        const user_id = req.headers["user_id"];
        const data = await TasksModel.find({"status": status, "user_id": user_id});
        return res.json({status: "success", message: "Task list successfully", data: data});
    }catch (err) {
        return res.json({status: "fail", message: err.toString()});
    }

}

// Delete Task
export const DeleteTask = async (req, res) => {

    try {
        const id = req.params.id;
        const user_id = req.headers["user_id"];
        const data = await TasksModel.deleteOne({"_id": id, "user_id": user_id});
        return res.json({status: "success", message: "Task deleted successfully.", data: data});
    }catch (err) {
        return res.json({status: "fail", message: err.toString()});
    }

}

// Task Count
export const TaskCount = async (req, res) => {

    try {
        const objectId = mongoose.Types.ObjectId;
        const user_id = new objectId(req.headers["user_id"]);
        const data = await TasksModel.aggregate([
            {$match: {user_id: user_id}},
            {$group: {_id: "$status", total:{$count:{}}}}
        ]);
        return res.json({status: "success", message: "Task count successfully.", data: data});
    }catch (err) {
        return res.json({status: "fail", message: err.toString()});
    }

}