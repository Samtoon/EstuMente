"use client";
import { useReducer, useRef } from "react";
import PageHeader from "../_components/PageHeader";
import Chart from "../_components/reports/Chart";
import SectionWrapper from "../_components/reports/sections/SectionWrapper";
import DownloadButton from "../_components/reports/DownloadButton";
import { IReportResult } from "../_interfaces/IReportResult";
import { PieValueType } from "@mui/x-charts/models";
import PatientFilters from "../_enums/reports/PatientFilters";
import {
  countAppointmentsByPsychologist,
  countUsersByRole,
  countYearlyActivePatients,
} from "../_utils/server actions/report";
import PsychologistFilters from "../_enums/reports/PsychologistFilters";
import Roles from "../_enums/Roles";
import { useSession } from "next-auth/react";
import YearlyPatientsSection from "../_components/reports/sections/YearlyPatientsSection";
import AppointmentsByPsychologistSection from "../_components/reports/sections/AppointmentsByPsychologistSection";

export default function ReportsPage() {
  const pdfRef = useRef<HTMLDivElement>(null);
  const { data: session } = useSession();
  return (
    <>
      <div id="Reportes" ref={pdfRef}>
        <PageHeader header="Reportes" />
        <YearlyPatientsSection />
        <AppointmentsByPsychologistSection />
        <SectionWrapper title="Practicantes adscritos">
          <Chart
            title="Edad"
            fetcher={() =>
              countUsersByRole(PsychologistFilters.Age, Roles.Practicante)
            }
          />
          <Chart
            title="Género"
            fetcher={() =>
              countUsersByRole(PsychologistFilters.Gender, Roles.Practicante)
            }
          />
          <Chart
            title="Semestre"
            fetcher={() =>
              countUsersByRole(PsychologistFilters.Semester, Roles.Practicante)
            }
          />
        </SectionWrapper>
        {(session?.user.role === Roles.Administrador ||
          session?.user.role === Roles.Coordinador) && (
          <SectionWrapper title="Tutores adscritos">
            <Chart
              title="Edad"
              fetcher={() =>
                countUsersByRole(PsychologistFilters.Age, Roles.Tutor)
              }
            />
            <Chart
              title="Género"
              fetcher={() =>
                countUsersByRole(PsychologistFilters.Gender, Roles.Tutor)
              }
            />
            <Chart
              title="Semestre"
              fetcher={() =>
                countUsersByRole(PsychologistFilters.Semester, Roles.Tutor)
              }
            />
          </SectionWrapper>
        )}
        {session?.user.role === Roles.Administrador && (
          <SectionWrapper title="Coordinadores adscritos">
            <Chart
              title="Edad"
              fetcher={() =>
                countUsersByRole(PsychologistFilters.Age, Roles.Coordinador)
              }
            />
            <Chart
              title="Género"
              fetcher={() =>
                countUsersByRole(PsychologistFilters.Gender, Roles.Coordinador)
              }
            />
            <Chart
              title="Semestre"
              fetcher={() =>
                countUsersByRole(
                  PsychologistFilters.Semester,
                  Roles.Coordinador,
                )
              }
            />
          </SectionWrapper>
        )}
      </div>
      <DownloadButton pdfRef={pdfRef} />
    </>
  );
}
