const express = require("express")
const router = express.Router()
const playlistCTRL= require("../controllers/playlists.ctrl.js")
router.route("/create").post(playlistCTRL.savePlaylist);
router.route("/demo").get(async(req,res)=>{
    res.status(200).json({"status":"This is working fine..."})
});

module.exports = router;