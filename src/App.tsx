import React, { useEffect, useRef, useState } from 'react';

import Confetti from '@/components/Confetti';
import Controls from '@/components/Controls';
import FeedbackAlert from '@/components/FeedbackAlert';
import Geoboard from '@/components/Geoboard';
import Header from '@/components/Header';
import QuestionDisplay from '@/components/QuestionDisplay';
import type { Difficulty, Feedback, Line, Point, Topic } from '@/types';
import { generateQuestion } from '@/utils/questions';
import { GRID_STEP, isSamePoint } from '@/utils/geometry';
import { validateShape } from '@/utils/validation';

const App = () => {
  const [topic, setTopic] = useState<Topic>('triangle');
  const [difficulty, setDifficulty] = useState<Difficulty>('easy');
  const [question, setQuestion] = useState(generateQuestion('triangle', 'easy'));

  const [lines, setLines] = useState<Line[]>([]);
  const [drawingStart, setDrawingStart] = useState<Point | null>(null);
  const [mousePos, setMousePos] = useState<{ x: number; y: number } | null>(null);
  const svgRef = useRef<SVGSVGElement>(null);

  const [feedback, setFeedback] = useState<Feedback | null>(null);
  const [showConfetti, setShowConfetti] = useState(false);

  useEffect(() => {
    setLines([...question.staticLines]);
    setFeedback(null);
    setDrawingStart(null);
    setMousePos(null);
    setShowConfetti(false);
  }, [question]);

  const handleTopicChange = (value: Topic) => {
    setTopic(value);
    setQuestion(generateQuestion(value, difficulty));
  };

  const handleDifficultyChange = (value: Difficulty) => {
    setDifficulty(value);
    setQuestion(generateQuestion(topic, value));
  };

  const handleNextQuestion = () => {
    setQuestion(generateQuestion(topic, difficulty));
  };

  const handleReset = () => {
    setLines([...question.staticLines]);
    setDrawingStart(null);
    setMousePos(null);
    setFeedback(null);
    setShowConfetti(false);
  };

  const handleMouseMove = (
    event: React.MouseEvent<SVGSVGElement> | React.TouchEvent<SVGSVGElement>,
  ) => {
    if (!drawingStart || !svgRef.current) return;

    const svg = svgRef.current;
    const point = svg.createSVGPoint();

    const clientX = 'touches' in event ? event.touches[0].clientX : event.clientX;
    const clientY = 'touches' in event ? event.touches[0].clientY : event.clientY;

    point.x = clientX;
    point.y = clientY;

    const svgPoint = point.matrixTransform(svg.getScreenCTM()?.inverse());
    setMousePos({ x: svgPoint.x, y: svgPoint.y });
  };

  const handlePointClick = (x: number, y: number) => {
    const clickedPoint = { x, y };

    if (!drawingStart) {
      setDrawingStart(clickedPoint);
      setMousePos({ x: x * GRID_STEP, y: y * GRID_STEP });
      return;
    }

    if (isSamePoint(drawingStart, clickedPoint)) {
      setDrawingStart(null);
      setMousePos(null);
      return;
    }

    const alreadyExists = lines.some(
      (line) =>
        (isSamePoint(line.start, drawingStart) && isSamePoint(line.end, clickedPoint)) ||
        (isSamePoint(line.end, drawingStart) && isSamePoint(line.start, clickedPoint)),
    );

    if (alreadyExists) {
      setFeedback({ msg: '呢條線已經畫過啦！', type: 'info' });
      setDrawingStart(null);
      setMousePos(null);
      return;
    }

    const newLine: Line = {
      start: drawingStart,
      end: clickedPoint,
      id: `u-${Date.now()}`,
      type: 'user',
    };

    setLines((prev) => [...prev, newLine]);
    setDrawingStart(null);
    setMousePos(null);
    setFeedback(null);
  };

  const handleValidate = () => {
    const result = validateShape(lines, question);

    if (!result.isValid) {
      if (result.feedback) setFeedback(result.feedback);
      return;
    }

    setFeedback({ msg: '答啱咗！好叻呀！🎉', type: 'success' });
    setShowConfetti(true);
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 font-sans selection:bg-blue-100 p-2 md:p-4">
      <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow-xl overflow-hidden border border-slate-200">
        <Header
          topic={topic}
          difficulty={difficulty}
          onTopicChange={handleTopicChange}
          onDifficultyChange={handleDifficultyChange}
        />

        <div className="p-4 md:p-6">
          <QuestionDisplay question={question} difficulty={difficulty} />

          <div className="flex flex-col lg:flex-row gap-8 items-start justify-center">
            <Geoboard
              lines={lines}
              drawingStart={drawingStart}
              mousePos={mousePos}
              svgRef={svgRef}
              onPointClick={handlePointClick}
              onMouseMove={handleMouseMove}
            />

            <Controls
              onReset={handleReset}
              onNextQuestion={handleNextQuestion}
              onValidate={handleValidate}
              canSubmit={lines.length !== question.staticLines.length}
            />
          </div>
        </div>

        <FeedbackAlert feedback={feedback} />
      </div>

      <Confetti show={showConfetti} />
    </div>
  );
};

export default App;
