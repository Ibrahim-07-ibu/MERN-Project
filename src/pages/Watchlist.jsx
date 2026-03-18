import React from "react";
import Aside from "../components/Aside";
import Nav from "../components/Nav";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import List from "@mui/material/List";

function Watchlist() {
  return (
    <Aside>
      <Nav />
      <Box
        sx={{
          p: 4,
          bgcolor: "#000000",
          color: "white",
          flex: 1,
        }}
      >
        <Typography variant="h4" fontWeight="bold">
          Welcome!, User!
        </Typography>

        <br />
        <Grid
          container
          direction="row"
          sx={{
            justifyContent: "space-around",
            alignItems: "center",
          }}
        >
          <Box
            sx={{
              width: 200,
              height: 200,
              borderRadius: 1,
              bgcolor: "white",
            }}
          />
          <br />

          <Box
            sx={{
              width: 200,
              height: 200,
              borderRadius: 1,
              bgcolor: "white",
            }}
          />
          <br />

          <Box
            sx={{
              width: 200,
              height: 200,
              borderRadius: 1,
              bgcolor: "white",
            }}
          />
          <br />

          <Box
            sx={{
              width: 200,
              height: 200,
              borderRadius: 1,
              bgcolor: "white",
            }}
          />
        </Grid>
        <br />
        <Grid
          container
          direction="row"
          sx={{
            justifyContent: "space-around",
            alignItems: "center",
          }}
        >
          <Box
            sx={{
              width: 500,
              height: 450,
              borderRadius: 1,
              bgcolor: "gray",
              paddingLeft: "10px",
            }}
          />
          <Box
            sx={{
              width: "100%",
              height: 400,
              maxWidth: 360,
              bgcolor: "background.paper",
            }}
          >
            <List
              rowHeight={46}
              rowCount={200}
              sx={{
                height: 400,
                width: 360,
                bgcolor: "gray",
              }}
              rowProps={{}}
              overscanCount={5}
            />
          </Box>
        </Grid>
      </Box>
    </Aside>
  );
}

export default Watchlist;
