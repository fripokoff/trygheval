const requireContext = require.context('../../public/sheets', true, /^\.\/.*$/);

const getProjects = requireContext.keys().map((key) => {
  const project = key.split('/')[1];
  return project;
});

export default [...new Set(getProjects)];