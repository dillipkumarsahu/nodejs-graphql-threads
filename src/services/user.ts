import { createHmac, randomBytes } from "node:crypto";
import JWT from "jsonwebtoken";
import { prismaClient } from "../lib/db";

export interface ICreateUserPayload {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
}
export interface IGetUserTokenPayload {
  email: string;
  password: string;
}

class UserService {
  // generate hash
  private static generateHash(salt: string, password: string) {
    const hashedPassword = createHmac("sha256", salt)
      .update(password)
      .digest("hex");

    return hashedPassword;
  }
  // create an user
  public static async createUser(payload: ICreateUserPayload) {
    const { firstName, lastName, email, password } = payload;
    const salt = await randomBytes(32).toString("hex");
    const hashedPassword = UserService.generateHash(salt, password);
    return prismaClient.user.create({
      data: { firstName, lastName, email, password: hashedPassword, salt },
    });
  }
  // get email by user
  private static getUserByEmail(email: string) {
    return prismaClient.user.findUnique({ where: { email } });
  }
  // get user token by validating email and password
  public static async getUserToken(payload: IGetUserTokenPayload) {
    const { email, password } = payload;
    const user = await UserService.getUserByEmail(email);

    if (!user) throw new Error("User not found!");

    const userSalt = user.salt;
    const usersHashPassword = UserService.generateHash(userSalt, password);

    if (usersHashPassword !== user.password)
      throw new Error("Incorrect Password");

    // Generate Token
    const token = JWT.sign(
      { id: user.id, email: user.email },
      process.env.JWT_SECRET!
    );
    return token;
  }
}

export default UserService;
