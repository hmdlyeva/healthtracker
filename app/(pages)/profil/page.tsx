"use client";
import React, { useEffect, useState } from "react";
import "./profil.scss";
import Navbar from "@/components/navbar/Navbar";
import { updateUsers, User } from "@/redux/slice/userSlice";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/redux/store/store";
import RightArrow from "@/components/ui/RightArrow";
import { useFormik, ErrorMessage } from "formik";
import * as Yup from "yup";
import {
  postActivities,
  updateActivities,
  getActivities,
  UserActivity,
  Activity,
} from "@/redux/slice/activitySlice";
import { ChartConfig, ChartContainer } from "@/components/ui/chart";
import { Bar, BarChart, CartesianGrid, XAxis } from "recharts";
type Props = {};

const Profil = (props: Props) => {
  const dispatch = useDispatch<AppDispatch>();
  const activities = useSelector(
    (state: RootState) => state.activities.activities
  );
  const users = useSelector((state: RootState) => state.users.users);
  useEffect(() => {
    dispatch(getActivities());
  }, [dispatch]);
  const [UpdatedUserActivity, setUpdatedUserActivity] =
    useState<Activity[]>(activities);
  useEffect(() => {
    setUpdatedUserActivity(activities);
  }, [activities]);

  // const storedUser = localStorage.getItem("logeduser");
  const storedUser = users.find((user) => user.islogin == true);
  let userim: User | null = null;
  if (storedUser) {
    try {
      userim = storedUser as User;
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

  const logedUserActivities: Activity | undefined = UpdatedUserActivity.find(
    (user) => user.userid === userim!._id
  );

  const [logedUserActivity, setLogedUserActivity] = useState<UserActivity[]>(
    []
  );
  useEffect(() => {
    if (logedUserActivities) {
      setLogedUserActivity(logedUserActivities.user_activity);
    } else {
      setLogedUserActivity([]);
    }
  }, [logedUserActivities]);

  const formik = useFormik({
    initialValues: {
      water: 0,
      sleep: 0,
      exercise: 0,
    },
    validationSchema: Yup.object({
      water: Yup.number().required("Daily Water is required"),
      sleep: Yup.number().required("Daily Sleep is required"),
      exercise: Yup.number().required("Daily Exercise is required"),
    }),
    onSubmit: (values: any) => {
      console.log(values);
      const userActivities = activities.find(
        (activity) => activity.userid === userim!._id
      );

      let nextDay = 1;
      const newActivity: UserActivity = {
        daily_water: values.water,
        daily_sleep: values.sleep,
        daily_exercise: values.exercise,
        day: nextDay,
      };

      if (userActivities) {
        userActivities.user_activity.forEach((activity) => {
          if ((activity.day as number) >= nextDay) {
            nextDay = (activity.day as number) + 1;
          }
        });

        newActivity.day = nextDay;
        alert("var idi +1 oldu");
        dispatch(
          updateActivities({
            id: userActivities._id,
            newp: {
              userid: userim!._id,
              user_activity: [...userActivities.user_activity, newActivity],
            },
          })
        );
      } else {
        const newActivityData = {
          userid: userim!._id,
          user_activity: [newActivity],
        };
        dispatch(postActivities(newActivityData as object));
        alert("userin yoxu idi");
      }
    },
  });

  const chartData = logedUserActivities?.user_activity.map((item) => {
    return {
      water: item.daily_water,
      sleep: item.daily_sleep,
      exercise: item.daily_exercise,
      day: item.day,
    };
  });

  const chartConfig = {
    water: {
      label: "Water",
      color: "#60a5fa",
    },
    sleep: {
      label: "Sleep",
      color: "#8efb4a",
    },
    exercise: {
      label: "Exercise",
      color: "#000000e9",
    },
  } satisfies ChartConfig;

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

        <section className="plansec">
          <div className="container">
            <div className="plan_section">
              <div className="text_side">
                <h1>Log your Daily Health tracker Plan</h1>
                <p>
                  These tracking plans offer a clear progression from a free
                  basic Plan to more comprehensive Premium and family Plans,
                  prividing options for users with varying health and wellness
                  needs.
                </p>
              </div>

              <div className="add_card">
                <div className="card">
                  <form onSubmit={formik.handleSubmit}>
                    <div className="details">
                      <div className="water">
                        <label htmlFor="water">Water mount</label>
                        <input
                          id="water"
                          name="water"
                          type="text"
                          onChange={formik.handleChange}
                          value={formik.values.water}
                        />
                        {formik.touched.water &&
                        typeof formik.errors.water === "string" ? (
                          <div className="error_message">
                            {formik.errors.water}
                          </div>
                        ) : null}
                      </div>

                      <div className="sleep">
                        <label htmlFor="sleep">Sleep mount</label>
                        <input
                          id="sleep"
                          name="sleep"
                          type="text"
                          onChange={formik.handleChange}
                          value={formik.values.sleep}
                        />
                        {formik.touched.sleep &&
                        typeof formik.errors.sleep === "string" ? (
                          <div className="error_message">
                            {formik.errors.sleep}
                          </div>
                        ) : null}
                      </div>

                      <div className="exercise">
                        <label htmlFor="exercise">Exercise mount</label>
                        <input
                          id="exercise"
                          name="exercise"
                          type="text"
                          onChange={formik.handleChange}
                          value={formik.values.exercise}
                        />
                        {formik.touched.exercise &&
                        typeof formik.errors.exercise === "string" ? (
                          <div className="error_message">
                            {formik.errors.exercise}
                          </div>
                        ) : null}
                      </div>
                    </div>

                    <div className="card_footer">
                      <button type="submit">
                        <RightArrow />
                      </button>
                      <p>Set It Now!</p>
                      <h1>+1 Day</h1>
                    </div>
                  </form>
                </div>
              </div>

              <ChartContainer
                config={chartConfig}
                className="min-h-[200px] w-full"
              >
                <BarChart accessibilityLayer data={chartData}>
                  <CartesianGrid vertical={false} />
                  <XAxis
                    dataKey="day"
                    tickLine={false}
                    tickMargin={10}
                    axisLine={false}
                  />
                  <Bar dataKey="water" fill="var(--color-water)" radius={4} />
                  <Bar dataKey="sleep" fill="var(--color-sleep)" radius={4} />
                  <Bar
                    dataKey="exercise"
                    fill="var(--color-exercise)"
                    radius={4}
                  />
                </BarChart>
              </ChartContainer>

              <div className="offer_cards">
                {logedUserActivities &&
                  logedUserActivity.map((plan, i) => (
                    <div key={i} className="card">
                      <div className="count">
                        <h1>0{i + 1}</h1>
                      </div>
                      <div className="details">
                        <ul>
                          <li>
                            <h1>Water:</h1>
                            <span>{plan.daily_water as number}</span>
                          </li>
                          <li>
                            <h1>Sleep:</h1>
                            <span>{plan.daily_sleep as number}</span>
                          </li>
                          <li>
                            <h1>Exercise:</h1>
                            <span>{plan.daily_exercise as number}</span>
                          </li>
                        </ul>
                      </div>
                      <div className="card_footer">
                        <button>
                          <RightArrow />
                        </button>
                        <p>Tracker start From</p>
                        <h1>{plan.day as number}</h1>
                      </div>
                    </div>
                  ))}
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default Profil;
