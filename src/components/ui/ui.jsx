import React from 'react';
import PropTypes from 'prop-types';
import { AiOutlineClose } from 'react-icons/ai';

function CloseIcon({ onClick, size }) {
  return (
    <button
      className="closeIcon"
      style={{ height: size, width: size }}
      onClick={onClick}
    >
      <AiOutlineClose />
    </button>
  );
}
CloseIcon.propTypes = {
  onClick: PropTypes.func.isRequired,
  size: PropTypes.number.isRequired,
};

export { CloseIcon };
