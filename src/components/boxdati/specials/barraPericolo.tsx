import React, { useState, useEffect, FC } from 'react';

type Props = {
  dangerLevel: number;
};

const BarraPericolo: FC<Props> = ({ dangerLevel }) => {
  const [danger, setDanger] = useState(dangerLevel);

  useEffect(() => {
    setDanger(2);
  });
  return <div>{danger}</div>;
};

export default BarraPericolo;
