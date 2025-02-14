const express = require("express");
const app = express();
app.use(express.json())
const axios = require("axios");
const connectDB= require("./Database/mongoose")
const playlistRoutes = require("./routers/playlists.router.js")
const cors = require("cors")
const corsOptions = {
  origin: [
    "http://localhost:5173",
  ],
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
  allowedHeaders: ["Content-Type", "Authorization"],
  credentials: true, // Allow credentials (cookies, sessions) to be sent
};

app.use(cors(corsOptions));


require("dotenv").config();
connectDB();
const PORT = process.env.PORT || 5000;
const YT_API_KEY = process.env.YT_API_KEY;

// app.use("/", (req, res) => {
//   res.send('join us!!');
// });
app.use("/playlist", playlistRoutes);

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
