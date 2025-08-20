import { useQuery } from "@apollo/client";
import { useNavigate, useParams } from "react-router-dom";
import { useState } from "react";
import Loading from "../../components/Loading";
import Error from "../../components/Error";
import TaskCard from "../../components/TaskCard";
import Discussion from "../../components/Discussion";
import { GET_TASK, GET_TASK_COMMENTS } from "../../graphql/task/queries";
import CommentForm from "./CommentForm";
import Modal from "../../components/Model";
import Toast from "../../components/Toast";
import { ArrowLeft } from "lucide-react";

export default function Task() {
  const [isModalOpen, setModalOpen] = useState(false);
  const [toast, setToast] = useState<{ message: string; type: "success" | "error" } | null>(null);
  const { taskId } = useParams<{ taskId: string }>();
  const navigate = useNavigate();

  const pageSize = 25; // initial load count
  const orderBy = "desc";

  const { loading: taskLoading, error: taskError, data: taskData } = useQuery(GET_TASK, {
    variables: { id: taskId },
  });

  const {
    loading: commentsLoading,
    error: commentsError,
    data: commentsData,
    refetch: commentsRefetch
  } = useQuery(GET_TASK_COMMENTS, {
    variables: { taskId, page: 1, pageSize, orderBy },
  });


  if(commentsLoading || taskLoading) <Loading />
  if(commentsError || taskError) {
    <Error message="Error while fetching the comments for the Task" />
  }

  const handleSuccess = async () => {
    setModalOpen(false);
    await commentsRefetch({ taskId, page: 1, pageSize, orderBy })
    setToast({ message: `✅ Comment added successfully!`, type: "success" });
  };

  const handleError = (msg: string) => {
    setModalOpen(false);
    setToast({ message: `❌ ${msg}`, type: "error" });
  };

  const task = taskData?.task;
  const comments = commentsData?.taskComments?.results ?? []; 
  const commentsCount = commentsData?.taskComments?.totalCount;

  return (
    <div className="mx-auto p-4 flex flex-col gap-4 w-[750px]">
      <button
        onClick={() => navigate(-1)}
        className={`inline-flex items-center gap-2 px-4 py-2 rounded-lg shadow transition w-fit`}
        >
          <ArrowLeft size={18} />
          Back
        </button>
      {task && (
        <TaskCard
          task={{
            id: task.id,
            title: task.title,
            description: task.description,
            status: task.status,
            assigneeEmail: task.assigneeEmail,
            createdAt: task.createdAt,
            totalComments: commentsCount,
          }}
        />
      )}

      <Discussion
        comments={comments}
        onAdd={() => setModalOpen(true)}
      />

      <Modal isOpen={isModalOpen} onClose={() => setModalOpen(false)} title="Add Comment">
        <CommentForm taskId={task?.id} onSuccess={handleSuccess} onError={handleError} />
      </Modal>

      {toast && (
        <Toast message={toast.message} type={toast.type} onClose={() => setToast(null)} />
      )}
    </div>
  );
}
