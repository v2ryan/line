export type Point = { x: number; y: number };
export type Line = { start: Point; end: Point; id: string; type: 'static' | 'user' };

export type Difficulty = 'easy' | 'hard';
export type Topic = 'triangle' | 'quad';

export type QuestionType =
  | 'tri-any'
  | 'right-tri'
  | 'iso-tri'
  | 'equi-tri'
  | 'quad-any'
  | 'square'
  | 'rect'
  | 'para';

export interface Question {
  id: string;
  type: QuestionType;
  text: string;
  hint: string;
  staticLines: Line[];
  requiredVertices: number;
}

export type Feedback = { msg: string; type: 'success' | 'error' | 'info' };
