// Material Design Icon Font
import 'material-design-icons-iconfont/dist/material-design-icons.scss'
import 'typeface-roboto'
import css from './content.scss'

import CommentDisplayService from "./commentDisplayService.js"
import QuickComment from "./quickComment.js"
import ContentDOM from "./content.dom.js"

init()
let DOM = new ContentDOM()
let commentDisplayService = new CommentDisplayService(DOM)
let quickComment = new QuickComment(DOM)
let userGroups = []
let prevTime = 0
let comments = {}
let videoId = getVideoId()

/**
 * Gets the netflix id of the current video via url.
 */
function getVideoId() {
    return window.location.href.match(/watch\/(.*?)(\?|$)/)[1]
}

chrome.runtime.sendMessage({ videoId: videoId }, response => {
    console.log(response)
    userGroups = response.groups
    comments = response.comments
})


/**
 * Listens for messages from the background and popup 
 *  and gets told what to do.
 */
chrome.runtime.onMessage.addListener((req, sender, res) => {
    console.log(sender)
    if (req.function) {
        if (req.function === "quickComment") {
            quickComment.openQuickComment(userGroups)
        }
    }
    res({ body: "completed" })
}
)


/**
 * Waits for the video player to fully load.
 * Calls onPlayerLoad when successfully loaded.
 */
function init() {
    if (!document.getElementsByClassName('player-scrubber-progress')[0]) {
        console.log('waitForPlayer loop') //DEVONLY
        window.requestAnimationFrame(init)
    } else {
        onPlayerLoaded() // player successfully loaded
    }
}

/**
 * Called when the video fully loads
 */
function onPlayerLoaded() {
    console.log(videoId)
    DOM.playerLoaded()
    setInterval(() => checkForComment(Math.round(DOM.htmlVideo.currentTime * 4)), 250)
    for (let commentTime in comments) {
        if (comments.hasOwnProperty(commentTime)) {
            commentDisplayService.addMarker(commentTime / 4 / DOM.htmlVideo.duration * 100)
        }
    }
    function checkForComment(currentTime) {
        if (currentTime > prevTime) {
            let currentComment = comments[currentTime]
            if (currentComment) {
                commentDisplayService.showComment(currentComment.message)
            }

        }
        else if (currentTime < prevTime) {
            console.log('rewind')
        }
        else {
            console.log('same')
        }
        prevTime = currentTime
    }

    commentDisplayService.showComment('this is my test comment, its really interesting')


    // TODO: remove. DEVONLY: creates a comment every 3 seconds
    //window.setInterval(() => showComment('my new test comment'), 3000)
}
