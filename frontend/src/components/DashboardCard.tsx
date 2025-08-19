import { useState } from 'react';

interface Column {
  key: string;
  label: string;
}

interface DashboardCardProps<T> {
  data: T[];
  columns: Column[];
  onRowClick?: (item: T) => void;
}

export default function DashboardCard<T>({ data, columns, onRowClick }: DashboardCardProps<T>) {
  const [view, setView] = useState<'list' | 'grid'>('list');

  return (
    <div>
      {/* Toggle Buttons */}
      <div className="mb-4">
        <button
          className={`px-4 py-2 mr-2 rounded ${view === 'list' ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
          onClick={() => setView('list')}
        >
          List View
        </button>
        <button
          className={`px-4 py-2 rounded ${view === 'grid' ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
          onClick={() => setView('grid')}
        >
          Grid View
        </button>
      </div>

      {/* List View */}
      {view === 'list' && (
        <table className="min-w-full border border-gray-300">
          <thead className="bg-blue-400">
            <tr>
              {columns.map((col) => (
                <th key={col.key} className="p-2 border">{col.label}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {data.map((item, idx) => (
              <tr 
              key={idx} 
              className="hover:bg-gray-50 cursor-pointer"
              onClick={() => onRowClick && onRowClick(item)}>
                {columns.map((col) => (
                  <td key={col.key} className="p-2 border">{(item as any)[col.key]}</td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      )}

      {/* Grid View */}
      {view === 'grid' && (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {data.map((item, idx) => (
            <div
              key={idx}
              className="p-4 rounded-lg shadow-lg border cursor-pointer hover:shadow-xl transition-shadow"
              onClick={() => onRowClick && onRowClick(item)}
            >
              {columns.map((col) => (
                <p key={col.key}><strong>{col.label}:</strong> {(item as any)[col.key]}</p>
              ))}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
