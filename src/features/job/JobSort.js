import React from "react";
import { FSelect } from "../../components/form";

function JobSort() {
  return (
    <FSelect name="sortBy" label="Sort By" size="small" sx={{ width: 300 }}>
      {[
        { value: "featured", label: "Featured" },
        { value: "newest", label: "Newest" },
      ].map((option) => (
        <option key={option.value} value={option.value}>
          {option.label}
        </option>
      ))}
    </FSelect>
  );
}

export default JobSort;
