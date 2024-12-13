import React, { forwardRef, useEffect } from 'react';

const Graph = forwardRef(({ drawGraph, edges, vertices, pathResult }, ref) => {
    useEffect(() => {
        drawGraph();
    }, [drawGraph, edges, pathResult]);

    return <canvas className="canvas" ref={ref}></canvas>;
});

export default Graph;
