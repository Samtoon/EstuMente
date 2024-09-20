import { Typography } from "@mui/material";
import { FontWeightValues } from "../_enums/FontWeightValues";

export default function PageHeader({ header }: { header: string }) {
  return (
    <Typography
      variant="h1"
      component="h1"
      gutterBottom
      padding={5}
      color="text1.main"
      sx={{ fontSize: { xs: 22, md: 32 }, fontWeight: FontWeightValues.Bold }}
    >
      {header}
    </Typography>
  );
}
