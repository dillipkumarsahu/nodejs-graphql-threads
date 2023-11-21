import ThreadService from "../../services/thread";

const queries = {
  getAllThreads: async (_: any, payload: { skip: number; limit: number }) => {
    const threads = await ThreadService.getAllThreads(
      payload.skip,
      payload.limit
    );
    return threads;
  },
  getThreadById: async (_: any, payload: { id: string }) => {
    const thread = await ThreadService.getThreadById(payload.id);
    return thread;
  },
};

const mutations = {
  postThread: async (_: any, payload: { thread: string }, context: any) => {
    if (context && context.user) {
      const { id } = await ThreadService.postThread({
        userId: context.user.id,
        thread: payload.thread,
      });
      return id;
    } else {
      return "Unauthorized access";
    }
  },
};

export const resolvers = { queries, mutations };
