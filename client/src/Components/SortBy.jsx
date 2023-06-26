import React from "react";
import { useSearchParams } from "react-router-dom";

function SortBy(props) {
  let [searchParams, setSearchParams] = useSearchParams("");
  const Sorts = ["latest", "comments", "likes", "earliest"];

  const handleSort = (e) => {
    props.setSort(e.target.value);
    searchParams.set("sortBy", e.target.value);
    setSearchParams(searchParams);
  };
  return (
    <div className="d-flex align-items-center " >
      <label className="  d-block! w-75 m-0  p-0  ">Sort by :</label>
      <select className="form-select " value={props.sort} onChange={(e) => handleSort(e)}>
        {Sorts.map((elem, i) => {
          return (
            <option value={elem} key={i}>
              {elem}
            </option>
          );
        })}
      </select>
    </div>
  );
}

export default SortBy;