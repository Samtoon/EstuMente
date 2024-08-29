"use client";
import React, { FC, useState } from "react";
import NextLink from "next/link";
// import { ListSpecialties } from "../../components/psychologists";
import {
  Grid,
  Card,
  Box,
  Typography,
  Button,
  CardContent,
  Link,
  Stack,
  Rating,
  CardMedia,
  Dialog,
} from "@mui/material";
import { IPsychologist } from "@/app/_interfaces/IPsychologist";
import { useRouter } from "next/navigation";
import GoogleImage from "../ui/GoogleImage";
import Roles from "@/app/_enums/Roles";
import { useSession } from "next-auth/react";
import { ContentTypes } from "./PsychologistList";
import { getScheduleByPsychologist } from "@/app/_database/daos/scheduleDao";
import { ISchedule } from "@/app/_interfaces/schedule/ISchedule";
import { fetchScheduleByPsychologist } from "@/app/_utils/server actions/schedule";
// import { IPsychologist } from "../../interfaces";

interface Props {
  psychologist: IPsychologist;
  setContent: ({ type, content }: { type: ContentTypes; content: any }) => void;
}

export const PsychologistCard: FC<Props> = ({ psychologist, setContent }) => {
  const router = useRouter();
  const { data: session } = useSession();
  const [button1, button2] = (() => {
    let button1: { url: string; label: string },
      button2: { promise?: Promise<ISchedule>; label: string };
    switch (session?.user.role!) {
      case Roles.Consultante:
        button1 = {
          url: `/citas/agendar/${psychologist.slug}`,
          label: "Pedir Cita",
        };
        button2 = { promise: undefined, label: "Ver Comentarios" };
        break;
      default:
        button1 = {
          url: `/citas?psychologist=${psychologist._id}`,
          label: "Ver Citas Programadas",
        };
        button2 = {
          promise: fetchScheduleByPsychologist(psychologist._id!),
          label: "Ver Agenda",
        };
        break;
    }
    return [button1, button2];
  })();

  return (
    <Grid item xs={12} sm={6} md={6} lg={4}>
      <Card variant="outlined" className="fadeIn">
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <CardMedia
            component={GoogleImage}
            compSrc={psychologist.profilePicture}
            compAlt={Roles.Practicante}
            compStyle={{
              width: 120,
              height: 120,
              marginTop: 3,
              borderRadius: "50%",
            }}
          />
        </Box>
        <CardContent>
          <Box sx={{ display: "block" }} className="fadeIn">
            <Typography
              fontWeight={700}
              color="inherit"
              align="center"
              variant="h2"
              gutterBottom
            >
              {psychologist.fullName}
            </Typography>

            <Stack spacing={1} alignItems="center" sx={{ m: 2 }}>
              <Rating
                name="half-rating-read"
                defaultValue={psychologist.calification}
                precision={0.5}
                readOnly
              />
            </Stack>

            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              <NextLink href={button1.url} passHref prefetch={false}>
                {/* <Link> */}
                <Button
                  size="small"
                  color="secondary"
                  className="card-btn"
                  sx={{ mb: 2 }}
                  // onClick={() => {
                  //   router.push(`/citas/agendar/${psychologist.slug}`);
                  // }}
                >
                  {button1.label}
                </Button>
                {/* </Link> */}
              </NextLink>
              {session?.user.role === Roles.Tutor && (
                <NextLink
                  href={`/citas/historial?psychologist=${psychologist._id}`}
                  passHref
                  prefetch={false}
                >
                  {/* <Link> */}
                  <Button
                    size="small"
                    color="secondary"
                    className="card-btn"
                    sx={{ mb: 2 }}
                    // onClick={() => {
                    //   router.push(`/citas/agendar/${psychologist.slug}`);
                    // }}
                  >
                    Ver Historial de Citas
                  </Button>
                  {/* </Link> */}
                </NextLink>
              )}
              {/* <NextLink href={button2.promise} passHref> */}
              {/* <Link> */}
              <Button
                size="small"
                onClick={() => {
                  button2.promise?.then((schedule) => {
                    console.log("Promesa resuelta");
                    setContent({
                      content: [...schedule.days],
                      type: ContentTypes.Schedule,
                    });
                  });
                }}
              >
                {button2.label}
              </Button>
              {/* </Link> */}
              {/* </NextLink> */}
            </Box>
          </Box>
        </CardContent>
      </Card>
    </Grid>
  );
};
