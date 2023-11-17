import UserService, { ICreateUserPayload } from "../../services/user";

const queries = {
  getUserToken: async (
    _: any,
    payload: { email: string; password: string }
  ) => {
    const token = await UserService.getUserToken(payload);
    return token;
  },
};

const mutations = {
  createUser: async (_: any, payload: ICreateUserPayload) => {
    const result = await UserService.createUser(payload);
    return result.id;
  },
};

export const resolvers = { queries, mutations };
