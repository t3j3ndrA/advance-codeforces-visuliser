import React from "react";
import Chart from "react-google-charts";

// Local import begins
import Spinner from "./spinner";
// Loacal import ends

const RatingWiseChart = (props) => {
  const { chartData } = { ...props };

  return (
    <div className="rating-wise-chart">
      <p style={{ textAlign: "center", fontWeight: 500 }}>
        Rating Wise Solved Problems
      </p>
      <Chart
        width={"100%"}
        chartType="Bar"
        loader={
          <div>
            <Spinner />
          </div>
        }
        data={chartData}
        options={{
          title: "Rating-wise solved Problems",
          chartArea: { height: "80%", width: "90%" },
        }}
        rootProps={{ "data-testid": "1" }}
        chartPackages={["corechart", "controls"]}
        controls={[
          {
            controlType: "ChartRangeFilter",
            options: {
              filterColumnIndex: 0,
              ui: {
                chartType: "LineChart",
                chartOptions: {
                  hAxis: { baselineColor: "none" },
                },
              },
            },
            controlPosition: "top",
            controlWrapperParams: {
              state: {
                range: { start: 0 },
              },
            },
          },
        ]}
      />
    </div>
  );
};

export default RatingWiseChart;
