import CommentCard from "./CommentCard";

interface DiscussionProps {
  comments: {
    id: string;
    content: string;
    authorEmail: string;
    createdAt: string;
  }[];
  onAdd: () => void
}

export default function Discussion({
  comments,
  onAdd,
}: DiscussionProps) {
  return (
    <div className="flex flex-col w-full p-4 gap-4 bg-cyan-50 rounded-lg">
      {/* Header */}
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold text-blue-600">Discussion</h2>
        <button
          className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600"
          onClick={onAdd}
        >
          Add Comment
        </button>
      </div>

      {/* Comments */}
      {comments.length === 0 ? (
        <div className="text-gray-500 text-center py-6">
          No comments yet. Be the first to comment!
        </div>
      ) : (
        <div className="flex flex-col w-full gap-4">
          {comments.map((c, idx) => (
            <div
              key={c.id}
              className={`flex w-full ${idx % 2 === 0 ? "justify-start" : "justify-end"}`}
            >
              <div className="w-full md:w-1/2">
                <CommentCard
                  comment={{
                    id: c.id,
                    comment: c.content,
                    assigneeEmail: c.authorEmail,
                    createdAt: c.createdAt,
                  }}
                />
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
