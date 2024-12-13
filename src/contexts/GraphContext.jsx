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

        // Ініціалізація відстаней
        vertices.forEach((v) => {
            dist[v] = v === start ? 0 : Infinity;
            prev[v] = null;
        });

        while (unvisited.size > 0) {
            // Знаходимо вершину з мінімальною відстанню
            let current = null;
            let minDist = Infinity;
            unvisited.forEach(v => {
                if (dist[v] < minDist) {
                    minDist = dist[v];
                    current = v;
                }
            });

            if (current === end || minDist === Infinity) break;

            unvisited.delete(current);

            // Отримуємо всі ребра, що виходять з поточної вершини
            const currentEdges = edges.filter(e => e.from === current || e.to === current);
            for (const edge of currentEdges) {
                const neighbor = edge.from === current ? edge.to : edge.from;
                if (unvisited.has(neighbor)) {
                    const newDist = dist[current] + edge.weight;
                    if (newDist < dist[neighbor]) {
                        dist[neighbor] = newDist;
                        prev[neighbor] = current;
                    }
                }
            }
        }

        if (dist[end] === Infinity) return null;

        const path = [];
        let current = end;
        let totalWeight = 0;

        while (current !== null) {
            path.unshift(current);
            if (prev[current] !== null) {
                const edge = edges.find(
                    (e) =>
                        (e.from === prev[current] && e.to === current) ||
                        (e.to === prev[current] && e.from === current)
                );
                totalWeight += edge.weight;
            }
            current = prev[current];
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
            setIsRunning(false); // Завершити виконання після завершення
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
