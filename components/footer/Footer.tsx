import React from "react";
import RightArrow from "../ui/RightArrow";
import Github from "../ui/Github";
import Linkedin from "../ui/Linkedin";
import Stackoverflow from "../ui/Stackoverflow";
import "./footer.scss"
type Props = {};

const links = [
  {
    label: "About",
    links: ["Our Journey", "Our Team", "Testimonial", "Career"],
  },
  {
    label: "Our product",
    links: ["Product Overview", "How It works", "Price"],
  },
  {
    label: "Services",
    links: ["Offerings", "Process", "Case Stuides"],
  },
  {
    label: "Offer",
    links: ["Discount", "Packaging", "Rewards"],
  },
  {
    label: "Contact Us",
    links: ["Informations", "Contact Form", "Relation Map"],
  },
];

const social_links = [<Github key="github"/>, <Linkedin key="linkedin"/>, <Stackoverflow key="stackoverflow"/>];

const Footer = (props: Props) => {
  return (
    <div className="footer">
      <hr />
      <div className="container">
        <div className="footer">
          <div className="logo_side">
            <h1>Health Tracker</h1>
            <p>
              We&apos;re dedicated to helping you achieve your health goals,
              providing you with the tools, support
            </p>
          </div>

          <div className="links_side">
            {links &&
              links.map((link, i) => (
                <ul key={i}>
                  <h1>{link.label}</h1>
                  {link.links &&
                    link.links.map((link) => <li key={link}>{link}</li>)}
                </ul>
              ))}
          </div>
          <div className="connections">
            <div className="join_us">
              <button>Join Us Now</button>
              <div className="arrow">
                <RightArrow />
              </div>
            </div>

            <div className="social_icons">
              {social_links.map((link, i) => (
                <button key={i}>{link}</button>
              ))}
            </div>
          </div>
        </div>
        <p className="copy_right">© copyright holbertonschool 2024. All Rights Reserved</p>
      </div>
    </div>
  );
};

export default Footer;
