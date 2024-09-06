"use client";
import React, { useEffect } from "react";
import { useFormik, ErrorMessage } from "formik";
import * as Yup from "yup";
import "./login.scss";
import Link from "next/link";
import {
  getUsers,
  saveLogedUserid,
  updateUsers,
  User,
} from "@/redux/slice/userSlice";
import { useDispatch } from "react-redux";
import { AppDispatch, RootState } from "../../../redux/store/store";
import { useSelector } from "react-redux";
import { useRouter } from "next/navigation";

const Login = () => {
  const dispatch = useDispatch<AppDispatch>();
  const Users = useSelector((state: RootState) => state.users.users);
  const router = useRouter();
  useEffect(() => {
    dispatch(getUsers());
  }, [dispatch]);

  const formik = useFormik({
    initialValues: {
      username: "",
      password: "",
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
    }),
    onSubmit: (values: any) => {
      console.log(values);
      const findUser = Users.find(
        (user) =>
          user.username == values.username && user.password == values.password
      );
      if (findUser) {
        alert("Login Successfull");
        dispatch(
          updateUsers({
            id: findUser._id,
            newp: { ...findUser, islogin: true },
          })
        );
        dispatch(saveLogedUserid(findUser._id));
        // localStorage.setItem("logeduser", JSON.stringify(findUser));
        router.push("/");
      }
    },
  });

  return (
    <div className="login_page">
      <div className="container">
        <div className="login">
          <h1>Login</h1>
          <form onSubmit={formik.handleSubmit}>
            <label htmlFor="username">Username</label>
            <input
              id="username"
              name="username"
              type="text"
              onChange={formik.handleChange}
              value={formik.values.username}
            />
            {formik.touched.username &&
            typeof formik.errors.username === "string" ? (
              <div className="error_message">{formik.errors.username}</div>
            ) : null}

            <label htmlFor="password">Password</label>
            <input
              id="password"
              name="password"
              type="password"
              onChange={formik.handleChange}
              value={formik.values.password}
            />
            {formik.touched.password &&
            typeof formik.errors.password === "string" ? (
              <div className="error_message">{formik.errors.password}</div>
            ) : null}

            <button type="submit">Login</button>
            <Link className="btn" href={"/register"}>
              Don&apos;t have an account? Register now!
            </Link>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
