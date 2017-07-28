import escape from 'escape-html'

export default class ContentDOM {
    constructor() {
        this.htmlVideo
    }
    
    playerLoaded() {
        this.htmlVideo = document.getElementsByTagName('video')[0]
    }

    createQuickComment() {
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
        return quickComment
    }

    createComment(text) {
        text = escape(text)

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
        
        return comment
    }

}