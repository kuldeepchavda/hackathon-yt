const express = require("express");
const axios = require("axios");
const Playlist = require("../models/Playlists");


const savePlaylist = async (req, res) => {
  const { playlistId } = req.body;

  if (!playlistId) {
    return res.status(400).json({ error: "Invalid data" });
  }
  const exists = await Playlist.find({ playlistId });

  if ((exists.length) === 0) {
    try {
      const videos = await fetchAllVideos(playlistId);

      const savedPlaylist = await Playlist.create({
        playlistId,
        videos,
        total: videos.length,
        completed: 0,
      });

         res.json({ data:  savedPlaylist.videos });

    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  } else {
    res.json({data:"Exists"});
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
        thumbnail: {
          default: item.snippet.thumbnails.default?.url || "",
          medium: item.snippet.thumbnails.medium?.url || "",
          large: item.snippet.thumbnails.high?.url || "",
          standard: item.snippet.thumbnails.standard?.url || "",
        },
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


const markVideoAsWatched = async (req, res) => {
    const {playlistId,videoId} = req.body;
  try {
    const playlist = await Playlist.findOne({ playlistId });

    if (!playlist) {
      res.status(400).json({ error: "Playlist not found" });
    }

    const video = playlist.videos.find((v) => v.id === videoId);

    if (!video) {
      return res.status(400).json({ error: "Video not found in the playlist" });
    }

    // if (video.watched) {
    //   return { message: "Video already marked as watched" };
    // }

    video.watched = true;
    playlist.completed += 1;

    await playlist.save();

     res.status(200).json({status:1});
  } catch (error) {
    console.error("Error updating video status:", error.message);
    res.send(error.message);
    // return { error: "Internal server error" };
  }
};
const getAllPlaylist=async(req,res)=>{
  const r = await Playlist.find()
  res.send(r)
}

module.exports = { savePlaylist, markVideoAsWatched, getAllPlaylist };