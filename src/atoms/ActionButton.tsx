import { faInfoCircle } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { theme } from "../Theme";

export const ActionButton = ({
  onClick
}: {
  onClick: () => void;
}): JSX.Element => <FontAwesomeIcon
  onClick={onClick}
  style={{
    position: 'absolute',
    top: 5,
    right: 5,
    cursor: 'pointer'
  }}
  color={theme.colors.blacks.normal}
  icon={faInfoCircle}
/>
