import React from "react";
import { getDatesInRange } from "../Gantt/dateUtils";

import "./gantt.css";

const Gantt2 = (props: any) => {
  const { years, months, dates } = getDatesInRange(
    props.config.start,
    props.config.end,
    2
  );
  // console.log(JSON.stringify(years));
  // const months1 = [...Array(12)];
  // const tasks = [...Array(5)];
  const tasks = props.data;

  const firstColumnWidth = "200px";

  const gridColumns = () => {
    return "repeat(" + dates.length + ", 1fr)";
  };

  const gridRows = () => {
    return "repeat(" + tasks.length + 3 + ", 1fr)";
  };

  const position = (d: any) => {
    return (
      dayDiff(props.config.start, d.start) +
      2 +
      "/ span " +
      (dayDiff(d.start, d.end) + 1)
    );
  };

  const dayDiff = (d1: Date, d2: Date) => {
    const diff = Math.floor((d2.getTime() - d1.getTime()) / (24 * 3600 * 1000));
    console.log(d1, d2, diff);
    return diff;
  };

  return (
    <>
      <div>Gantt 2</div>
      {/* <div className="grid-container"> */}
      <div
        className="gantt-grid"
        style={{
          gridTemplateColumns: firstColumnWidth + " " + gridColumns(),
          gridTemplateRows: gridRows(),
        }}
      >
        <div
          className="tasks-label sticky-left sticky-top"
          style={{
            gridColumn: "1/1",
            gridRow: "1/3",
          }}
        >
          Tasks
        </div>
        {Array.from(years.keys()).map((k, i) => (
          <div
            className="grid-item sticky-top"
            key={"y:" + k}
            style={{
              gridColumn: `${years.get(k).StartPos}/+${years.get(k).EndPos}`,
            }}
          >
            {k}
          </div>
        ))}
        {Array.from(months.keys()).map((k, i) => (
          <div
            className="grid-item sticky-top sticky-top1"
            key={"m:" + k}
            style={{
              gridColumn: `${months.get(k).StartPos}/+${months.get(k).EndPos}`,
            }}
          >
            {k.slice(5)}
          </div>
        ))}
        {dates.map((k, i) => (
          <div
            className="grid-item day sticky-top sticky-top2"
            key={i}
            style={{
              gridColumn: `${i + 2}/+${i + 3}`,
            }}
          >
            {k}
          </div>
        ))}
        {/* <div
          className="chart-lines"
          style={{
            gridTemplateColumns: firstColumnWidth + " " + gridColumns(),
          }}
        >
          {dates.map((_, i: number) => (
            <span key={"lines" + i}></span>
          ))}
        </div> */}

        {tasks.map((d: any, i: number) => (
          <>
            <div
              className="grid-item tasks sticky-left"
              key={d.id}
              style={{
                gridColumn: "1/1",
              }}
            >
              {d.id} - {d.title}
            </div>
            <div
              className="grid-item bars"
              key={d.id + "+"}
              style={{
                gridColumn: position(d),
                backgroundColor: d.color,
              }}
            ></div>
          </>
        ))}
        {/* <div className="grid-lines">
            {[...Array(tasks.length)].map((_, j) =>
              [...Array(dates.length + 1)].map((_, i) => (
                <span
                  className="grid-item"
                  key={i + "-" + j}
                  style={{
                    gridColumn: `${i + 1}/span 1`,
                    gridRow: `${j}/span 1`,
                  }}
                ></span>
              ))
            )}
          </div> */}
        {/* </div> */}
      </div>
    </>
  );
};

export default Gantt2;
