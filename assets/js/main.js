
// Header user:
const userSetting = $('.user__setting')
const userAvatar = $('.user__avatar')
const userChangeAvatarElm = $('#change-avt')

// Mobile Button:
const btnMbToggleSideBar = $('.header__mobile--bars')
const sideBarElm = $('.sidebar')

// Main Elements:
const artistElm = $('.artist')
const albumElm = $('.album')
const albumListElm = $('.album__list')
const albumWrapDetailElm = $('.album__detail--wrap')
const albumDetailListElm = $('.album__detail--list')
const songsElm = $('.songs')
const songHeadingElm = $('.song__heading')
const songListElm = $$('.song__wrap')

// Sidebar Elements:
const sideBarItemElm = $$('.sidebar__item')

// Album API:
const albumAPI = 'assets/json/album.json'

const app = {
    albumList: [],
    albumWrapElm: [],
    start: function () {
        fetch(albumAPI)
            .then((data) => data.json())
            .then((data) => {
                this.albumList = data
                this.renderAlbums(data)
                this.albumWrapElm = $$('.album__wrap')
                this.renderAlbumDetail(player.randomNumber(this.albumList.length), this.albumList, player.dataList)
                this.handleEvents()
            })
    },

    // Hanlde Events Function:
    handleEvents: function () {
        this.albumWrapElm.forEach((element) => {
            element.addEventListener('click', () => {
                let albumId = Number(element.getAttribute('data-id'))
                this.renderAlbumDetail(albumId, this.albumList, player.dataList)
                player.reloadSongElements()
                gsap.to(window, { duration: 0, scrollTo:"#albumScroll" })
            })
        })

        // Listen for User Avatar Click Events:
        userAvatar.addEventListener('click', (e) => {
            e.stopPropagation()
            userSetting.classList.toggle('active')
        })

        // Listen for User Avatar Input File Change:
        userChangeAvatarElm.addEventListener('change', (e) => {
            userAvatar.style.backgroundImage = `url(${URL.createObjectURL(e.target.files[0])})`
        })

        // Stp Propagation for User Setting Wrap:
        userSetting.addEventListener('click', (e) => {
            e.stopPropagation()
        })

        // Listen for Document Click Events to Close User Setting Wrap:
        document.addEventListener('click', () => {
            userSetting.classList.remove('active')
        })

        // Listen for Mobile Sidebar Click Events:
        btnMbToggleSideBar.addEventListener('click', () => {
            btnMbToggleSideBar.classList.toggle('active')
            sideBarElm.classList.toggle('active')
        })

        // Listen for Song List Click Events:
        songListElm.forEach((ele) => {
            ele.addEventListener('click', (e) => {
                e.stopPropagation()
                playListWrap.classList.remove('show')
                btnPlayList.classList.remove('active')
                btnMbPlaylist.classList.remove('active')
            })
        })

        // Listenter for Sidebar Item Click Event:
        sideBarItemElm.forEach((elm) => {
            elm.addEventListener('click', () => {
                sideBarItemElm.forEach((elm) => {
                    sideBarElm.classList.remove('active')
                    elm.classList.remove('active')
                })
                elm.classList.toggle('active')
            })
        })

        sideBarItemElm[0].addEventListener('click', () => {
            songHeadingElm.textContent = 'Trendy Song'
            songsElm.style.display = 'block'
            artistElm.style.display = 'block'
            albumElm.style.display = 'block'
            player.renderSongs(player.dataList, 12)
            player.reloadSongElements()
            this.renderAlbumDetail(player.randomNumber(this.albumList.length), this.albumList, player.dataList)
            player.reloadSongElements()

        })

        sideBarItemElm[1].addEventListener('click', () => {
            songHeadingElm.textContent = 'TOP 50'
            songsElm.style.display = 'block'
            artistElm.style.display = 'none'
            albumElm.style.display = 'none'
            player.renderSongs(player.dataList)
            player.reloadSongElements()
            this.renderAlbumDetail(player.randomNumber(this.albumList.length), this.albumList, player.dataList)
            player.reloadSongElements()

        })

        sideBarItemElm[2].addEventListener('click', () => {
            albumElm.style.display = 'block'
            artistElm.style.display = 'none'
            songsElm.style.display = 'none'
            this.renderAlbumDetail(player.randomNumber(this.albumList.length), this.albumList, player.dataList)
            player.reloadSongElements()

        })

    },

    // Render Album:
    renderAlbums: function (data) {
        let htmls = data.map((item, index) => {
            return `<div class="album__wrap col l-3 c-6" data-id="${index}" title="${item.name}">
                        <div class="album__thumb">
                            <img class="album__thumb--img" src="${item.image}">
                            <div class="control__btn--icon album__thumb--icon">
                                <i class="bi bi-play-circle"></i>
                            </div>
                        </div>
                        <div class="album__desc">
                            <p class="album__desc--name">${item.name}</p>
                            <p class="album__desc--artist">${item.artist}</p>
                        </div>
                    </div>`
        })
        albumListElm.innerHTML = htmls.join('')
    },

    // Render Album Detail:
    renderAlbumDetail: function (id, albumList, songList) {

        // Filter Songs::
        let items = songList.filter((item) => {
            return item.album === albumList[id].name
        })

        // Render Album:
        let htmls = `
            <div class="album__thumb" title="${albumList[id].name}">
                <img class="album__thumb--img" src="${albumList[id].image}">
                <div class="control__btn--icon album__thumb--icon">
                    <i class="bi bi-play-circle"></i>
                </div>
            </div>
            <div class="album__desc">
                <p class="album__desc--name">${albumList[id].name}</p>
                <p class="album__desc--artist">${albumList[id].artist}</p>
                <button class="album__desc--btn"><i class="bi bi-play-fill"></i> Play All</button>
        `
        albumWrapDetailElm.innerHTML = htmls

        // Render Songs:
        let htmls1 = items.map((item) => {
            return `
            <div class="song__wrap" data-id="${item.id}" title="${item.name}">
                <div class="song__thumb">
                    <img src="${item.image}" alt="" class="song__thumb--img">
                    <div class="playing__bars--animation" data-id="${item.id}">
                        <span></span><span></span><span></span><span></span><span></span>
                    </div>
                    <div class="playing__button--play control__btn--icon" data-id="${item.id}">
                        <i class="bi bi-play-fill"></i>
                    </div>
                    <div class="playing__button--pause control__btn--icon" data-id="${item.id}">
                        <i class="bi bi-pause-fill"></i>
                    </div>
                </div>
                <div class="song__info">
                    <p class="song__info--name">${item.name}</p>
                    <p class="song__info--artist">${item.artist}</p>
                </div>
                <div class="album__info">${albumList[id].name}</div>
                <div class="song__option">
                    <i class="bi bi-three-dots"></i>
                </div>
            </div>
            `
        })
        albumDetailListElm.innerHTML = htmls1.join('')
    }
}
app.start()
