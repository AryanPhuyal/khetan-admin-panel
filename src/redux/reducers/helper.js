export const updateObject = (state, newobj) => {
  return {
    ...state,
    ...newobj,
  };
};
