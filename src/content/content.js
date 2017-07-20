// Material Design Icon Font
import 'material-design-icons-iconfont/dist/material-design-icons.scss'

import 'typeface-roboto'
import css from './content.scss'
console.log(css)
function injectCSS() {
    el = document.createElement('style')
    document.head.appendChild(el)
    el.type = 'text/css'
    el.appendChild(document.createTextNode(css.toString()))
}
initListeners()
initInject()

let videoId = getVideoId()
let quickCommentOpen = false

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
                quickComment()
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
function initInject() {
    if (!document.getElementsByClassName('player-scrubber-progress')[0]) {
        console.log('waitForPlayer loop') //DEVONLY
        window.requestAnimationFrame(initInject)
    } else {
        onPlayerLoaded() // player successfully loaded
    }
}

/**
 * Called when the video fully loads
 */
function onPlayerLoaded() {
    console.log(videoId)
    chrome.runtime.sendMessage({ contentLoaded: true, videoId: videoId}, response => {
        // TODO: load the comments into the movie
        console.log(response)
    })
    // DEVONLY: creates a comment every 3 seconds
    window.setInterval(() => comment('my new test comment'), 3000)
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
function comment(text, duration = 2500) {
    console.log('new comment') //DEVONLY

    let player = document.getElementById('netflix-player')
    let comment = document.createElement('div')
    comment.classList.add('vc-comment')
    comment.textContent = text

    player.appendChild(comment)
    setTimeout(fadein, 20)

    function fadein() {
        comment.style['transform'] = 'translate(0,0)'
        setTimeout(fadeout, duration)
    }

    function fadeout() {
        comment.style['transform'] = 'translate(0, 150%)'
        setTimeout(removeComment, 2500)
    }

    function removeComment() {
        comment.remove()
    }
}

function quickComment() {
    // let toastElement = $(`
    //     <div class="input-field">
    //         <input class="comment-input" id="comment-input">
    //         <label for="comment-input" class="active">insightful comment</label>
    //     </div>
    // `)
    // Materialize.toast(toastElement, 1000000)
    console.log('quick comment')
    // if (quickCommentOpen === true) {
    //     return null;
    // }
    // quickCommentOpen = true
    // let el = document.createElement('div')
    // el.innerHTML = `
    //     <div class="input-field">
    //         <input type="text" class="comment-input" id="comment-input">
    //         <label for="comment-input" class="comment-label">comment</label>
    //     </div>`
    // el.classList.add('vc-quick-comment')
    // document.body.appendChild(el)
    // el.focus()
    // setTimeout(()=>el.classList.add('in'), 500)

}