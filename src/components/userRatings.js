import React, { useState, useEffect } from "react";

const UserRatings = (props) => {
  const { handle } = { ...props };
  const url = `https://codeforces.com/api/user.rating?handle=${handle}`;
  const [maxUp, setMaxUp] = useState(0);
  const [maxDown, setMaxDown] = useState(0);
  const [bestRank, setBestRank] = useState(0);
  const [worstRank, setWorstRank] = useState(0);
  const [numberOfContest, setNumberOfContest] = useState(0);
  async function fetchUserRatings() {
    let stage1 = await fetch(url);
    let stage2 = await stage1.json();
    ratingChangesCalculations(stage2["result"]);
  }
  function ratingChangesCalculations(param) {
    let tmpMini = 0;
    let tmpMaxi = 0;
    let tmpBestRank = 1000000000;
    let tmpWorstRank = 0;
    param.forEach((element) => {
      let ratingDifference = element["newRating"] - element["oldRating"];
      tmpMini = Math.min(tmpMini, ratingDifference);
      tmpMaxi = Math.max(tmpMaxi, ratingDifference);
      tmpBestRank = Math.min(tmpBestRank, element["rank"]);
      tmpWorstRank = Math.max(tmpWorstRank, element["rank"]);
    });
    setMaxUp(tmpMaxi);
    setMaxDown(tmpMini);
    if (tmpBestRank !== 1000000000) setBestRank(tmpBestRank);
    setWorstRank(tmpWorstRank);
    setNumberOfContest(param.length);
  }
  useEffect(() => {
    fetchUserRatings();
  }, []);
  return (
    <div className="user-rating">
      <table>
        <thead>
          <tr>
            <th className="left">Contests performance of </th>
            <th className="right">{handle}</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td className="left">Participated in </td>
            <td className="right">{numberOfContest} Contests</td>
          </tr>
          <tr>
            <td className="left">Best Rank </td>
            <td className="right">{bestRank}</td>
          </tr>
          <tr>
            <td className="left">Worst Rank</td>
            <td className="right">{worstRank}</td>
          </tr>
          <tr>
            <td className="left">Maximum Up in Ratings</td>
            <td className="right">+{maxUp}</td>
          </tr>
          <tr>
            <td className="left">Maximum Fall in Rating</td>
            <td className="right">{maxDown}</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};
export default UserRatings;
