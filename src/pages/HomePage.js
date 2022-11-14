import React from "react";
import { Helmet } from "react-helmet";
import CoverCarousel from "../components/homePage/CoverCarousel";
import LatestJobs from "../components/homePage/LatestJobs";
import PopularFreelancers from "../components/homePage/PopularFreelancers";
import Stats from "../components/homePage/Stats";

function HomePage() {
  return (
    <div>
      <Helmet>
        <style>{"body { background-color: #F0F3F5; }"}</style>
      </Helmet>
      <CoverCarousel />
      <Stats />
      <PopularFreelancers />
      <LatestJobs />
    </div>
  );
}

export default HomePage;
