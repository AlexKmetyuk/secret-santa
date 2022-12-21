import React, { useEffect, useState } from "react";
import { api } from "../../services/api";
import { Button } from "../Button";
import { Loader } from "../Loader";
import "./style.scss";

export function UserInfo({ user }) {
  const [wish, setWish] = useState("");
  const [userWish, setUserWish] = useState(null);
  const [lucky, setLucky] = useState({});
  const [luckyWish, setLuckyWish] = useState("");
  const [showLoader, setShowLoader] = useState(false);

  const [isAllUsers, setAllUser] = useState(false);

  const addWishes = async (e) => {
    e.preventDefault();
    try {
      setShowLoader(true);
      const res = await api.setWishes(wish);
      console.log("Wish res:", res.user);
      setUserWish(res.user.wish);
      setShowLoader(false);
    } catch (error) {
      setShowLoader(false);
      console.log(error);
    }
  };

  const findLucky = async (e) => {
    e.preventDefault();
    try {
      setShowLoader(true);

      const res = await api.getRandomUser();
      setLucky(res.santaFor);
      setLuckyWish(res.santaFor.wish);
      setShowLoader(false);
    } catch (error) {
      setShowLoader(false);

      console.log(error);
    }
  };

  useEffect(() => {
    console.log(userWish);
  }, [userWish]);

  useEffect(() => {
    api.getUsersCount().then((res) => {
      console.log("res", res);

      if (res.usersLength >= 16) {
        setAllUser(true);
      } else {
        setAllUser(false);
      }
    });
    if (user.santaFor?.name) {
      api
        .getLuckyWish()
        .then((res) => {
          console.log(res);
          if (res.userWish) {
            setLuckyWish(res.userWish);
          }
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, [setLuckyWish]);

  return (
    <>
      {showLoader ? (
        <Loader />
      ) : (
        <div className="user-info">
          <div>
            <p className="user-info__name">Hello, {user.name}!</p>
            <div className="wishes">
              {userWish || user.wish ? (
                <p className="user-info__wish">
                  Your wish is - "{userWish || user.wish}"
                </p>
              ) : (
                <>
                  <label className="wishes__label">
                    Enter your wishes here:
                  </label>
                  <textarea
                    className="wishes__input"
                    onChange={(e) => {
                      setWish(e.target.value);
                    }}
                    value={wish}
                  />
                  <Button title="Submit" onClick={addWishes} />{" "}
                </>
              )}
            </div>
          </div>
          {isAllUsers && (
            <div className="lucky">
              {lucky.name || user.santaFor?.name ? (
                <>
                  <p className="user-info__wish">
                    Your are santa for {lucky.name || user.santaFor?.name}
                  </p>
                  <p className="user-info__wish">
                    Wish is - "{luckyWish || "Nothing"}"
                  </p>
                </>
              ) : (
                <>
                  <p className="lucky__name">
                    Click this button to <br /> find your lucky guy!
                  </p>
                  <Button title="Find lucky guy!" onClick={findLucky} />
                </>
              )}
            </div>
          )}
        </div>
      )}
    </>
  );
}
