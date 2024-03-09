window.addEventListener("load", () => {
    let indiceCancionActual = 0
    const Songs = [{
            artist: 'Audioslave',
            name: 'What you are',
            fileUrl: 'assets/music/whatyouare.mp3',
            imgurl: 'assets/cover1.png'
        },
        {
            artist: 'Remember',
            name: 'Masato',
            fileUrl: 'assets/music/remember.mp3',
            imgurl: 'assets/cover2.png'
        },
        {
            artist: 'Jake hill',
            name: 'By the sword',
            fileUrl: 'assets/music/bythesword.mp3',
            imgurl: 'assets/cover3.png'
        }
    ];
    const States = {
        PAUSED: 0,
        PLAYING: 1
    };

    class MusicPlayer {
        constructor(element) {
            this._element = element;
            this._controls = {
                PREV: element.querySelector('.control-prev'),
                PAUSE_PLAY: element.querySelector('.control-pause-play'),
                NEXT: element.querySelector('.control-next')
            };
            this._durationSongBar = element.querySelector(".current-song-progress-indicator");
            this._songArtist = element.querySelector('.current-song-artist');
            this._songName = element.querySelector('.current-song-name');
            this._imageVinyl = element.querySelector('.music-player-vinyl-record')

            this._currentState = States.PAUSED;
            this._currentSong = null;
            this._currentAudio = null;

            this._initialize();
        }

        _initialize() {

            this._currentSong = this._getSongByIndex(indiceCancionActual);
            this._currentAudio = new Audio(this._currentSong.fileUrl);
            this._bindEventListeners();
            this._bindEventListenersNext()
            this._bindEventListenersPrev()
        }

        _getSongByIndex(index) {
            return Songs[index];
        }

        _bindEventListeners() {
            this._controls.PAUSE_PLAY.addEventListener('click', () => {
                switch (this._currentState) {
                    case States.PAUSED:
                        this._play();
                        break;
                    case States.PLAYING:
                        this._pause();
                        break;
                }
            });
        }

        _play() {
            this._element.classList.add('playing');
            this._currentState = States.PLAYING;
            this._songArtist.innerHTML = this._currentSong.artist
            this._songName.innerHTML = this._currentSong.name
            this._imageVinyl.style.background = `#d6d6de url(${this._currentSong.imgurl}) no-repeat center center`;
            // background: 
            this._currentAudio.play()
        }

        _pause() {
            this._element.classList.remove('playing');
            this._currentState = States.PAUSED;
            this._currentAudio.pause()
        }

        _bindEventListenersNext() {
            this._controls.NEXT.addEventListener('click', () => {
                this._pause();
                indiceCancionActual = (indiceCancionActual + 1) % Songs.length;

                this._currentSong = this._getSongByIndex(indiceCancionActual)
                this._currentAudio = new Audio(this._currentSong.fileUrl);
                this._play();
            });
        }

        _bindEventListenersPrev() {
            this._controls.PREV.addEventListener('click', () => {
                this._pause();
                indiceCancionActual = (indiceCancionActual - 1 + Songs.length) % Songs.length;
                this._currentSong = this._getSongByIndex(indiceCancionActual)
                this._currentAudio = new Audio(this._currentSong.fileUrl);
                this._play();
            });
        }






    }


    new MusicPlayer(document.querySelector('.music-player'));



})