import { Link } from "react-router-dom";
import {
  FaBookOpen,
  FaFilePdf,
  FaVideo,
  FaGamepad,
  FaTasks,
  FaBrain,
  FaInfoCircle,
  FaRocket,
  FaUsers,
  FaClock,
} from "react-icons/fa";

export default function Home() {
  const sections = [
    {
      name: "Quantum Series",
      description: "Quick revision notes and chapter-wise breakdowns.",
      icon: <FaBrain className="text-purple-600" />,
      path: "/quantumseries",
    },
    {
      name: "PDF Notes",
      description: "Downloadable and printable study notes in PDF.",
      icon: <FaFilePdf className="text-red-600" />,
      path: "/pdfnotes",
    },
    {
      name: "Video Lectures",
      description: "Visual learning with curated video lessons.",
      icon: <FaVideo className="text-blue-500" />,
      path: "/videolec",
    },
    {
      name: "Games",
      description: "Play fun educational games to sharpen your mind.",
      icon: <FaGamepad className="text-green-600" />,
      path: "/games",
    },
    {
      name: "Test Series",
      description: "Mock tests to assess your knowledge & speed.",
      icon: <FaTasks className="text-orange-500" />,
      path: "/test-series",
    },
    {
      name: "Progress Tracker",
      description: "Track your study goals and achievements.",
      icon: <FaBookOpen className="text-yellow-500" />,
      path: "/progress",
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50 text-gray-800">

      {/* ========== Section 1: About Learn-X ========== */}
      <section className="bg-white py-16 px-4 sm:px-10 lg:px-20 text-center">
        <div className="max-w-5xl mx-auto">
          <h1 className="text-4xl sm:text-5xl font-extrabold mb-6 text-indigo-700 flex justify-center items-center gap-2">
            <FaRocket className="text-yellow-400" /> About Learn-X AI
          </h1>
          <p className="text-lg text-gray-600">
            <strong>Learn-X AI</strong> is your one-stop learning platform powered by intelligent tools and interactive resources.
            From rapid revision with <span className="font-semibold text-indigo-600">Quantum Notes</span>, to AI-assisted <span className="font-semibold text-indigo-600">Test Series</span>, brain-boosting <span className="font-semibold text-indigo-600">Games</span>, and trackable progress — we combine education with smart technology for the next-gen learner.
          </p>
          <p className="mt-4 text-md text-gray-500">
            Built for students, by students — to make learning fun, focused, and futuristic 🚀
          </p>
        </div>
      </section>

      {/* ========== Section 2: Sneak Peek ========== */}
      <section className="bg-gradient-to-r from-indigo-100 via-white to-purple-100 py-16 px-4 sm:px-10 lg:px-20">
        <h2 className="text-3xl sm:text-4xl font-bold text-center mb-12 text-gray-800">
          Explore Our Features
        </h2>
        <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {sections.map((section, index) => (
            <Link
              to={section.path}
              key={index}
              className="rounded-xl bg-white p-6 shadow-md border hover:shadow-xl transition-all"
            >
              <div className="text-4xl mb-4">{section.icon}</div>
              <h3 className="text-xl font-semibold mb-2">{section.name}</h3>
              <p className="text-sm text-gray-600">{section.description}</p>
              <button className="mt-4 px-4 py-2 bg-indigo-600 text-white rounded-md text-sm hover:bg-indigo-700 transition">
                Visit
              </button>
            </Link>
          ))}
        </div>
      </section>

      {/* ========== Section 3: Visitors ========== */}
      <section className="bg-white py-16 px-4 sm:px-10 lg:px-20">
        <h2 className="text-3xl sm:text-4xl font-bold text-center mb-12 text-indigo-800">
          Website Insights
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 max-w-5xl mx-auto text-center">
          <div className="p-6 bg-indigo-100 rounded-xl shadow">
            <FaUsers className="text-4xl text-indigo-600 mb-2 mx-auto" />
            <h4 className="text-2xl font-bold">2,500+</h4>
            <p className="text-sm text-gray-700">Active Users</p>
          </div>
          <div className="p-6 bg-pink-100 rounded-xl shadow">
            <FaBookOpen className="text-4xl text-pink-600 mb-2 mx-auto" />
            <h4 className="text-2xl font-bold">1,200+</h4>
            <p className="text-sm text-gray-700">Notes Downloaded</p>
          </div>
          <div className="p-6 bg-green-100 rounded-xl shadow">
            <FaClock className="text-4xl text-green-600 mb-2 mx-auto" />
            <h4 className="text-2xl font-bold">5,000+</h4>
            <p className="text-sm text-gray-700">Learning Hours Logged</p>
          </div>
        </div>
      </section>
    </div>
  );
}
