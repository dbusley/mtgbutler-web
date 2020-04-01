const loading = () => {
  return {
    type: 'LOADING',
  };
};

const doneLoading = () => {
  return {
    type: 'DONE_LOADING',
  };
};

export default {
  loading,
  doneLoading,
};
