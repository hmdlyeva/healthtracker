import Drop from "@/components/ui/Drop";
import Exercise from "@/components/ui/Exercise";
import RightArrow from "@/components/ui/RightArrow";
import Time from "@/components/ui/Time";
import React,{ forwardRef } from "react";
import "./feature.scss"
import LeftArrow from "@/components/ui/LeftArrow";

type Props = {};

const featureCards = [
  {
    icon: <Drop />,
    title: "Tracking",
    desc: "With your tracking feature, you can acces real-time data on website traffic, conversions, click-through rates, and more. You can monitor campaign.",
  },
  {
    icon: <Exercise />,
    title: "Insight",
    desc: "With your tracking feature, you can acces real-time data on website traffic, conversions, click-through rates, and more. You can monitor campaign.",
  },
  {
    icon: <Time />,
    title: "Real Time",
    desc: "With your tracking feature, you can acces real-time data on website traffic, conversions, click-through rates, and more. You can monitor campaign.",
  },
];

const FeatureSec = forwardRef<HTMLDivElement, Props>((props, ref) => {
  return (
    <section className="featuresec" ref={ref}>
      <div className="container">
        <div className="feature_section">
          <div className="text_side">
            <h1>Best features We Offer for You</h1>
            <div className="ui_side">
              <p>
                We're dedicated to helping you achieve your health goals,
                providing you with the tools, support, and resources.
              </p>
              <div className="btns">
                <button>
                 <LeftArrow/>
                </button>
                <div className="line">
                  <button>
                    <RightArrow />
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div className="offer_cards">
            {featureCards &&
              featureCards.map((feature, i) => (
                <div key={i} className="card">
                  <div className="icon">{feature.icon}</div>
                  <h1>{feature.title}</h1>
                  <p>{feature.desc}</p>

                  <div className="discover_more_btn">
                    Discover More
                  </div>
                </div>
              ))}
          </div>
        </div>
      </div>
    </section>
);
});

export default FeatureSec;
