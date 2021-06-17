import React from "react";
import Chart from "react-google-charts";

// Local import begins
import Spinner from "./spinner";
// Loacal import ends

const LevelChart = (props) => {
  let { chartData } = { ...props };
  return (
    <div className="level-wise-chart">
      <Chart
        width={"100%"}
        height={"400px"}
        chartType="BarChart"
        loader={
          <div>
            <Spinner />
          </div>
        }
        data={chartData}
        options={{
          title: "Levels of Solved Problems",
          legend: "none",
        }}
        rootProps={{ "data-testid": "1" }}
      />
    </div>
  );
};

export default LevelChart;
