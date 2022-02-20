import Head from "next/head";
import Image from "next/image";
import styles from "../styles/Home.module.css";
import * as React from "react";
import Container from "@material-ui/core/Container";
import { Button, Grid } from "@material-ui/core";
import { useState, useEffect } from "react";
import { ApolloClient, InMemoryCache, gql } from "@apollo/client";
import { styled } from "@material-ui/styles";
import Link from "next/link";
import { Typography } from "@mui/material";
import { IoIosRocket } from "react-icons/Io";
import CssBaseline from "@material-ui/core/CssBaseline";

const CustomContainer = styled(Container)(({ theme }) => ({
  backgroundColor: "#49206d ",
  margin: "5px 0 5px 0",
  width: "300px",
  minHeight: "60px",
  borderRadius: "5px",
  display: "flex",
  padding: "0 5px",
  alignItems: "center",

  "&:hover": {
    backgroundColor: "#301548  ",
    cursor: "pointer",
  },
}));

const CustomContainer2 = styled(Container)(({ theme }) => ({
  backgroundColor: "#1e0c2f ",
  margin: "5px 0 5px 0",
  width: "300px",
  minHeight: "60px",
  borderRadius: "5px",
  display: "flex",
  padding: "0 5px",
  alignItems: "center",

  "&:hover": {
    backgroundColor: "#1e0c2f  ",
    cursor: "inherit",
  },
}));

export default function Home({ launches }) {
  const [clicked, setClicked] = useState(0);

  const [selected, setSelected] = useState(launches[0]);

  useEffect(() => {}, [clicked, selected]);

  return (
    <div>
      <Head>
        <title>Missions</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin />
        <link
          href="https://fonts.googleapis.com/css2?family=Roboto:wght@300;400;500;700&display=swap"
          rel="stylesheet"
        />
      </Head>

      <Grid className={styles.container}>
        <Grid item xs={4} className={styles.missions}>
          <Typography
            sx={{
              fontSize: "50px",
            }}
            variant="h1"
            color="white"
          >
            Last Launches
          </Typography>
          {launches.map((mission, index) => {
            return (
              <>
                {clicked !== index ? (
                  <CustomContainer
                    onClick={() => {
                      setSelected(launches[index]);
                      setClicked(index);
                    }}
                  >
                    <IoIosRocket size={60} color="white" />
                    <Typography
                      variant="h6"
                      fontSize="15px"
                      className={styles.name}
                    >
                      {mission.mission_name}
                    </Typography>
                    <Typography
                      variant="h6"
                      fontSize="10px"
                      sx={{
                        textAlign: "right",
                        float: "right",
                        position: "relative",
                        top: "22px",
                        margin: "0 auto",
                        width: "100px",
                        height: "20px",
                        color: "#c4c4c4",
                      }}
                    >
                      {mission.launch_date_local.slice(0, -15)}
                    </Typography>
                  </CustomContainer>
                ) : (
                  <CustomContainer2
                    onClick={() => {
                      setSelected(launches[index]);
                      setClicked(index);
                    }}
                  >
                    <IoIosRocket size={60} color="white" />
                    <Typography
                      variant="h6"
                      fontSize="15px"
                      className={styles.name}
                    >
                      {mission.mission_name}
                    </Typography>
                    <Typography
                      variant="h6"
                      fontSize="10px"
                      sx={{
                        textAlign: "right",
                        float: "right",
                        position: "relative",
                        top: "22px",
                        margin: "0 auto",
                        width: "100px",
                        height: "20px",
                        color: "#c4c4c4",
                      }}
                    >
                      {mission.launch_date_local.slice(0, -15)}
                    </Typography>
                  </CustomContainer2>
                )}
              </>
            );
          })}
        </Grid>
        <Grid className={styles.description} item xs={8}>
          <img
            src={
              !selected.links.flickr_images[0]
                ? "https://i.gifer.com/7Bk2.gif"
                : selected.links.flickr_images[0]
            }
          />
          <Typography
            variant="h3"
            color="white"
            className={styles.mission_name}
          >
            {selected.mission_name}
          </Typography>
          <Typography variant="h5" className={styles.info}>
            {selected.details || "No details..."}
          </Typography>
          <Button variant="contained">
            <Link href={selected.links.video_link}>See more..</Link>
          </Button>
        </Grid>
      </Grid>
    </div>
  );
}

export async function getStaticProps() {
  const client = new ApolloClient({
    uri: "https://api.spacex.land/graphql/",
    cache: new InMemoryCache(),
  });

  const { data } = await client.query({
    query: gql`
      {
        launchesPast(limit: 10) {
          mission_name
          launch_date_local
          launch_site {
            site_name_long
          }
          links {
            article_link
            video_link
            flickr_images
          }
          details
        }
      }
    `,
  });

  return {
    props: {
      launches: data.launchesPast,
    },
  };
}
