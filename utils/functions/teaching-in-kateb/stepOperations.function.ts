const updateStep = async (
  newStep: number,
  stateBackendStep: any,
  setStepPath: any
) => {
  const updatedStep = Math.max(1, Math.min(newStep, stateBackendStep));
  setStepPath(updatedStep);
};

export { updateStep };
