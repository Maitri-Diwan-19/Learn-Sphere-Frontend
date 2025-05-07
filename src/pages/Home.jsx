import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { authcontext } from '../context/authContext';

const Home = () => {
  const { user } = useContext(authcontext);

  return (
    <>
      {/* Navbar */}
      <nav className="bg-zinc-800 text-white p-4 shadow-md">
        <div className="flex justify-between items-center max-w-6xl mx-auto">
          <Link to="/" className="text-2xl font-bold">Learn Sphere</Link>
          <div className="space-x-4">
            {!user ? (
              <Link to="/login" className="bg-white text-zinc-800 px-4 py-2 rounded hover:bg-zinc-100">
                Login
              </Link>
            ) : null}
          </div>
        </div>
      </nav>

      
      <section className="bg-zinc-100 py-20 text-center">
        <h1 className="text-4xl font-bold text-zinc-800 mb-4">Empower Your Teaching & Learning Journey</h1>
        <p className="text-lg text-zinc-600 mb-8 max-w-xl mx-auto">
          Learn Sphere is your go-to platform for creating, managing, and exploring educational content — whether you're an instructor or a learner.
        </p>
        <Link to="/register" className="bg-zinc-800 hover:bg-zinc-900 text-white px-6 py-3 rounded text-lg font-semibold transition">
          Create an Account
        </Link>
      </section>

  
      <section className="py-16 bg-white">
        <div className="max-w-6xl mx-auto px-4 grid md:grid-cols-3 gap-8 text-center">
          <div className="shadow-lg p-6 rounded bg-zinc-100">
            <h3 className="text-xl font-semibold mb-2 text-zinc-800">For Instructors</h3>
            <p className="text-zinc-600">Create and manage your courses with powerful tools and insightful analytics.</p>
          </div>
          <div className="shadow-lg p-6 rounded bg-zinc-100">
            <h3 className="text-xl font-semibold mb-2 text-zinc-800">Interactive Learning</h3>
            <p className="text-zinc-600">Engage with interactive content, track progress, and stay ahead in your learning goals.</p>
          </div>
          <div className="shadow-lg p-6 rounded bg-zinc-100">
            <h3 className="text-xl font-semibold mb-2 text-zinc-800">Secure & Easy Login</h3>
            <p className="text-zinc-600">Role-based access with secure authentication for both students and instructors.</p>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-zinc-800 text-white py-16 text-center">
        <h2 className="text-3xl font-bold mb-4">Ready to Share or Learn?</h2>
        <p className="mb-6 text-lg">Sign up today and join the Learn Sphere community.</p>
        <Link to="/login" className="bg-white text-zinc-800 px-6 py-3 rounded font-semibold hover:bg-zinc-100">
          Join Now
        </Link>
      </section>
    </>
  );
};

export default Home;
