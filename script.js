'use strict';

(function () {
    const APICall = async (url) => {
        const response = await fetch(url);
        const data = await response.json();
        return data;
    }

    const addClass = (el, cls) => {
        el.classList.add(cls);
    }
    const addID = (el, id) => {
        el.id = id;
    }
    const createEl = (tag, cls, id = '') => {
        const el = document.createElement(tag);
        addClass(el, cls);
        id != '' ? addID(el, id) : null;
        return el;
    }

    const initPlayer = (() => {

        const getAllTags = document.querySelectorAll('rhAds-video');
        getAllTags.forEach(tag => {
            const splitUrl = tag.dataset.src.split('/');
            const videoId = splitUrl[splitUrl.length - 1].split('.')[0].toLowerCase();

            const rhAdsVidContainer = createEl('div', 'rhAds-video-container');

            const rhAdsVideoBlock = createEl('div', 'rhAds-video-block');
            rhAdsVidContainer.appendChild(rhAdsVideoBlock)

            const rhAdsVideo = createEl('video', 'rhAds-video', videoId);
            rhAdsVideo.setAttribute('src', tag.dataset.src)
            rhAdsVideo.setAttribute('quartile_url', tag.dataset.quartileTracker)
            rhAdsVideo.autoplay = true;
            rhAdsVideo.muted = true;
            rhAdsVideo.setAttribute('style', 'pointer-events: none;')
            rhAdsVideoBlock.appendChild(rhAdsVideo);

            const muteUnmute = createEl('span', 'mute-unmute', 'mute-unmute' + videoId);
            if (rhAdsVideo.ended) muteUnmute.hidden = true;
            muteUnmute.addEventListener('click', () => {
                if (rhAdsVideo.muted) {
                    rhAdsVideo.muted = false;
                    muteUnmute.textContent = 'Mute';
                } else {
                    rhAdsVideo.muted = true;
                    muteUnmute.textContent = 'Unmute';
                }
            })
            muteUnmute.textContent = 'Unmute';
            rhAdsVideoBlock.appendChild(muteUnmute);

            const rmpLogo = createEl('img', 'rhAds-logo');
            rmpLogo.setAttribute('src', 'https://haidari.co/newsite/wp-content/uploads/2020/08/logo-mobile.jpg')
            rhAdsVideoBlock.appendChild(rmpLogo)

            const rhAdsVideoControls = createEl('div', 'rhAds-video-controls', 'rhAds-video-controls-' + videoId);
            rhAdsVideoBlock.appendChild(rhAdsVideoControls);

            const rhAdsProgressBar = createEl('div', 'rhAds-progress-bar', 'rhAds-progress-bar-' + videoId);
            rhAdsVideoControls.appendChild(rhAdsProgressBar);

            const rhAdsProgressBarColor = createEl('div', 'rhAds-progress-bar-color', 'rhAds-progress-bar-color-' + videoId);
            rhAdsProgressBar.appendChild(rhAdsProgressBarColor);

            const rhAdsPlayPause = createEl('div', 'rhAds-video-buttons-block', 'rhAds-video-buttons-block-' + videoId);
            rhAdsVideoControls.appendChild(rhAdsPlayPause);

            const rhAdsPlay = createEl('button', 'pause', 'playPauseBtn-' + videoId);
            rhAdsPlayPause.appendChild(rhAdsPlay);

            tag.replaceWith(rhAdsVidContainer);

            rhAdsVideo.addEventListener('timeupdate', () => {
                var progressLength = rhAdsVideo.currentTime / rhAdsVideo.duration;
                const progressWidth = progressLength * 100;
                rhAdsVideo.setAttribute('quartile_value', progressWidth);
                rhAdsProgressBarColor.style.width = `${progressWidth}%`;
                if (rhAdsVideo.ended) rhAdsPlay.className = 'play';
            })

            const togglePlayPause = () => {
                if (rhAdsVideo.paused) {
                    rhAdsPlay.className = 'pause';
                    rhAdsVideo.play();
                }
                else {
                    rhAdsPlay.className = 'play';
                    rhAdsVideo.pause();
                }
            }

            rhAdsPlay.addEventListener('click', (e) => {
                togglePlayPause();
                document.querySelector('#mute-unmute' + videoId).hidden = false;
            })
        })
    })()

    window.addEventListener('load', () => {
        const videos = document.querySelectorAll('.rhAds-video');
        videos.forEach(video => {
            let vidCounter = 0;
            video.addEventListener('timeupdate', () => {

                const video_src = video.src;
                const quartile_url = video.getAttribute("quartile_url");
                let quartile_value = Math.ceil(video.getAttribute("quartile_value"));
                if (quartile_value == 100) {
                    document.querySelector('#mute-unmute' + video.id).hidden = true;
                }
                if (quartile_url != 'undefined') {
                    if (vidCounter == 0) {

                        APICall(quartile_url).then(data => {
                            console.log(`${video_src} 0%`);
                            console.log(data);
                        });
                        vidCounter = 1;
                    }
                    if (quartile_value == 25) {

                        APICall(quartile_url).then(data => {
                            console.log(`${video_src} ${quartile_value}%`);
                            console.log(data);
                        });
                    }
                    if (quartile_value == 50) {

                        APICall(quartile_url).then(data => {
                            console.log(`${video_src} ${quartile_value}%`);
                            console.log(data);
                        });
                    }
                    if (quartile_value == 75) {

                        APICall(quartile_url).then(data => {
                            console.log(`${video_src} ${quartile_value}%`);
                            console.log(data);
                        });
                    }
                    console.log(quartile_value)
                    if (quartile_value == 98) {

                        APICall(quartile_url).then(data => {
                            console.log(`${video_src} ${quartile_value}%`);
                            console.log(data);
                        });

                    }
                }
            })
        })
    })
})()