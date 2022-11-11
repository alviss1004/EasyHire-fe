import * as React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { CardActionArea, Rating, Stack } from "@mui/material";
import { useNavigate } from "react-router-dom";

function FreelancerCard({ freelancer }) {
  const navigate = useNavigate();

  return (
    <Card
      variant="outlined"
      sx={{ mr: 5 }}
      onClick={() => navigate("/freelancers/:id")}
    >
      <CardActionArea>
        <CardMedia
          component="img"
          image={freelancer.avatar}
          alt="avatar"
          sx={{ height: { xs: "100px", md: "300px" } }}
        />
        <CardContent>
          <Stack
            direction={{ xs: "column", lg: "row" }}
            justifyContent={{ xs: "center", lg: "space-between" }}
            alignItems="center"
          >
            <Typography
              gutterBottom
              align="left"
              noWrap
              sx={{
                fontFamily: "Arial",
                fontSize: { xs: 14, md: 16 },
                fontWeight: 600,
              }}
            >
              {freelancer.name}
            </Typography>
            <Rating
              name="freelancer-rating"
              value={freelancer.rating / 2}
              precision={0.5}
              size="small"
              readOnly
            />{" "}
          </Stack>
        </CardContent>
      </CardActionArea>
    </Card>
  );
}

export default FreelancerCard;
