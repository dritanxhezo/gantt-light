import React from "react";
import { FilterType } from "../Filter";
import { allMonths } from "./dateUtils";
import "./gantt.css";

export interface Config {
  start: Date;
  end: Date;
}

const Gantt = (props: any) => {
  // console.log(JSON.stringify(props.data));
  // const months = [
  //   "January",
  //   "February",
  //   "March",
  //   "April",
  //   "May",
  //   "June",
  //   "July",
  //   "August",
  //   "September",
  //   "October",
  //   "November",
  //   "December",
  // ];

  const firstColumnWidth = "200px";
  const months = allMonths(props.config.start, props.config.end);

  const position = (d: any) => {
    return d.start.getMonth() + 1 + "/" + (d.end.getMonth() + 1);
  };

  const gridColumns = () => {
    return "repeat(" + months.length + ", 1fr)";
  };

  return (
    <>
      <div className="container">
        <div className="chart">
          <div
            className="chart-row chart-period"
            style={{
              gridTemplateColumns: firstColumnWidth + " " + gridColumns(),
            }}
          >
            <div className="chart-row-item">Tasks</div>
            {months.map((m: string, i: number) => (
              <span key={i}>{m}</span>
            ))}
          </div>
          <div
            className="chart-row chart-lines"
            style={{
              gridTemplateColumns: firstColumnWidth + " " + gridColumns(),
            }}
          >
            {months.map((m: string, i: number) => (
              <span key={i}></span>
            ))}
          </div>
          {props.data.map((d: any, i: number) => (
            <div
              className="chart-row"
              key={i}
              style={{
                gridTemplateColumns: firstColumnWidth + " 1fr",
              }}
            >
              <div className="chart-row-item">
                {d.id} - {d.title}
              </div>
              <div
                className="chart-row-bars"
                style={{
                  gridTemplateColumns: gridColumns(),
                }}
              >
                <div
                  style={{
                    gridColumn: position(d),
                    backgroundColor: d.color,
                  }}
                ></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default Gantt;
