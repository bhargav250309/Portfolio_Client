import React from 'react';
import '../../styles/about.css';
import { BsLinkedin } from "react-icons/bs";
import { IoLogoInstagram } from "react-icons/io5";
import { LuGithub } from "react-icons/lu";
import { Link } from 'react-router-dom';

function AboutPage({ aboutInfo, links }) {
  return (
    <>
      <div className="about-main pt-5">
        <div className="container about-comp-main py-5">

          <div className="row about-partition gap-2">
            <div className="first-about-partition">
              <h4 className='mb-3'><span className='mx-2' style={{ fontSize: "2rem" }}>&#x1F44B;</span>Hey, i'm</h4>

              <h1 className='mb-4 mt-1'>{aboutInfo?.userName}</h1>

              <p className='mb-4'>{aboutInfo?.description}</p>
            </div>

            <div className="second-about-partition">
              <img src={aboutInfo?.aboutImage} alt="Profile Pic" className="img-fluid" />
            </div>
          </div>

          <div className="row abt-btn-row gap-3 mt-4">
            <Link to={links?.linkedin} target='_blank' className="about-btns"><BsLinkedin className='mx-2' />Linkedin</Link>
            <Link to={links?.github} target='_blank' className="about-btns"><LuGithub className='mx-2' /> Github</Link>
            <Link to={links?.instagram} target='_blank' className="about-btns"><IoLogoInstagram className='mx-2' />Instagram</Link>
          </div>
        </div>
      </div>
    </>
  );
}

export default AboutPage;
