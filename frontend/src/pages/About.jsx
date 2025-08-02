export default function About() {
  return (
    <div className="max-w-3xl mx-auto mt-10 p-6 bg-white rounded-lg shadow">
      <h2 className="text-3xl font-bold mb-4 text-blue-600">About Alpha X</h2>
      <p className="text-gray-700 mb-4">
        Welcome to <span className="font-semibold">Learn X</span>, your ultimate online learning companion. 
        Our platform is designed to help students excel by offering a unique combination of progress tracking, 
        comprehensive resources, and an intuitive learning experience.
      </p>

      <ul className="list-disc pl-6 mb-4 text-gray-700 space-y-2">
        <li>
          <span className="font-semibold">PDF Notes:</span> Easy-to-access, well-structured notes to help you revise key concepts.
        </li>
        <li>
          <span className="font-semibold">Video Lectures:</span> Engaging video tutorials to enhance your understanding of complex topics.
        </li>
        <li>
          <span className="font-semibold">Previous Year Papers:</span> Practice with real exam questions from past years to prepare effectively.
        </li>
        <li>
          <span className="font-semibold">Progress Tracking:</span> Stay on top of your learning journey with our smart tracking system 
          that shows how much you've covered and what’s left to master.
        </li>
      </ul>

      <p className="text-gray-700">
        At <span className="font-semibold">Alpha X</span>, we believe that every student can achieve their academic goals with the right 
        tools and support. We’re here to make learning accessible, efficient, and enjoyable.
      </p>
    </div>
  );
}
