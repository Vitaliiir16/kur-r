import React, { forwardRef } from 'react';
import './GraphCanvas.css';

const GraphCanvas = forwardRef((props, ref) => {
  return <canvas className="canvas" ref={ref}></canvas>;
});

export default GraphCanvas;
