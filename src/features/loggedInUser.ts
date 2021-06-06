import { User } from "./users";

export type loggedInUserType = Pick<User, "id" | "name">;
