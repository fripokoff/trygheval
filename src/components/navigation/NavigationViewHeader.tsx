import React from 'react';

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

  const findAdjacentProject = (currentProject: string, next: boolean = true) => {
    let previousProject = null;
    let found = false;
    

    for (let m = 0; m < test.milestones.length; m++) {
        const milestone = test.milestones[m];
        
        for (let i = 0; i < milestone.projects.length; i++) {
            if (milestone.projects[i].project === currentProject) {
                found = true;
                
                
                if (next) {
                    if (i + 1 < milestone.projects.length) {
                        return { 
                            current: currentProject, 
                            adjacent: milestone.projects[i + 1].project 
                        };
                    }
                    else if (m + 1 < test.milestones.length) {
                        return { 
                            current: currentProject, 
                            adjacent: test.milestones[m + 1].projects[0].project 
                        };
                    }
                }
                else {
                    if (previousProject) {
                        return { current: currentProject, adjacent: previousProject };
                    }
                    else if (m > 0) {
                        const prevMilestone = test.milestones[m - 1];
                        return {
                            current: currentProject,
                            adjacent: prevMilestone.projects[prevMilestone.projects.length - 1].project
                        };
                    }
                }
                return { current: currentProject, adjacent: null };
            }
            previousProject = milestone.projects[i].project;
        }
    }
    return { current: currentProject, adjacent: null };
};

export default function NavigationViewHeader({ handleEdit, sheetData, className = "", inView }) {
    return (
      <div className={`grid grid-cols-[auto_auto_1fr_auto_auto] gap-2 items-center w-full ${className}`}>
      <div className="flex">
          <a href="./">
              <button className={`w-16 sm:w-20 bg-cyan-700 hover:bg-cyan-800 font-bold text-white py-2 sm:py-3 px-3 rounded-md transition text-sm sm:text-base`}>
                  HOME
              </button>
          </a>
      </div>
  
      {/* Left Arrow */}
      <div className="flex items-center bg-base-100 text-base-content p-2 sm:p-3 rounded-md transition border border-base-content cursor-pointer"
          onClick={() => {
              const nextProject = findAdjacentProject(sheetData.project_title, false);
              if (nextProject.adjacent) {
                  window.location.href = `#/sheet?project=${nextProject.adjacent}`;
                  window.location.reload();
              }
          }}>
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" className="size-4">
              <polyline points="15 18 9 12 15 6" />
          </svg>
          <span className="hidden sm:inline-block ml-2">PREV</span>
      </div>
  
      {/* Title */}
      <h1 className="text-xl sm:text-2xl font-bold text-center truncate px-4">
          {sheetData.project_title ? sheetData.project_title : "New Project"}
      </h1>
  
      {/* Right Arrow */}
      <div className="flex items-center bg-base-100 text-base-content p-2 sm:p-3 rounded-md transition border border-base-content cursor-pointer"
          onClick={() => {
              const nextProject = findAdjacentProject(sheetData.project_title, true);
              if (nextProject.adjacent) {
                  window.location.href = `#/sheet?project=${nextProject.adjacent}`;
                  window.location.reload();
              }
          }}>
          <span className="hidden sm:inline-block mr-2">NEXT</span>
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" className="size-4">
              <polyline points="9 18 15 12 9 6" />
          </svg>
      </div>
  
      {/* Edit Button */}
      <div className="flex">
          <button onClick={handleEdit} className={`w-16 sm:w-20 ${inView ? 'bg-orange-600' : 'bg-blue-600'} ${inView ? 'hover:bg-orange-800' : 'hover:bg-blue-800'} font-bold text-white py-2 sm:py-3 px-3 sm:px-6 rounded-md transition text-sm sm:text-base`}>
              {inView ? 'EDIT' : 'VIEW'}
          </button>
      </div>
  </div>
    );
}