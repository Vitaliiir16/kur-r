import React, { useState, useRef, useEffect, useCallback } from 'react';
import './Graph.css';
import { Link } from 'react-router-dom';
import { dijkstra } from './algorithms/dijkstra';
import Controls from './Controls/Controls';
import GraphCanvas from './GraphCanvas/GraphCanvas';
import PathInfo from './PathInfo/PathInfo';
import StepInfo from './StepInfo/StepInfo';


function Graph() {
  const [edges, setEdges] = useState([]);
  const [vertices, setVertices] = useState(new Set());
  const [pathResult, setPathResult] = useState(null);
  const [startVertex, setStartVertex] = useState("");
  const [endVertex, setEndVertex] = useState("");
  const canvasRef = useRef(null);

  const addEdge = (from, to, weight) => {
    setEdges(prev => [...prev, { from, to, weight }]);
    setVertices(prev => new Set([...prev, from, to]));
  };

  const deleteEdge = (from, to) => {
    setEdges(prev => prev.filter(
      e => !(e.from === from && e.to === to) && !(e.from === to && e.to === from)
    ));
  };

  const handleStart = () => {
    const start = parseInt(startVertex);
    const end = parseInt(endVertex);
    if (!isNaN(start) && !isNaN(end) && vertices.has(start) && vertices.has(end)) {
      const vArr = Array.from(vertices);
      const result = dijkstra(vArr, edges, start, end);
      setPathResult(result);
    }
  };

  const handleStop = () => {
    setPathResult(null);
  };

  const handleBack = () => {
    setPathResult(null);
  };

  const drawGraph = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    if (vertices.size === 0) return;
    const radius = Math.min(canvas.width, canvas.height) / 3;
    const center = { x: canvas.width / 2, y: canvas.height / 2};
    const vertexPositions = {};
    const vArray = Array.from(vertices);
    vArray.forEach((vertex, index) => {
      const angle = (index * 2 * Math.PI) / vArray.length;
      vertexPositions[vertex] = {
        x: center.x + radius * Math.cos(angle),
        y: center.y + radius * Math.sin(angle),
      };
    });
    edges.forEach((edge) => {
      const start = vertexPositions[edge.from];
      const end = vertexPositions[edge.to];
      const isInPath = pathResult?.path.includes(edge.from) &&
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

  useEffect(() => {
    drawGraph();
  }, [drawGraph]);

  return (
    <div className="container">
      <Controls
        addEdge={addEdge}
        deleteEdge={deleteEdge}
        startVertex={startVertex}
        setStartVertex={setStartVertex}
        endVertex={endVertex}
        setEndVertex={setEndVertex}
        handleStart={handleStart}
        handleStop={handleStop}
        handleBack={handleBack}
      />
      <div className="graph-container">
        <div className="canvas-wrapper">
          <div className="title">Граф</div>
          <GraphCanvas ref={canvasRef}/>
        </div>
      </div>
      {pathResult && <PathInfo pathResult={pathResult} />}
      <StepInfo edges={edges} />
      <Link to="/"><button>На головну</button></Link>
    </div>
  );
}

export default Graph;
