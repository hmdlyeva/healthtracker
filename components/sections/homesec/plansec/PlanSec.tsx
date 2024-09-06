import RightArrow from "@/components/ui/RightArrow";
import React, { forwardRef, useEffect } from "react";
import "./plansec.scss";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
gsap.registerPlugin(ScrollTrigger);
type Props = {};
const serviceCards = [
  {
    title: "1 DAY PASS",
    desc: "With our tracking feature, you can access real-time data on website traffic.",
    price: "Free",
  },
  {
    title: "1 WEEK PASS",
    desc: "With our tracking feature, you can access real-time data on website traffic.",
    price: "$20.00",
  },
  {
    title: "1 MONTH PASS",
    desc: "With our tracking feature, you can access real-time data on website traffic.",
    price: "$15.00",
  },
];
const PlanSec = forwardRef<HTMLDivElement, Props>((props, ref) => {
  useEffect(() => {
    gsap.fromTo(
      ".plan_section .text_side h1",
      {
        scrollTrigger: {
          trigger: ".text_side h1",
          start: "bottom 150%", 
          end: "top bottom", 
          scrub: true, 
        },
        x: -50,
        opacity: 0,
        duration: 0.1,
      },
      {
        scrollTrigger: {
          trigger: ".plansec",
          start: "top 150%", 
          end: "bottom top",
          scrub: true, 
        },
        x: 0,
        opacity: 1,
        duration: 0.1,
        delay: 1
      }
    );
    gsap.fromTo(
      ".plan_section .text_side p",
      {
        scrollTrigger: {
          trigger: ".text_side p",
          start: "bottom 150%", 
          end: "top bottom", 
          scrub: true, 
        },
        x: 50,
        opacity: 0,
        duration: 0.1,
      },
      {
        scrollTrigger: {
          trigger: ".plansec",
          start: "top 150%", 
          end: "bottom top",
          scrub: true, 
        },
        x: 0,
        opacity: 1,
        duration: 0.1,
      }
    );
   
  }, []);
  return (
    <section className="plansec" ref={ref}>
      <div className="container">
        <div className="plan_section">
          <div className="text_side">
            <h1>Our Health Product Pricing Plan</h1>
            <p>
              These pricing plans offer a clear progression from a free basic
              Plan to more comprehensive Premium and family Plans, prividing
              options for users with varying health and wellness needs.
            </p>
          </div>

          <div className="offer_cards">
            {serviceCards &&
              serviceCards.map((plan, i) => (
                <div key={i} className="card">
                  <div className="count">
                    <h1>0{i + 1}</h1>
                  </div>
                  <div className="details">
                    <h1>{plan.title}</h1>
                    <p>{plan.desc}</p>
                  </div>
                  <div className="card_footer">
                    <button>
                      <RightArrow />
                    </button>
                    <p>Price start From</p>
                    <h1>{plan.price}</h1>
                  </div>
                </div>
              ))}
          </div>
        </div>
      </div>
    </section>
  );
});

export default PlanSec;
