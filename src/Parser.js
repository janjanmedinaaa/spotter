const Keys = require('./Keys')

const spotifyAuthURL = () => 'https://accounts.spotify.com/api/token'

const spotifyPlaylistURL = (playlist) => `https://api.spotify.com/v1/playlists/${playlist}`

const youtubeURL = (title) => {
    let base = 'https://www.googleapis.com/youtube/v3/search'
    let key = Keys.YOUTUBE

    title = title.replace(/ /g, '+')

    return `${base}?part=snippet&order=viewCount&q=${title}&type=video&videoDefinition=any&key=${key}`
}

const getArtists = (artists) => {
    let data = ''

    artists.forEach((artist, i) => data += (i == 0) ? artist.name : ' ' + artist.name);

    return data
}

module.exports = {
    spotifyAuthURL,
    spotifyPlaylistURL,
    youtubeURL,
    getArtists
}