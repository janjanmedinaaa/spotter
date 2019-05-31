# Spotter - Another Spotify MP3 Downloader

# How It Works
1. Sends a request to the Spotify Authentication API to create an access token for Spotify List API
2. Sends a request to the Spotify List API to get all the songs on the current playlist
3. Creates a array of keywords using the Song title and artists 
4. For each song, it creates a request to the Youtube API using the given keywords and gets the first result
5. Download the song using the video ID through the Youtube-MP3-Downloader

# To Do
- [ ] Error Handling
- [ ] Fix Youtube-MP3-Downloader Bug
- [ ] Create Global CLI