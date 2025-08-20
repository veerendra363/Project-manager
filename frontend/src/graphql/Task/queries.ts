import { gql } from "@apollo/client";

export const GET_TASKS_BY_PROJ = gql`
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