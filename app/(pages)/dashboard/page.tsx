"use client";
import { AppDispatch, RootState } from "@/redux/store/store";
import React, { useEffect, useState, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getUsers, User } from "../../../redux/slice/userSlice";
import Navbar from "@/components/navbar/Navbar";
import HeroSec from "@/components/sections/homesec/herosec/HeroSec";
import GoalSec from "@/components/sections/homesec/goalsec/GoalSec";
import FeatureSec from "@/components/sections/homesec/featuresec/FeatureSec";
import ServiceSec from "@/components/sections/homesec/servicesec/ServiceSec";
import PlanSec from "@/components/sections/homesec/plansec/PlanSec";
import DownloadSec from "@/components/sections/homesec/downloadsec/DownloadSec";
import Footer from "@/components/footer/Footer";
type Props = {};

const Dashboard = (props: Props) => {
  const users = useSelector((state: RootState) => state.users.users);
  const dispatch = useDispatch<AppDispatch>();

  const [allUsers, setAllUsers] = useState<User[]>({
    ...users,
  });
  const featureRef = useRef<HTMLDivElement>(null);
  const serviceRef = useRef<HTMLDivElement>(null);
  const planRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    dispatch(getUsers());
  }, [dispatch]);

  return (
    <div className="dashboard">
      <div className="home_page">
        <Navbar
          featureRef={featureRef}
          serviceRef={serviceRef}
          planRef={planRef}
        />
        <HeroSec />
        <GoalSec />
        <FeatureSec ref={featureRef} />
        <ServiceSec ref={serviceRef} />
        <PlanSec ref={planRef} />
        <DownloadSec />
        <Footer />
      </div>
    </div>
  );
};

export default Dashboard;
