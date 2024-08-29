"use client";
import React from "react";
import { useFormik, ErrorMessage } from "formik";
import * as Yup from "yup";
import "./register.scss";
import Link from "next/link";
import { postUsers, User } from "@/redux/slice/userSlice";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../../redux/store/store";
import { useRouter } from "next/navigation";
type Props = {};

const Register = (props: Props) => {
  const dispatch = useDispatch<AppDispatch>();
  const router = useRouter();
  const formik = useFormik({
    initialValues: {
      username: "",
      password: "",
      weight: 50,
      height: 160,
      age: 20,
      water_goal: 4,
      sleep_goal: 7,
      exercise_goal: 3,
    },
    validationSchema: Yup.object({
      username: Yup.string()
        .min(5, "Username must be at least 5 characters")
        .required("Username is required"),
      password: Yup.string()
        .matches(
          /^(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+=[\]{};':"\\|,.<>/?-]).{6,}$/,
          "Password must contain at least 1 uppercase letter, 1 number, and 1 special character"
        )
        .required("Password is required"),
      weight: Yup.number().required("Weight is required"),
      height: Yup.number().required("Height is required"),
      age: Yup.number().required("Age is required"),
      water_goal: Yup.number().required("Water goal is required"),
      sleep_goal: Yup.number().required("Sleep goal is required"),
      exercise_goal: Yup.number().required("Exercise goal is required"),
    }),
    onSubmit: (values: any) => {
      console.log(values);
      const newUser = {
        username: values.username,
        password: values.password,
        weight: values.weight,
        height: values.height,
        age: values.age,
        water_goal: values.water_goal,
        sleep_goal: values.sleep_goal,
        exercise_goal: values.exercise_goal,
        islogin: false,
      };
      dispatch(postUsers(newUser));
      router.push("/login");
    },
  });

  return (
    <div className="register_page">
      <div className="container">
        <div className="register">
          <h1>Register</h1>
          <form onSubmit={formik.handleSubmit}>
            <div className="df">
              <div className="username">
                <label htmlFor="username">Username</label>
                <input
                  id="username"
                  name="username"
                  type="text"
                  onChange={formik.handleChange}
                  value={formik.values.username}
                />
                {/* <ErrorMessage name="username" component="div" className="error_message" /> */}
                {formik.touched.username &&
                typeof formik.errors.username === "string" ? (
                  <div className="error_message">{formik.errors.username}</div>
                ) : null}
              </div>
              <div className="password">
                <label htmlFor="password">Password</label>
                <input
                  id="password"
                  name="password"
                  type="password"
                  onChange={formik.handleChange}
                  value={formik.values.password}
                />
                {/* <ErrorMessage name="password" component="div" className="error_message" /> */}
                {formik.touched.password &&
                typeof formik.errors.password === "string" ? (
                  <div className="error_message">{formik.errors.password}</div>
                ) : null}
              </div>
            </div>

            <div className="df">
              <div className="weight">
                <label htmlFor="weight">Weight (kg)</label>
                <input
                  id="weight"
                  name="weight"
                  type="number"
                  onChange={formik.handleChange}
                  value={formik.values.weight}
                />
                {/* <ErrorMessage name="weight" component="div" className="error_message" /> */}
                {formik.touched.weight && typeof formik.errors.weight === "string" ? (
              <div className="error_message">{formik.errors.weight}</div>
            ) : null}
              </div>

              <div className="height">
                <label htmlFor="height">Height (cm)</label>
                <input
                  id="height"
                  name="height"
                  type="number"
                  onChange={formik.handleChange}
                  value={formik.values.height}
                />
                {/* <ErrorMessage name="height" component="div" className="error_message" /> */}
                {formik.touched.height && typeof formik.errors.height === "string" ? (
              <div className="error_message">{formik.errors.height}</div>
            ) : null}
              </div>
            </div>

            <label htmlFor="age">Age</label>
            <input
              id="age"
              name="age"
              type="number"
              onChange={formik.handleChange}
              value={formik.values.age}
            />
            {/* <ErrorMessage name="age" component="div" className="error_message" /> */}
            {formik.touched.age && typeof formik.errors.age === "string" ? (
              <div className="error_message">{formik.errors.age}</div>
            ) : null}

            <div className="df">
              <div className="water">
                <label htmlFor="water_goal">Water Goal (liters)</label>
                <input
                  id="water_goal"
                  name="water_goal"
                  type="number"
                  onChange={formik.handleChange}
                  value={formik.values.water_goal}
                />
                {/* <ErrorMessage name="water_goal" component="div" className="error_message" /> */}
                {formik.touched.water_goal && typeof formik.errors.water_goal === "string" ? (
              <div className="error_message">{formik.errors.water_goal}</div>
            ) : null}
              </div>
              <div className="sleep">
                <label htmlFor="sleep_goal">Sleep Goal (hours)</label>
                <input
                  id="sleep_goal"
                  name="sleep_goal"
                  type="number"
                  onChange={formik.handleChange}
                  value={formik.values.sleep_goal}
                />
                {/* <ErrorMessage name="sleep_goal" component="div" className="error_message" /> */}
                {formik.touched.sleep_goal && typeof formik.errors.sleep_goal === "string" ? (
              <div className="error_message">{formik.errors.sleep_goal}</div>
            ) : null}
              </div>
            </div>

            <label htmlFor="exercise_goal">Exercise Goal (hours)</label>
            <input
              id="exercise_goal"
              name="exercise_goal"
              type="number"
              onChange={formik.handleChange}
              value={formik.values.exercise_goal}
            />
            {/* <ErrorMessage name="exercise_goal" component="div" className="error_message" /> */}
            {formik.touched.exercise_goal && typeof formik.errors.exercise_goal === "string" ? (
              <div className="error_message">{formik.errors.exercise_goal}</div>
            ) : null}

            <button type="submit">Register</button>
            <Link className="btn" href={"/login"}>
              Already have an account? Login now!
            </Link>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Register;
