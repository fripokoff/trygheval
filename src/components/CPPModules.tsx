import React, { useState } from "react";
import { FaCheck } from "react-icons/fa";
import ReactCountryFlag from "react-country-flag";

function CPPModule({ project, milestone, navigateTo, projects, projectIndex }) {
  const [showCPPChildren, setShowCPPChildren] = useState(false);

  const toggleCPPModules = () => {
    setShowCPPChildren(!showCPPChildren);
  };

  const getProjectHours = (mile, projectName, index) => {
    const milestoneData = projects.milestones.find(m =>
      m.projects.some(p => p.project === projectName && m.milestone === mile)
    );

    if (milestoneData) {
      const project = milestoneData.projects.find(p => p.project === projectName);
      if (Array.isArray(project.hours) && index >= 0) {
        return project.hours[index] ? project.hours[index] : 0;
      }else if (index === -1 && projectName.includes("CPP"))
      {
        let totalHours = 0;
        project.hours.forEach((hour) => {
          totalHours += hour;
        });
        return totalHours;
      }
      return project ? project.hours : 0;
    }

    return 0;
  };

  return (
    <React.Fragment>
      <tr
        className="border-x-4 border-base-300 bg-base-200"
        onClick={toggleCPPModules}
      >
        <td className="py-3 px-5 text-base-content cursor-pointer ">
          <div className="flex justify-center items-center gap-2 text-xl text-base-content p-4">
            CPP MODULES (5)
            {showCPPChildren ? (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 36 36"
                strokeWidth="1.5"
                stroke="currentColor"
                className="w-6 h-6"
              >
                <path
                  d="M25.19,20.4A6.78,6.78,0,0,0,25.62,18a6.86,6.86,0,0,0-6.86-6.86,6.79,6.79,0,0,0-2.37.43L18,13.23a4.78,4.78,0,0,1,.74-.06A4.87,4.87,0,0,1,23.62,18a4.79,4.79,0,0,1-.06.74Z"
                  className="clr-i-outline clr-i-outline-path-1"
                />
                <path
                  d="M34.29,17.53c-3.37-6.23-9.28-10-15.82-10a16.82,16.82,0,0,0-5.24.85L14.84,10a14.78,14.78,0,0,1,3.63-.47c5.63,0,10.75,3.14,13.8,8.43a17.75,17.75,0,0,1-4.37,5.1l1.42,1.42a19.93,19.93,0,0,0,5-6l.26-.48Z"
                  className="clr-i-outline clr-i-outline-path-2"
                />
                <path
                  d="M4.87,5.78l4.46,4.46a19.52,19.52,0,0,0-6.69,7.29L2.38,18l.26.48c3.37,6.23,9.28,10,15.82,10a16.93,16.93,0,0,0,7.37-1.69l5,5,1.75-1.5-26-26Zm9.75,9.75,6.65,6.65a4.81,4.81,0,0,1-2.5.72A4.87,4.87,0,0,1,13.9,18,4.81,4.81,0,0,1,14.62,15.53Zm-1.45-1.45a6.85,6.85,0,0,0,9.55,9.55l1.6,1.6a14.91,14.91,0,0,1-5.86,1.2c-5.63,0-10.75-3.14-13.8-8.43a17.29,17.29,0,0,1,6.12-6.3Z"
                  className="clr-i-outline clr-i-outline-path-3"
                />
              </svg>
            ) : (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 36 36"
                strokeWidth="1.5"
                stroke="currentColor"
                className="w-6 h-6"
              >
                <path
                  d="M33.62,17.53c-3.37-6.23-9.28-10-15.82-10S5.34,11.3,2,17.53L1.72,18l.26.48c3.37,6.23,9.28,10,15.82,10s12.46-3.72,15.82-10l.26-.48ZM17.8,26.43C12.17,26.43,7,23.29,4,18c3-5.29,8.17-8.43,13.8-8.43S28.54,12.72,31.59,18C28.54,23.29,23.42,26.43,17.8,26.43Z"
                  className="clr-i-outline clr-i-outline-path-1"
                />
                <path
                  d="M18.09,11.17A6.86,6.86,0,1,0,25,18,6.86,6.86,0,0,0,18.09,11.17Zm0,11.72A4.86,4.86,0,1,1,23,18,4.87,4.87,0,0,1,18.09,22.89Z"
                  className="clr-i-outline clr-i-outline-path-2"
                />
              </svg>
            )}
          </div>
        </td>
        <td className="py-3 px-5 w-1/12">
          <span className="text-base-content font-bold text-xl">
            {project.time}m x 5
          </span>
        </td>
        <td className="py-3 px-5 w-1/12">
          <span className="text-base-content font-bold text-xl">
            {project.eval_points} x 5
          </span>
        </td>

        <td className="py-3 px-5 w-1/12">
          <span className="text-base-content font-bold text-xl">
            {getProjectHours(milestone, project.project_title, -1)}h
          </span>
        </td>
        <td className="py-3 px-5 w-1/12">
          <span className="text-base-content font-bold text-xl">
            {getProjectHours(milestone, project.project_title, -1)}h
          </span>
        </td>
      </tr>
      {showCPPChildren &&
        (() => {
          let cppProjectsToRender = [];
          if (milestone === "Milestone 5") {
            cppProjectsToRender = project.CPPS.slice(0, 5);
          } else if (milestone === "Milestone 6") {
            cppProjectsToRender = project.CPPS.slice(5, 10);
          }
          return cppProjectsToRender.map((cppProject, cppIndex) => (
            <tr
              key={cppIndex}
              className="border-x-4 border-base-300 bg-base-200"
            >
              <td className="py-3 px-5 text-base-content cursor-pointer">
                <div
                  className="flex justify-center items-center gap-2 text-xl text-[#0D94B6]"
                  onClick={() =>
                    navigateTo(
                      `/sheet?project=${cppProject.project_title}`
                    )
                  }
                >
                  {cppProject?.finish && (
                    <FaCheck />
                  )}
                  {cppProject.project_title}
                </div>
                <span className="text-lg text-base-content text-bold">
                  {new Date(
                    cppProject.updated_at
                  ).toLocaleDateString("en-GB", {
                    day: "numeric",
                    month: "numeric",
                    year: "numeric",
                  })}
                </span>
              </td>
              <td className="py-3 px-5 w-1/12">
                <span className="text-base-content font-bold text-xl">
                  {cppProject.time}
                </span>
              </td>
              <td className="py-3 px-5 w-1/12">
                <span className="text-base-content font-bold text-xl">
                  {cppProject.eval_points}
                </span>
              </td>
              <td className="py-3 px-5 w-1/12">
                <span className="text-base-content font-bold text-xl">
                  {getProjectHours(milestone, "CPP", cppIndex)}h
                </span>
              </td>
              <td className="py-3 px-5 w-1/12">
                <div
                  className="flex justify-center items-center gap-2 text-sm text-blue-500 cursor-pointer"
                  onClick={() =>
                    navigateTo(
                      `/sheet?project=${cppProject.project_title}`,
                      true
                    )
                  }
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth="1.5"
                    stroke="currentColor"
                    className="size-8"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10"
                    ></path>
                  </svg>
                </div>
              </td>
            </tr>
          ));
        })()}
    </React.Fragment>
  );
}

export default CPPModule;