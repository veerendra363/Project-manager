import { useState } from "react";
import { useMutation } from "@apollo/client";
import { ADD_TASK_COMMENT } from "../../graphql/task/mutations";

interface CommentFormProps {
  taskId: string;
  onSuccess: () => void;
  onError: (msg: string) => void;
}

export default function CommentForm({ taskId, onSuccess, onError }: CommentFormProps) {
  const [content, setContent] = useState("");
  const [authorEmail, setAuthorEmail] = useState("");

  const [addComment, { loading }] = useMutation(ADD_TASK_COMMENT, {
    onCompleted: () => onSuccess(),
    onError: (err) => onError(err.message),
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!content.trim() || !authorEmail.trim()) return;

    addComment({
      variables: { taskId, content, authorEmail },
    });
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-2 w-full max-w-md p-4 bg-cyan-50 rounded-lg">
      <label className="text-sm font-medium text-blue-600">Your Email</label>
      <input
        type="email"
        value={authorEmail}
        onChange={(e) => setAuthorEmail(e.target.value)}
        placeholder="Enter your email"
        className="border rounded p-2 bg-white text-blue-600"
        required
      />

      <label className="text-sm font-medium text-blue-600">Comment</label>
      <textarea
        value={content}
        onChange={(e) => setContent(e.target.value)}
        placeholder="Write your comment..."
        className="border rounded p-2 bg-white text-blue-600"
        rows={4}
        required
      />

      <button type="submit" disabled={loading} className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 mt-2">
        {loading ? "Adding..." : "Add Comment"}
      </button>
    </form>
  );
}
