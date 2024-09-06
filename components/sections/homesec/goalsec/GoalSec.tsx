import React, { useEffect, useRef } from "react";
import "./goalsec.scss";
import { User } from "@/redux/slice/userSlice";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { TextPlugin } from "gsap/TextPlugin";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store/store";
gsap.registerPlugin(TextPlugin);
type Props = {};

const GoalSec = (props: Props) => {
  // const storedUser = localStorage.getItem("logeduser");
  const users = useSelector((state: RootState) => state.users.users);
  const storedUser = users.find((user) => user.islogin == true);

  let userim: User | null = null;
  if (storedUser) {
    try {
      userim = storedUser as User;
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

    const goalRefs = useRef<HTMLDivElement[]>([]);

    useEffect(() => {
      goalRefs.current.forEach((goalRef:any, index:any) => {
        const goalValue = goalArr[index].goal as number;
  
        gsap.to(goalRef.querySelector("h1"), {
          text: {
            value: goalValue.toString(),
          },
          duration: 2,
          ease: "sine.out",
        });
      });
    }, [goalArr]);

  return (
    <section className="goalsec">
      <div className="container">
        <div className="goal_section">
          {goalArr &&
            goalArr.map((goal: { goal: Number; desc: String }, i) => (
              <div
              className="goal"
              key={i}
              ref={(el) => {
                if (el) {
                  goalRefs.current[i] = el;
                }
              }}
            >
                <h1>0</h1> 
                <p>{goal.desc}</p>
              </div>
            ))}
        </div>
      </div>
    </section>
  );
};

export default GoalSec;
