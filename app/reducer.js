const initialState = {
  currentUser: {},
  users: [{'username': 'first'}, {'username': 'second'}, {'username': 'third'}],
  chats: {},
  selectedChat: '',
  messages: {'2': [{'text': 'hello'}, {'text': 'hello'}, {'text': 'hello'},
   {'text': 'hello'}, {'text': 'hello'}, {'text': 'hello'}, {'text': 'hello'} ]},
  chatMessagesLoadInfo: {}
};

export default function(state = initialState, action) {
  let chats;
  let messages;
  let chatMessages;
  let chatMessagesLoadInfo;
  switch (action.type) {
    case 'SELECT_CHAT':
      return Object.assign({}, state, {selectedChat: action.chatId});
    case 'ADD_NEW_CHAT_MESSAGE':
      messages = Object.assign({}, state.messages);
      if(messages[action.chatId]) {
        chatMessages = Array.from(state.messages[action.chatId]);
        if(chatMessages.length % 50 === 0) {
          chatMessages.pop();
        }
        chatMessages.unshift({'text': action.message.text,
                              'sender__username': action.message.sender_username,
                              'timestamp': action.message.timestamp,
                              'is_read': false});
        messages[action.chatId] = chatMessages;
      }
      chats = Object.assign({}, state.chats);
      chats[action.chatId].last_message = action.message.text;
      chats[action.chatId].last_message_sender_id = action.message.sender_id;
      chats[action.chatId].last_message_timestamp = action.message.timestamp;
      chats[action.chatId].last_message_is_read = false;
      return Object.assign({}, state, { messages }, { chats });
    case 'READ_CHAT_MESSAGE':
      messages = Object.assign({}, state.messages);
      if(messages[action.chatId]) {
        const length = messages[action.chatId].length
        for(let i = 0; i < length; ++i) {
          if(messages[action.chatId][i].is_read) {
            break;
          }
          else {
            messages[action.chatId][i].is_read = true;
          }
        }
      }
      chats = Object.assign({}, state.chats);
      chats[action.chatId].last_message_is_read = true;
      return Object.assign({}, state, { messages }, { chats });
    case 'CHANGE_IS_TYPING_STATE':
      chats = Object.assign({}, state.chats);
      if(chats[action.chatId].is_interlocutor_typing) {
        chats[action.chatId].is_interlocutor_typing = false;
      }
      else {
        chats[action.chatId].is_interlocutor_typing = true;
      }
      return Object.assign({}, state, { chats });
    case 'ADD_NEW_CHAT':
      chats = Object.assign({}, state.chats);
      messages = Object.assign({}, state.messages);
      chatMessagesLoadInfo = Object.assign({}, state.chatMessagesLoadInfo)
      chats[action.chat.chat_id] = action.chat;
      chatMessages = [{'text': action.chat.last_message,
                       'sender__username': state.currentUser.username,
                       'timestamp': action.chat.last_message_timestamp,
                       'is_read': false}];
      messages[action.chat.chat_id] = chatMessages;
      chatMessagesLoadInfo[action.chat.chat_id] = {pageNumber: 1, hasMore: false};
      return Object.assign({}, state, { chats }, { messages }, { chatMessagesLoadInfo });
    case 'INIT_LOAD_CHAT_MESSAGES_INFO':
      chatMessagesLoadInfo = Object.assign({}, state.chatMessagesLoadInfo);
      chatMessagesLoadInfo[action.chatId] = {pageNumber: 1};
      return Object.assign({}, state, { chatMessagesLoadInfo });
    case 'INCREMENT_CHAT_MESSAGE_PAGE_NUMBER':
      chatMessagesLoadInfo = Object.assign({}, state.chatMessagesLoadInfo);
      chatMessagesLoadInfo[action.chatId].pageNumber += 1;
      return Object.assign({}, state, { chatMessagesLoadInfo });
    case 'SET_HAS_MORE_CHAT_MESSAGES_VALUE':
      chatMessagesLoadInfo = Object.assign({}, state.chatMessagesLoadInfo);
      chatMessagesLoadInfo[action.chatId].hasMore = action.hasMore;
      return Object.assign({}, state, { chatMessagesLoadInfo });
    case 'RECEIVE_CHAT_MESSAGES':
      messages = Object.assign({}, state.messages);
      if(messages[action.chatId]) {
        messages[action.chatId] = messages[action.chatId].concat(action.chatMessages);
      }
      else {
        messages[action.chatId] = action.chatMessages;
      }
      return Object.assign({}, state, { messages });
    case 'RECEIVE_CURRENT_USER':
      return Object.assign({}, state, { currentUser: action.user })
    case 'RECEIVE_USERS':
      return Object.assign({}, state, { users: action.users });
    case 'RECEIVE_CHATS':
      return Object.assign({}, state, { chats: action.chats });
    default:
      return state;
  }
}
