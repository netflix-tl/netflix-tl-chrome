initListeners()
initInject()

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
            let fn = req.function
            if (fn === "quickComment") {
                quickComment()
            }
        }
        res({ body: "completed" })
    }
    )
}

function quickComment() {
    console.log("quickComment")
    // TODO: quick comment action
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
    //window.setInterval(() => comment('my new test comment'), 3000)
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
    setTimeout(fadein, 10)

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