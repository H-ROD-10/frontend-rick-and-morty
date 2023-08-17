"use client";

import "./globals.css";
import { ApolloWrapper } from "./lib/ApolloWrapper";
import { darkTheme } from "./theme/themes";

import { ThemeProvider, CssBaseline } from "@mui/material";

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es">
      <head>
        <title>Create Next App</title>
        <meta name="description" content="Prueba tecnica de Next.js" />
        <link rel="icon" href="/favicon.ico" />
      </head>
      <ThemeProvider theme={darkTheme}>
        <CssBaseline />
        <ApolloWrapper>
          <body>
            {children}
          </body>
          </ApolloWrapper>
      </ThemeProvider>
    </html>
  );
}