import React from "react";
import CoverCarousel from "../components/homePage/CoverCarousel";
import LatestJobs from "../components/homePage/LatestJobs";
import PopularFreelancers from "../components/homePage/PopularFreelancers";
import Stats from "../components/homePage/Stats";

function HomePage() {
  return (
    <div>
      <CoverCarousel />
      <Stats />
      <PopularFreelancers />
      <LatestJobs />
    </div>
  );
}

export default HomePage;
