import React from 'react';
import '../../styles/project.css';
import { LuGithub } from "react-icons/lu";
import { GrLinkNext } from "react-icons/gr";

function ProjectsPage({ projects }) {
  // Sample array of projects

  return (
    <div className="container py-3">
      <div className="col-md-12 pt-5 pb-3">
        <div className="part-heading col-md-12">
          <p>PROJECTS</p>
          <h2>Check Out Some of My Recent Work</h2>
        </div>
        <hr />
      </div>

      <div className="col-md-12 mt-4">
        {projects && projects.length > 0 ? (
          projects?.map((project, index) => (
            <div className="project-card mb-5" key={index}>
              <div className="row h-100">
                <div className="project-img col-md-5">
                  {/* Add project image here */}
                  <img src={project.projectImage} alt="" />
                </div>

                <div className="col-md-6 pro-details mx-4">
                  <h3>{project.title}</h3>

                  <div className="col-md-12 stack-scroll">
                    <div className="project-stack my-3">
                      {project.stack.map((tech, idx) => (
                        <span key={idx}>{tech}</span>
                      ))}
                    </div>
                  </div>

                  <p className='mt-4'>{project.description}</p>
                  <div className="mt-5 pro-links">
                    <a href={project.githubLink} target='_blank' className="git-btn"><LuGithub className='mx-3' />GitHub Repository</a>
                    <a href={project.priviewLink} target='_blank' className="px-4">Live preview <GrLinkNext /></a>
                  </div>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="text-center">No projects found</div>
        )
        }
      </div>
    </div>
  );
}

export default ProjectsPage;
