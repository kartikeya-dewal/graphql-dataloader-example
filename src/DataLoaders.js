import {RESTDataSource} from "@apollo/datasource-rest";
import DataLoader from "dataloader";

const baseURL = "https://jsonplaceholder.typicode.com/";

export class UserDataLoader extends RESTDataSource {
  constructor() {
    super();
    this.baseURL = baseURL;
  }

  user = new DataLoader(async (userIds) => {
    const users = await this.getUsersByIds(userIds);
    return userIds.map((userId) => {
      return users.find((user) => String(user.id) === String(userId));
    });
  });

  getUsersByIds = async (userIds) => {
    return await this.get(`users/`);
  };
}

export class CommentDataLoader extends RESTDataSource {
  constructor() {
    super();
    this.baseURL = baseURL;
  }

  comment = new DataLoader(async (postIds) => {
    const comments = await this.getCommentsByPostIds(postIds);
    return postIds.map((postId) => {
      return comments.filter((comment) => String(comment.postId) === String(postId))
        }
    )
  });

  getCommentsByPostIds = async (postIds) => {
    return await this.get(`comments/`);
  };
}
