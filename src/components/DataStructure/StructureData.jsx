import React, { forwardRef, useEffect } from 'react';

const StructureData = forwardRef(({ drawStructure, edges, vertices }, ref) => {
    useEffect(() => {
        drawStructure();
    }, [drawStructure, edges, vertices]);

    return <canvas className="canvas" ref={ref}></canvas>;
});

export default StructureData;
