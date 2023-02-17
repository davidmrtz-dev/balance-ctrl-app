import Swal, { SweetAlertIcon, SweetAlertResult } from "sweetalert2";
import { theme } from "../../Theme";

const Alert = ({
  text,
  icon,
  title,
  showCancelButton = false
}: {
  text: string;
  icon: SweetAlertIcon
  showCancelButton?: boolean;
  title?: string;
}): Promise<SweetAlertResult<any>> => {
  return Swal.fire({
    icon,
    title,
    text,
    width: 360,
    color: theme.colors.blacks.normal,
    confirmButtonColor: theme.colors.blues.normal,
    showCancelButton
  });
};

export default Alert;