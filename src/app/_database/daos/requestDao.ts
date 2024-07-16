import Roles from "@/app/_enums/Roles";
import { connect } from "../connection";
import Request from "../models/Request";
import { FilterQuery } from "mongoose";
import { IRequest } from "@/app/_interfaces/IRequest";
import { RequestStates } from "@/app/_enums/RequestStates";

export async function getRequestsByUserRole(userRole: Roles) {
    await connect();
    const filterQuery: FilterQuery<IRequest> = {state: RequestStates.Pendiente};
    switch (userRole) {
        case Roles.Tutor:
            filterQuery.requestedRole = Roles.Practicante;
            break;
        case Roles.Coordinador:
            filterQuery.$or = [{requestedRole: Roles.Practicante}, {requestedRole: Roles.Tutor}];
            break;
        default:
            break;
    }
    const requests = await Request.find(filterQuery).lean();
    return requests;
}

export async function getRequestsByUser(user: string) {
    await connect();
    const requests = Request.find({user}).lean();
    return requests;
}

export async function getRequestById(id: string) {
    await connect();
    const request = await Request.findById(id).lean();
    return request;
}

export async function createRequest(request: IRequest) {
    await connect();
    const result = await Request.create(request);
    return result;
}

export async function updateRequest(request: Partial<IRequest>) {
    await connect();
    const result = await Request.updateOne({_id: request._id}, request);
    return Boolean(result.modifiedCount);
}