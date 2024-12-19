let video = document.querySelector('.video-stream')
const pauseVideo = () => {
    video.pause()
}
const resumeVideo = () => {
    let video = document.querySelector('video')
    video.play()
}

chrome.runtime.onMessage.addListener((req, sender, res) => {
    if (req.type == 'RESUME') {
        resumeVideo()
    }
    if (req.type == 'PAUSE') {
        pauseVideo()
    }
    res(`Pause video of tab ${req.tabId}`)
})