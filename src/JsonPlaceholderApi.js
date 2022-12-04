import { RESTDataSource } from "@apollo/datasource-rest";

export class JsonPlaceholderApi extends RESTDataSource {
  constructor() {
    super();

    this.baseURL = "https://jsonplaceholder.typicode.com/";
  }

  async getPlaceholderPosts() {
    return this.get(`posts/`);
  }

  async getComment(parent, args) {
    return await this.get(`comments/`);
  }

  async updatePost(args) {
    return await this.post(`posts`, {
      body: {
        id: args.id,
        title: args.title,
        body: args.body,
        userId: args.userId,
      },
      headers: { "Content-Type": "Application/Json" },
    });
  }
}
