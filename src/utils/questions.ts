import type { Difficulty, Question, Topic } from '@/types';

export const generateQuestion = (topic: Topic, difficulty: Difficulty): Question => {
  const seeds = Math.random();

  if (topic === 'triangle' && difficulty === 'easy') {
    if (seeds < 0.5) {
      return {
        id: `q-tri-any-${Date.now()}`,
        type: 'tri-any',
        text: '請係釘板上隨意畫出一個「三角形」。',
        hint: '',
        staticLines: [],
        requiredVertices: 3,
      };
    }
    return {
      id: `q-right-tri-ez-${Date.now()}`,
      type: 'right-tri',
      text: '請係釘板上畫出一個「直角三角形」。',
      hint: '',
      staticLines: [],
      requiredVertices: 3,
    };
  }

  if (topic === 'triangle' && difficulty === 'hard') {
    if (seeds < 0.4) {
      return {
        id: `q-iso-tri-${Date.now()}`,
        type: 'iso-tri',
        text: '圖中已經有一條線，請加畫兩條線，組成一個「等腰三角形」。',
        hint: '',
        staticLines: [
          { start: { x: 3, y: 6 }, end: { x: 5, y: 6 }, id: 's-iso', type: 'static' },
        ],
        requiredVertices: 3,
      };
    }
    if (seeds < 0.7) {
      return {
        id: `q-equi-tri-${Date.now()}`,
        type: 'equi-tri',
        text: '請畫出一個睇落似「等邊三角形」嘅形狀。',
        hint: '',
        staticLines: [],
        requiredVertices: 3,
      };
    }
    return {
      id: `q-right-tri-hd-${Date.now()}`,
      type: 'right-tri',
      text: '圖中已經有一條線，請完成一個「直角三角形」。',
      hint: '',
      staticLines: [
        { start: { x: 3, y: 6 }, end: { x: 6, y: 6 }, id: 's-rt', type: 'static' },
      ],
      requiredVertices: 3,
    };
  }

  if (topic === 'quad' && difficulty === 'easy') {
    if (seeds < 0.4) {
      return {
        id: `q-square-${Date.now()}`,
        type: 'square',
        text: '請係釘板上畫出一個「正方形」。',
        hint: '',
        staticLines: [],
        requiredVertices: 4,
      };
    }
    if (seeds < 0.7) {
      return {
        id: `q-rect-ez-${Date.now()}`,
        type: 'rect',
        text: '請係釘板上畫出一個「長方形」。',
        hint: '',
        staticLines: [],
        requiredVertices: 4,
      };
    }
    return {
      id: `q-quad-any-${Date.now()}`,
      type: 'quad-any',
      text: '請係釘板上隨意畫出一個「四邊形」。',
      hint: '',
      staticLines: [],
      requiredVertices: 4,
    };
  }

  if (topic === 'quad' && difficulty === 'hard') {
    if (seeds < 0.5) {
      return {
        id: `q-para-${Date.now()}`,
        type: 'para',
        text: '圖中已經有兩條線，請將佢哋連埋，變成一個「平行四邊形」。',
        hint: '',
        staticLines: [
          { start: { x: 2, y: 3 }, end: { x: 3, y: 5 }, id: 's-p1', type: 'static' },
          { start: { x: 5, y: 3 }, end: { x: 6, y: 5 }, id: 's-p2', type: 'static' },
        ],
        requiredVertices: 4,
      };
    }
    return {
      id: `q-rect-hd-${Date.now()}`,
      type: 'rect',
      text: '圖中有一條邊，請加畫三條線，完成一個「長方形」。',
      hint: '',
      staticLines: [
        { start: { x: 3, y: 3 }, end: { x: 3, y: 6 }, id: 's-r1', type: 'static' },
      ],
      requiredVertices: 4,
    };
  }

  return {
    id: 'fallback',
    type: 'tri-any',
    text: '畫任意三角形',
    hint: '',
    staticLines: [],
    requiredVertices: 3,
  };
};
