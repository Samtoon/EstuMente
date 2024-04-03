import IUser from "./IUser";

export interface IPsychologist {
  _id: string;
  fullName: string;
  profilePicture: string;
  gender: string;
  user: IUser;
  slug: string;
  bio: string;
  calification: number;
  specialties: string[];
  services: string[];
  isPublic: true;

  createAt?: string;
  updatedAt?: string;
}
