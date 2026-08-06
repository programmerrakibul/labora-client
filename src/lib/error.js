export const getErrorMessage = (error) => {
  const axiosError = error?.name === "AxiosError" && error.response.data.error;

  if (axiosError) {
    return axiosError;
  }

  return error.message;
};
