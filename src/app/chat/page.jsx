"use client";
import { Box, Button } from "@mui/material";
import Link from "next/link";

export default function Chat() {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        m: 2,
        p: 2,
      }}
    >
      <Link href="/chat/single">
        <Button variant="contained" sx={{ mb: 2 }}>
          Single Chat
        </Button>
      </Link>
      <Link href="/chat/continuous">
        <Button variant="contained" sx={{ mb: 2 }}>
          Continuous Chat
        </Button>
      </Link>
      <Link href="/chat/system">
        <Button variant="contained" sx={{ mb: 2 }}>
          System Chat
        </Button>
      </Link>
    </Box>
  );
}
