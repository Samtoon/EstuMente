"use client"
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
} from "@mui/material";
import { IPsychologist } from "@/app/_interfaces/IPsychologist";
import { useRouter } from "next/navigation";
import GoogleImage from "../ui/GoogleImage";
import Roles from "@/app/_enums/Roles";
// import { IPsychologist } from "../../interfaces";

interface Props {
  psychologist: IPsychologist;
}

export const PsychologistCard: FC<Props> = ({ psychologist }) => {
  const router = useRouter();
  // const [isImageLoaded, setIsImageLoaded] = useState(true);
  // console.log("La foto del muchacho es: " +  psychologist.profilePicture);
  // console.log("isImageLodaded: " +  isImageLoaded);
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
            compStyle={{ width: 120, height: 120, mt: 3, borderRadius: "50%" }}
            //component="img"
            //image={psychologist.profilePicture}
            //alt="Practicante"
            // onLoad={() => setIsImageLoaded(true)}
            //sx={{ width: 120, height: 120, mt: 3, borderRadius: "50%" }}
          />
           {/* {!isImageLoaded && (<div> Loading... </div>)} */}
          {/* <Avatar
            alt="Psychologist"
            src={psychologist.url}
            sx={{ width: 120, height: 120, mt: 3 }}
          /> */}
        </Box>
        <CardContent>
          <Box
            sx={{ display: "block" }}
            className="fadeIn"
          >
            <Typography
              fontWeight={700}
              color="inherit"
              align="center"
              variant="h2"
              gutterBottom
            >
              {psychologist.fullName}
            </Typography>
            {/* <Box sx={{ m: 2 }}>
              <ListSpecialties specialties={psychologist.specialties} />
            </Box> */}
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
              {/* <NextLink
                href={`/app/citas/agendar/${psychologist.slug}`}
                passHref
                prefetch={false}
              > */}
                <Link>
                  <Button
                    size="small"
                    color="secondary"
                    className="card-btn"
                    sx={{ mb: 2 }}
                    onClick={() => {router.push(`/citas/agendar/${psychologist.slug}`)}}
                  >
                    Pedir cita
                  </Button>
                </Link>
              {/* </NextLink> */}
              {/* <NextLink href={`/psicologos/${psychologist.slug}`} passHref> */}
                <Link>
                  <Button size="small">Ver mas información</Button>
                </Link>
              {/* </NextLink> */}
            </Box>
          </Box>
        </CardContent>
      </Card>
    </Grid>
  );
};
