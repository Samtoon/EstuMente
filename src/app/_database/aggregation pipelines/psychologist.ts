import { PipelineStage, Types } from "mongoose";

export function getPsychologistsByTutorPipeline(tutorId: string) {
  const pipeline: PipelineStage[] = [
    {
      $lookup: {
        from: "users",
        localField: "user",
        foreignField: "_id",
        as: "user_details",
      },
    },
    {
      $unwind: "$user_details",
    },
    {
      $match: {
        "user_details.responsibleUser": new Types.ObjectId(tutorId),
      },
    },
    {
      $unset: "user_details",
    },
  ];
  return pipeline;
}
