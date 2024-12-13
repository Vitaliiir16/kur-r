import React, { useContext, useRef, useEffect, useCallback } from 'react';
import { GraphContext } from '../../contexts/GraphContext';
import StructureData from './StructureData';

const DataStructurePage = () => {
    const {
        edges,
        vertices
    } = useContext(GraphContext);

    const structureCanvasRef = useRef(null);

    const drawStructure = useCallback(() => {
        const canvas = structureCanvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext("2d");
        ctx.clearRect(0, 0, canvas.width, canvas.height);
    
        if (vertices.size === 0) return;
    
        let yOffset = 5;
        Array.from(vertices)
            .sort((a, b) => a - b)
            .forEach((vertex) => {
                ctx.fillStyle = "#000000";
                ctx.textAlign = "left";
                ctx.font = "1px Arial";
                ctx.fillText(`${vertex} →`, 10, yOffset);
    
                let xOffset = 10;
                const connected = edges.filter(
                    (e) => e.from === vertex || e.to === vertex
                );
    
                connected.forEach((edge, index) => {
                    const neighbor = edge.from === vertex ? edge.to : edge.from;
    
                    ctx.strokeRect(xOffset, yOffset - 10, 5, 15);
                    ctx.fillText(
                        `${neighbor}(${edge.weight})`,
                        xOffset + 3,
                        yOffset
                    );
    
                    xOffset += 10;
                });
    
                yOffset += 10;
            });
    }, [edges, vertices]);
    

    useEffect(() => {
        drawStructure();
    }, [drawStructure]);

    return (
        <div className="container">
            <StructureData
                ref={structureCanvasRef}
                drawStructure={drawStructure}
                edges={edges}
                vertices={vertices}
            />
        </div>
    );
};

export default DataStructurePage;
