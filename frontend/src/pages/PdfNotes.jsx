import { useState } from 'react';

export default function PdfNotes() {
  const [form, setForm] = useState({ year: '', branch: '', subject: '' });
  const [pdfLink, setPdfLink] = useState(null);
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);

    const { year, branch, subject } = form;

    let link = '';

    if (year === '1st' && branch === 'CSE' && subject === 'maths') {
      link = 'https://t.me/QuantumSeriesaktu1/65';
    } else if (year === '2nd' && branch === 'ECE' && subject === 'physics') {
      link = 'https://example.com/ece-physics.pdf'; // Add actual link here
    }

    setPdfLink(link || null);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-100 to-white flex flex-col items-center justify-center px-4 py-10">
      <div className="bg-white shadow-lg rounded-2xl p-8 w-full max-w-md">
        <h1 className="text-2xl font-bold text-center text-gray-800 mb-6">
          Download PDF Notes
        </h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="year" className="block mb-1 font-medium text-gray-700">Year</label>
            <select
              name="year"
              id="year"
              onChange={handleChange}
              required
              className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-400"
            >
              <option value="">Select Year</option>
              <option value="1st">1st</option>
              <option value="2nd">2nd</option>
            </select>
          </div>

          <div>
            <label htmlFor="branch" className="block mb-1 font-medium text-gray-700">Branch</label>
            <select
              name="branch"
              id="branch"
              onChange={handleChange}
              required
              className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-400"
            >
              <option value="">Select Branch</option>
              <option value="CSE">CSE</option>
              <option value="ECE">ECE</option>
            </select>
          </div>

          <div>
            <label htmlFor="subject" className="block mb-1 font-medium text-gray-700">Subject</label>
            <select
              name="subject"
              id="subject"
              onChange={handleChange}
              required
              className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-400"
            >
              <option value="">Select Subject</option>
              <option value="maths">Maths</option>
              <option value="physics">Physics</option>
            </select>
          </div>

          <button
            type="submit"
            className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-2 px-4 rounded-lg transition duration-200"
          >
            Get PDF
          </button>
        </form>

        <div className="mt-6 text-center">
          {submitted && pdfLink ? (
            <a
              href={pdfLink}
              target="_blank"
              rel="noopener noreferrer"
              className="text-indigo-600 font-medium hover:underline"
            >
              📄 Download PDF for {form.subject}
            </a>
          ) : submitted && pdfLink === null ? (
            <p className="text-red-500 font-medium mt-4">No PDF available for this selection.</p>
          ) : null}
        </div>
      </div>
    </div>
  );
}
