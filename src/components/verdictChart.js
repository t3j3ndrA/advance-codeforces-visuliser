import React from "react";
import { Chart } from "react-google-charts";

// Local import begins
import Spinner from "./spinner";
// Loacal import ends

const VerdictChart = (props) => {
  const { chartData } = { ...props };
  return (
    <div className="verdict-chart">
      <Chart
        width={"100%"}
        height={"300px"}
        chartType="PieChart"
        loader={
          <div>
            <Spinner />
          </div>
        }
        data={chartData}
        options={{
          title: "Verdicts",
          legend: "none",
          is3D: true,
          colors: ["green", "red", "orange", "grey"],
        }}
        rootProps={{ "data-testid": "2" }}
      />
    </div>
  );
};
export default VerdictChart;
