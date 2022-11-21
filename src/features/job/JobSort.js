import React from "react";
import { FSelect } from "../../components/form";

function JobSort() {
  return (
    <FSelect name="sortBy" label="Sort By" size="small" sx={{ width: 300 }}>
      {[
        { value: "newest", label: "Newest" },
        { value: "highestBidAsc", label: "Highest Bid: Low to High" },
        { value: "highestBidDesc", label: "Highest Bid: High to Low" },
        { value: "averageBidAsc", label: "Average Bid: Low to High" },
        { value: "averageBidDesc", label: "Average Bid: High to Low" },
      ].map((option) => (
        <option key={option.value} value={option.value}>
          {option.label}
        </option>
      ))}
    </FSelect>
  );
}

export default JobSort;
