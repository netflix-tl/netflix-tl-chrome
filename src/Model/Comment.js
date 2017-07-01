import firebase from 'firebase'

export function postComment(comment) {
    console.log("Comment.postComment")
    const user = firebase.auth().currentUser
    if (user) {
        let groupId = '54321'
        let videoId = '12345'

        let ref = firebase.database().ref('groups/' + groupId + '/videos/' + videoId + '/comments/')
        let commentRef = ref.push()
        commentRef.set({
            uid: user.uid,
            content: comment,
            time: 1001
        })

        console.log('SUCCESS: commentRef: ' + commentRef)
    } else {
        console.log("FAILED: couldn't get firebase user")
    }
}