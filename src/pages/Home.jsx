"use client";

import React, { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import getProjects from "../hooks/getProjects";
import { useLoading } from "../contexts/LoadingContext";
import ReactCountryFlag from "react-country-flag";
import { FaCheck } from "react-icons/fa";
import { fetchData } from "../hooks/dataHandlers";
import PDFViewer from "../components/pdf/PDFViewer";
import CPPModule from "../components/CPPModules";

function Home() {
  const { isLoading, setIsLoading } = useLoading();
  const [projectInfo, setProjectInfo] = useState([]);
  const [isAnimating, setIsAnimating] = useState(false);
  const navigate = useNavigate();
  const imgRef = useRef(null);
  const audioRef = useRef(null);
  const [isOpen, setIsOpen] = useState(false);
  const [project, setProject] = useState(null);
  const [selectedPdfUrl, setSelectedPdfUrl] = useState(null);

  const navigateTo = (page, edit, lang) => {
    if (edit) localStorage.setItem("editMode", "true");
    if (lang) localStorage.setItem("lang", lang);
    setIsLoading(true);
    window.scrollTo(0, 0);
    navigate(page);
  };

  const test = {
    "milestones": [
      {
        "milestone": "Milestone 1",
        "projects": [
          { "project": "Libft", "hours": 70, "hour" : true },
        ]
      },
      {
        "milestone": "Milestone 2",
        "projects": [
          { "project": "ft_printf", "hours": 70, "hour" : true },
          { "project": "get_next_line", "hours": 70, "hour" : true },
          { "project": "Born2beroot", "hours": 40, "hour" : true },
        ]
      },
      {
        "milestone": "Milestone 3",
        "projects": [
          { "project" : "Exam_rank_02", "hours" : 2},
          { "project": "push_swap", "hours": 60, "hour" : true },
          { "project": "so_long", "hours": 60, "hour" : true },
          { "project": "fract-ol", "hours": 60 },
          { "project": "FdF", "hours": 60 },
          { "project": "pipex", "hours": 50, "hour" : true },
          { "project": "minitalk", "hours": 50 }
        ]
      },
      {
        "milestone": "Milestone 4",
        "projects": [
          { "project" : "Exam_rank_03", "hours" : 2},
          { "project": "minishell", "hours": 210, "hour" : true },
          { "project": "philosophers", "hours": 70,"hour" : true  }
        ]
      },
      {
        "milestone": "Milestone 5",
        "projects": [
          { "project" : "Exam_rank_04", "hours" : 2},
          { "project": "NetPractice", "hours": 50, "hour" : true },
          { "project": "CPP", "hours": [22, 12, 12, 12, 12], "hour" : true },
          { "project": "miniRT", "hours": 280 },
          { "project": "cub3d", "hours": 280, "hour" : true}
        ]
      },
      {
        "milestone": "Milestone 6",
        "projects": [
          { "project" : "Exam_rank_05", "hours" : 2},
          { "project": "Inception", "hours": 210, "hour" : true },
          { "project": "CPP", "hours": [25, 25, 25, 25, 40], "hour" : true },
          { "project": "Webserv", "hours": 175 },
          { "project": "ft_irc", "hours": 175, "hour" : true }
        ]
      },
      {
        "milestone": "Milestone 7",
        "projects": [
          { "project" : "Exam_rank_06", "hours" : 2},
          { "project": "ft_transcendence", "hours": 210, "hour" : true }
        ]
      }
    ]
  };

  const MilestoneHeader = ({ milestone, hours }) => (
    <tr className="bg-base-300 text-base-content border-4 border-base-300">
      <th colSpan="5" className="py-2 text-left text-lg font-semibold">
        <div className="flex justify-between py-2 px-4 text-lg font-semibold">
          <span>{milestone}</span>
          <span>Total Hours: {hours}</span>
        </div>
      </th>
    </tr>
  );

  useEffect(() => {
    const activeSection = localStorage.getItem("ActiveSection");
    const actualLanguage = localStorage.getItem("lang");
    localStorage.setItem("editMode", "false");
    if (!actualLanguage) localStorage.setItem("lang", "EN");
    if (activeSection) localStorage.removeItem("ActiveSection");

    const fetchProjects = async () => {
      try {
        let projects = await fetchData(getProjects);
        let cppProjects = [];
        let examProjects = [];
        for (let i = 0; i < projects.length; i++) {
          if (projects[i].project_title.includes("CPP")) {
            cppProjects.push(projects[i]);
            projects.splice(i, 1);
            i--;
          }else if (projects[i].project_title.startsWith("Exam_")) {
            examProjects.push(projects[i]);
            projects.splice(i, 1);
            i--;
          }
        }
        const cppMods = [{
          project_title: "CPP",
          time: 30,
          eval_points: 3,
          status: "active",
          CPPS: cppProjects,
        }];
        projects = [...examProjects, ...cppMods, ...projects];
        setProjectInfo(projects);
      } catch (error) {
        console.error("Error:", error);
      }
    };
    fetchProjects();
    setTimeout(() => {
      setIsLoading(false);
    }, 1000);
  }, []);

  function openModal(url, proj) {
    setProject(proj);
    setSelectedPdfUrl(url);
    setIsOpen(true);
  }

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
    <main className="bg-base-300 text-base-content min-h-screen">
      <div className="max-w-7xl mx-auto py-10">
        <div className="bg-base-100 mt-5 rounded-lg">
          <div className="max-w-6xl mx-auto py-6 px-5 2xl:px-14">
            <div
              className="flex gap-2 items-center"
              onClick={() => navigateTo("/sheet")}
            ></div>
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
                <span className="text-2xl font-bold text-center w-full">
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
                <span className="text-2xl font-bold text-center w-full">
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
                    <span className="underline">
                      Big thanks to rphlr for the base
                    </span>
                  </a>
                </div>
                <div
                  className="flex gap-2 justify-end transition"
                  onClick={() => navigateTo("/sheet")}
                >
                  <button className="w-32 h-12 px-4 py-2 bg-blue-500 text-white text-lg border border-base-content rounded">
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
                      <th
                        colSpan="5"
                        className="py-2 text-left text-lg font-semibold"
                      >
                        <div className="flex flex-col justify-center py-2 px-4 text-lg font-semibold">
                          <span>
                            The table below provides an overview of the
                            evaluation sheet statuses with their date of upload,
                            evaluation duration, cost in points, hours by
                            project, and an shortcut for edit. 😊
                          </span>
                          <span className="text-lg text-base-content text-bold sm:hidden">
                            Slide 👉 for others information in the table
                          </span>
                        </div>
                      </th>
                    </tr>

                    {test.milestones.map((milestoneData) => (
                      
                      <React.Fragment key={milestoneData.milestone}>
                         <MilestoneHeader
                          milestone={milestoneData.milestone}
                          hours={milestoneData.projects.reduce((acc, project) => {
                            if (project.hour) {
                              if (Array.isArray(project.hours)) {
                                return acc + project.hours.reduce((sum, h) => sum + h, 0);
                              } else {
                                return acc + project.hours;
                              }
                            }
                            return acc;
                          }, 0)}
                        />
                        
                        {projectInfo
                          ?.filter((project) =>
                            milestoneData.projects.some(p => p.project === project.project_title)
                          )
                          .map((project, index) => (
                            
                            <React.Fragment key={index}>
                              {project.status === "active" &&
                                !project.project_title.includes("CPP") && (
                                  <tr className={`border-x-4 border-base-300 ${project.project_title.includes("Exam") ? "bg-base-100" : ""}`} >
                                    <td className="py-3 px-5 text-base-content cursor-pointer">
                                      <div
                                        className={`flex justify-center items-center gap-2 text-xl ${project.project_title.includes("Exam") ? "text-red-500" : "text-[#0D94B6]"}`}
                                        onClick={() => {
                                          if(project.project_title.includes("test"))
                                          {
                                            navigateTo(`/exam?project=${project.project_title}`);
                                          }else
                                          {
                                            navigateTo(`/sheet?project=${project.project_title}`);
                                          }
                                        }
                                        }
                                      >
                                        {project?.finish && <FaCheck />}
                                        {project && project.project_title}
                                      </div>
                                      <span className="text-lg text-base-content text-bold">
                                        {new Date(
                                          project.updated_at
                                        ).toLocaleDateString("en-GB", {
                                          day: "numeric",
                                          month: "numeric",
                                          year: "numeric",
                                        })}
                                      </span>
                                      {project?.languages && (
                                        <div className="flex flex-col justify-center items-center">
                                          <div className="flex items-center mt-2 mb-2">
                                            {project.project_title.includes("Exam") ? "Exam" : "Projects"}:
                                            {project.languages.map((lang) => {
                                              const language =
                                                lang === "EN" ? "US" : lang;
                                              return (
                                                <div
                                                  className="ml-2"
                                                  key={`projects_${lang}`}
                                                  onClick={() =>
                                                    {
                                                      if(project.project_title.includes("test"))
                                                      {
                                                        navigateTo(`/exam?project=${project.project_title}`, false, lang);
                                                      }else
                                                      {
                                                        navigateTo(`/sheet?project=${project.project_title}`, false, lang);
                                                      }
                                                    }
                                                  }
                                                >
                                                  <ReactCountryFlag
                                                    className="emojiFlag"
                                                    countryCode={language.toUpperCase()}
                                                    style={{
                                                      fontSize: "2em",
                                                      lineHeight: "1em",
                                                    }}
                                                  />
                                                </div>
                                              );
                                            })}
                                          </div>
                                          <div className="flex items-center">
                                          {project.project_title.includes("Exam") ? "" : "Subjects:"}
                                          {project?.attachments
                                          .filter(
                                            (subject) =>
                                              subject.url &&
                                              subject.url.match(
                                                /^(?:new_)?([a-z]{2})\.subject\.pdf$/i
                                              )
                                          )
                                          .map((subjects) => {
                                            const subUS =
                                              subjects.url.includes("en")
                                                ? subjects.url.replace(
                                                    /^(?:new_)?en/,
                                                    "us"
                                                  )
                                                : subjects.url;
                                            const countryCode = subUS
                                              .match(
                                                /^(?:new_)?([a-z]{2})\.subject\.pdf$/i
                                              )?.[1]
                                                  ?.toUpperCase();
                                                return (
                                                  <div
                                                    className="ml-2"
                                                    key={`subjects_${countryCode}`}
                                                    onClick={() => {
                                                      openModal(
                                                        subjects.url,
                                                        project.project_title
                                                      );
                                                    }}
                                                  >
                                                    {countryCode && (
                                                      <ReactCountryFlag
                                                        className="emojiFlag"
                                                        countryCode={
                                                          countryCode
                                                        }
                                                        style={{
                                                          fontSize: "2em",
                                                          lineHeight: "1em",
                                                        }}
                                                      />
                                                    )}
                                                  </div>
                                                );
                                              })}
                                          </div>
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
                                      {milestoneData.projects.find(p => p.project === project.project_title)?.hours}h
                                      </span>
                                    </td>
                                    <td className="py-3 px-5 w-1/12">
                                      <div
                                        className="flex justify-center items-center gap-2 text-sm text-blue-500 cursor-pointer"
                                        onClick={() =>{
                                          if(project.project_title.includes("test"))
                                          {
                                            navigateTo(`/exam?project=${project.project_title}`, true);
                                          }else
                                          {
                                            navigateTo(`/sheet?project=${project.project_title}`, true);
                                          }
                                        }
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
                                )}
                              {project.project_title.includes("CPP") && (
                                <React.Fragment>
                                  <CPPModule
                                    project={project}
                                    milestone={milestoneData.milestone}
                                    navigateTo={navigateTo}
                                    projects={test}
                                    projectIndex={index}
                                  />
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
      <PDFViewer
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        pdfUrl={selectedPdfUrl}
        project={project}
      />
    </main>
  );
}

export default Home;