import { Task } from "../models/task.js";

export const newTask = async (req, res) => {
  const { title, description } = req.body;
  //   await Task.create
  /* This code is creating a new instance of the `Task` model with the `title` and `description`
properties taken from the `req.body` object. Then, it is saving the new task to the database using
the `save()` method, which is an asynchronous operation. The `await` keyword is used to wait for the
`save()` method to complete before moving on to the next line of code. */
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
    return res.status(404).send({
      success: false,
      message: "Task not found or Invalid ID",
    });
  }
  await task.deleteOne();
  res.status(200).send({
    success: true,
    message: "Task deleted successfully",
  });
};
