import React from 'react';
import '../../styles/home.css';
import { FaFacebookSquare } from "react-icons/fa";
import { IoLogoGithub } from "react-icons/io5";
import { BsLinkedin } from "react-icons/bs";
import { IoLogoInstagram } from "react-icons/io5";
import Slider from 'react-infinite-logo-slider'; // Import Infinite Logo Slider
import { Link } from 'react-router-dom';
import { Link as ScrollLink } from 'react-scroll';

function HomePage({ userInfo, stack, links }) {

  // Ensure stack is an array and has elements
  const validStack = Array.isArray(stack) && stack.length > 0;
  
  return (
    <>
      <div className="home-main">

        <div className="home-header">
          <div className="col-md-12">
            <div className="row">
              <div className="circle1"></div>
              <div className="home-name col-md-12">
                <span className="designation">{userInfo?.designation}</span>
                <p className="text-name">
                  <span>{userInfo?.userName}</span>
                </p>
                <p className='col-md-7 p-3' dangerouslySetInnerHTML={{__html:userInfo?.shortDesc}}/>
                <ScrollLink to="reachout" style={{ textDecoration: 'none' }}>
                  <button>Reach Out</button>
                </ScrollLink>
              </div>
              <div className="circle2"></div>

            </div>
          </div>

          <div className="container pt-5">
            <div className="row home-socials col-md-12">
              <ul className="col-md-6">
                <li>
                  <Link to={links.linkedin} target='_blank'>
                    <BsLinkedin />
                  </Link>
                </li>
                <li>
                  <Link to={links?.github} target='_blank'>
                    <IoLogoGithub />
                  </Link>
                </li>
                <li>
                  <Link to={links?.instagram} target='_blank'>
                    <IoLogoInstagram />
                  </Link>
                </li>
                <li>
                  <Link to={links?.facebook} target='_blank'>
                    <FaFacebookSquare />
                  </Link>
                </li>
              </ul>

              <div className="col-md-6 home-email">
                <Link to={`mailto:${links?.email}`} target='_blank'>
                  {links?.email}
                </Link>
              </div>
            </div>
          </div>
          
        </div>



        {/* Stack Technologies Section */}
        <div className="stack-logo-main">
          <div className="container pt-5 pb-4">
            <div className="part-heading col-md-12">
              <p>STACKS</p>
              <h2>Technologies I Work With</h2>
              <hr />
            </div>

            <div className="col-md-12 mt-5">
              {/* Use InfiniteLogoSlider for the carousel only if the stack is valid */}
              {validStack ? (
                <Slider
                  duration={20} // Set the transition speed to 500 ms (faster)
                  pauseOnHover={true} // Pause the slider on hover
                  width={'270px'}
                >
                  {stack?.map((tech, index) => (
                    <div className="tech-card" key={index}>
                      <img src={tech.stackImage} alt={tech.stackName} />
                      <p><b>{tech.stackName}</b></p>
                    </div>
                  ))}
                </Slider>
              ) : (
                <p>No technologies available</p> // Fallback message
              )}
            </div>
          </div>
        </div>

      </div>
    </>
  );
}

export default HomePage;
