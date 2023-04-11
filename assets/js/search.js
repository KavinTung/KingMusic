// Header search:
const searchInputElm = $('.header__search--input')
const suggestListElm = $('.search__suggest--list')
const headerSearchElm = $('.header__search')

const search = {
    start: function () {
        this.handleShowSuggest()
        // When website loaded:
        window.addEventListener('load', () => {
            this.renderSuggestElement()
            this.reloadSongElements()
            this.handleSearch()
        })
    },

    // Handle Show Suggest Function:
    handleShowSuggest: function () {
        // Show suggest when click search input:
        searchInputElm.addEventListener('focus', () => {
            headerSearchElm.classList.add('searching')
        })

        // Hide suggest when blur search input:
        searchInputElm.addEventListener('blur', () => {
            headerSearchElm.classList.remove('searching')
        })

        // Show suggest when hover suggest list:
        suggestListElm.addEventListener('mouseover', () => {
            suggestListElm.classList.add('selecting')
        })

        // Hide suggest when leave suggest list:
        suggestListElm.addEventListener('mouseout', () => {
            suggestListElm.classList.remove('selecting')
        })
    },

    // Hanlde Search Function:
    handleSearch: function () {
        // Get song list:
        data = [...player.dataList]

        // Listen search input events:
        searchInputElm.addEventListener('input', (e) => {
            let keyword = e.target.value.trim()
            if (keyword != '') {
                // Filter with song name:
                let songsFilter = data.filter((song) => {
                    return song.name.toLowerCase().includes(`${e.target.value.toLowerCase()}`)
                })

                // Filter with artist name:
                let artistsFilter = data.filter((song) => {
                    return song.artist.toLowerCase().includes(`${e.target.value.toLowerCase()}`)
                })

                // Concat two array and remove duplicate song:
                let songs = [...new Set(songsFilter.concat(artistsFilter))]

                // If not founds:
                if (songs.length === 0) {
                    suggestListElm.innerHTML = `
                <h2 style="text-align: center; font-weight: 400;" class="suggest--list--heading">Not Founds</h2>
                `
                } else {
                    // Render songs match with input to suggest list:
                    let htmls = songs.map((song) => {
                        return this.renderSongsMatch(song)
                    })
                    suggestListElm.innerHTML = htmls
                    this.reloadSongElements()
                }

            } else {
                this.renderSuggestElement()
                this.reloadSongElements()
            }
        })
    },

    // Reload Song Elements Function:
    reloadSongElements: function () {
        // Reload songs element:
        let newSongListElm = $$('.song__wrap')
        newSongListElm.forEach((elmNode) => {
            elmNode.addEventListener('click', () => {

                // Get trackId with data-id attribute:
                player.trackId = elmNode.getAttribute('data-id')

                // Get song index and set current track with trackId:
                player.currentTrack = player.getSongIndex(player.dataList, player.trackId)

                // Load music:
                player.loadMusicHandle(player.currentTrack)

                // Play music:
                player.playMusic()

            })
        })
    },

    // Render Songs Match With Input:
    renderSongsMatch: function (song) {
        return `
        <li class="song__wrap" data-id="${song.id}" title="${song.name}">
            <div class="song__thumb">
                <img src="${song.thumb}" alt="${song.name}" class="song__thumb--img">
                <div class="playing__bars--animation" data-id="${song.id}">
                    <span></span><span></span><span></span><span></span><span></span>
                </div>
                <div class="playing__button--play control__btn--icon" data-id="${song.id}">
                    <i class="bi bi-play-fill"></i>
                </div>
                <div class="playing__button--pause control__btn--icon" data-id="${song.id}">
                    <i class="bi bi-pause-fill"></i>
                </div>
            </div>

            <div class="song__info">
                <p class="song__info--name">${song.name}</p>
                <p class="song__info--artist">${song.artist}</p>
            </div>
            <div class="song__option">
                <i class="bi bi-three-dots"></i>
            </div>
        </li>
        `
    },

    // Render Suggest Element Functino:
    renderSuggestElement: function () {
        suggestListElm.innerHTML = `
            <h2 class="suggest--list--heading">Đề xuất cho bạn</h2>
            <li class="song__wrap" data-id="8" title="">
                <div class="song__thumb">
                    <img src="assets/images/songs/img-thumb8.jpg" alt="" class="song__thumb--img">
                    <div class="playing__bars--animation" data-id="8">
                        <span></span><span></span><span></span><span></span><span></span>
                    </div>
                    <div class="playing__button--play control__btn--icon" data-id="8">
                        <i class="bi bi-play-fill"></i>
                    </div>
                    <div class="playing__button--pause control__btn--icon" data-id="8">
                        <i class="bi bi-pause-fill"></i>
                    </div>
                </div>

                <div class="song__info">
                    <p class="song__info--name">Cưa Là Đổ</p>
                    <p class="song__info--artist">Phát Hồ, X2X, Đại Mèo</p>
                </div>
                <div class="song__option">
                    <i class="bi bi-three-dots"></i>
                </div>
            </li>
            `
    }

}
search.start()