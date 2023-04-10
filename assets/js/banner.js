// Banner Elements:
const bannerWrapElm = $('.banner__slider')
const bannerItemElm = $$('.banner__item')
const btnBannerPrev = $('.banner__prev--btn')
const btnBannerNext = $('.banner__next--btn')


const banner = {
    delta: bannerItemElm[0].clientWidth,
    bannerItemElmLength: bannerItemElm.length,
    scrollValue: 0,
    isScroll: false,
    // On PC device:
    max:  (bannerItemElm[0].clientWidth * bannerItemElm.length) - (bannerItemElm[0].clientWidth * 3),
    start: function() {
        // On mobile device:
        if(window.innerWidth <= 739) {
            this.max = (bannerItemElm[0].clientWidth * bannerItemElm.length) - (bannerItemElm[0].clientWidth * 1)
        }
        // Auto Show Sliders:
        setInterval(() => {
            if (this.isScroll) {
                clearInterval()
            } else {
                this.scrollValue += this.delta
                if (this.scrollValue > this.max) {
                    this.scrollValue = 0
                }
                this.scrollBanner(bannerWrapElm, this.scrollValue, 0.5)
            }
        }, 5000)

        // Manual Show SLiders And Handle Events Function:
        this.handleBannerEvent()
    },

    // Manual Show SLiders And Handle Events Function:
    handleBannerEvent: function () {

        bannerWrapElm.addEventListener('mouseout', () => {
            this.isScroll = false
        })

        bannerWrapElm.addEventListener('mouseover', () => {
            this.isScroll = true
        })

        btnBannerNext.addEventListener('click', () => {
            this.isScroll = true
            this.scrollValue += this.delta
            if (this.scrollValue > this.max) {
                this.scrollValue = 0
            }
            this.scrollBanner(bannerWrapElm, this.scrollValue, 0.5)
        })


        btnBannerPrev.addEventListener('click', () => {
            this.isScroll = true
            this.scrollValue -= this.delta
            if (this.scrollValue < 0) {
                this.scrollValue = this.max
            }
            this.scrollBanner(bannerWrapElm, this.scrollValue, 0.5)
        })
    },

    // Scroll Banner Function:
    scrollBanner: function (parentElement, scrollValue, duration) {
        gsap.to(parentElement, { duration: duration, scrollTo: { x: scrollValue } })
    }
}

banner.start()






