export interface IUser {
  //  Inter  face for the Signup
  id?: string | number;
  name: string;
  email: string;
  password: string;
}
export interface Ilogin {
  // interface for  the Login
  email: string;
  password: string;
}
export interface IUserUpdate {
  id: string | number;
  updateData: Partial<IUser>;
}
export type IJwtPayload = {
  email: string;
  username: string;
};
