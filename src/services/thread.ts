import { Prisma } from "@prisma/client";
import { prismaClient } from "../lib/db";

export interface IThreadPayload {
  userId: string;
  thread: string;
}

class ThreadService {
  public static async postThread(payload: IThreadPayload) {
    return prismaClient.thread.create({
      data: payload,
    });
  }
  public static getThreadById(id: string) {
    return prismaClient.thread.findUnique({ where: { id } });
  }
  public static getAllThreads(skip: number, limit: number) {
    const options: Prisma.ThreadFindManyArgs = {
      skip: skip,
      take: limit,
    };
    return prismaClient.thread.findMany(options);
  }
}

export default ThreadService;
