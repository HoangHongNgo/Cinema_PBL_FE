import React, { useEffect, useState } from "react";
import { Link, useLocation, useHistory } from "react-router-dom";

const ShowtimesDate = () => {
  const today = new Date();
  const days = ["CN", "Th 2", "Th 3", "Th 4", "Th 5", "Th 6", "Th 7"];
  const location = useLocation();
  const history = useHistory();

  const [newUrl, setNewUrl] = useState("");
  const queryParams = new URLSearchParams(window.location.search);
  const dateId = queryParams.get("date");

  const handleClick = (dataDate) => {
    const currentSearchParams = new URLSearchParams(location.search);
    const existingDate = currentSearchParams.get("date");

    currentSearchParams.set("date", dataDate);

    const newUrl = `${location.pathname}?${currentSearchParams.toString()}`;

    // Use the newUrl to perform any necessary actions (e.g., navigation)
    history.push(newUrl);
  };

  const renderDates = () => {
    const dates = [];
    for (let i = 0; i < 6; i++) {
      const date = new Date();
      date.setDate(today.getDate() + i);
      const formattedDate = date.toLocaleDateString("en-US", {
        day: "numeric",
        month: "numeric",
      });
      const dayOfWeek = days[date.getDay()];
      const dataDate = date.toISOString().split("T")[0];

      dates.push(
        <Link
          className="showtimes_date justify-center"
          data-date={dataDate}
          key={i}
          onClick={() => handleClick(dataDate)}
        >
          {formattedDate}
          <br />
          <span className="small text-nowrap">{dayOfWeek}</span>
        </Link>
      );
    }
    return dates;
  };

  return <div className="showtimes">{renderDates()}</div>;
};

export default ShowtimesDate;
