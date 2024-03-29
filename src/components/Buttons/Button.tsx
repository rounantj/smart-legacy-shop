import * as React from "react";
import PropTypes from "prop-types";
import buttonStyle from '@styles/components/buttons/Button.module.css'

export interface ButtonProps extends React.DetailedHTMLProps<React.ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement> {
  size?: string;
  className?: string;
  children: React.ReactNode | React.ReactNode[] | React.ReactElement | React.ReactElement[];
  onClick?: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
}

function Button(props: ButtonProps): React.ReactElement {
  return (
    <button {...props} className={`${buttonStyle.btn} ${props.className}`}>
      {props.children}
    </button>
  );
}

Button.propTypes = {
  size: PropTypes.string,
  className: PropTypes.string,
  children: PropTypes.node.isRequired,
  onClick: PropTypes.func,
};

Button.defaultProps = {
  onClick: function handleClick(event: React.MouseEvent<HTMLButtonElement, MouseEvent>) {
  },
};

export default Button;
