import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

const MySwal = withReactContent(Swal);

const useMySwal = () => {
  return MySwal;
};

export default useMySwal;
