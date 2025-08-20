import { useQuery } from "@apollo/client";
import { useParams } from "react-router-dom";
import Loading from "../../components/Loading";
import Error from "../../components/Error";
import TaskCard from "../../components/TaskCard";
import Discussion from "../../components/Discussion";
import { GET_TASK_WITH_COMMENTS } from "../../graphql/task/queries";

export default function Task() {
  const { taskId } = useParams<{ taskId: string }>();

  const { loading, error, data, refetch } = useQuery(GET_TASK_WITH_COMMENTS, {
    variables: { id: taskId },
  });

  if (loading) return <Loading />;
  if (error) return <Error message={error.message} />;

  const task = data?.task;
  const comments = data?.taskComments?.results || [];

  return (
    <div className="min-w-[300px] max-w-[750px] mx-auto p-4 flex flex-col gap-4">
      {task && <TaskCard task={{
        id: task.id,
        title: task.title,
        description: task.description,
        status: task.status,
        assigneeEmail: task.assigneeEmail,
        createdAt: task.createdAt,
        totalComments: task.totalComments,
      }}/>}
      
      <Discussion comments={comments} />
    </div>
  );
}
