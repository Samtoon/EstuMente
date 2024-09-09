import { Typography } from "@mui/material";

export default function PageHeader({ header }: { header: string }) {
  return (
    <Typography
      variant="h1"
      component="h1"
      gutterBottom
      padding={5}
      sx={{ fontSize: { xs: 22, md: 32 }, fontWeight: "bold" }}
    >
      {header}
    </Typography>
  );
}
