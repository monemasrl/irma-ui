import React, { MouseEventHandler } from 'react';
import { AiOutlineClose } from 'react-icons/ai';

type Props = {
  onClick: MouseEventHandler;
  size?: number;
};

function CloseIcon({ onClick, size }: Props) {
  return (
    <button
      className="closeIcon"
      style={size ? { height: size, width: size } : {}}
      onClick={onClick}
    >
      <AiOutlineClose />
    </button>
  );
}

export { CloseIcon };
