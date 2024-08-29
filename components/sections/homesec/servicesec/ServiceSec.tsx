import React, { forwardRef } from "react";
import "./servicesec.scss";
import RightArrow from "@/components/ui/RightArrow";
type Props = {};
const serviceCards = [
  {
    img: "/images/waterdrink.jpg",
    title: "Drink Tracker",
    desc: "Our Drink tracker app helps you monitor your daily water intake effortlessly. Stay on top of your hydration goals, improve your well-being.",
  },
  {
    img: "/images/appleeat.jpg",
    title: "Food Tracker",
    desc: "Take control of your eating habits with our Food tracker app. log your meals, track your calories, and make informed choices.",
  },
  {
    img: "/images/exercisedoing.jpg",
    title: "Daily Exercise",
    desc: "Never forget to stay hydrated again. Drink tracker makesit it easy to monitor your daily water intake, promoting a healthier.",
  },
];
const ServiceSec = forwardRef<HTMLDivElement, Props>((props, ref) => {
  return (
    <section className="servicesec" ref={ref}>
      <div className="container">
        <div className="service_section">
          <div className="text_side">
            <h1>Catalog of Services Through Our App</h1>
            <p>
              Our app presents a comprehensive catalog of services that cater to
              a wide range of needs, all accessible at your fingertips. With our
              app, you're not just downloading a piece of software;you're
              unlocking a world of convenience and possibilities.
            </p>
          </div>

          <div className="offer_cards">
            {serviceCards &&
              serviceCards.map((service, i) => (
                <div key={i} className="card">
                  <div className="service_img">
                    <img src={service.img} alt="" />
                  </div>
                  <div className="card_detail">
                    <button>
                      <RightArrow />
                    </button>
                    <h1>{service.title}</h1>
                    <p>{service.desc}</p>
                  </div>
                </div>
              ))}
          </div>
        </div>
      </div>
    </section>
);
});

export default ServiceSec;
