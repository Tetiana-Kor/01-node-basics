export const ExitCode = {
  success: 0,
  error: 1,
};
export const handleError = (err) => {
  if (err) {
    console.log(err.message);
    process.exit(ExitCode.error);
  }
};
