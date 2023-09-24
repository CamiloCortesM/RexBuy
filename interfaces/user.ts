export interface IUser {
  _id: string;
  name: string;
  email: string;
  password: string;
  role: string;

  userImage?: string;
  department?: string;
  city?: string;
  address?: string;
  cellphone?:string;

  createdAt?: string;
  updatedAt?: string;
}
