import Roles from "../_enums/Roles";

export default interface IUser {
    _id?: string;
    firstName: string;
    lastName: string;
    fullName: string;
    email: string;
    password?: string;
    role: Roles,
    phone?: string;
    profilePicture?: { public_id: string; url: string };
    accept?: boolean;
    state?: string;
    gender?: string;
    supportingDocumentId?: string,
    createAt?: string;
    updatedAt?: string;
}