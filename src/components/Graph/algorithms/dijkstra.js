export function dijkstra(vertices, edges, start, end) {
  const dist = {};
  const prev = {};
  const unvisited = new Set(vertices);
  vertices.forEach(v => {
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
    const currentEdges = edges.filter(e => e.from === current || e.to === current);
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
        e =>
          (e.from === prev[node] && e.to === node) ||
          (e.to === prev[node] && e.from === node)
      );
      if (edge) totalWeight += edge.weight;
    }
  }
  return { path, totalWeight };
}
