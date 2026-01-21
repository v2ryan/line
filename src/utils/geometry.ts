import type { Line, Point } from '@/types';

export const GRID_SIZE = 9;
export const GRID_STEP = 40;

export const isSamePoint = (p1: Point, p2: Point) => p1.x === p2.x && p1.y === p2.y;

export const getLengthSq = (p1: Point, p2: Point) =>
  Math.pow(p2.x - p1.x, 2) + Math.pow(p2.y - p1.y, 2);

export const isRightAngle = (p1: Point, p2: Point, p3: Point) => {
  const d12 = getLengthSq(p1, p2);
  const d23 = getLengthSq(p2, p3);
  const d13 = getLengthSq(p1, p3);
  return d12 + d23 === d13 || d12 + d13 === d23 || d23 + d13 === d12;
};

export const getPolygonVertices = (lines: Line[]): Point[] | null => {
  if (lines.length === 0) return null;

  const adj = new Map<string, Point[]>();
  const pointMap = new Map<string, Point>();

  const addEdge = (p1: Point, p2: Point) => {
    const k1 = `${p1.x},${p1.y}`;
    const k2 = `${p2.x},${p2.y}`;

    pointMap.set(k1, p1);
    pointMap.set(k2, p2);

    if (!adj.has(k1)) adj.set(k1, []);
    if (!adj.has(k2)) adj.set(k2, []);

    if (!adj.get(k1)?.some((p) => isSamePoint(p, p2))) {
      adj.get(k1)?.push(p2);
    }
    if (!adj.get(k2)?.some((p) => isSamePoint(p, p1))) {
      adj.get(k2)?.push(p1);
    }
  };

  lines.forEach((line) => addEdge(line.start, line.end));

  for (const neighbors of adj.values()) {
    if (neighbors.length !== 2) return null;
  }

  const startKey = adj.keys().next().value;
  if (!startKey) return null;

  const orderedPoints: Point[] = [];
  let currentKey = startKey;
  let prevKey: string | null = null;
  const visited = new Set<string>();

  while (visited.size < adj.size) {
    visited.add(currentKey);
    orderedPoints.push(pointMap.get(currentKey)!);

    const neighbors = adj.get(currentKey)!;
    let nextPoint = neighbors.find((p) => `${p.x},${p.y}` !== prevKey);
    if (!prevKey) nextPoint = neighbors[0];

    if (!nextPoint) break;

    prevKey = currentKey;
    currentKey = `${nextPoint.x},${nextPoint.y}`;

    if (currentKey === startKey && visited.size < adj.size) return null;
  }

  return orderedPoints;
};
