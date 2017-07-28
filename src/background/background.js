import * as User from '../model/User'
import * as Group from '../model/Group'
import * as Comment from '../model/Comment'

window.onload = () => {
  let videoId
  User.initializeFirebase(loggedIn, () => console.log('you are logged out'));

  function loggedIn() {
    console.log("you are logged in")
    // TODO: remove the window props below
    window.Group = Group
    window.User = User
    window.Comment = Comment
  }

  chrome.commands.onCommand.addListener(command => {
    if (command === "quick-comment") {
      console.log("quick comment")
      sendMessageToContentScript({ function: "quickComment" })
    }
  })

  function sendMessageToContentScript(mes) {
    chrome.tabs.query({ active: true, currentWindow: true }, tabs => {
      chrome.tabs.sendMessage(tabs[0].id, mes, response => console.log(response))
    })
  }

  chrome.runtime.onMessage.addListener(
    (request, sender, sendResponse) => {
      console.log(sender.tab ?
        "froms content.js" + sender.tab.url :
        "from extension:"
      )

      if (request.videoId) {
        // content.js says netflix video is loaded, with videoId
        videoId = request.videoId

        let response = {}
        User.getUserGroups()
          .then(groups => {
            response.groups = groups
            console.log(groups)
            return Comment.getComments(groups.default, videoId)
          })
          .then(comments => {
            response.comments = comments
            sendResponse(response)
          })
        return true  // required for async response
      }

      if (request.popupLoaded) {
        if (!videoId) {
          console.log("no video is playing")
        }
        sendResponse(videoId)
        return false
      }

      if (request.submitComment) {
        let submitComment = request.submitComment
        submitComment.groups.forEach(groupId => {
          Comment.postComment(
            groupId,
            submitComment.videoId,
            submitComment.time,
            submitComment.message
          )
        })
      }
    }
  )
}
