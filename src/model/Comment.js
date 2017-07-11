import firebase from 'firebase'

/**
 * Posts a comment to given group and video.
 * @param {number} groupId 
 * @param {number} videoId 
 * @param {string} comment 
 */
export function postComment(groupId, videoId, comment) {
    const uid = firebase.auth().currentUser.uid
    let commentObj = {
        uid: uid,
        comment: comment,
        timestamp: 1001
    }
    let commentId = firebase.database()
        .ref(`comments/${groupId}/${videoId}`).push().key
    
    let data = {}
    data[`comments/${groupId}/${videoId}/${commentId}`] = commentObj
    data[`users/${uid}/comments/${commentId}`] = commentObj

    firebase.database().ref().update(data)
        .catch(err => console.log(err))
}

/**
 * Gets comments for given group and video. Keyed by a unique Id.
 * @param {number} groupId 
 * @param {number} videoId 
 */
export function getComments(groupId, videoId) {
    let ref = firebase.database()
        .ref(`comments/${groupId}/${videoId}`)
    return ref.once('value')
        .then(comments => comments.val())
}

