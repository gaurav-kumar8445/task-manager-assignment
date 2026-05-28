import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  // 🌟 Testing ke liye kuch dummy tasks pehle se daal diye hain
  const [tasks, setTasks] = useState([
    {
      _id: "task1",
      title: "Complete Front-end UI",
      description: "Build dashboard and connect buttons",
      dueDate: "2026-06-01",
      priority: "high",
      status: "pending",
      assignedTo: "user1",
    },
    {
      _id: "task2",
      title: "Review Backend API",
      description: "Check token authentication logic",
      dueDate: "2026-06-05",
      priority: "medium",
      status: "completed",
      assignedTo: "user2",
    }
  ]);

  const navigate = useNavigate();
  const [loading, setLoading] = useState(false); // Testing ke liye true se false kiya taaki load na atke
  const [userInfo, setUserInfo] = useState({ _id: "123", role: "admin" });
  
  // 🌟 Testing ke liye dummy users taaki Dropdown aur Table me name dikhe
  const [users, setUsers] = useState([
    { _id: "user1", name: "Shubham" },
    { _id: "user2", name: "Sandy" },
  ]);

  const [showModal, setShowModal] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [selectedTaskId, setSelectedTaskId] = useState(null);

  const [showViewModal, setShowViewModal] = useState(false);
  const [viewTask, setViewTask] = useState(null);

  const MODAL_BACKDROP =
    "fixed inset-0 backdrop-blur-sm bg-black/10 flex items-center justify-center";

  const [taskForm, setTaskForm] = useState({
    title: "",
    description: "",
    dueDate: "",
    priority: "medium",
    assignedTo: "",
  });

  const handleChange = (e) => {
    setTaskForm({ ...taskForm, [e.target.name]: e.target.value });
  };

  // 🔥 CREATE aur EDIT dono bina kisi backend token error ke chalenge
  const handleSubmitTask = async (e) => {
    e.preventDefault();

    if (isEditing) {
      // 1. EDIT: Frontend par state instantly update karo
      setTasks(
        tasks.map((task) =>
          task._id === selectedTaskId ? { ...task, ...taskForm } : task
        )
      );
      alert("Task updated successfully");
    } else {
      // 2. CREATE: Frontend par naya task push karo ek unique temporary id ke sath
      const newTask = {
        ...taskForm,
        _id: Math.random().toString(36).substr(2, 9),
        status: "pending", // Shuru me status pending rahega
      };
      setTasks([...tasks, newTask]);
      alert("Task created successfully");
    }

    resetModal();
  };

  const resetModal = () => {
    setShowModal(false);
    setIsEditing(false);
    setSelectedTaskId(null);
    setTaskForm({
      title: "",
      description: "",
      dueDate: "",
      priority: "medium",
      assignedTo: "",
    });
  };

  const handleEdit = (task) => {
    setIsEditing(true);
    setSelectedTaskId(task._id);
    setTaskForm({
      title: task.title,
      description: task.description,
      dueDate: task.dueDate ? task.dueDate.split("T")[0] : "",
      priority: task.priority,
      assignedTo: task.assignedTo,
    });
    setShowModal(true);
  };

  const handleView = (task) => {
    setViewTask(task);
    setShowViewModal(true);
  };

  // 🔥 DELETE bina kisi error ke instantly chalega
  const handleDelete = (taskId) => {
    setTasks(tasks.filter((task) => task._id !== taskId));
    alert("Task deleted successfully");
  };

  // 🔥 Mark As Complete status click handle karne ke liye
  const handleStatusUpdate = (id) => {
    setTasks(
      tasks.map((task) =>
        task._id === id ? { ...task, status: "completed" } : task
      )
    );
    alert("Task status updated to completed!");
  };

  // Backend calls ko testing ke waqt comment ya normal rakha hai kyunki data ab static chal raha hai
  const getUserInfo = async () => {};
  const getAllUsersList = async () => {};
  const getTaskList = async () => {};

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center text-gray-600">
        Loading dashboard...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Task Dashboard ({userInfo.role})</h1>

        {userInfo.role === "admin" && (
          <button
            onClick={() => setShowModal(true)}
            className="bg-blue-600 text-white px-4 py-2 rounded"
          >
            + Create Task
          </button>
        )}
      </div>

      {/* Task Table */}
      <div className="overflow-x-auto bg-white rounded shadow">
        <table className="min-w-full text-sm">
          <thead className="bg-gray-200">
            <tr>
              <th className="p-3 text-left">Title</th>
              <th className="p-3 text-left">Due Date</th>
              <th className="p-3 text-left">Priority</th>
              <th className="p-3 text-left">Status</th>
              <th className="p-3 text-left">Assigned To</th>
              <th className="p-3 text-left">Actions</th>
            </tr>
          </thead>

          <tbody>
            {tasks.map((task) => (
              <tr key={task._id} className="border-t">
                <td className="p-3">{task.title}</td>
                <td className="p-3">{task.dueDate ? task.dueDate.split("T")[0] : "—"}</td>
                <td className="p-3 capitalize">{task.priority}</td>
                <td className="p-3 capitalize">
                  <span
                    className={
                      task.status === "completed"
                        ? "text-green-600 font-semibold"
                        : "text-orange-600 font-semibold"
                    }
                  >
                    {task.status || "pending"}
                  </span>
                </td>
                <td className="p-3">
                  {users.find((u) => u._id === task.assignedTo)?.name || "N/A"}
                </td>
                <td className="p-3 space-x-3">
                  <button
                    onClick={() => handleView(task)}
                    className="text-blue-600 hover:underline"
                  >
                    View
                  </button>

                  {userInfo.role === "user" && task.status !== "completed" && (
                    <button
                      onClick={() => handleStatusUpdate(task._id)}
                      className="text-green-600 hover:underline"
                    >
                      Mark As Complete
                    </button>
                  )}

                  {userInfo.role === "admin" && (
                    <>
                      <button
                        onClick={() => handleEdit(task)}
                        className="text-yellow-600 hover:underline"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDelete(task._id)}
                        className="text-red-600 hover:underline"
                      >
                        Delete
                      </button>
                    </>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* CREATE / EDIT MODAL */}
      {showModal && (
        <div className={MODAL_BACKDROP}>
          <div className="bg-white p-6 rounded-lg w-full max-w-lg shadow-lg">
            <h2 className="text-lg font-semibold mb-4">
              {isEditing ? "Edit Task" : "Create Task"}
            </h2>

            <form onSubmit={handleSubmitTask} className="space-y-3">
              <input
                name="title"
                placeholder="Title"
                required
                value={taskForm.title}
                onChange={handleChange}
                className="w-full border p-2 rounded"
              />

              <textarea
                name="description"
                placeholder="Description"
                value={taskForm.description}
                onChange={handleChange}
                className="w-full border p-2 rounded"
              />

              <input
                type="date"
                name="dueDate"
                value={taskForm.dueDate}
                onChange={handleChange}
                className="w-full border p-2 rounded"
              />

              <select
                name="priority"
                value={taskForm.priority}
                onChange={handleChange}
                className="w-full border p-2 rounded"
              >
                <option value="low">Low</option>
                <option value="medium">Medium</option>
                <option value="high">High</option>
              </select>

              <select
                name="assignedTo"
                value={taskForm.assignedTo}
                onChange={handleChange}
                className="w-full border p-2 rounded"
              >
                <option value="">Assign User</option>
                {users.map((u) => (
                  <option key={u._id} value={u._id}>
                    {u.name}
                  </option>
                ))}
              </select>

              <div className="flex justify-end gap-2 pt-3">
                <button
                  type="button"
                  onClick={resetModal}
                  className="border px-4 py-2 rounded"
                >
                  Cancel
                </button>
                <button className="bg-blue-600 text-white px-4 py-2 rounded">
                  {isEditing ? "Update" : "Create"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* VIEW MODAL */}
      {showViewModal && viewTask && (
        <div className={MODAL_BACKDROP}>
          <div className="bg-white p-6 rounded-lg w-full max-w-lg shadow-lg">
            <h2 className="text-lg font-semibold mb-4">Task Details</h2>

            <div className="space-y-2 text-sm">
              <p>
                <strong>Title:</strong> {viewTask.title}
              </p>
              <p>
                <strong>Description:</strong> {viewTask.description || "—"}
              </p>
              <p>
                <strong>Due Date:</strong> {viewTask.dueDate ? viewTask.dueDate.split("T")[0] : "—"}
              </p>
              <p>
                <strong>Priority:</strong> <span className="capitalize">{viewTask.priority}</span>
              </p>
              <p>
                <strong>Status:</strong> <span className="capitalize">{viewTask.status || "pending"}</span>
              </p>
              <p>
                <strong>Assigned To:</strong> {users.find((u) => u._id === viewTask.assignedTo)?.name || "N/A"}
              </p>
            </div>

            <div className="flex justify-end pt-4">
              <button
                onClick={() => setShowViewModal(false)}
                className="border px-4 py-2 rounded"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Dashboard;