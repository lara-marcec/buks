import { GraphQLClient, gql } from 'graphql-request';

const client = new GraphQLClient(import.meta.env.VITE_HARDCOVER_API_URL, {
  headers: {
    Authorization: `Bearer ${import.meta.env.VITE_HARDCOVER_API_KEY}`,
  },
});

export { client, gql };
