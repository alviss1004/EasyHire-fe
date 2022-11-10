import React from "react";
import CoverCarousel from "../components/homePage/CoverCarousel";
import LatestJobs from "../components/homePage/LatestJobs";
import PopularFreelancers from "../components/homePage/PopularFreelancers";

function HomePage() {
  return (
    <div>
      <CoverCarousel />
      <PopularFreelancers />
      <LatestJobs />
    </div>
  );
}

export default HomePage;
