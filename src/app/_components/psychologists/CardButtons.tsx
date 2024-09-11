import NextLink from "next/link";
import { Button, ButtonProps, CircularProgress } from "@mui/material";
import { ContentTypes } from "./PsychologistList";
import { fetchScheduleByPsychologist } from "@/app/_utils/server actions/schedule";
import { useState } from "react";

function ButtonTemplate({
  secondary,
  ...props
}: ButtonProps & { secondary?: boolean }) {
  return (
    <Button
      size="small"
      color={!secondary ? "secondary" : undefined}
      className={!secondary ? "card-btn" : undefined}
      sx={!secondary ? { my: 1 } : { my: 0.5 }}
      {...props}
    ></Button>
  );
}

export function ScheduleButton({
  psychologistSlug,
}: {
  psychologistSlug: string;
}) {
  return (
    <NextLink href={`/citas/agendar/${psychologistSlug}`}>
      <ButtonTemplate>Pedir Cita</ButtonTemplate>
    </NextLink>
  );
}

export function CommentsButton() {
  return <ButtonTemplate secondary>Ver Comentarios</ButtonTemplate>;
}

export function UpcomingAppointmentsButton({
  psychologistId,
}: {
  psychologistId: string;
}) {
  return (
    <NextLink href={`/citas?psychologist=${psychologistId}`}>
      <ButtonTemplate>Ver Citas programadas</ButtonTemplate>
    </NextLink>
  );
}

export function PreviousAppointmentsButton({
  psychologistId,
}: {
  psychologistId: string;
}) {
  return (
    <NextLink href={`/citas/historial?psychologist=${psychologistId}`}>
      <ButtonTemplate>Ver Historial de Citas</ButtonTemplate>
    </NextLink>
  );
}

export function SeeScheduleButton({
  psychologistId,
  setContent,
}: {
  psychologistId: string;
  setContent: ({ type, content }: { type: ContentTypes; content: any }) => void;
}) {
  const [loading, setLoading] = useState(false);
  return (
    <ButtonTemplate
      secondary
      onClick={() => {
        setLoading(true);
        fetchScheduleByPsychologist(psychologistId)
          .then((schedule) =>
            setContent({
              content: [...schedule.days],
              type: ContentTypes.Schedule,
            })
          )
          .finally(() => setLoading(false));
      }}
    >
      Ver Agenda
      {loading && <CircularProgress size={20} color="secondary" />}
    </ButtonTemplate>
  );
}
