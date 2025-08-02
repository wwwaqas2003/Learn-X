import { useState, useEffect } from 'react';

const questions = [
  { question: "What is 2 + 2?", answers: ["3", "4", "5"], correct: 1 },
  { question: "What is the capital of France?", answers: ["Paris", "London", "Berlin"], correct: 0 },
  { question: "What is the square root of 16?", answers: ["2", "4", "8"], correct: 1 },
];

export default function TestSeries() {
  const [formData, setFormData] = useState({ year: '', course: '', subject: '' });
  const [showTest, setShowTest] = useState(false);
  const [showResult, setShowResult] = useState(false);
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(1800); // 30 minutes
  const [timerActive, setTimerActive] = useState(false);

  const handleFormChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmitForm = (e) => {
    e.preventDefault();
    setShowTest(true);
    setTimerActive(true);
  };

  const handleSubmitTest = () => {
    const userAnswers = Array.from(document.querySelectorAll('input[type="radio"]:checked'));
    let newScore = 0;

    userAnswers.forEach((input, i) => {
      if (parseInt(input.value) === questions[i].correct) newScore++;
    });

    setScore(newScore);
    setShowTest(false);
    setShowResult(true);
    setTimerActive(false);
  };

  useEffect(() => {
    if (!timerActive || timeLeft <= 0) return;

    const interval = setInterval(() => {
      setTimeLeft(prev => {
        if (prev <= 1) {
          clearInterval(interval);
          alert('Time is up! Submitting the test.');
          handleSubmitTest();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [timerActive]);

  const formatTime = () => {
    const m = String(Math.floor(timeLeft / 60)).padStart(2, '0');
    const s = String(timeLeft % 60).padStart(2, '0');
    return `${m}:${s}`;
  };

  return (
    <div className="max-w-3xl mx-auto p-6 bg-white rounded-md shadow-md">
      <h1 className="text-2xl font-bold text-center mb-6">Student Test Section</h1>

      {!showTest && !showResult && (
        <form onSubmit={handleSubmitForm} className="space-y-4">
          <div>
            <label htmlFor="year" className="block font-semibold mb-1">Select Year:</label>
            <select
              name="year"
              onChange={handleFormChange}
              required
              className="w-full border rounded px-3 py-2"
            >
              <option value="">Choose year</option>
              <option value="1st">1st Year</option>
              <option value="2nd">2nd Year</option>
              <option value="3rd">3rd Year</option>
              <option value="4th">4th Year</option>
            </select>
          </div>

          <div>
            <label htmlFor="course" className="block font-semibold mb-1">Select Course:</label>
            <select
              name="course"
              onChange={handleFormChange}
              required
              className="w-full border rounded px-3 py-2"
            >
              <option value="">Choose course</option>
              <option value="B.Tech">B.Tech</option>
              <option value="M.Tech">M.Tech</option>
              <option value="B.Sc">B.Sc</option>
              <option value="M.Sc">M.Sc</option>
            </select>
          </div>

          <div>
            <label htmlFor="subject" className="block font-semibold mb-1">Select Subject:</label>
            <select
              name="subject"
              onChange={handleFormChange}
              required
              className="w-full border rounded px-3 py-2"
            >
              <option value="">Choose subject</option>
              <option value="Mathematics">Mathematics</option>
              <option value="Physics">Physics</option>
              <option value="Chemistry">Chemistry</option>
              <option value="Computer Science">Computer Science</option>
            </select>
          </div>

          <button type="submit" className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700">
            Start Test
          </button>
        </form>
      )}

      {showTest && (
        <div>
          <h2 className="text-xl font-semibold mb-4">Your Test</h2>
          <p className="mb-2 font-mono">Time Left: <span>{formatTime()}</span></p>

          <div className="space-y-6">
            {questions.map((q, idx) => (
              <div key={idx} className="bg-gray-100 p-4 rounded shadow">
                <p className="font-medium mb-2">{idx + 1}. {q.question}</p>
                <div className="space-y-1">
                  {q.answers.map((ans, i) => (
                    <label key={i} className="block">
                      <input type="radio" name={`question-${idx}`} value={i} className="mr-2" />
                      {ans}
                    </label>
                  ))}
                </div>
              </div>
            ))}
          </div>

          <button
            onClick={handleSubmitTest}
            className="mt-6 bg-green-600 text-white px-6 py-2 rounded hover:bg-green-700"
          >
            Submit Test
          </button>
        </div>
      )}

      {showResult && (
        <div className="mt-8 text-center">
          <h2 className="text-xl font-bold mb-2">Test Completed</h2>
          <p className="text-lg">Your score: <span className="font-semibold">{score} / {questions.length}</span></p>
        </div>
      )}
    </div>
  );
}
