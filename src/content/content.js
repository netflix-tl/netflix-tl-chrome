// Material Design Icon Font
import 'material-design-icons-iconfont/dist/material-design-icons.scss'
import 'typeface-roboto'
import css from './content.scss'

initListeners()
init()

let allGroups = []
let comments
let htmlVideo
let prevTime = 0
let videoId = getVideoId()

function getVideoId() {
    return window.location.href.match(/watch\/(.*?)(\?|$)/)[1]
}
/**
 * Listens for messages from the background and popup 
 *  and executes the function it receives
 */
function initListeners() {
    chrome.runtime.onMessage.addListener((req, sender, res) => {
        console.log(sender)
        if (req.function) {
            if (req.function === "quickComment") {
                openQuickComment()
            }
        }
        res({ body: "completed" })
    }
    )
}

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
    htmlVideo = document.getElementsByTagName('video')[0]
    chrome.runtime.sendMessage({ contentLoaded: true, videoId: videoId }, response => {
        console.log(response)
        allGroups = response.groups
        comments = response.comments
        setInterval(() => timeUpdate(Math.round(htmlVideo.currentTime * 4)), 250)
    })

    function startComments() {
    }
    function timeUpdate(currentTime) {
        if (currentTime > prevTime) {
            console.log(currentTime)
            let currentComment = comments[currentTime]
            if (currentComment) {
                console.log(currentComment)
                showComment(currentComment.message)
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
    

    // htmlVideo.addEventListener('timeupdate', () => timeUpdate(Math.round(htmlVideo.currentTime * 4)), 250)
    // function timeUpdate(currentTime) {
    //     console.log(currentTime)
    // }

    showComment('this is my test comment, its really interesting')
    // TODO: remove. DEVONLY: creates a comment every 3 seconds
    //window.setInterval(() => showComment('my new test comment'), 3000)
}

/**
 * Adds a permanent marker to the player timeline
 */
function addMarker() {
    let scrubber = document.getElementsByClassName('player-scrubber-progress')[0]
    let marker = document.createElement('div')
    marker.classList.add('vc-marker')
    scrubber.appendChild(marker)
}

/**
 * Displays a comment with given text and duration
 * @param {string} text 
 * @param {number} duration 
 */
function showComment(text) {
    let duration = 1000 + text.length * 100
    console.log('new comment') //DEVONLY
    let player = document.getElementById('netflix-player')
    let comment = document.createElement('div')
    comment.classList.add('vc-comment')
    comment.innerHTML = 
    `
        <span class="vc-comment-before">
            <span class="vc-avatar">DF</span>
        </span>
        <span class="vc-comment-text">${text}</span>
        <span class="vc-comment-after">
            <button class="vc-icon-btn">
                <i class="material-icons">thumb_up</i>
            </button>
            <button class="vc-icon-btn">
                <i class="material-icons">flag</i>
            </button>
        </span>
            <div class="vc-comment-bar"></div>
    `
    let mouseIn = false
    comment.addEventListener('mouseenter', () => {
        mouseIn = true
    })
    comment.addEventListener('mouseleave', () => {
        mouseIn = false
        setTimeout(fadeout, 2500)
    })

    player.appendChild(comment)
    setTimeout(fadein, 20)

    function fadein() {
        comment.classList.add('in')
        setTimeout(fadeout, duration)
    }

    function fadeout() {
        if (mouseIn) {
            return
        }
        comment.classList.remove('in')
        setTimeout(removeComment, 2500)
    }

    function removeComment() {
        comment.remove()
    }
}

let quickComment
function openQuickComment() {
    let time = prevTime
    let groups = [allGroups.default]
    if (quickComment) {
        quickComment.getElementsByClassName('vc-input-field')[0].focus()
        return
    }
    quickComment = document.createElement('div')
    quickComment.classList.add('vc-quick-comment')
    quickComment.innerHTML = 
    `
        <label class="vc-input-label">Comment:&nbsp</label>
        <input class="vc-input-field" autofocus>
        <button class="vc-icon-btn">
        <i class="material-icons">send</i>
        </button>
    `
    quickComment.addEventListener('keydown', e => {
        if (e.keyCode === 13) {
            submitComment()
        }
    })

    quickComment.addEventListener('click', e => {
        e.stopPropagation();
    })

    document.body.appendChild(quickComment)
    setTimeout(()=>quickComment.classList.add('in'), 20)
    quickComment.getElementsByClassName('vc-input-field')[0].focus()

    function submitComment() {
        let input = quickComment.getElementsByClassName('vc-input-field')[0]
        let newComment = {
            videoId: videoId,
            groups: groups,
            time: time,
            message: input.value
        }
        chrome.runtime.sendMessage({submitComment: newComment})
        console.log(newComment)
        removeQuickComment()
    }

    function removeQuickComment() {
        quickComment.classList.remove('in')
        quickComment = null
    }
}