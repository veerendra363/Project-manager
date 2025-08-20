import React from "react";

interface Task {
  id: string;
  title: string;
  description?: string;
  status: string;
  assigneeEmail: string;
  createdAt: string;
  totalComments: number;
}

interface TaskCardProps {
  task: Task;
  onCommentClick?: (taskId: string) => void; // callback for future comment button
}

const STATUS_COLORS: Record<string, string> = {
  TD: "bg-yellow-200 text-yellow-800",
  IP: "bg-blue-200 text-blue-800",
  DN: "bg-green-200 text-green-800",
};

export default function TaskCard({ task, onCommentClick }: TaskCardProps) {
  return (
    <div className="w-full bg-cyan-50 p-4 rounded-lg shadow-md mb-4">
      <div className="flex justify-between items-start w-full">
        {/* Left side - Task info */}
        <div className="flex flex-col gap-2 flex-1">
          <div className="flex items-center justify-between capitalize">
            <h3 className="text-lg font-bold text-blue-900">{task.title}</h3>
            <span
              className={`px-2 py-1 rounded text-xs font-semibold ${STATUS_COLORS[task.status]}`}
            >
              {task.status === "TD" ? "To Do" : task.status === "IP" ? "In Progress" : "Done"}
            </span>
          </div>

          <p className="text-blue-800 text-sm whitespace-pre-wrap text-left mt-5">{task.description}</p>

          <div className="flex items-center gap-3 text-sm text-blue-500 mt-5">
            <span className="font-medium">Assignee:</span> {task.assigneeEmail}
          </div>

          <div className="flex items-center gap-3 text-sm text-blue-500 mt-1">
            <span className="font-medium">Created At:</span>{" "}
            {new Date(task.createdAt).toLocaleString()}
          </div>

          <div className="flex items-center gap-3 text-sm text-blue-500 mt-1">
            <span className="font-medium">Total Comments:</span> {task.totalComments}
          </div>
        </div>

        {/* Right side - Comment button */}
        {onCommentClick && (
          <button
            className="ml-4 bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded shadow-sm text-sm"
            onClick={() => onCommentClick(task.id)}
          >
            Comment
          </button>
        )}
      </div>
    </div>
  );
}
