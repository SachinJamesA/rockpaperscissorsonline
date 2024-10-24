import React from "react";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div className="min-h-screen bg-white text-gray-800 dark:bg-gray-900 dark:text-white transition-colors duration-300">
      <div className="max-w-screen-lg mx-auto p-8">
        {/* Hero Section */}
        <section className="text-center mb-12">
          <h2 className="text-5xl font-semibold text-blue-600 mb-4">
            SNAKE, WATER & GUN
          </h2>
          <p className="text-xl text-gray-700 mb-8 dark:text-gray-300">
            Play Online With Your Friends
          </p>
          {/* <Link to="/main">
            <button className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition duration-300">
              Create Your First Quiz
            </button>
          </Link> */}
        </section>

        {/* Start Section */}
        <section className="bg-gray-100 rounded-lg shadow-lg p-6 mb-8 dark:bg-gray-800 text-center">
          <h2 className="text-3xl font-bold text-blue-600 mb-4">
            Do you have a dispute with your friend?
          </h2>
          <p className="text-lg text-gray-700 mb-2 dark:text-gray-300">
            Resolve it online!
          </p>
          <p className="text-lg text-gray-700 mb-4 dark:text-gray-300">
            Press "Get Started" to play with a friend. Send him a link to
            connect.
          </p>
          <Link to="/friends">
            <button className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition duration-300">
              GET STARTED
            </button>
          </Link>
        </section>

        <section className="bg-gray-100 rounded-lg shadow-lg p-6 mb-8 dark:bg-gray-800 text-center">
          <h2 className="text-3xl font-bold text-blue-600 mb-4">
            Want To Challenge The Computer?
          </h2>
          <p className="text-base text-gray-700 mb-4 dark:text-gray-300">
            Play Now By Clicking "Player vs Computer"s.
          </p>
          <Link to="/main">
            <button className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition duration-300">
              PLAYER VS COMPUTER
            </button>
          </Link>
        </section>

        <section className="bg-gray-100 rounded-lg shadow-lg p-6 mb-8 dark:bg-gray-800">
          <h2 className="text-3xl font-bold text-blue-600 mb-4">
            About Snake Water Gun
          </h2>
          <p className="text-base text-gray-700 mb-4 dark:text-gray-300">
            Snake Water Gun is a classic twist on the well-known hand gesture
            games, offering fun and quick-paced rounds. Whether you're a casual
            gamer or just looking for a light-hearted challenge, Snake Water Gun
            is simple, intuitive, and perfect for a few minutes of fun.
          </p>
          <p className="text-base text-gray-700 mb-4 dark:text-gray-300">
            The rules are easy: Snake drinks water, water puts out gunfire, and
            gun shoots the snake. Test your reflexes and decision-making skills
            to outsmart your opponents and claim victory in this exciting game.
          </p>
        </section>

        {/* Features Section */}
        <section className="mb-8">
          <h2 className="text-3xl font-bold text-blue-600 mb-4">
            Key Features
          </h2>
          <ul className="list-disc list-inside mb-4 dark:text-gray-300">
            <li className="text-gray-700 dark:text-gray-300">
              🎮 <strong>Classic Gameplay</strong>: Enjoy the timeless fun of
              Snake-Water-Gun with simple rules and fast-paced rounds.
            </li>
            <li className="text-gray-700 dark:text-gray-300">
              🚀 <strong>Quick Matches</strong>: Play instant rounds that are
              easy to start, perfect for a short break or challenge with
              friends.
            </li>
            <li className="text-gray-700 dark:text-gray-300">
              🧠 <strong>Strategy & Reflexes</strong>: Test your decision-making
              and reflexes in this exciting game of wits.
            </li>
            <li className="text-gray-700 dark:text-gray-300">
              🌐 <strong>Multiplayer Mode</strong>: Challenge your friends
              online and compete in real-time for ultimate bragging rights.
            </li>
          </ul>
          <p className="text-base text-gray-700 dark:text-gray-300">
            Dive into the excitement of Snake-Water-Gun and see how well you can
            outsmart your opponents!
          </p>
        </section>

        {/* User Testimonials Section */}
        <section className="bg-gray-100 rounded-lg shadow-lg p-6 mb-8 dark:bg-gray-800">
          <h2 className="text-3xl font-bold text-blue-600 mb-4">
            What Our Players Say
          </h2>
          <div className="mb-4">
            <p className="text-gray-700 italic dark:text-gray-300">
              “Snake-Water-Gun brings back so many childhood memories. It's
              simple, fun, and great to play with friends!”
            </p>
            <p className="text-sm text-gray-500">- Alex M., Casual Gamer</p>
          </div>
          <div className="mb-4">
            <p className="text-gray-700 italic dark:text-gray-300">
              “I love the quick rounds! Perfect for when I have a few minutes to
              spare. Plus, the multiplayer mode is super competitive.”
            </p>
            <p className="text-sm text-gray-500">
              - Mia R., Competitive Player
            </p>
          </div>
          <div className="mb-4">
            <p className="text-gray-700 italic dark:text-gray-300">
              “The strategy involved in Snake-Water-Gun really keeps me on my
              toes. I always enjoy challenging my friends to a match.”
            </p>
            <p className="text-sm text-gray-500">
              - Chris S., Strategy Enthusiast
            </p>
          </div>
        </section>

        {/* Getting Started Section */}
        <section className="mb-8">
          <h2 className="text-3xl font-bold text-blue-600 mb-4">
            Get Started in 1 Easy Steps
          </h2>
          <ol className="list-decimal list-inside text-gray-700 dark:text-gray-300">
            <li className="mb-2">
              🔹 <strong>Just play</strong>: Select which mode you wanna play
              either with friends or computer and get the result.
            </li>
          </ol>
        </section>
      </div>
    </div>
  );
};

export default Home;
