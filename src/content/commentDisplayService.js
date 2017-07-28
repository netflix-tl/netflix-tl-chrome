export default function CommentDisplayService(DOM) {
    let module = {}
    module.queue = {}

    /**
     * Displays a comment with given text and duration
     * @param {string} text 
     * @param {number} duration 
     */
    module.showComment = function (text) {
        let duration = 1000 + text.length * 100
        console.log('new comment') //TODO: remove
        let player = document.getElementById('netflix-player')
        let comment = DOM.createComment(text)
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

    /**
     * Adds a permanent marker to the player timeline
     */
    module.addMarker = function(left) {
        let scrubber = document.getElementsByClassName('player-scrubber-progress')[0]
        let marker = document.createElement('div')
        marker.classList.add('vc-marker')
        marker.style.left = left + '%'
        scrubber.appendChild(marker)
        return marker
        
    }

    return module


}

