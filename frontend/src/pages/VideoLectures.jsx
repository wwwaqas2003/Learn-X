import { useState } from 'react';

export default function VideoLectures() {
  const [form, setForm] = useState({ year: '', branch: '' });
  const [videos, setVideos] = useState([]);
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);

    const { year, branch } = form;
    let result = [];

    if (year === '1st' && branch === 'CSE') {
      result = [
        {
          title: 'Introduction to Programming',
          link: 'https://www.youtube.com/embed/1gyT7X6VMZg?si=7qAlrGXIeWc10_Kh',
        },
        {
          title: 'Fundamentals of Mechanics',
          link: 'https://www.youtube.com/embed/0xaq-X-vR5M?si=22pAfnwaCx39L7I7',
        },
      ];
    } else if (year === '2nd' && branch === 'CSE') {
      result = [
        {
          title: 'Computer Organization & Architecture',
          link: 'https://www.youtube.com/embed/DsK35f8wyUw?si=5p2lgNQ5NNn-Rgw-',
        },
        {
          title: 'Operating Systems',
          link: 'https://www.youtube.com/embed/xw_OuOhjauw?si=Mc1bIxgGYu-O3mYv',
        },
        {
          title: 'Theory of Computation',
          link: 'https://www.youtube.com/embed/9kuynHcM3UA?si=0NNM07or_FdzLreZ',
        },
      ];
    }

    setVideos(result);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-white py-10 px-4 flex justify-center items-start">
      <div className="w-full max-w-4xl bg-white shadow-xl rounded-xl p-6">
        <h1 className="text-2xl font-bold text-center text-gray-800 mb-6">Find Your Lecture Videos</h1>

        <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
          <div>
            <label htmlFor="year" className="block text-gray-700 font-medium mb-1">Studying Year:</label>
            <select
              name="year"
              required
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
            >
              <option value="">Select Year</option>
              <option value="1st">1st Year</option>
              <option value="2nd">2nd Year</option>
              <option value="3rd">3rd Year</option>
              <option value="4th">4th Year</option>
            </select>
          </div>

          <div>
            <label htmlFor="branch" className="block text-gray-700 font-medium mb-1">Branch:</label>
            <select
              name="branch"
              required
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
            >
              <option value="">Select Branch</option>
              <option value="CSE">Computer Science</option>
              <option value="ECE">Electronics and Communication</option>
              <option value="ME">Mechanical</option>
              <option value="CE">Civil</option>
            </select>
          </div>

          <div className="md:col-span-2">
            <button
              type="submit"
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-lg transition duration-200"
            >
              Get Videos
            </button>
          </div>
        </form>

        <div className="grid gap-6 mt-6">
          {submitted && videos.length > 0 ? (
            videos.map((video, idx) => (
              <div key={idx} className="shadow-md border border-gray-200 rounded-lg overflow-hidden">
                <h3 className="bg-blue-100 px-4 py-2 font-semibold text-gray-800">{video.title}</h3>
                <div className="aspect-video">
                  <iframe
                    src={video.link}
                    className="w-full h-full"
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                    title={video.title}
                  ></iframe>
                </div>
              </div>
            ))
          ) : submitted && videos.length === 0 ? (
            <p className="text-center text-red-500 font-medium">No videos available for this selection.</p>
          ) : null}
        </div>
      </div>
    </div>
  );
}
