import Psychologist from "./models/Psychologist";

export async function getPsychologistBySlug (slug: string) {
    const psychologist = await Psychologist.findOne({ slug: slug }).lean();
    return psychologist;
}