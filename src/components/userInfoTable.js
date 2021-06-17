import React from "react";

const UserInfoTable = (props) => {
  const { userInfoObj, handle } = { ...props };
  return (
    <div className="unser-info-section">
      <table className="user-info-table">
        <thead>
          <tr>
            <th className="left">Info of</th>
            <th className="right">{handle}</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td className="left">Handle Name</td>
            <td className="right">{handle}</td>
          </tr>
          <tr>
            <td className="left">Current Reaching</td>
            <td className="right">{userInfoObj["rank"]}</td>
          </tr>
          <tr>
            <td className="left">Best Reaching</td>
            <td className="right">{userInfoObj["maxRank"]}</td>
          </tr>
          <tr>
            <td className="left">Current Rating</td>
            <td className="right">{userInfoObj["rating"]}</td>
          </tr>
          <tr>
            <td className="left">Best Rating Achieved</td>
            <td className="right">{userInfoObj["maxRating"]}</td>
          </tr>
          <tr>
            <td className="left">{handle}'s Contributions</td>
            <td className="right">{userInfoObj["contribution"]}</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default UserInfoTable;
