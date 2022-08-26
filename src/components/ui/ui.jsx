import React from 'react';
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

export { CloseIcon };
