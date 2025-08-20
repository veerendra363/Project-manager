import { useState } from "react";
import CommentCard from "./CommentCard";
import { ArrowDown, ArrowUp } from "lucide-react";

interface DiscussionProps {
  comments: {
    id: string;
    comment: string;
    assigneeEmail: string;
    createdAt: string;
  }[];
}

const INITIAL_COUNT = 10;

export default function Discussion({ comments }: DiscussionProps) {
  const [visibleCount, setVisibleCount] = useState(INITIAL_COUNT);
  const totalComments = comments.length;

  const handleLoadMore = () => {
    setVisibleCount((prev) => Math.min(prev + INITIAL_COUNT, totalComments));
  };

  const handleShowLess = () => {
    setVisibleCount(INITIAL_COUNT);
  };

  return (
    <div className="flex flex-col w-full p-4 gap-4 bg-cyan-50 rounded-lg">
      {/* Header */}
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold text-blue-600">Discussion</h2>
        <button
          className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600"
          onClick={() => console.log("Add comment clicked")}
        >
          Add Comment
        </button>
      </div>

      {/* Comments */}
      { comments.length === 0 &&
        <div className="text-gray-500 text-center py-6">
          No comments yet. Be the first to comment!
        </div>
        }
      <div className="flex flex-col w-full gap-4">
        {comments.slice(0, visibleCount).map((c, idx) => (
          <div
            key={c.id}
            className={`flex w-full ${idx % 2 === 0 ? "justify-start" : "justify-end"}`}
          >
            <div className="w-full md:w-1/2">
              <CommentCard comment={c} />
            </div>
          </div>
        ))}
      </div>

      {/* Load More / Show Less */}
      <div className="flex justify-center gap-4 mt-2">
        {visibleCount < totalComments && (
          <button
            className="flex items-center gap-1 text-blue-600 hover:text-blue-800 hover:underline"
            onClick={handleLoadMore}
          >
            <ArrowDown size={16} /> Load More
          </button>
        )}
        {visibleCount > INITIAL_COUNT && (
          <button
            className="flex items-center gap-1 text-blue-600 hover:text-blue-800 hover:underline"
            onClick={handleShowLess}
          >
            <ArrowUp size={16} /> Show Less
          </button>
        )}
      </div>
    </div>
  );
}
