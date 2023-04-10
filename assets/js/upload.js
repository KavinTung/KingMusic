const labelMusicElm = $('.mediafile__label--music')
const labelImageElm = $('.mediafile__label--image')
const musicFileELm = $('.music__file--text')
const imageFileELm = $('.image__file--text')
const musicLoadingPercent = $('.music__loading--percent')

userAudioElm.addEventListener('change', () => {
    musicFileELm.textContent = userAudioElm.files[0].name
})
userImageElm.addEventListener('change', () => {
    imageFileELm.textContent = userImageElm.files[0].name
})