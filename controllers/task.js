import { Task } from "../models/task.js";
import ErrorHandler from "../middlewares/error.js";

export const newTask = async (req, res) => {
  const { title, description } = req.body;
  //   await Task.create
  //   const task = new Task({ title, description });
  //   await task.save();
  await Task.create({ title: title, description: description, user: req.user });
  res.status(201).json({
    success: true,
    message: "Task saved successfully",
  });
};

export const getMyTask = async (req, res, next) => {
  const userId = req.user._id;
  const task = await Task.find({ user: userId });
  res.status(200).send({
    success: true,
    task,
  });
};

// export const updateTask = async (req, res, next) => {
//   try {
//     const task = await Task.findById(req.params.id);

//     if (!task) {
//       // return res.status(404).send({
//       //   success: false,
//       //   message: "Task not found / Invalid task",
//       // });
//       // return next(new ErrorHandler("Task not found", 404));
//       return next(new ErrorHandler("task not found", 404));
//     }

//     task.isCompleted = !task.isCompleted;
//     await task.save();
//     res.status(200).json({
//       success: true,
//       message: "Task Updated!",
//     });
//   } catch (error) {
//     next(error);
//   }
// };

export const updateTask = async (req, res, next) => {
  try {
    const task = await Task.findById(req.params.id);

    if (!task) return next(new ErrorHandler("Task not found", 404));

    task.isCompleted = !task.isCompleted;
    await task.save();

    res.status(200).json({
      success: true,
      message: "Task Updated!",
    });
  } catch (error) {
    next(error);
  }
};

// export const updateTask = async (req, res, next) => {
//   const { id } = req.params;
//   const { title, description } = req.body;
//   const updatedtask = await Task.findByIdAndUpdate(
//     id,
//     { title, description },
//     { new: true }
//   );
//   updatedtask.isCompleted = !updatedtask.isCompleted;
//   await updatedtask.save();
//   res.status(200).send({
//     success: true,
//     message: "Task updated successfully",
//     task: updatedtask,
//   });
// };

export const deleteTask = async (req, res, next) => {
  //   const id = req.params.id;
  const task = await Task.findByIdAndRemove(req.params.id);

  if (!task) {
    // return next(new Error(""));
    return next(new ErrorHandler("task not found", 404));
    // return res.status(404).send({
    //   success: false,
    //   message: "Task not found or Invalid ID",
    // });
  }
  await task.deleteOne();
  res.status(200).send({
    success: true,
    message: "Task deleted successfully",
  });
};
