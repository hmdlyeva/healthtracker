import React, { forwardRef, useEffect } from "react";
import "./servicesec.scss";
import RightArrow from "@/components/ui/RightArrow";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
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
  useEffect(() => {
    gsap.fromTo(
      ".service_section .text_side h1",
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
          trigger: ".servicesec",
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
      ".service_section .text_side p",
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
          trigger: ".servicesec",
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
