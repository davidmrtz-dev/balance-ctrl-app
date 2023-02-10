import Swal, { SweetAlertIcon, SweetAlertResult } from "sweetalert2";
import { theme } from "../../Theme";

const Alert = ({
  icon,
  text,
  title,
}: {
  icon: SweetAlertIcon
  text: string;
  title?: string;
}): Promise<SweetAlertResult<any>> => {
  return Swal.fire({
    icon,
    title,
    text,
    width: 360,
    color: theme.colors.blacks.normal,
    confirmButtonColor: theme.colors.blues.normal
  });
};

export default Alert;