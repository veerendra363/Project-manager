import { gql } from "@apollo/client";

export const CREATE_TASK = gql`
  mutation CreateTask($projectId: ID!, $title: String!, $assigneeEmail: String!, $description: String, $status: String) {
    createTask(projectId: $projectId, title: $title, assigneeEmail: $assigneeEmail, description: $description, status: $status) {
      task {
        id
        title
        description
        status
        assigneeEmail
      }
    }
  }
`;

export const UPDATE_TASK = gql`
  mutation UpdateTask($id: ID!, $title: String, $description: String, $status: String, $assigneeEmail: String) {
    updateTask(id: $id, title: $title, description: $description, status: $status, assigneeEmail: $assigneeEmail) {
      task {
        id
        title
        description
        status
        assigneeEmail
      }
    }
  }
`;

export const ADD_TASK_COMMENT = gql`
  mutation AddTaskComment($taskId: ID!, $content: String!, $authorEmail: String!) {
    addTaskComment(taskId: $taskId, content: $content, authorEmail: $authorEmail) {
      comment {
        id
        content
        authorEmail
        timestamp
      }
    }
  }
`;
