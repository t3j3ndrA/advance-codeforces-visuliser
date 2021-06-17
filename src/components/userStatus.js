import React, { useState, useEffect } from "react";

// Local imports begins
import RatingWiseChart from "./ratingwiseChart";
import Spinner from "./spinner";
import Error from "./error";
import VerdictChart from "./verdictChart";
import LanguageUsedChart from "./languageChart";
import LevelChart from "./levelChart";
import TagwiseChart from "./tagwiseChart";
// Local import closed

const UserDetails = (props) => {
  const { handle } = { ...props };
  const url = `https://codeforces.com/api/user.status?handle=${handle}&from=1&count=10000000`;

  const [chartData, setChartData] = useState([]); // chartData is for tag-wise chart [Bad namming :( ]
  const [ratingsData, setRatingsdata] = useState([]);
  const [verdictData, setVerdictData] = useState([]);
  const [languageData, setLanguageData] = useState([]);
  const [levelData, setLevelData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);
  async function fetchUserInfo() {
    let stage1 = await fetch(url);
    let stage2 = await stage1.json();

    // checking for fetch error
    if (stage2["status"] === "FAILED") {
      setIsError(true);
      return;
    }
    calculateAllChartResult(stage2["result"]);
  }

  function calculateAllChartResult(param) {
    let tmpMap = new Map();
    let tmpRatings = new Map();
    let tmpLanguage = new Map();
    let tmpLevels = new Map();

    // for solved+unsolved Problems operations
    // (Index,Status) = (0,OK), (1,WRONG_ANSWER), (2,TIME_LIMIT_EXCEEDED), (3,COMPILATION_ERROR)
    let tmpVerdicts = [0, 0, 0, 0];
    param.forEach((obj) => {
      // VerdictData calculations
      const verdictStatus = obj["verdict"];
      if (verdictStatus === "OK") tmpVerdicts[0]++;
      else if (verdictStatus === "WRONG_ANSWER") tmpVerdicts[1]++;
      else if (verdictStatus === "TIME_LIMIT_EXCEEDED") tmpVerdicts[2]++;
      else if (verdictStatus === "COMPILATION_ERROR") tmpVerdicts[3]++;

      // Language used calculations
      const languageUsed = obj["programmingLanguage"];
      if (tmpLanguage.get(languageUsed) === undefined) {
        tmpLanguage.set(languageUsed, 1);
      } else {
        let ps = tmpLanguage.get(languageUsed);
        ps = ps + 1;
        tmpLanguage.set(languageUsed, ps);
      }
    });
    // setting up verdict chart data
    let chartDataArray = [
      ["Status", "Count"],
      ["AC", tmpVerdicts[0]],
      ["WA", tmpVerdicts[1]],
      ["TLE", tmpVerdicts[2]],
      ["Error", tmpVerdicts[3]],
    ];
    setVerdictData(chartDataArray);

    // setting up languages used chart
    chartDataArray = [];
    let allKeys = [...tmpLanguage.keys()];
    let allValues = [...tmpLanguage.values()];
    chartDataArray.push(["Language  Used", "Count"]);
    for (let i = 0; i < allKeys.length; ++i) {
      let subArr = [allKeys[i] + " (" + allValues[i] + ")", allValues[i]];
      chartDataArray.push(subArr);
    }
    setLanguageData(chartDataArray);

    // filtering for operations on solved problems only
    const solvedProblems = param.filter((obj) => obj["verdict"] === "OK");

    solvedProblems.forEach((obj) => {
      // To get problem object from submission object
      const problem = obj["problem"];
      // console.log(problem);

      // ratting wise problem calculations
      // To get problemRatting from problem object
      const problemRatings = problem["rating"];
      if (problemRatings !== undefined) {
        if (tmpRatings.get(problemRatings) === undefined) {
          tmpRatings.set(problemRatings, 0);
        }

        let problemCount = tmpRatings.get(problemRatings) + 1;
        tmpRatings.set(problemRatings, problemCount);
      }

      // tag wise problems calculations
      const tagsArr = problem["tags"];
      tagsArr.forEach((tag) => {
        if (tmpMap.get(tag) === undefined) {
          tmpMap.set(tag, 0);
        }
        let solvedProblemCount = tmpMap.get(tag) + 1;
        tmpMap.set(tag, solvedProblemCount);
      });

      // calculating level wise solved problems data
      const level = problem["index"][0];
      if (tmpLevels.get(level) === undefined) {
        tmpLevels.set(level, 1);
      } else {
        let pl = tmpLevels.get(level) + 1;
        tmpLevels.set(level, pl);
      }
    });

    // setting up datas for google chart input

    // Varibles used for chartdata setup
    chartDataArray = [];
    allKeys = [...tmpMap.keys()];
    allValues = [...tmpMap.values()];

    // calculating data for tagwise chart
    chartDataArray = [];
    chartDataArray.push(["Problem Tag", "Problem Solved"]);
    for (let i = 0; i < allKeys.length; ++i) {
      let subArr = [allKeys[i] + " (" + allValues[i] + ")", allValues[i]];
      chartDataArray.push(subArr);
    }
    setChartData(chartDataArray);

    // calculating data for ratingwise chart
    chartDataArray = [];
    chartDataArray.push(["Rating", "Problem Count"]);
    allKeys = [...tmpRatings.keys()];
    allValues = [...tmpRatings.values()];

    for (let i = 0; i < allKeys.length; ++i) {
      let subArr = [allKeys[i], allValues[i]];
      chartDataArray.push(subArr);
    }
    setRatingsdata(chartDataArray);

    // setting up levelwise problem solved
    chartDataArray = [];
    allKeys = [...tmpLevels.keys()];
    allValues = [...tmpLevels.values()];
    chartDataArray.push(["Level", "Problem Count"]);
    for (let i = 0; i < allKeys.length; ++i) {
      let subArr = [allKeys[i], allValues[i]];
      chartDataArray.push(subArr);
    }
    setLevelData(chartDataArray);

    setIsLoading(false);
  }

  useEffect(() => {
    fetchUserInfo();
  }, []);

  return (
    <>
      {isError && <Error handle={handle} />}
      {isLoading && !isError && <Spinner />}
      {!isLoading && !isError && <TagwiseChart chartData={chartData} />}
      {!isLoading && !isError && <RatingWiseChart chartData={ratingsData} />}
      {!isLoading && !isError && <LevelChart chartData={levelData} />}
      <div className="side-by-side-chart">
        {!isLoading && !isError && <VerdictChart chartData={verdictData} />}
        {!isLoading && !isError && (
          <LanguageUsedChart chartData={languageData} />
        )}
      </div>
    </>
  );
};

export default UserDetails;
