import { useMutation } from "@apollo/client";
import { useState, useEffect } from "react";
import Loading from "../../components/Loading";
import { CREATE_TASK, UPDATE_TASK } from "../../graphql/task/mutations";

interface TaskFormProps {
  projectId: string;
  onSuccess: () => void;
  onError: (msg: string) => void;
  task?: {
    id: string;
    title?: string;
    description?: string;
    status?: string;
    assigneeEmail?: string;
  } | null;
}

const STATUS_CHOICES = [
  { value: "TD", label: "To Do" },
  { value: "IP", label: "In Progress" },
  { value: "DN", label: "Done" },
];

export default function TaskForm({ projectId, onSuccess, onError, task }: TaskFormProps) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [status, setStatus] = useState("TD");
  const [assigneeEmail, setAssigneeEmail] = useState("");

  useEffect(() => {
    if (task) {
      setTitle(task.title || "");
      setDescription(task.description || "");
      setStatus(task.status || "TD");
      setAssigneeEmail(task.assigneeEmail || "");
    }
  }, [task]);

  const [createTask, { loading: creating }] = useMutation(CREATE_TASK, {
    onCompleted: () => onSuccess(),
    onError: (err) => onError(err.message),
  });

  const [updateTask, { loading: updating }] = useMutation(UPDATE_TASK, {
    onCompleted: () => onSuccess(),
    onError: (err) => onError(err.message),
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (task?.id) {
      updateTask({ variables: { id: task.id, title, description, status, assigneeEmail } });
    } else {
      createTask({ variables: { projectId, title, description, status, assigneeEmail } });
    }
  };

  if (creating || updating) return <Loading />;

  return (
    <div className="flex justify-center items-center">
      <form
        className="flex flex-col gap-2 w-full max-w-md bg-white p-6 rounded-lg shadow-md"
        onSubmit={handleSubmit}
      >
        {/* Title */}
        <label className="text-sm font-medium text-black mt-2 text-left">Title</label>
        <input
          type="text"
          placeholder="Enter task title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="border rounded p-2 bg-cyan-50 text-blue-600 placeholder-blue-400"
          required
        />

        {/* Description */}
        <label className="text-sm font-medium text-black mt-2 text-left">Description</label>
        <textarea
          placeholder="Enter task description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="border rounded p-2 bg-cyan-50 text-blue-600 placeholder-blue-400"
        />

        {/* Status */}
        <label className="text-sm font-medium text-black mt-2 text-left">Status</label>
        <select
          value={status}
          onChange={(e) => setStatus(e.target.value)}
          className="border rounded p-2 bg-cyan-50 text-blue-600"
          required
        >
          {STATUS_CHOICES.map((opt) => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>

        {/* Assignee Email */}
        <label className="text-sm font-medium text-black mt-2 text-left">Assignee Email</label>
        <input
          type="email"
          placeholder="Enter assignee email"
          value={assigneeEmail}
          onChange={(e) => setAssigneeEmail(e.target.value)}
          className="border rounded p-2 bg-cyan-50 text-blue-600 placeholder-blue-400"
          required
        />

        {/* Submit Button */}
        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 mt-4"
        >
          {task?.id ? "Update" : "Create"}
        </button>
      </form>
    </div>
  );
}
