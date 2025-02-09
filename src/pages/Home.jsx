'use client';

import React, { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import getProjects from "../hooks/getProjects";
import { useLoading } from '../contexts/LoadingContext'; 
import ReactCountryFlag from "react-country-flag"
import { FaCheck } from 'react-icons/fa';

function Home() {
const { isLoading, setIsLoading } = useLoading();
const [projectInfo, setProjectInfo] = useState([]);
const [showCPPChildren, setShowCPPChildren] = useState({});
const [isAnimating, setIsAnimating] = useState(false);
const navigate = useNavigate();
const imgRef = useRef(null);
const audioRef = useRef(null);

const navigateTo = (page) => {
    setIsLoading(true);
    window.scrollTo(0,0);
    navigate(page);
};

const projectHours = {
    "Libft": 70,
    "Born2beroot": 40,
    "ft_printf": 70,
    "get_next_line": 70,
    "push_swap": 60,
    "minitalk": 50,
    "pipex": 50,
    "so_long": 60,
    "FdF": 60,
    "fract-ol": 60,
    "philosophers": 70,
    "minishell": 210,
    "NetPractice": 50,
    "CPP00": 12,
    "CPP01": 12,
    "CPP02": 12,
    "CPP03": 12,
    "CPP04": 12,
    "CPP05": 12,
    "CPP06": 12,
    "CPP07": 12,
    "CPP08": 12,
    "CPP09": 12,
    
};

const milestones = {
    "Milestone 1": {
        projects: ["Libft"],
        hours: projectHours["Libft"],
    },
    "Milestone 2": {
        projects: ["ft_printf", "get_next_line", "Born2beroot"],
        hours: projectHours["ft_printf"] + projectHours["get_next_line"] + projectHours["Born2beroot"],
    },
    "Milestone 3": {
        projects: ["push_swap", "so_long", "fract-ol", "FdF", "pipex", "minitalk"],
        hours: projectHours["push_swap"] + projectHours["so_long"] + projectHours["fract-ol"] + projectHours["FdF"] + Math.max(projectHours["pipex"], projectHours["minitalk"]),
    },
    "Milestone 4": {
        projects: ["minishell", "philosophers"],
        hours: projectHours["philosophers"] + projectHours["minishell"],
    },
    "Milestone 6": {
        projects: ["NetPractice", "CPP00"],
        hours: projectHours["NetPractice"] + projectHours["CPP00"],
    },
};

const MilestoneHeader = ({ milestone, hours }) => (
    <tr className="bg-base-300 text-base-content border-4 border-base-300" >
        <th colSpan="5" className="py-2 text-left text-lg font-semibold">
            <div className="flex justify-between py-2 px-4 text-lg font-semibold">
                <span>{milestone}</span>
                <span>Total Hours: {hours}</span>
            </div>
        </th>
    </tr>
);

useEffect(() => {
    const activeSection = localStorage.getItem('ActiveSection');
    if (activeSection)
        localStorage.removeItem('ActiveSection');
    const fetchData = async (folder) => {
    const home = window.location;
    const url = home + `/sheets/${folder}/data.json`;

    try {
        const response = await fetch(url);
        if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        return data.data[0];
    } catch (error) {
        console.error(`Error fetching data for folder: ${folder}`, error);
        return null;
    }
    };

    function padNumber(number) {
    return number.toString().padStart(2, "0");
    }

    const fetchCPPData = async (folder) => {
    const home = window.location;
    let urls = [];
    for (let i = 0; i < 1; i++) {
        urls.push(`${home}/sheets/${folder}/CPP${padNumber(i)}/data.json`);
    }
    try {
        const responses = await Promise.all(urls.map((url) => fetch(url)));
        const data = await Promise.all(
        responses.map((response) => response.json())
        );
        return data.map((d) => d.data[0]);
    } catch (error) {
        console.error(`Error fetching data for folder: ${folder}`, error);
        return null;
    }
    };

    const fetchAllData = async () => {
    const allData = await Promise.all(
      getProjects.map((folder) => {
        if (folder.includes("CPP")) {
            return fetchCPPData(folder);
        } else {
            return fetchData(folder);
        }
        })
    );
    const flattenedData = allData.flat();
    const filteredData = flattenedData.filter(
        (data) => data && data.project_title && data.project_title !== "empty"
    );
    const sortedData = filteredData.sort((a, b) => a.id - b.id);
    setProjectInfo(sortedData);
    };

    fetchAllData();
    setTimeout(() => {
        setIsLoading(false);
    }, 1000);
}, []);

const toggleCPPModules = (projectTitle) => {
    setShowCPPChildren((prevState) => ({
    ...prevState,
    [projectTitle]: !prevState[projectTitle],
    }));
};

useEffect(() => {
    let timeoutId;

    const runAnimation = async () => {
    if (isAnimating && imgRef.current) {
        if (audioRef.current) {
        audioRef.current.currentTime = 0;
        audioRef.current.play();
        }
        imgRef.current.classList.add("spin-horizontal");
        timeoutId = setTimeout(() => {
        imgRef.current.classList.remove("spin-horizontal");
        timeoutId = setTimeout(() => {
            runAnimation();
        }, 1000);
        }, 2000);
    }
    };

    if (isAnimating) {
    const audio = new Audio("./oiiai.mp3");
    audio.loop = false;
    audio.volume = 0.5;
    audioRef.current = audio;

    runAnimation();
    }

    return () => {
    if (timeoutId) {
        clearTimeout(timeoutId);
    }
    if (imgRef.current) {
        imgRef.current.classList.remove("spin-horizontal");
    }
    if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current.currentTime = 0;
    }
    };
}, [isAnimating]);

const startAnimation = () => {
    setIsAnimating(!isAnimating);
};

return (
  <main className='bg-base-300 text-base-content min-h-screen'>
      <div className="max-w-7xl mx-auto py-10">
        <div className="bg-base-100 mt-5 rounded-lg">
        <div className="max-w-6xl mx-auto py-6 px-5 2xl:px-14">
            <div
            className="flex gap-2 items-center"
            onClick={() => navigateTo("/sheet")}
            >
            </div>
            <div className="px-5 2xl:px-0">
        <style>
            {`
          @keyframes horizontalSpin {
            0% { transform: rotateY(0deg); }
            100% { transform: rotateY(360deg); }
          }

          .spin-horizontal {
            animation: horizontalSpin 0.2s linear infinite;
            transform-origin: center;
            transform-style: preserve-3d;
          }
          `}
          </style>

            <div className="flex gap-3 justify-between items-center">
        <span
                className="text-2xl font-bold text-center w-full"
                >
                Made by
                </span>

          <div className="flex flex-col gap-2 w-full justify-center items-center">
                <img
                ref={imgRef}
                src="./img/cat.webp"
                alt="cat"
                className="w-32 mx-auto"
                />
                      <button
                onClick={startAnimation}
                className="w-32 h-12 px-4 py-2 bg-base-300 text-base-content text-lg font-bold border border-base-content rounded-md"
                >
                {isAnimating ? "PAUSE" : "PLAY"}
                </button>
          </div>
          <span
                className="text-2xl font-bold text-center w-full"
                >
                With ❤️
                </span>	

            </div>
        <div className="flex gap-2 justify-between mt-6 items-center">
          <div className="flex flex-col gap-2">
          <h1 className="text-2xl font-bold">Evaluation Status</h1>
          <a
            target="_blank"
            href="https://github.com/rphlr/42-Evals"
            className="group flex w-full items-center text-blue-500 rounded-lg hover:text-blue-100"
          >
            <span className="underline">Big thanks to rphlr for the base</span>
            
          </a>
          </div>
                <div className="flex gap-2 justify-end transition"
                onClick={() => navigateTo("/sheet")}
                >
            <button
            className="w-32 h-12 px-4 py-2 bg-blue-500 text-white text-lg border border-base-content rounded"
            >
            CREATE
            </button>
              </div>
        </div>
            <div className="overflow-x-auto">
                <table className="w-full mt-4 table table-auto">
                <thead className="border-4 border-base-300">
                    <tr className="bg-base-300 text-base-content text-center">
                    <th className="py-3 text-center px-5 font-semibold w-1/12 text-lg">
                        PROJECTS 📂
                    </th>
                    <th className="py-3 text-center px-5 font-semibold w-1/12 text-lg">
                        DURATION ⌛
                    </th>
                    <th className="py-3 text-center px-5 font-semibold w-1/12 text-lg">
                        COST 🎯
                    </th>
                    <th className="py-3 text-center px-5 font-semibold w-1/12 text-lg">
                        HOURS ⏱️
                    </th>
                    <th className="py-3 text-center px-5 font-semibold w-1/12 text-lg">
                        EDIT✍🏻
                    </th>
                    </tr>
                </thead>
                <tbody className="text-center bg-base-100">
            <tr className="border-4 border-base-300">
              <th colSpan="5" className="py-2 text-left text-lg font-semibold">
                <div className="flex flex-col justify-center py-2 px-4 text-lg font-semibold">
                  <span>The table below provides an overview of the evaluation sheet statuses with their date of upload, evaluation duration, cost in points, hours by project, and an shortcut for edit. 😊</span>
                  <span className="text-lg text-base-content text-bold sm:hidden">
                    Slide 👉 for others information in the table
                  </span>
                </div>
                
              </th>
            </tr>

        {Object.entries(milestones).map(([milestone, data]) => (
            <React.Fragment key={milestone}>
                <MilestoneHeader milestone={milestone} hours={data.hours} />
                {projectInfo
                    .filter((project) => data.projects.includes(project.project_title))
                    .map((project, index) => (
                        <React.Fragment key={index}>
                            {project.status === "active" &&
                                !project.project_title.includes("CPP") && (
                                    <tr
                    className="border-x-4 border-base-300"
                    >
                                        <td className="py-3 px-5 text-base-content cursor-pointer">
                                            <div
                                                className="flex justify-center items-center gap-2 text-xl text-[#0D94B6]"
                                                onClick={() => navigateTo(`/sheet?project=${project.project_title}`)}
                                            >
                                               {project?.finish && (<FaCheck />)}
                                             {project && project.project_title}
                                            </div>
                                            <span className="text-lg text-base-content text-bold">
                                                {new Date(project.updated_at).toLocaleDateString(
                                                    "en-GB",
                                                    {
                                                        day: "numeric",
                                                        month: "numeric",
                                                        year: "numeric",
                                                    }
                                                )}
                                            </span>
                                            {project?.languages && (
                                            <div className="flex justify-center">
                                                {project.languages.map((lang) => (
                                                    <div key={lang}>
                                                    <ReactCountryFlag
                                                    className="emojiFlag"
                                                    countryCode={lang.toUpperCase()}
                                                    style={{
                                                        fontSize: '2em',
                                                        lineHeight: '1em',
                                                    }}
                                                />
                                                    </div>
                                                ))}
                                                </div>
                                            )}
                                        </td>
                                        <td className="py-3 px-5 w-1/12">
                                            <span className="text-base-content font-bold text-xl">
                                                {project.time}m
                                            </span>
                                        </td>
                                        <td className="py-3 px-5 w-1/12">
                                            <span className="text-base-content font-bold text-xl">
                                                {project.eval_points}
                                            </span>
                                        </td>
                                        <td className="py-3 px-5 w-1/12">
                                            <span className="text-base-content font-bold text-xl">
                                                {projectHours[project.project_title]}h
                                            </span>
                                        </td>
                                        <td className="py-3 px-5 w-1/12">
                                            <div
                                                className="flex justify-center items-center gap-2 text-sm text-blue-500 cursor-pointer"
                                                onClick={() => navigateTo(`/sheet?project=${project.project_title}&edit=true`)}
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
                                )}
                            {project.project_title.includes("CPP") && (
                                <React.Fragment>
                                    <tr
                    className="border-x-4 border-base-300 bg-base-200"
                    onClick={() =>
                      toggleCPPModules(project.project_title)
                    }
                    >
                                        <td className="py-3 px-5 text-base-content cursor-pointer "
                      >
                                            <div
                                                className="flex justify-center items-center gap-2 text-xl text-base-content"
                                                
                                            >
                                                CPP MODULES (5)
                                                {showCPPChildren[project.project_title] ? (
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
                                            <span className="text-lg text-base-content text-bold">
                                                {new Date(project.updated_at).toLocaleDateString(
                                                    "en-GB",
                                                    {
                                                        day: "numeric",
                                                        month: "numeric",
                                                        year: "numeric",
                                                    }
                                                )}
                                            </span>
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
                        {projectHours[project.project_title]}h x 5
                                            </span>
                                        </td>
                                        <td className="py-3 px-5 w-1/12">
                                            <span className="text-base-content font-bold text-xl">
                        {projectHours[project.project_title] * 5}h
                                            </span>
                                        </td>
                                    </tr>
                                    {showCPPChildren[project.project_title] &&
                                        projectInfo
                                            .filter((p) => p.project_title.includes("CPP"))
                                            .map((cppProject, cppIndex) => (
                                                <tr
                                                    key={cppIndex}
                            className="border-x-4 border-base-300"
                                                >
                                                    <td className="py-3 px-5 text-base-content cursor-pointer">
                                                        <div
                                                            className="flex justify-center items-center gap-2 text-xl text-[#0D94B6]"
                                                            onClick={() => navigateTo(`/sheet?project=${cppProject.project_title}`)}
                                                        >
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
                                                            {cppProject.time}'
                                                        </span>
                                                    </td>
                                                    <td className="py-3 px-5 w-1/12">
                                                        <span className="text-base-content font-bold text-xl">
                                                            {cppProject.eval_points}
                                                        </span>
                                                    </td>
                                                    <td className="py-3 px-5 w-1/12">
                                                        <span className="text-base-content font-bold text-xl">
                                                            {projectHours[cppProject.project_title]}
                                                        </span>
                                                    </td>
                                                    <td className="py-3 px-5 w-1/12">
                                                        <div
                                                            className="flex justify-center items-center gap-2 text-sm text-blue-500 cursor-pointer"
                                                            onClick={() => navigateTo(`/sheet?project=${cppProject.project_title}&edit=true`)}
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
                                            ))}
                                </React.Fragment>
                            )}
                        </React.Fragment>
                    ))}
            </React.Fragment>
        ))}
    </tbody>
                </table>
            </div>
            </div>
        </div>
        </div>
    </div>
</main>
);
}

export default Home;