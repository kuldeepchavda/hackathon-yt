const mongoose =require("mongoose")
const playlistSchema = new mongoose.Schema({
  playlistId: { type: String, required: true, unique: true },
  videos: [{ id: String, watched: { type: Boolean, default: false } }],
  total: { type: Number, required: true },
  completed: { type: Number, default: 0 },
});

const Playlist = mongoose.model("Playlist_3", playlistSchema);
module.exports=Playlist