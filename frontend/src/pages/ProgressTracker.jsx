import { useEffect, useState } from "react";

export default function ProgressTracker() {
  const [data, setData] = useState(null);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const studentData = {
      pdfNotesRead: 80,
      lecturesWatched: 70,
      quantumRead: 50,
      testsAttempted: 3,
      totalTests: 5,
      totalMarks: 250,
      maxMarks: 300,
    };

    const overall = calculateOverallProgress(studentData);
    setProgress(overall);
    setData(studentData);
  }, []);

  const calculateOverallProgress = (data) => {
    const avg = (data.pdfNotesRead + data.lecturesWatched + data.quantumRead) / 3;
    return Math.round(avg);
  };

  const getRecommendation = () => {
    if (progress < 50) {
      return `Your progress is ${progress}%. Focus on reading more Quantum materials or attending lectures to improve!`;
    } else if (progress < 80) {
      return `Your progress is ${progress}%. You're doing well, but you can attempt more tests to boost your score!`;
    } else {
      return `Great job! You've completed ${progress}% of your work. Keep maintaining this progress!`;
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-md">
      <h1 className="text-3xl font-bold mb-6 text-center">Student Activity & Progress</h1>

      <div className="mb-6">
        <h2 className="text-xl font-semibold mb-2">Overall Progress</h2>
        <div className="w-full bg-gray-300 h-5 rounded-full overflow-hidden mb-2">
          <div
            className="h-full bg-green-500 transition-all duration-500"
            style={{ width: `${progress}%` }}
          ></div>
        </div>
        <p className="text-sm text-gray-700">Progress: {progress}%</p>
      </div>

      {data && (
        <>
          <div className="mb-6">
            <h2 className="text-xl font-semibold mb-2">Activity Summary</h2>
            <ul className="list-disc list-inside text-gray-700 space-y-1">
              <li>PDF Notes Read: {data.pdfNotesRead}%</li>
              <li>Lectures Watched: {data.lecturesWatched}%</li>
              <li>Quantum Read: {data.quantumRead}%</li>
              <li>Tests Attempted: {data.testsAttempted}/{data.totalTests}</li>
              <li>Marks Scored: {data.totalMarks}/{data.maxMarks}</li>
            </ul>
          </div>

          <div>
            <h2 className="text-xl font-semibold mb-2">Recommendations</h2>
            <p className="text-gray-800">{getRecommendation()}</p>
          </div>
        </>
      )}
    </div>
  );
}
