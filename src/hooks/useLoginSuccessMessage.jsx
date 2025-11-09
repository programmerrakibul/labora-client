import useMySwal from "./useMySwal";

const useLoginSuccessMessage = () => {
  const mySwal = useMySwal();

  const loginSuccessMessage = (name) => {
    mySwal.fire({
      icon: "success",
      title: `Welcome ${name || ""}`,
      showConfirmButton: false,
      timer: 2000,
    });
  };

  return loginSuccessMessage;
};

export default useLoginSuccessMessage;
