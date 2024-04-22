import React, { FC } from "react";
import NextLink from "next/link";
import { useRouter } from "next/router";
import { Typography, Box, Link, Button } from "@mui/material";
import { VideocamOffOutlined } from "@mui/icons-material";

interface Props {
  message: string;
  url?: string;
  buttonTitle: string;
}

export const EndCall: FC<Props> = ({ message, url, buttonTitle }) => {
  const router = useRouter();
  return (
    <Box>
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        height="calc(100vh - 67px)"
        flexDirection="column"
        minHeight="calc(100vh - 67px)"
        className="fadeIn"
      >
        <VideocamOffOutlined sx={{ fontSize: 100 }} />
        <Box display="flex" flexDirection="column" alignItems="center">
          <Typography align="center" gutterBottom>
            {message}
          </Typography>
          {url && (
            <NextLink href={url} passHref prefetch={false}>
              <Link>
                <Button color="secondary" className="card-btn">
                  {buttonTitle}
                </Button>
              </Link>
            </NextLink>
          )}

          {!url && (
            <Button
              color="secondary"
              className="card-btn"
              onClick={() => {
                router.reload();
              }}
            >
              {buttonTitle}
            </Button>
          )}
        </Box>
      </Box>
    </Box>
  );
};
