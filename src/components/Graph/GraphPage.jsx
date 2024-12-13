import React, { useContext, useRef, useEffect, useCallback } from 'react';
import { GraphContext } from '../../contexts/GraphContext';
import Controls from './Controls';
import Graph from './Graph';
import PathInfo from './PathInfo';
import StepInfo from './StepInfo';
import StructureData from '../DataStructure/StructureData';

const GraphPage = () => {
    const {
        edges,
        vertices,
        pathResult,
        startVertex,
        setStartVertex,
        endVertex,
        setEndVertex,
        handleStart,
        handleStop,
        handleBack, 
        } = useContext(GraphContext);

    const algorithmCanvasRef = useRef(null);
    const structureCanvasRef = useRef(null);


    const drawGraph = useCallback(() => {
        const canvas = algorithmCanvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext("2d");
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        if (vertices.size === 0) return;

        const radius = Math.min(canvas.width, canvas.height) / 3;
        const center = { x: canvas.width / 2, y: canvas.height / 2};
        const vertexPositions = {};

        Array.from(vertices).forEach((vertex, index) => {
            const angle = (index * 2 * Math.PI) / vertices.size;
            vertexPositions[vertex] = {
                x: center.x + radius * Math.cos(angle),
                y: center.y + radius * Math.sin(angle),
            };
        });

        edges.forEach((edge) => {
            const start = vertexPositions[edge.from];
            const end = vertexPositions[edge.to];

            const isInPath =
                pathResult?.path.includes(edge.from) &&
                pathResult?.path.includes(edge.to) &&
                Math.abs(
                    pathResult.path.indexOf(edge.from) -
                    pathResult.path.indexOf(edge.to)
                ) === 1;

            ctx.beginPath();
            ctx.moveTo(start.x, start.y);
            ctx.lineTo(end.x, end.y);
            ctx.strokeStyle = isInPath ? "#ff0000" : "#666666";
            ctx.lineWidth = isInPath ? 2 : 1;
            ctx.stroke();

            const midX = (start.x + end.x) / 2;
            const midY = (start.y + end.y) / 2;
            ctx.fillStyle = "#000000";
            ctx.font = "10px Arial";
            ctx.textAlign = "center";
            ctx.fillText(edge.weight.toString(), midX, midY - 10);
        });

        Object.entries(vertexPositions).forEach(([vertex, pos]) => {
            ctx.beginPath();
            ctx.arc(pos.x, pos.y, 12, 0, 2 * Math.PI);
            ctx.fillStyle = pathResult?.path.includes(parseInt(vertex))
                ? "#ff0000"
                : "#2196F3";
            ctx.fill();
            ctx.stroke();

            ctx.fillStyle = "#ffffff";
            ctx.textAlign = "center";
            ctx.textBaseline = "middle";
            ctx.fillText(vertex.toString(), pos.x, pos.y);
        });
    }, [edges, vertices, pathResult]);

    const drawStructure = useCallback(() => {
        const canvas = structureCanvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext("2d");
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        if (vertices.size === 0) return;

        let yOffset = 15;
        Array.from(vertices)
            .sort((a, b) => a - b)
            .forEach((vertex) => {
                ctx.fillStyle = "#000000";
                ctx.textAlign = "left";
                ctx.font = "12px Arial";
                ctx.fillText(`${vertex} →`, 10, yOffset);

                let xOffset = 40;
                const connected = edges.filter(
                    (e) => e.from === vertex || e.to === vertex
                );

                connected.forEach((edge, index) => {
                    const neighbor = edge.from === vertex ? edge.to : edge.from;

                    ctx.strokeRect(xOffset, yOffset - 10, 40, 15);
                    ctx.fillText(
                        `${neighbor}(${edge.weight})`,
                        xOffset + 3,
                        yOffset
                    );

                    if (index < connected.length - 1) {
                        ctx.beginPath();
                        ctx.moveTo(xOffset + 50, yOffset - 5);
                        ctx.lineTo(xOffset + 50, yOffset - 5);
                        ctx.stroke();
                    }

                    xOffset += 50;
                });

                yOffset += 20;
            });
    }, [edges, vertices]);

    useEffect(() => {
        drawGraph();
        drawStructure();
    }, [drawGraph, drawStructure]);


    return (
        <div className="container">
            <Controls />
            <div className="graph-container">
                <div className="canvas-wrapper">
                    <div className="title">Алгоритм Дейкстри</div>
                    <Graph
                        ref={algorithmCanvasRef}
                        drawGraph={drawGraph}
                        edges={edges}
                        vertices={vertices}
                        pathResult={pathResult}
                    />
                </div>

                <div className="canvas-wrapper">
                    <div className="title">Двозв'язний список</div>
                    <StructureData
                        ref={structureCanvasRef}
                        drawStructure={drawStructure}
                        edges={edges}
                        vertices={vertices}
                    />
                </div>
            </div>

            <div className="controls">
                <input
                    type="number"
                    placeholder="Початкова вершина"
                    value={startVertex}
                    onChange={(e) => setStartVertex(e.target.value)}
                />
                <input
                    type="number"
                    placeholder="Кінцева вершина"
                    value={endVertex}
                    onChange={(e) => setEndVertex(e.target.value)}
                />
            </div>

            <div className="controls">
                <button onClick={handleStart}>Start</button>
                <button onClick={handleStop}>Stop</button>
                <button onClick={handleBack}>Back</button>
            </div>

            {pathResult && (
                <PathInfo pathResult={pathResult} />
            )}

            <StepInfo edges={edges} />
        </div>
    );
};

export default GraphPage;
