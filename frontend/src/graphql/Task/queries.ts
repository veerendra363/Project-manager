import { gql } from "@apollo/client";

export const GET_TASKS_BY_PROJECT = gql`
  query GetTasksByProject(
    $projectId: ID!
    $page: Int = 1
    $pageSize: Int = 5
    $orderBy: String = "desc"
  ) {
    tasks(
      projectId: $projectId
      page: $page
      pageSize: $pageSize
      orderBy: $orderBy
    ) {
      totalCount
      results {
        id
        title
        status
        assigneeEmail
        description
      }
    }
  }
`;

export const GET_TASK_WITH_COMMENTS = gql`
  query GetTaskWithComments($id: ID!) {
    task(id: $id) {
      id
      title
      description
      status
      assigneeEmail
      createdAt
      totalComments
    }
    taskComments(taskId: $id, page: 1, pageSize: 50) {
      totalCount
      results {
        id
        comment
        assigneeEmail
        createdAt
      }
    }
  }
`;
