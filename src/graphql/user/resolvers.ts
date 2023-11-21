import UserService, { ICreateUserPayload } from "../../services/user";

const queries = {
  getUserToken: async (
    _: any,
    payload: { email: string; password: string }
  ) => {
    const token = await UserService.getUserToken(payload);
    return token;
  },
  getCurrentLoggedInUser: async (_: any, params: any, context: any) => {
    if (context && context.user) {
      const id = context.user.id;
      const user = await UserService.getUserById(id);
      return user;
    }
    throw new Error("I dont know who are you");
  },
};

const mutations = {
  createUser: async (_: any, payload: ICreateUserPayload) => {
    const result = await UserService.createUser(payload);
    return result.id;
  },
};

export const resolvers = { queries, mutations };
