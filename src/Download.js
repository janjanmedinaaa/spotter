const YoutubeMp3Downloader = require('youtube-mp3-downloader')
const axios = require('axios')

const Files = require('./Files')
const Parser = require('./Parser')

var currIndex = 0
var currPlaylist = ''
var currPlaylistData = []

const searchYoutube = (track) => {
    axios.get(Parser.youtubeURL(track.keyword))
    .then((response) => {
        if(response.data.error !== undefined)
            console.log(response.data.error.message)
        else if(response.data.items.length > 0) 
            downloadMP3(response.data.items[0].id.videoId, track.filename)
    })
    .catch((error) => console.log(error));
}

const downloadMP3 = (ytid, filename) => {
    console.log(`Starting ${ytid} Download...`)

    try {
        if(!Files.exist(`${currPlaylist}/${filename}`)) {
            //Configure YoutubeMp3Downloader with your settings
            var YD = new YoutubeMp3Downloader({
                "ffmpegPath": "/usr/local/bin/ffmpeg",        // Where is the FFmpeg binary located?
                "outputPath": currPlaylist,    // Where should the downloaded and encoded files be stored?
                "youtubeVideoQuality": "highest",       // What video quality should be used?
                "queueParallelism": 2,                  // How many parallel downloads/encodes should be started?
                "progressTimeout": 2000                 // How long should be the interval of the progress reports
            })
            
            //Download video and save as MP3 file
            YD.download(ytid, filename)
            
            YD.on("finished", function(err, data) {
                downloadEnd()
            })
            
            YD.on("error", function(error) {
                downloadEnd()
            })
            
            YD.on("progress", function(progress) {
                console.log(`Downloading ${ytid} status:`, progress.progress.percentage)
            })
        } else {
            console.log(`${ytid} already downloaded...`)
            downloadEnd()
        }
    } catch(e) {
        downloadMP3(ytid)
    }
}

const downloadEnd = () => {
    currIndex += 1

    if(currIndex < currPlaylistData.length-1)
        searchYoutube(currPlaylistData[currIndex])
    else
        console.log(`${currPlaylist} finished downloading!`)
}

module.exports = (playlist, data) => {
    currPlaylist = `./outputs/${playlist}`
    currPlaylistData = data

    Files.mkdir(currPlaylist)

    searchYoutube(currPlaylistData[currIndex])
}