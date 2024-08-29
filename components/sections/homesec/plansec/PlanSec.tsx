import RightArrow from "@/components/ui/RightArrow";
import React, { forwardRef } from "react";
import "./plansec.scss";
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
