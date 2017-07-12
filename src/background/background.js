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
      sendMessageToContentScript({function: "quickComment"})
    }
  })

  function sendMessageToContentScript(mes) {
    chrome.tabs.query({active:true, currentWindow:true}, tabs => {
      chrome.tabs.sendMessage(tabs[0].id, mes, response => console.log(response))
    })
  }

  chrome.runtime.onMessage.addListener(
    (request, sender, sendResponse) => {
      console.log(sender.tab ?
        "from content.js" + sender.tab.url :
        "from extension:"
      )

      if (request.contentLoaded) {
        // content.js says netflix video is loaded
        videoId = request.videoId
        User.getCurrentGroup()
          .then(groupId =>
            Comment.getComments(groupId, videoId)
          )
          .then(comments => {
            sendResponse(comments)
          })
        return true  // required for async response
      } else if (request.popupLoaded) {
        if (!videoId) {
          console.log("no video is playing")
        }
        sendResponse(videoId)
      }
    }
  )
}
