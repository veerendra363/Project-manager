import { ArrowLeft, Eye, Folder, FolderKanban, MessageCircle, Pencil, Plus } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

interface Column {
  key: string;
  label: string;
  minWidth?: number;
  maxWidth?: number;
}

interface DashboardCardProps<T> {
  data: T[];
  columns: Column[];
  totalCount: number;
  pageSize?: number;
  onPageChange?: (page: number) => void;
  onAddNew?: () => void;
  onView?: (item: T) => void;
  onForward?: (item: T) => void;
  onEdit?: (item: T) => void;
  dashboardType?: "org" | "proj" | "task"; 
}

export default function DashboardCard<T>({
  dashboardType,
  data,
  columns,
  totalCount,
  pageSize = 5,
  onPageChange,
  onAddNew,
  onView,
  onForward,
  onEdit,
}: DashboardCardProps<T>) {
  const [page, setPage] = useState(1);
  const totalPages = Math.ceil(totalCount / pageSize);
  const navigate = useNavigate()

  const handlePageChange = (newPage: number) => {
    if (newPage < 1 || newPage > totalPages) return;
    setPage(newPage);
    onPageChange?.(newPage);
  };
  const isRoot = location.pathname === "/";

  // Determine icon and label dynamically
  let forwardLabel = "";
  let ForwardIcon = FolderKanban;
  switch (dashboardType) {
    case "org":
      forwardLabel = "Projects";
      ForwardIcon = FolderKanban;
      break;
    case "proj":
      forwardLabel = "Tasks";
      ForwardIcon = Folder;
      break;
    case "task":
      forwardLabel = "Discussions";
      ForwardIcon = MessageCircle;
      break;
  }

  return (
    <div className="w-full bg-white shadow-md rounded-xl border border-gray-200 p-5">
      {/* Header */}
      <div className="flex items-center justify-between mb-5">
        <button
          onClick={() => !isRoot && navigate(-1)}
          disabled={isRoot}
          className={`inline-flex items-center gap-2 px-4 py-2 rounded-lg shadow transition
            ${isRoot ? "bg-gray-300 text-gray-500 cursor-not-allowed" : "bg-blue-600 text-white hover:bg-blue-700"}`}
        >
          <ArrowLeft size={18} />
          Back
        </button>
        {onAddNew && (
          <button
            onClick={onAddNew}
            className="inline-flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg shadow hover:bg-blue-700 transition"
          >
            <Plus size={18} />
            Add New
          </button>
        )}
      </div>

      {/* Table */}
      <div className="overflow-x-auto rounded-lg border border-gray-200 ">
        <table className="min-w-full divide-y divide-gray-200 text-sm">
          <thead className="bg-blue-600">
            <tr>
              {columns.map((col) => (
                <th
                  key={col.key}
                  className="px-4 py-3 text-center font-medium text-white uppercase tracking-wide text-xs"
                  style={{
                    minWidth: col.minWidth ?? 120,
                    maxWidth: col.maxWidth ?? 240,
                  }}
                >
                  {col.label}
                </th>
              ))}
              <th className="px-4 py-3 text-center font-medium text-white uppercase tracking-wide text-xs">
                Actions
              </th>
            </tr>
          </thead>

          <tbody className="divide-y divide-gray-100 bg-white">
            {data.map((item, idx) => (
              <tr
                key={idx}
                className="hover:bg-gray-100 transition-colors duration-150"
              >
                {columns.map((col) => {
                  const raw = (item as any)[col.key];
                  const text = raw == null ? "" : String(raw);

                  return (
                    <td
                      key={col.key}
                      className="px-4 py-2 text-gray-900 truncate"
                      style={{
                        minWidth: col.minWidth ?? 120,
                        maxWidth: col.maxWidth ?? 240,
                      }}
                    >
                      <span title={text}>{text}</span>
                    </td>
                  );
                })}

                {/* Actions */}
                <td className="px-4 py-2">
                  <div className="flex items-center justify-center gap-3">
                    {onView && (
                      <button
                        onClick={() => onView(item)}
                        className="bg-blue-600 text-white p-2 rounded hover:bg-blue-700"
                        title="View"
                      >
                        <Eye size={16} />
                      </button>
                    )}
                    {onForward && (
                      <button
                        onClick={() => onForward(item)}
                        className="bg-blue-600 text-white p-2 rounded hover:bg-blue-700"
                        title={forwardLabel}
                      >
                       <ForwardIcon size={16} />
                      </button>
                    )}
                    {onEdit && (
                      <button
                        onClick={() => onEdit(item)}
                        className="bg-blue-600 text-white p-2 rounded hover:bg-blue-700"
                        title="Edit"
                      >
                        <Pencil size={16} />
                      </button>
                    )}
                  </div>
                </td>
              </tr>
            ))}

            {data.length === 0 && (
              <tr>
                <td
                  colSpan={columns.length + 1}
                  className="px-4 py-6 text-center text-gray-500"
                >
                  No records found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="flex items-center justify-between mt-5">
        <p className="text-sm text-gray-700">
          Page <span className="font-semibold">{page}</span> of{" "}
          <span className="font-semibold">{totalPages}</span>
        </p>
        <div className="flex gap-2">
          <button
            disabled={page === 1}
            onClick={() => handlePageChange(page - 1)}
            className="px-3 py-1 rounded-md bg-blue-600 text-white disabled:opacity-50 hover:bg-blue-700 transition"
          >
            Prev
          </button>
          <button
            disabled={page === totalPages}
            onClick={() => handlePageChange(page + 1)}
            className="px-3 py-1 rounded-md bg-blue-600 text-white disabled:opacity-50 hover:bg-blue-700 transition"
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
}
