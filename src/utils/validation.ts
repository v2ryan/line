import type { Feedback, Line, Question } from '@/types';
import { getLengthSq, getPolygonVertices, isRightAngle } from '@/utils/geometry';

interface ValidationResult {
  isValid: boolean;
  feedback?: Feedback;
}

export const validateShape = (lines: Line[], question: Question): ValidationResult => {
  const vertices = getPolygonVertices(lines);

  if (!vertices) {
    return {
      isValid: false,
      feedback: {
        msg: '個形狀好似未封閉，或者有線條重疊左？試下檢查下。',
        type: 'error',
      },
    };
  }

  if (vertices.length !== question.requiredVertices) {
    return {
      isValid: false,
      feedback: {
        msg: `題目要求畫${question.requiredVertices === 3 ? '三角形' : '四邊形'}，但你畫左個${vertices.length}邊形。`,
        type: 'error',
      },
    };
  }

  if (question.type === 'tri-any') {
    return { isValid: vertices.length === 3 };
  }

  if (question.type === 'right-tri') {
    const isR1 = isRightAngle(vertices[2], vertices[0], vertices[1]);
    const isR2 = isRightAngle(vertices[0], vertices[1], vertices[2]);
    const isR3 = isRightAngle(vertices[1], vertices[2], vertices[0]);
    if (isR1 || isR2 || isR3) return { isValid: true };
    return {
      isValid: false,
      feedback: { msg: '呢個唔係直角三角形，揾唔到直角（90度）。', type: 'error' },
    };
  }

  if (question.type === 'iso-tri') {
    const d1 = getLengthSq(vertices[0], vertices[1]);
    const d2 = getLengthSq(vertices[1], vertices[2]);
    const d3 = getLengthSq(vertices[2], vertices[0]);
    if (d1 === d2 || d1 === d3 || d2 === d3) return { isValid: true };
    return {
      isValid: false,
      feedback: { msg: '呢個唔係等腰三角形，無兩條邊一樣長。', type: 'error' },
    };
  }

  if (question.type === 'equi-tri') {
    const d1 = Math.sqrt(getLengthSq(vertices[0], vertices[1]));
    const d2 = Math.sqrt(getLengthSq(vertices[1], vertices[2]));
    const d3 = Math.sqrt(getLengthSq(vertices[2], vertices[0]));
    const diff = Math.max(d1, d2, d3) - Math.min(d1, d2, d3);
    if (diff < 0.5) return { isValid: true };
    return {
      isValid: false,
      feedback: { msg: '邊長差別有啲大，試下再調整下？', type: 'error' },
    };
  }

  if (question.type === 'square') {
    const dists: number[] = [];
    for (let i = 0; i < 4; i += 1) {
      for (let j = i + 1; j < 4; j += 1) {
        dists.push(getLengthSq(vertices[i], vertices[j]));
      }
    }
    dists.sort((a, b) => a - b);
    const sidesEqual = dists[0] === dists[3];
    const diagsEqual = dists[4] === dists[5];
    const diagGtSide = dists[4] > dists[0];

    if (sidesEqual && diagsEqual && diagGtSide) return { isValid: true };
    return {
      isValid: false,
      feedback: {
        msg: '呢個唔係正方形。記得四條邊要一樣長，角要係直角。',
        type: 'error',
      },
    };
  }

  if (question.type === 'rect') {
    const isR0 = isRightAngle(vertices[3], vertices[0], vertices[1]);
    const isR1 = isRightAngle(vertices[0], vertices[1], vertices[2]);
    const isR2 = isRightAngle(vertices[1], vertices[2], vertices[3]);
    if (isR0 && isR1 && isR2) return { isValid: true };
    return {
      isValid: false,
      feedback: { msg: '呢個好似唔係長方形喎？長方形嘅角要係直角。', type: 'error' },
    };
  }

  if (question.type === 'para') {
    const d1 = getLengthSq(vertices[0], vertices[1]);
    const d2 = getLengthSq(vertices[1], vertices[2]);
    const d3 = getLengthSq(vertices[2], vertices[3]);
    const d4 = getLengthSq(vertices[3], vertices[0]);

    if (d1 === d3 && d2 === d4) return { isValid: true };
    return {
      isValid: false,
      feedback: { msg: '平行四邊形要求對邊一樣長。', type: 'error' },
    };
  }

  if (question.type === 'quad-any') {
    return { isValid: vertices.length === 4 };
  }

  return { isValid: false };
};
