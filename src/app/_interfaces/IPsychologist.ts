import IUser from "./IUser";

export interface IPsychologist {
  _id?: string;
  fullName: string;
  gender: string;
  user: IUser | string;
  profilePicture: string;
  slug: string;
  bio?: string;
  calification?: number;
  specialties?: string[];
  services?: string[];
  isPublic: true;

  createAt?: string;
  updatedAt?: string;
}
