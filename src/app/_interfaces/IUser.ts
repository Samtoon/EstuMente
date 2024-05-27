export default interface IUser {
    _id?: string;
    firstName: string;
    lastName: string;
    email: string;
    password?: string;
    role?: "Administrador" | "Consultante" | "Practicante" | "Tutor" | "Coordinador",
    phone?: string;
    profilePicture?: { public_id: string; url: string };
    accept?: boolean;
    state?: string;
    gender?: string;
  
    createAt?: string;
    updatedAt?: string;
}