import Psychologist from "../models/Psychologist";

export async function getPsychologistBySlug (slug: string) {
    const psychologist = await Psychologist.findOne({ slug: slug }).lean();
    return psychologist;
}

export async function getPsychologistById (id: string) {
    const psychologist = await Psychologist.findById(id).lean();
    return psychologist;
}