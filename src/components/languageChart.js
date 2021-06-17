import React from "react";
import { Chart } from "react-google-charts";

// Local import begins
import Spinner from "./spinner";
// Loacal import ends

const LanguageUsedChart = (props) => {
  const { chartData } = { ...props };
  return (
    <div className="language-wise-chart">
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
          title: "Language used",
          legend: "none",
          is3D: true,
        }}
        rootProps={{ "data-testid": "2" }}
      />
    </div>
  );
};
export default LanguageUsedChart;
