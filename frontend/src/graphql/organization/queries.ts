import { gql } from '@apollo/client';

export const GET_ORGANIZATIONS = gql`
  query GetOrganizations($page: Int = 1, $pageSize: Int = 5, $orderBy: String = "desc") {
    organizations(page: $page, pageSize: $pageSize, orderBy: $orderBy) {
      totalCount
      results {
        id
        name
        slug
        contactEmail
      }
    }
  }
`;
