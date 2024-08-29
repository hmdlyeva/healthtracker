"use client";
import React, { useState } from "react";
import "./profil.scss";
import Navbar from "@/components/navbar/Navbar";
import { updateUsers, User } from "@/redux/slice/userSlice";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/redux/store/store";
type Props = {};

const Profil = (props: Props) => {
  const dispatch = useDispatch<AppDispatch>();
  const storedUser = localStorage.getItem("logeduser");
  let userim: User | null = null;
  if (storedUser) {
    try {
      userim = JSON.parse(storedUser) as User;
    } catch (error) {
      console.error("Error parsing JSON from localStorage:", error);
    }
  }
  const [goalArr, setGoalArr] = useState([
    {
      goal: userim?.water_goal || 0,
      desc: "Daily water intake goal",
    },
    {
      goal: userim?.sleep_goal || 0,
      desc: "Daily sleep goal in hours",
    },
    {
      goal: userim?.exercise_goal || 0,
      desc: "Daily exercise goal in minutes",
    },
    {
      goal: userim?.height || 0,
      desc: "User's height in cm",
    },
  ]);
  const handleGoalChange = (index: number, value: Number) => {
    const newGoals = [...goalArr];
    newGoals[index].goal = value;
    setGoalArr(newGoals);
  };
  const handleUpdate = () => {
    if (userim) {
      userim.water_goal = goalArr[0].goal;
      userim.sleep_goal = goalArr[1].goal;
      userim.exercise_goal = goalArr[2].goal;
      userim.height = goalArr[3].goal;
      localStorage.setItem("logeduser", JSON.stringify(userim));
      dispatch(
        updateUsers({
          id: userim!._id,
          newp: {
            ...userim,
            water_goal: goalArr[0].goal,
            sleep_goal: goalArr[1].goal,
            exercise_goal: goalArr[2].goal,
          },
        })
      );
    }
  };
  return (
    <div className="profile">
      <Navbar />
      <div className="container">
        <div className="profile_page">
          <div className="hero_img"></div>

          <div className="hero_text">
            <h1>Update Your Goals to Achieve more!</h1>
            <p>
              We are dedicated to helping you achive your health goals,
              providing you with the tools, support, and resources you need to
              lead a healthier, happier life.
            </p>
            <button onClick={handleUpdate} className="update-button">
              Update Now
            </button>
          </div>
        </div>

        <section className="goalsec">
          <div className="container">
            <div className="goal_section">
              {goalArr &&
                goalArr.map((goal, i) => (
                  <div className="goal" key={i}>
                    <input
                      type=""
                      value={goal.goal as number}
                      onChange={(e) =>
                        handleGoalChange(i, Number(e.target.value))
                      }
                      className="goal-input"
                    />
                    <p>{goal.desc}</p>
                  </div>
                ))}
            </div>
           
          </div>
        </section>
      </div>
    </div>
  );
};

export default Profil;
