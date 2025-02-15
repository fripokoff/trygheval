const requireContext = require.context('../../public/sheets', true, /^\.\/.*$/);
let cppID = 0;

const getProjects = requireContext.keys().map((key) => {
  let project = key.split('/')[1];
  if(project === "CPP")
  {
    let cppProjects = [];
    for(let i = cppID; i < 10; i++)
    {
      cppProjects.push("CPP0" + i);
    }
    return cppProjects;
  }
  return project;
});

let flattenedProjects = getProjects.reduce((acc, val) => Array.isArray(val) ? acc.concat(val) : acc.concat(val), []);

export default [...new Set(flattenedProjects)];