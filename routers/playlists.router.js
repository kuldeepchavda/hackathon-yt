const express = require("express")
const router = express.Router()
const playlistCTRL= require("../controllers/playlists.ctrl.js")
router.route("/create").post(playlistCTRL.savePlaylist)

module.exports = router;