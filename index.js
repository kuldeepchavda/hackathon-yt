const express = require("express");
const app = express();
app.use(express.json())
const axios = require("axios");
const connectDB= require("./Database/mongoose")
const playlistRoutes = require("./routers/playlists.router.js")
require("dotenv").config();
connectDB();
const PORT = process.env.PORT || 5000;
const YT_API_KEY = process.env.YT_API_KEY;

app.use("/playlist", playlistRoutes);


app.use("/demo", async(req,res)=>{
  res.send("This is working");
});





app.get("/video/:videoId", async (req, res) => {
  try {
    const { videoId } = req.params;
    const url = `https://www.googleapis.com/youtube/v3/videos?part=snippet,contentDetails,statistics&id=${videoId}&key=${YT_API_KEY}`;

    const response = await axios.get(url);
    res.json(response.data);
  } catch (error) {
    res
      .status(500)
      .json({ error: "Failed to fetch video data", details: error.message });
  }
});



app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
