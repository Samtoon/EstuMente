import PatientFilters from "@/app/_enums/reports/PatientFilters";
import PsychologistFilters from "@/app/_enums/reports/PsychologistFilters";
import Roles from "@/app/_enums/Roles";
import { PipelineStage } from "mongoose";

export const addAgePipeline: PipelineStage[] = [
  {
    $addFields: {
      age: {
        $floor: {
          $divide: [
            {
              $subtract: [new Date(), "$dateOfBirth"],
            },
            365 * 24 * 60 * 60 * 1000,
          ],
        },
      },
    },
  },
];

export function filterUsersByRolePipeline(
  filter: PsychologistFilters,
  role: Roles
) {
  const pipeline: PipelineStage[] = [
    {
      $match: {
        role: role,
      },
    },
    {
      $group: {
        _id: `$${filter}`,
        count: { $count: {} },
      },
    },
  ];
  if (filter === PsychologistFilters.Age) {
    pipeline.splice(1, 0, ...addAgePipeline);
  }
  return pipeline;
}
