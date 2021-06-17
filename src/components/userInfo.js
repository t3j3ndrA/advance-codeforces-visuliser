import React, { useEffect, useState } from "react";

// Local Import begins
import UserInfoTable from "./userInfoTable";
import UserRating from "./userRatings";
// Local Import end

const UserInfo = (props) => {
  const { handle } = { ...props };
  const url = `https://codeforces.com/api/user.info?handles=${handle}`;
  const [userInfoObj, setUserInfoObj] = useState({});
  const [isEroor, setIsEroor] = useState(true);
  async function fetchUserInfo() {
    let stage1 = await fetch(url);
    let stage2 = await stage1.json();
    if (stage2["status"] === "OK") {
      setIsEroor(false);
    } else return;
    setUserInfoObj(stage2["result"][0]);
  }
  useEffect(() => {
    fetchUserInfo();
  }, []);
  return (
    <>
      {isEroor || <UserInfoTable userInfoObj={userInfoObj} handle={handle} />}
      {isEroor || <UserRating handle={handle} />}
    </>
  );
};

export default UserInfo;
