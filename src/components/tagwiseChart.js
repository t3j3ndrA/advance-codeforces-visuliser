import React from "react";
import Chart from "react-google-charts";

// Local import begins
import Spinner from "./spinner";
// Loacal import ends

const TagWiseChart = (props) => {
  const { chartData } = { ...props };
  return (
    <div className="tag-wise-chart">
      <Chart
        width={"100%"}
        height={"500px"}
        chartType="PieChart"
        loader={
          <div>
            <Spinner />
          </div>
        }
        data={chartData}
        options={{
          title: "Tag-wise solved problems",
          pieHole: 0.5,
        }}
        rootProps={{ "data-testid": "2" }}
      />
    </div>
  );
};

export default TagWiseChart;
