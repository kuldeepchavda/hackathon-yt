import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const PlaylistVideos = () => {
  const { id } = useParams(); // Get playlist ID from URL
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchVideos = async () => {
      try {
        const response = await fetch(
          `https://my-express-backend-0qie.onrender.com/playlist/get/${id}`
        );

        if (!response.ok) {
          throw new Error(`Error fetching videos: ${response.status}`);
        }

        const data = await response.json();
        setVideos(data[0].videos);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchVideos();
  }, [id]); // Fetch data when ID changes

  return (
    <div className="flex flex-col items-center min-h-screen bg-blue-100 p-6">
      <div className="w-full max-w-3xl bg-white shadow-lg rounded-lg p-6">
        <h1 className="text-2xl font-bold text-center text-blue-700 mb-6">
          Playlist Videos
        </h1>

        {loading && (
          <p className="text-center text-gray-600">Loading videos...</p>
        )}
        {error && <p className="text-center text-red-500">{error}</p>}

        {!loading && !error && videos.length > 0 ? (
          <div className="flex flex-col space-y-6">
            {videos.map((video, index) => (
              <div
                key={index}
                className="flex flex-col items-center bg-blue-600 text-white p-4 rounded-lg shadow-md hover:bg-blue-700 transition duration-300 w-full"
              >
                {/* Video Title */}
                <h2 className="text-lg font-semibold mb-2">{video.title}</h2>

                {/* Embed YouTube Video */}
                <iframe
                  className="rounded-lg"
                  width="100%"
                  height="315"
                  src={`https://www.youtube.com/embed/${video.id}`}
                  title={video.title}
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                ></iframe>

                {/* Watched Status */}
                <p className="text-sm text-gray-200 mt-2">
                  {video.watched ? "✅ Watched" : "⏳ Not Watched"}
                </p>
              </div>
            ))}
          </div>
        ) : (
          !loading && (
            <p className="text-center text-gray-500">No videos found.</p>
          )
        )}
      </div>
    </div>
  );
};

export default PlaylistVideos;
