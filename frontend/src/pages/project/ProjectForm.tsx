import { useMutation } from "@apollo/client";
import { useState, useEffect } from "react";
import Loading from "../../components/Loading";
import { CREATE_PROJECT, UPDATE_PROJECT } from "../../graphql/project/mutations";

interface ProjectFormProps {
  organizationId: string; // parent passes the org id
  onSuccess: () => void;
  onError: (msg: string) => void;
  project?: {
    id: string;
    name?: string;
    description?: string;
    status?: string;
    dueDate?: string;
  } | null;
}

const STATUS_CHOICES = [
  { value: "PL", label: "Planned" },
  { value: "IP", label: "In Progress" },
  { value: "CO", label: "Completed" },
  { value: "ON", label: "On Hold" },
];

export default function ProjectForm({
  organizationId,
  onSuccess,
  onError,
  project,
}: ProjectFormProps) {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [status, setStatus] = useState("PL");
  const [dueDate, setDueDate] = useState("");

  // Populate fields if editing
  useEffect(() => {
    if (project) {
      setName(project.name || "");
      setDescription(project.description || "");
      setStatus(project.status || "PL");
      setDueDate(project.dueDate || "");
    }
  }, [project]);

  const [createProject, { loading: creating }] = useMutation(CREATE_PROJECT, {
    onCompleted: () => onSuccess(),
    onError: (err) => onError(err.message),
  });

  const [updateProject, { loading: updating }] = useMutation(UPDATE_PROJECT, {
    onCompleted: () => onSuccess(),
    onError: (err) => onError(err.message),
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (project?.id) {
      // Update
      updateProject({
        variables: {
          id: project.id,
          name,
          description,
          status,
          dueDate: dueDate || null,
        },
      });
    } else {
      // Create
      createProject({
        variables: {
          organizationId,
          name,
          description,
          status,
          dueDate: dueDate || null,
        },
      });
    }
  };

  if (creating || updating) return <Loading />;

  return (
    <div className="flex justify-center items-center">
      <form
        className="flex flex-col gap-2 w-full max-w-md bg-white p-6 rounded-lg shadow-md"
        onSubmit={handleSubmit}
      >
        {/* Project Name */}
        <label className="text-sm font-medium text-black mt-2 text-left">Project Name</label>
        <input
          type="text"
          placeholder="Enter project name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="border rounded p-2 bg-cyan-50 text-blue-600 placeholder-blue-400"
          required
        />

        {/* Description */}
        <label className="text-sm font-medium text-black mt-2 text-left">Description</label>
        <textarea
          placeholder="Enter description"
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

        {/* Due Date */}
        <label className="text-sm font-medium text-black mt-2 text-left">Due Date</label>
        <input
          type="date"
          value={dueDate}
          onChange={(e) => setDueDate(e.target.value)}
          className="border rounded p-2 bg-cyan-50 text-blue-600"
        />

        {/* Submit Button */}
        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 mt-4"
        >
          {project?.id ? "Update" : "Create"}
        </button>
      </form>
    </div>
  );
}
