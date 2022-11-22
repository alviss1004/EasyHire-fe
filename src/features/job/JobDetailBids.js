import React from "react";
import { useDispatch } from "react-redux";
import { useParams } from "react-router-dom";

function JobDetailBids() {
  const dispatch = useDispatch();

  const params = useParams();
  const jobId = params.id;
  return <div>JobDetailBids</div>;
}

export default JobDetailBids;
