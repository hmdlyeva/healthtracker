import React, { useEffect, useRef, useState } from "react";
import "./navbar.scss";
import Link from "next/link";
import { useDispatch } from "react-redux";
import { AppDispatch, RootState } from "../../redux/store/store";
import { useSelector } from "react-redux";
import {
  deleteLogedUserid,
  getUsers,
  updateUsers,
  User,
} from "@/redux/slice/userSlice";
import Profileicon from "../ui/Profileicon";
import Logout from "../ui/Logout";
import { setTimeout } from "timers/promises";
import { useRouter } from "next/navigation";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

type Props = {
  featureRef?: React.RefObject<HTMLDivElement>;
  serviceRef?: React.RefObject<HTMLDivElement>;
  planRef?: React.RefObject<HTMLDivElement>;
};
const Navbar = ({ featureRef, serviceRef, planRef }: Props) => {
  const dispatch = useDispatch<AppDispatch>();
  const Users = useSelector((state: RootState) => state.users.users);
  const loggedUserid = useSelector(
    (state: RootState) => state.users.loggedUserId
  );
  const router = useRouter();

  useEffect(() => {
    dispatch(getUsers());
  }, [dispatch]);

  const findLogedUser = Users.find((user) => user._id === loggedUserid);
  console.log(findLogedUser);
  const storedUser = localStorage.getItem("logeduser");
  let userim: User | null = null;
  if (storedUser) {
    try {
      userim = JSON.parse(storedUser) as User;
    } catch (error) {
      console.error("Error parsing JSON from localStorage:", error);
    }
  }

  const handleScrollToSection = (ref: React.RefObject<HTMLDivElement>) => {
    if (ref.current) {
      ref.current.scrollIntoView({ behavior: "smooth" });
    }
  };
  const [hoverModal, setHoverModal] = useState(false);
  const [hoverLogout, setHoverLogout] = useState(false);
  const timeoutRef = useRef<number | null>(null);

  const handleMouseLeave = () => {
    timeoutRef.current = window.setTimeout(() => {
      if (!hoverLogout) {
        setHoverModal(false);
      }
    }, 2000);
  };

  const handleMouseEnterModal = () => {
    setHoverLogout(true);
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
  };

  const handleMouseLeaveModal = () => {
    setHoverLogout(false);
    setHoverModal(false);
    // handleMouseLeave();
  };
  const logOut = () => {
    localStorage.removeItem("logeduser");
    dispatch(deleteLogedUserid());
    dispatch(
      updateUsers({
        id: userim!._id,
        newp: { ...userim, islogin: false },
      })
    );
    router.push("/");
  };

  useGSAP(() => {
    gsap.from(".links li,.logo, .auth_btns, .login_user", {
      y: -50,
      opacity: 0,
      duration: 1,
      delay: 1,
      stagger: 0.3,
    });
  });

  return (
    <div className="navbar">
      <div className="container">
        <div className="nav">
          <div className="logo">
            {" "}
            <Link href={"/"}>Health Tracker</Link>
          </div>
          {featureRef && serviceRef && planRef && (
            <div className="links">
              <ul>
                <li>
                  <Link href={"/"}>Home</Link>
                </li>
                <li>About</li>
                <li onClick={() => handleScrollToSection(featureRef)}>
                  Features
                </li>
                <li onClick={() => handleScrollToSection(serviceRef)}>
                  Progress
                </li>
                <li onClick={() => handleScrollToSection(planRef)}>Pricing</li>
              </ul>
            </div>
          )}

          {findLogedUser || userim ? (
            <h1
              onMouseEnter={() => setHoverModal(true)}
              onMouseLeave={handleMouseLeave}
              className="login_user"
            >
              {findLogedUser?.username || userim?.username}
            </h1>
          ) : (
            <div className="auth_btns">
              <Link className="btn" href={"/login"}>
                Log in
              </Link>
            </div>
          )}

          <div
            className="nav_modal"
            onMouseEnter={handleMouseEnterModal}
            onMouseLeave={handleMouseLeaveModal}
            style={{ display: hoverModal ? "block" : "none" }}
          >
            <ul>
              <li>
                <Link className="li" href={"/profil"}>
                  Profile <Profileicon />
                </Link>
              </li>
              <li className="li" onClick={logOut}>
                {/* <Link className="li" href={"/login"}> */}
                Log Out <Logout />
                {/* </Link> */}
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
