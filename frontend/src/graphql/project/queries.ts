import { gql } from '@apollo/client';

export const GET_PROJECTS_BY_ORG = gql`
  query GetProjectsByOrganization($organizationId: ID!) {
    projects(organizationId: $organizationId) {
      id
      name
      status
      dueDate
      description
    }
  }
`;
