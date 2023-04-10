// Header search:
const searchInputElm = $('.header__search--input')
const suggestListElm = $('.search__suggest--list')
const headerSearchElm = $('.header__search')

// Header user:
const userSetting = $('.user__setting')
const userAvatar = $('.user__avatar')

// Upload music:
const uploadToggleElm = $('.user__setting--upload')
const uploadWrapElm = $('.upload__wrap')
const userAudioElm = $('#song-audio')
const userImageElm = $('#song-img')
const userNameElm = $('#song-name')
const userArtistElm = $('#song-artist')
const userBtnUpload = $('.upload__btn')
const modalUploadElm = $('.modal__upload')
const btnCloseModal = $('.modal__close--icon')

// Mobile Button:
const btnMbToggleSideBar = $('.header__mobile--bars')
const sideBarElm = $('.sidebar')



// Handle Show Suggest Function:
function handleShowSuggest() {

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
}
handleShowSuggest()

// Hanlde Search Function:
function handleSearch() {
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

            // If not found:
            if (songs.length === 0) {
                suggestListElm.innerHTML = `
                <h2 style="text-align: center; font-weight: 400;" class="suggest--list--heading">Not Founds</h2>
                `
            } else {
                // Render songs found to suggest list:
                let htmls = songs.map((song) => {
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
                })
                suggestListElm.innerHTML = htmls
                reloadSongElements()
            }

        } else {
            suggestListElm.innerHTML = `
            <h2 class="suggest--list--heading">Đề xuất cho bạn</h2>
            <li class="song__wrap" data-id="8" title="">
                <div class="song__thumb">
                    <img src="assets/images/img-thumb8.jpg" alt="" class="song__thumb--img">
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
            reloadSongElements()
        }
    })
}

// Render song in search form when website loaded:
window.onload = function () {
    suggestListElm.innerHTML = `
            <h2 class="suggest--list--heading">Đề xuất cho bạn</h2>
            <li class="song__wrap" data-id="8" title="">
                <div class="song__thumb">
                    <img src="assets/images/img-thumb8.jpg" alt="" class="song__thumb--img">
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
    reloadSongElements()
    handleSearch()
}

// Reload song elements to click play function:
function reloadSongElements() {
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
}


// Avatar:

userAvatar.addEventListener('click', (e) => {
    e.stopPropagation()
    userSetting.classList.toggle('active')
})

userSetting.addEventListener('click', (e) => {
    e.stopPropagation()
})

document.addEventListener('click', () => {
    userSetting.classList.remove('active')
})

// Upload:

uploadWrapElm.addEventListener('click', (e) => {
    e.stopPropagation()
})

uploadToggleElm.addEventListener('click', () => {
    modalUploadElm.classList.toggle('active')
})

btnCloseModal.addEventListener('click', () => {
    modalUploadElm.classList.remove('active')
})

modalUploadElm.addEventListener('click', () => {
    modalUploadElm.classList.remove('active')
})

// Set infomation when uploaded:

let musicSrc, imageSrc, name, artist
userAudioElm.addEventListener('change', (e) => {
    musicSrc = URL.createObjectURL(e.target.files[0])
})

userImageElm.addEventListener('change', (e) => {
    imageSrc = URL.createObjectURL(e.target.files[0])
    console.log(userImageElm.files.length)
})

userBtnUpload.addEventListener('click', () => {
    lyricsElmWrap.innerHTML = ``
    name = userNameElm.value
    artist = userArtistElm.value
    setUploadSongInfo(musicSrc, imageSrc, name, artist)
})


function setUploadSongInfo(musicSrc, imageSrc, name, artist) {
    audio.src = musicSrc
    player.wavesurfer.load(audio)
    player.songImage = imageSrc
    audioThumb.style.backgroundImage = `url(${imageSrc})`
    audioName.textContent = name
    audioArtist.textContent = artist
    cdName.textContent = name
    cdArtist.textContent = artist
}


// Mobile Sidebar:
btnMbToggleSideBar.addEventListener('click', () => {
    sideBarElm.classList.toggle('active')
})