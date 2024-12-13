import React, { createContext, useState, useCallback } from 'react';

export const GraphContext = createContext();

export const GraphProvider = ({ children }) => {
    const [edges, setEdges] = useState([]);
    const [vertices, setVertices] = useState(new Set());
    const [startVertex, setStartVertex] = useState("");
    const [endVertex, setEndVertex] = useState("");
    const [pathResult, setPathResult] = useState(null);
    const [isRunning, setIsRunning] = useState(false);

    const addEdge = useCallback((from, to, weight) => {
        setEdges(prevEdges => [...prevEdges, { from, to, weight }]);
        setVertices(prevVertices => new Set([...prevVertices, from, to]));
    }, []);

    const deleteEdge = useCallback((from, to) => {
        setEdges(prevEdges =>
            prevEdges.filter(
                (edge) =>
                    !(edge.from === from && edge.to === to) &&
                    !(edge.from === to && edge.to === from)
            )
        );
    }, []);

    const findEdge = useCallback((from, to) => {
        const found = edges.find(
            (edge) =>
                (edge.from === from && edge.to === to) ||
                (edge.from === to && edge.to === from)
        );

        if (found) {
            alert(
                `Знайдено ребро ${found.from}-${found.to} з вагою ${found.weight}`
            );
        } else {
            alert("Ребро не знайдено");
        }
    }, [edges]);

    const dijkstra = useCallback((start, end) => {
        const dist = {};
        const prev = {};
        const unvisited = new Set(vertices);

        vertices.forEach((v) => {
            dist[v] = v === start ? 0 : Infinity;
            prev[v] = null;
        });

        while (unvisited.size > 0) {
            let current = null;
            let minDist = Infinity;
            unvisited.forEach((v) => {
                if (dist[v] < minDist) {
                    minDist = dist[v];
                    current = v;
                }
            });

            if (current === end || minDist === Infinity) break;

            unvisited.delete(current);

            // Отримуємо всі ребра, що виходять з поточної вершини
            const currentEdges = edges.filter((e) => e.from === current || e.to === current);
            currentEdges.forEach(({ from, to, weight }) => {
                const neighbor = from === current ? to : from;
                if (unvisited.has(neighbor)) {
                    const newDist = dist[current] + weight;
                    if (newDist < dist[neighbor]) {
                        dist[neighbor] = newDist;
                        prev[neighbor] = current;
                    }
                }
            });
        }

        if (dist[end] === Infinity) return null;

        const path = [];
        let totalWeight = 0;
        for (let node = end; node !== null; node = prev[node]) {
            path.unshift(node);
            if (prev[node] !== null) {
                const edge = edges.find(
                    (e) =>
                        (e.from === prev[node] && e.to === node) ||
                        (e.to === prev[node] && e.from === node)
                );
                if (edge) totalWeight += edge.weight;
            }
        }

        return { path, totalWeight };
    }, [edges, vertices]);

    const handleStart = useCallback(() => {
        const start = parseInt(startVertex);
        const end = parseInt(endVertex);

        if (
            !isNaN(start) &&
            !isNaN(end) &&
            vertices.has(start) &&
            vertices.has(end)
        ) {
            setIsRunning(true);
            const result = dijkstra(start, end);
            setPathResult(result);
            setIsRunning(false);
        }
    }, [startVertex, endVertex, vertices, dijkstra]);

    const handleStop = useCallback(() => setIsRunning(false), []);

    const handleBack = useCallback(() => setPathResult(null), []);

    return (
        <GraphContext.Provider value={{
            edges,
            addEdge,
            deleteEdge,
            findEdge,
            vertices,
            startVertex,
            setStartVertex,
            endVertex,
            setEndVertex,
            pathResult,
            setPathResult,
            isRunning,
            setIsRunning,
            handleStart,
            handleStop,
            handleBack,
            dijkstra,
        }}>
            {children}
        </GraphContext.Provider>
    );
};
