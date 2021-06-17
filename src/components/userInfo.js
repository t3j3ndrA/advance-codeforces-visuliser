import React, { useEffect, useState } from "react";

// Local Import begins
import UserInfoTable from "./userInfoTable";
import UserRating from "./userRatings";
// Local Import end

const UserInfo = (props) => {
  const { handle } = { ...props };
  const url = `https://codeforces.com/api/user.info?handles=${handle}`;
  const [userInfoObj, setUserInfoObj] = useState({});
  const [isError, setIsError] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  async function fetchUserInfo() {
    let stage1 = await fetch(url);
    let stage2 = await stage1.json();
    if (stage2["status"] === "FAILED" || stage2["result"].length === 0) {
      setIsError(true);
      return;
    }
    setIsLoading(false);
    setUserInfoObj(stage2["result"][0]);
  }
  useEffect(() => {
    fetchUserInfo();
  }, []);
  return (
    <>
      {!isError && !isLoading && (
        <UserInfoTable userInfoObj={userInfoObj} handle={handle} />
      )}
      {!isError && !isLoading && <UserRating handle={handle} />}
    </>
  );
};

export default UserInfo;
