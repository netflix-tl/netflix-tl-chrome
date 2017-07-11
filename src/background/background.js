import * as User from '../model/User'
import * as Group from '../model/Group'
import * as Comment from '../model/Comment'

User.initializeFirebase(loggedIn, () => console.log('you are logged out'));

function loggedIn() {
  console.log("you are logged in")
  window.Group = Group
  window.User = User
  window.Comment = Comment
}


chrome.runtime.onMessage.addListener(
  (request, sender, sendResponse) => {
    console.log(sender.tab ?
      "from content.js" + sender.tab.url :
      "from extension:"
    )

    if (request.loaded) {
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
    }
  }
)

