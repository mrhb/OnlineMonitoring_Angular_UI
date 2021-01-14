import { Role } from "./role";

export class User {
    id: number;
    firstName: string;
    lastName: string;
    username: string;
    permissionLevel: Permission
    role: Role;
    token?: string;
}

//This shoulde be match with pemossionlevels 
//defined in env.config.js file in backend project
export const  enum Permission {
    NORMAL = 1,
    OWNER  = 4,
    ADMIN  = 2048,
  }