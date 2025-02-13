const express = require("express");
const axios = require("axios");
const Playlist = require("../models/Playlists");


const savePlaylist = async (req, res) => {
  const { playlistId } = req.body;
  if (!playlistId) {
    return res.status(400).json({ error: "Invalid data" });
  }

  try {
    const videos = await fetchAllVideos(playlistId); 

    const savedPlaylist = await Playlist.create({
      playlistId,
      videos,
      total: videos.length,
      completed: 0,
    });

    res.json({
      message: "Playlist saved successfully",
      playlist: savedPlaylist,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const fetchAllVideos = async (playlistId) => {
  let videos = [];
  let nextPageToken = "";
  try {
    do {
      const url = `https://www.googleapis.com/youtube/v3/playlistItems?part=snippet&maxResults=50&playlistId=${playlistId}&key=${
        process.env.YT_API_KEY
      }${nextPageToken ? `&pageToken=${nextPageToken}` : ""}`;

      const response = await axios.get(url);  

      const fetchedVideos = response.data.items.map((item) => ({
        id: item.snippet.resourceId.videoId,
        title: item.snippet.title,
        watched: false,
      }));

      videos = [...videos, ...fetchedVideos];
      nextPageToken = response.data.nextPageToken || null;
    } while (nextPageToken);

    return videos;
  } catch (error) {
    console.error("Error fetching videos:", error.message);
    return [];
  }
};

module.exports = { savePlaylist };