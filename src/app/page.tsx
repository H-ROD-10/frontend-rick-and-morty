"use client";

import { Box, Button, Card, CardContent, CardMedia, Container, Grid, Stack, Typography } from "@mui/material";
import { useSuspenseQuery } from "@apollo/experimental-nextjs-app-support/ssr";
import { gql } from "@apollo/client";
import { Characters } from "@/interface/Characters.interface";
import Image from "next/image";
import { useState } from "react";

export const dynamic = "force-dynamic";

const query = gql`query charactersQuery($page: Int!) {
  characters(page: $page ) {
    results{
      id
      name
      image
      species
      status
    },
    info {
      count
      next
      pages
      prev
    }
  }
}`

export default function Home() {
  const [page, setPage] = useState(1);
  const { data, error } = useSuspenseQuery<Characters>(query, { variables: { page } });


  if(!data){
    return 'Loading...';
  }

  const characters = data.characters.results;

  const handleNextPage = () => {
    if (data.characters.info.next) {
      setPage(page + 1);
    }
  };

  const handlePrevPage = () => {
    if (data.characters.info.prev) {
      setPage(page - 1);
    }
  };

  return (
    <Container maxWidth="md" sx={{ mt: 8, mb: 8 }}>
      <Grid container spacing={2}>
        {
          characters.map((character, index) => {
            if(character.species === "Human") {
              return (
                <Grid xs={12} sm={6} md={3} lg={4}  key={index} item>
                  <Card sx={{  maxWidth: 300, textAlign: "center", justifySelf: "center", padding: 5, borderRadius: 5 }}>
                    <CardContent>
                      <Typography gutterBottom variant="h5" component="div" justifySelf={"center"}>
                          {character.name}
                      </Typography>
                    </CardContent>
                      <Image src={character.image} alt={character.name} width={200} height={200} style={{borderRadius: 5}}/>
                  </Card>
                </Grid>
              )
            }
            return null;
          })
        }
      </Grid>
      <Stack spacing={2}>
        <Button onClick={handlePrevPage} disabled={!data.characters.info.prev}>
          Previous Page
        </Button>
        <Button onClick={handleNextPage} disabled={!data.characters.info.next}>
          Next Page
        </Button>
      </Stack>
    </Container>
  );
}