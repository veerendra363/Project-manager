import React from "react";

interface Comment {
  id: string;
  comment: string;
  assigneeEmail: string;
  createdAt: string;
}

interface CommentCardProps {
  comment: Comment;
}

export default function CommentCard({ comment }: CommentCardProps) {
  return (
    <div className="flex flex-col w-full bg-cyan-50 p-4 rounded-lg shadow-sm mb-3 break-words">
      <div className="flex items-start gap-3 w-full">
        {/* Circle with first letter */}
        <div
          className="w-8 h-8 rounded-full bg-blue-500 text-white flex items-center justify-center font-bold text-sm cursor-pointer shrink-0"
          title={comment.assigneeEmail} // Tooltip on hover
        >
          {comment.assigneeEmail.charAt(0).toUpperCase()}
        </div>

        {/* Comment content */}
        <div className="flex-1 text-blue-800 text-sm whitespace-pre-wrap text-left">
          {comment.comment}
        </div>
      </div>

      {/* Date at bottom-right */}
      <div className="flex justify-end text-xs text-blue-500 mt-2">
        {new Date(comment.createdAt).toLocaleString()}
      </div>
    </div>
  );
}
