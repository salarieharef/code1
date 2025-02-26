// Helper function to clamp the step value
const clampStep = (newStep: number, maxStep: number): number => {
  // Allow newStep to exceed maxStep only if newStep is a decimal
  if (newStep > maxStep && !Number.isInteger(newStep)) {
    return newStep; // Allow decimal values greater than maxStep
  }
  return Math.max(1, Math.min(newStep, maxStep));
};

export { clampStep };
