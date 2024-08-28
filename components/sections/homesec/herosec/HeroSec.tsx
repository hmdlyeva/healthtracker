import React from "react";
import "./herosec.scss";
import Image from "next/image";
import RightArrow from "@/components/ui/RightArrow";
type Props = {};

const HeroSec = (props: Props) => {
  return (
    <section className="herosec">
      <div className="container">
        <div className="hero_section">
          <div className="hero_text">

            <h1>Your Health, Our App</h1>
            <p>
              We are dedicated to helping you achive your health goals,
              providing you with the tools, support, and resources you need to
              lead a healthier, happier life.
            </p>

            <div className="join_us">
              <button>Join Us Now</button>
              <div className="arrow">
                <RightArrow/>
              </div>
            </div>
          </div>
          <div className="hero_img">
            
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSec;
