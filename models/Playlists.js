const mongoose =require("mongoose")
const playlistSchema = new mongoose.Schema({
  playlistId: { type: String, required: true, unique: true },
  videos: [{ id: String, watched: { type: Boolean, default: false },thumbnail:{default:String,medium:String,large:String,standard:String} }],
  total: { type: Number, required: true },
  completed: { type: Number, default: 0 },
});

const Playlist = mongoose.model("Playlist_4", playlistSchema);
module.exports=Playlist