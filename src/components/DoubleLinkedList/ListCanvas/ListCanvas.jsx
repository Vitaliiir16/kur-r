import React, { forwardRef } from 'react';
import './ListCanvas.css';

const ListCanvas = forwardRef((props, ref) => {
  return <canvas className="dll-canvas" ref={ref} width={800} height={300}></canvas>;
});

export default ListCanvas;
