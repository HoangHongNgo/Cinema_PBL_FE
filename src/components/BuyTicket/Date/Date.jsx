import React from "react";

const ShowtimesDate = () => {
  const today = new Date();
  const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

  const renderDates = () => {
    const dates = [];
    for (let i = 0; i < 6; i++) {
      const date = new Date();
      date.setDate(today.getDate() + i);
      const formattedDate = date.toLocaleDateString("en-US", { day: "numeric", month: "numeric" });
      const dayOfWeek = days[date.getDay()];
      const dataDate = date.toISOString().split("T")[0];

      dates.push(
        <a href="#" className="showtimes_date" data-date={dataDate} key={i}>
          {formattedDate}
          <br />
          <span className="small text-nowrap">{dayOfWeek}</span>
        </a>
      );
    }
    return dates;
  };

  return <div className="showtimes">{renderDates()}</div>;
};

export default ShowtimesDate;