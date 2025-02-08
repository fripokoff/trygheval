const requireContext = require.context('../public/Sheets', true, /^\.\/.*$/);

const folders = requireContext.keys().map((key) => {
  const folder = key.split('/')[1];
  return folder;
});

export default [...new Set(folders)];