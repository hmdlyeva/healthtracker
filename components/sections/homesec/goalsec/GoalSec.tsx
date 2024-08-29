import React from "react";
import "./goalsec.scss";
import { User } from "@/redux/slice/userSlice";
type Props = {};

const GoalSec = (props: Props) => {
  const storedUser = localStorage.getItem("logeduser");
  let userim: User | null = null;
  if (storedUser) {
    try {
      userim = JSON.parse(storedUser) as User;
    } catch (error) {
      console.error("Error parsing JSON from localStorage:", error);
    }
  }
  const defaultGoalArr = [
    {
      goal: 27,
      desc: "Years experiences in health industries by expert",
    },
    {
      goal: 148,
      desc: "Branch Offices to give you best services worldwide",
    },
    {
      goal: 1000,
      desc: "New users login every single day to our app",
    },
    {
      goal: 120,
      desc: "Users download our app every single day",
    },
  ];

  const goalArr = userim
    ? [
        {
          goal: userim.water_goal || 0,
          desc: "Daily water intake goal",
        },
        {
          goal: userim.sleep_goal || 0,
          desc: "Daily sleep goal in hours",
        },
        {
          goal: userim.exercise_goal || 0,
          desc: "Daily exercise goal in minutes",
        },
        {
          goal: userim.height || 0,
          desc: "User's height in cm",
        },
      ]
    : defaultGoalArr;

  return (
    <section className="goalsec">
      <div className="container">
        <div className="goal_section">
          {goalArr &&
            goalArr.map((goal: { goal: Number; desc: String }, i) => (
              <div className="goal" key={i}>
                <h1>{goal.goal as number}</h1>
                <p>{goal.desc}</p>
              </div>
            ))}
        </div>
      </div>
    </section>
  );
};

export default GoalSec;
