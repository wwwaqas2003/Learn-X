import { Routes, Route } from "react-router-dom";
import { SignIn } from "@clerk/clerk-react";

import Header from "./components/Header";
import Footer from "./components/Footer";
import ProtectedRoute from "./components/ProtectedRoute";

import Home from "./pages/Home";
import ChatPage from "./pages/ChatPage";
import Games from "./pages/Games";
import About from "./pages/About";
import Minesweeper from "./components/Minesweeper";
import Pong from "./components/Pong";
import WhacAMole from "./components/WhacAMole";
import ProgressTracker from "./pages/ProgressTracker";
import TestSeries from "./pages/TestSeries";
import QuantumSeries from "./pages/QuantumNotes";
import PdfNotes from "./pages/PdfNotes";
import VideoLectures from "./pages/VideoLectures";
import FloatingChatButton from "./components/FloatingChatButton";

export default function App() {
  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <Header />
      <main className="flex-1 p-4">
        <Routes>
          {/* Public Routes */}
          <Route path="/about" element={<About />} />
          <Route path="/login" element={<SignIn routing="path" path="/login" />} />

          {/* Protected Routes */}
          <Route path="/" element={<ProtectedRoute><Home /></ProtectedRoute>} />
          <Route path="/chat" element={<ProtectedRoute><ChatPage /></ProtectedRoute>} />
          <Route path="/games" element={<ProtectedRoute><Games /></ProtectedRoute>} />
          <Route path="/games/minesweeper" element={<ProtectedRoute><Minesweeper /></ProtectedRoute>} />
          <Route path="/games/pong" element={<ProtectedRoute><Pong /></ProtectedRoute>} />
          <Route path="/games/whac-a-mole" element={<ProtectedRoute><WhacAMole /></ProtectedRoute>} />
          <Route path="/progress" element={<ProtectedRoute><ProgressTracker /></ProtectedRoute>} />
          <Route path="/test-series" element={<ProtectedRoute><TestSeries /></ProtectedRoute>} />
          <Route path="/quantumseries" element={<ProtectedRoute><QuantumSeries /></ProtectedRoute>} />
          <Route path="/pdfnotes" element={<ProtectedRoute><PdfNotes /></ProtectedRoute>} />
          <Route path="/videolec" element={<ProtectedRoute><VideoLectures /></ProtectedRoute>} />
        </Routes>
      </main>
      <Footer />
      <FloatingChatButton />
    </div>
  );
}
