import { IPsychologist } from "@/interfaces/IPsychologist";
import Psychologist from "../models/Psychologist";
import { connect } from "../connection";

export async function getPsychologistBySlug (slug: string) {
    await connect();
    const psychologist = await Psychologist.findOne({ slug: slug }).lean();
    return psychologist;
}

export async function getPsychologistById (id: string) {
    await connect();
    const psychologist = await Psychologist.findById(id).lean();
    return psychologist;
}

export async function getPsychologistByUser (user: string) {
    await connect();
    const psychologist = await Psychologist.findOne({ user: user }).lean();
    return psychologist;
}

export async function updatePsychologistByUser(user: string, psychologist: IPsychologist) {
    await connect();
    const result = await Psychologist.updateOne({ user: user }, psychologist);
    return Boolean(result.modifiedCount);
}

export async function createPsychologist(psychologist: IPsychologist) {
    await connect();
    const result = await Psychologist.create(psychologist);
    return Boolean(result);
}