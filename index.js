const axios = require('axios')

const Download = require('./src/Download')
const Parser = require('./src/Parser')
const Keys = require('./src/Keys')

const PLAYLIST = '37i9dQZF1DXcZQSjptOQtk'

var playlistSongs = []

const getSpotifyKey = () => {
    let data = 'grant_type=client_credentials'

    console.log('Requesting Spotify Auth Token...')

    axios.post(Parser.spotifyAuthURL(), data, {
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            'Authorization': `Basic ${Keys.SPOTIFY}`
        }
    })
    .then((response) => {
        if(response.data.access_token !== undefined) {
            console.log('Spotify Token:', response.data.access_token);

            getSongs(PLAYLIST, response.data.access_token)
        }
    })
    .catch((error) => console.log(error.message));
}

const getSongs = (playlist, token) => {
    axios.get(Parser.spotifyPlaylistURL(playlist), {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
        }
    })
    .then((response) => {
        let spotify = response.data
        let tracks = spotify.tracks.items

        tracks.forEach((track) => {
            playlistSongs.push({
                keyword: `${track.track.name}+by+${Parser.getArtists(track.track.artists)}`,
                filename: `${track.track.name}.mp3`
            })
        })

        Download(spotify.name, playlistSongs)
    })
    .catch((error) => console.log(error));
}

getSpotifyKey()