import React from "react";
import { Link } from "react-router-dom"; // fix từ react-router -> react-router-dom

export default function HomeScreen() {
  return (
    <div
      className="min-h-screen flex items-center justify-center bg-cover bg-center"
      style={{
        backgroundImage:
          "url('https://th.bing.com/th/id/R.91f1007aaa9eefe50dfc26e39368b63f?rik=BYgjv%2b7NslpHSA&riu=http%3a%2f%2fwww.10wallpaper.com%2fwallpaper%2f1920x1080%2f1209%2fPurple_orchid-Flower_photography_wallpaper_1920x1080.jpg&ehk=JfMF8Q2CrzenejppPsqNpTBmRJ8O%2fQKzaeN0N24uN0w%3d&risl=&pid=ImgRaw&r=0')",
      }}
    >
      <div className="bg-white bg-opacity-80 p-10 rounded-lg shadow-lg text-center max-w-xl">
        <h1 className="text-4xl font-bold mb-4 text-purple-700">
          Welcome to OrchidWeb!
        </h1>
        <p className="text-gray-700 mb-6">
          Discover the beauty of exotic orchids from all around the world.
          Whether you're a seasoned collector or a curious beginner, our
          collection will enchant you.
        </p>
        <Link to="/orchids">
          <button className="bg-purple-600 text-white px-6 py-2 rounded hover:bg-purple-700 transition duration-300">
            🌸 Explore Orchids
          </button>
        </Link>
      </div>
    </div>
  );
}
