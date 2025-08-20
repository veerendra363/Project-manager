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

export const GET_TASK = gql`
  query GetTask($id: ID!) {
    task(id: $id) {
      id
      title
      description
      status
      assigneeEmail
      createdAt
    }
  }
`;

export const GET_TASK_COMMENTS = gql`
  query GetTaskComments($taskId: ID!, $page: Int!, $pageSize: Int!) {
    taskComments(taskId: $taskId, page: $page, pageSize: $pageSize) {
      totalCount
      results {
        id
        content
        authorEmail
        createdAt
      }
    }
  }
`;

