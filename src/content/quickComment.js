export default function QuickComment(DOM) {
    let module = {}
    let quickComment
    module.openQuickComment = function (userGroups) {
        let time = prevTime
        let groups = [userGroups.default]
        if (quickComment) {
            quickComment.getElementsByClassName('vc-input-field')[0].focus()
            return
        }
        quickComment = DOM.createQuickComment
        quickComment.addEventListener('keydown', e => {
            if (e.keyCode === 13) {
                submitComment()
            }
        })

        quickComment.addEventListener('click', e => {
            e.stopPropagation();
        })

        document.body.appendChild(quickComment)
        setTimeout(() => quickComment.classList.add('in'), 20)
        quickComment.getElementsByClassName('vc-input-field')[0].focus()

        function submitComment() {
            let input = quickComment.getElementsByClassName('vc-input-field')[0]
            let newComment = {
                videoId: videoId,
                groups: groups,
                time: time,
                message: input.value
            }
            chrome.runtime.sendMessage({ submitComment: newComment })
            console.log(newComment)
            removeQuickComment()
        }

        function removeQuickComment() {
            quickComment.classList.remove('in')
            quickComment = null
        }
    }
}