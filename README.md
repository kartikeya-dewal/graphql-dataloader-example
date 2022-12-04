## GraphQL DataLoader Example

This is a bare-bones graphql app that interacts with [JSON Placeholder API](https://jsonplaceholder.typicode.com)
to demonstrate basic query/mutation resolvers and dataloaders.

### Query

```graphql
query Posts {
    posts {
        id
        title
        body
        user {
            id
            name
            email
        }
        comments {
            id
            postId
            email
            body
        }
    }
}

```

### Mutation

```graphql
mutation UpdatePost($id: ID!, $title: String!, $body: String!, $userId: ID!) {
	updatePost(id: $id, title: $title, body: $body, userId: $userId) {
		id
		user {
            id
		}
		title
		body
		comments {
            id
		}
	}
}
```
NOTE: The updatePost mutation above always returns an id of 101 from the JsonPlaceholder api.  
### Resources

RESTDataSource

https://www.apollographql.com/docs/apollo-server/data/fetching-rest/

Dataloader

https://www.npmjs.com/package/dataloader

### Develop

To start the server:

`npm run start`

