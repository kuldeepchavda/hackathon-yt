const express = require("express")
const router = express.Router()
const playlistCTRL= require("../controllers/playlists.ctrl.js")
router.route("/create").post(playlistCTRL.savePlaylist);
router.route("/demo").get(async(req,res)=>{
    res.status(200).json({"status":"This is working fine..."})
});

router.route("/watched").post(playlistCTRL.markVideoAsWatched);
router.route("/getall").get(playlistCTRL.getAllPlaylist);
router.route("/get/:playlistId").get(playlistCTRL.getVidById);

// playlist page

router.route("/playlist_list").get(playlistCTRL.getPlaylist_list);
module.exports = router;