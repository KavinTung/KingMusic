
// Header user:
const userSetting = $('.user__setting')
const userAvatar = $('.user__avatar')
const userChangeAvatarElm = $('#change-avt')

// Mobile Button:
const btnMbToggleSideBar = $('.header__mobile--bars')
const sideBarElm = $('.sidebar')

const app = {
    start: function () {
        this.renderSongs()
        this.handleEvents()
    },

    // Hanlde Events Function:
    handleEvents: function () {

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
            sideBarElm.classList.toggle('active')
        })

    },

    // Render Trendy Songs:
    renderSongs: function () {

        window.onload = function() {
            let dataList = [...player.dataList].slice(0,12)
            let htmls = dataList.map((song, index) => {
                return `<div class="song__wrap col l-4 c-12" data-id="${song.id}" title="${song.name}">
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
                </div>`
            })
            $('.song__test').innerHTML = htmls.join('')
            search.reloadSongElements()
        }

    }
}
app.start()
