import background from "@/../public/images/backgroundQuote.jpg";
import { Box, Typography } from "@mui/material";
import Image from "next/image";

export default function BackgroundQuote() {
  return (
    <Box height="70vh">
      <Image
        src={background}
        alt="Fondo"
        style={{ objectFit: "cover", height: "100%", width: "100%" }}
      />
      <Typography
        position="relative"
        zIndex={1}
        bottom="50%"
        variant="body1"
        left="calc(50% + 20px)"
        width="40%"
        color="secondary.contrastText"
      >
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi quis nisl
        in justo congue dapibus. Integer convallis consectetur nisi, id
        ullamcorper eros ultricies id. Aliquam libero ante, aliquam at suscipit
        at, malesuada vitae felis. Suspendisse pulvinar orci eu nibh
        condimentum, quis volutpat ligula varius.
      </Typography>
    </Box>
  );
}
