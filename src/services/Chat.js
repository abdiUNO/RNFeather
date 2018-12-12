import { ChatManager, TokenProvider } from "@pusher/chatkit"
const CHATKIT_TOKEN_PROVIDER_ENDPOINT =
  "https://us1.pusherplatform.io/services/chatkit_token_provider/v1/3a573f00-89ae-44a2-9c9c-342c204077cb/token"
const CHATKIT_INSTANCE_LOCATOR = "v1:us1:3a573f00-89ae-44a2-9c9c-342c204077cb"
const USER_ID = "ezn6av"

class Chat {
  constructor() {
    this.init()
  }

  init() {
    const tokenProvider = new TokenProvider({
      url: CHATKIT_TOKEN_PROVIDER_ENDPOINT
    })

    this.chatManager = new ChatManager({
      instanceLocator: CHATKIT_INSTANCE_LOCATOR,
      userId: USER_ID,
      tokenProvider: tokenProvider
    })
  }
}

Chat.shared = new Chat()
export default Chat
