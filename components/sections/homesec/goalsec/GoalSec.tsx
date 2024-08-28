import React from "react";
import "./goalsec.scss";
type Props = {};

const GoalSec = (props: Props) => {
  const goalArr = [
    {
      goal: 27,
      desc:"Years experiences in health industries by expert"
    },
    {
      goal: 148,
      desc:"Branch Officies to give you nest services worldwide"
    },
    {
      goal: 1000,
      desc:"New users login every single day to our app"
    },
    {
      goal: 120,
      desc:"Users download our every single days"
    },
  ];
  return (
    <section className="goalsec">
      <div className="container">
        <div className="goal_section">
            {
                goalArr && goalArr.map((goal,i)=> (
                    <div className="goal" key={i}>
                        <h1>{goal.goal}</h1>
                        <p>{goal.desc}</p>
                    </div>
                ))
            }
        </div>
      </div>
    </section>
  );
};

export default GoalSec;
