!function(){"use strict";var e="undefined"==typeof window?global:window;if("function"!=typeof e.require){var t={},s={},a={},r={}.hasOwnProperty,n=/^\.\.?(\/|$)/,i=function(e,t){for(var s,a=[],r=(n.test(t)?e+"/"+t:t).split("/"),i=0,c=r.length;i<c;i++)s=r[i],".."===s?a.pop():"."!==s&&""!==s&&a.push(s);return a.join("/")},c=function(e){return e.split("/").slice(0,-1).join("/")},u=function(t){return function(s){var a=i(c(t),s);return e.require(a,t)}},o=function(e,t){var a=null;a=_&&_.createHot(e);var r={id:e,exports:{},hot:a};return s[e]=r,t(r.exports,u(e),r),r.exports},l=function(e){return a[e]?l(a[e]):e},d=function(e,t){return l(i(c(e),t))},h=function(e,a){null==a&&(a="/");var n=l(e);if(r.call(s,n))return s[n].exports;if(r.call(t,n))return o(n,t[n]);throw new Error("Cannot find module '"+e+"' from '"+a+"'")};h.alias=function(e,t){a[t]=e};var f=/\.[^.\/]+$/,m=/\/index(\.[^\/]+)?$/,p=function(e){if(f.test(e)){var t=e.replace(f,"");r.call(a,t)&&a[t].replace(f,"")!==t+"/index"||(a[t]=e)}if(m.test(e)){var s=e.replace(m,"");r.call(a,s)||(a[s]=e)}};h.register=h.define=function(e,a){if("object"==typeof e)for(var n in e)r.call(e,n)&&h.register(n,e[n]);else t[e]=a,delete s[e],p(e)},h.list=function(){var e=[];for(var s in t)r.call(t,s)&&e.push(s);return e};var _=e._hmr&&new e._hmr(d,h,t,s);h._cache=s,h.hmr=_&&_.wrap,h.brunch=!0,e.require=h}}(),function(){var e;window;require.register("actions.js",function(e,t,s){"use strict";Object.defineProperty(e,"__esModule",{value:!0}),e.initialFetchChats=e.initialFetchUsers=e.initialFetchCurrentUser=e.loadChatMessages=e.createChat=e.changeIsTypingState=e.readChatMessage=e.addNewChatMessage=e.selectChat=void 0;var a=t("utils/apiCalls");e.selectChat=function(e){return{type:"SELECT_CHAT",chatId:e}},e.addNewChatMessage=function(e,t){return{type:"ADD_NEW_CHAT_MESSAGE",chatId:e,message:t}},e.readChatMessage=function(e){return{type:"READ_CHAT_MESSAGE",chatId:e}},e.changeIsTypingState=function(e){return{type:"CHANGE_IS_TYPING_STATE",chatId:e}},e.createChat=function(e){return function(t){(0,a.createChat)(e).then(function(e){t({type:"ADD_CHAT",chatId:e})})}},e.loadChatMessages=function(e){return function(t){(0,a.loadChatMessages)(e).then(function(s){t({type:"RECEIVE_CHAT_MESSAGES",chatId:e,chatMessages:s})})}},e.initialFetchCurrentUser=function(){return function(e){(0,a.getCurrentUser)().then(function(t){e({type:"RECEIVE_CURRENT_USER",user:t})})}},e.initialFetchUsers=function(){return function(e){(0,a.getAllUsers)().then(function(t){e({type:"RECEIVE_USERS",users:t})})}},e.initialFetchChats=function(){return function(e){(0,a.getUserChats)().then(function(t){e({type:"RECEIVE_CHATS",chats:t})})}}}),require.register("components/Chat.jsx",function(e,t,s){"use strict";function a(e){return e&&e.__esModule?e:{"default":e}}Object.defineProperty(e,"__esModule",{value:!0});var r=t("react"),n=a(r),i=t("dateformat"),c=a(i);e["default"]=n["default"].createClass({displayName:"Chat",propTypes:{chat:n["default"].PropTypes.object.isRequired,selectedChat:n["default"].PropTypes.string.isRequired,onSelect:n["default"].PropTypes.func.isRequired},handleClick:function(){this.props.onSelect(this.props.chat.chat_id)},render:function(){var e=this.props,t=e.chat,s=e.selectedChat,a=t.chat_id===s?"Chat-selected":"Chat",r=t.last_message_is_read?"LastMessage":"LastMessage-unread",i=new Date(t.last_message_timestamp),u=new Date,o=void 0;return o=u.getYear()!==i.getYear()?(0,c["default"])(i,"mmm d yyyy"):u.getDate()===i.getDate()?(0,c["default"])(i,"h:MM TT"):u.getDate()-1===i.getDate()?"yesterday":(0,c["default"])(i,"mmm d"),n["default"].createElement("div",{className:a,onClick:this.handleClick},n["default"].createElement("div",{className:"ChatInfo"},n["default"].createElement("span",null,t.interlocutor_username),n["default"].createElement("div",{className:"Timestamp"},o)),n["default"].createElement("div",{className:r},t.is_interlocutor_typing?Typing:t.last_message))}})}),require.register("components/MessageForm.jsx",function(e,t,s){"use strict";function a(e){return e&&e.__esModule?e:{"default":e}}Object.defineProperty(e,"__esModule",{value:!0});var r=t("react"),n=a(r),i=t("utils/utils"),c=void 0,u=void 0,o=!1;e["default"]=n["default"].createClass({displayName:"MessageForm",propTypes:{chat:n["default"].PropTypes.object.isRequired,onMessage:n["default"].PropTypes.func.isRequired},componentWillMount:function(){var e=this.props.chat;c=new WebSocket("ws://127.0.0.1:8888/tornado_chat/"+e.chat_id+"/")},componentDidMount:function(){var e=this.props.chat;e.last_message_is_read||e.last_message_sender_id.toString()!==e.interlocutor_id.toString()||!function(){var t={type:"READ_MESSAGE",interlocutorId:e.interlocutor_id};(0,i.waitForSocketConnection)(c,function(){c.send(JSON.stringify(t))})}()},componentWillUpdate:function(e){var t=e.chat;t.chat_id!==this.props.chat.chat_id&&(c.close(),c=new WebSocket("ws://127.0.0.1:8888/tornado_chat/"+e.chat.chat_id+"/"))},componentDidUpdate:function(){var e=this.props.chat;e.last_message_is_read||e.last_message_sender_id.toString()!==e.interlocutor_id.toString()||!function(){var t={type:"READ_MESSAGE",interlocutorId:e.interlocutor_id};(0,i.waitForSocketConnection)(c,function(){c.send(JSON.stringify(t))})}()},componentWillUnmount:function(){var e=this.props.chat;o&&(clearTimeout(u),o=!1,c.send(JSON.stringify({type:"IS_USER_TYPING",interlocutorId:e.interlocutor_id})))},handleKeyPress:function(){var e=this.props.chat;clearTimeout(u);this.refs.message.value;o||(o=!0,c.send(JSON.stringify({type:"IS_USER_TYPING",interlocutorId:e.interlocutor_id}))),u=setTimeout(function(){o=!1,c.send(JSON.stringify({type:"IS_USER_TYPING",interlocutorId:e.interlocutor_id}))},3e3)},handleClick:function(){var e={type:"SEND_MESSAGE",interlocutorId:this.props.chat.interlocutor_id,message:this.refs.message.value};c.send(JSON.stringify(e)),this.refs.message.value=""},render:function(){return n["default"].createElement("div",{className:"MessageForm"},this.props.chat.is_interlocutor_typing?n["default"].createElement("div",null,"Typing"):n["default"].createElement("div",null,"No"),n["default"].createElement("textarea",{ref:"message",type:"text",placeholder:"Type your text here",onKeyPress:this.handleKeyPress}),n["default"].createElement("button",{onClick:this.handleClick},"Send"))}})}),require.register("components/MessagesBlock.jsx",function(e,t,s){"use strict";function a(e){return e&&e.__esModule?e:{"default":e}}Object.defineProperty(e,"__esModule",{value:!0});var r=t("react"),n=a(r),i=t("dateformat"),c=a(i),u=t("utils/utils");e["default"]=n["default"].createClass({displayName:"MessagesBlock",propTypes:{chatMessages:n["default"].PropTypes.array},render:function(){var e=this.props.chatMessages,t=e.length;return n["default"].createElement("div",{className:"MessagesBlock"},e.map(function(s,a){var r=s.is_read?"Message":"Message-unread",i=new Date(s.timestamp),o=a===t-1,l=void 0;return l=0===a?new Date(e[a].timestamp):new Date(e[a-1].timestamp),n["default"].createElement("div",{className:r,key:"message"+a},n["default"].createElement("div",{className:"MessagesBlockDate"},o?(0,c["default"])(i,"mmmm d, yyyy"):""),n["default"].createElement("div",null,s.sender__username,(0,c["default"])(i,"h:MM:ss TT")),n["default"].createElement("div",null,s.text),n["default"].createElement("div",{className:"MessagesBlockDate"},(0,u.compareDatesWithoutTime)(l,i)?(0,c["default"])(l,"mmmm d, yyyy"):""))}))}})}),require.register("components/User.jsx",function(e,t,s){"use strict";function a(e){return e&&e.__esModule?e:{"default":e}}Object.defineProperty(e,"__esModule",{value:!0});var r=t("react"),n=a(r);e["default"]=n["default"].createClass({displayName:"User",propTypes:{username:n["default"].PropTypes.string.isRequired,onChatCreate:n["default"].PropTypes.func.isRequired},handleClick:function(){this.props.onChatCreate(this.props.username)},render:function(){var e=this.props.username;return n["default"].createElement("div",{className:"User"},n["default"].createElement("div",null,e),n["default"].createElement("button",{onClick:this.handleClick},"Start chat"))}})}),require.register("container/App.jsx",function(e,t,s){"use strict";function a(e){return e&&e.__esModule?e:{"default":e}}Object.defineProperty(e,"__esModule",{value:!0});var r=t("react"),n=a(r),i=t("react-redux"),c=t("actions"),u=t("./ChatsList"),o=a(u),l=t("./ChatWindow"),d=a(l),h=t("./UsersList"),f=a(h),m=n["default"].createClass({displayName:"App",componentWillUpdate:function(e){var t=this;e.currentUser!==this.props.currentUser&&!function(){var s=t.props,a=s.onNewChatMessage,r=s.onMessageRead,n=s.onInterlocutorTyping,i=new WebSocket("ws://127.0.0.1:8888/chat_app/"+e.currentUser.user_id+"/");i.onmessage=function(e){var t=JSON.parse(e.data);"SEND_MESSAGE"===t.type?a(t.chat_id,t.message):"READ_MESSAGE"===t.type?r(t.chat_id):"IS_USER_TYPING"===t.type&&n(t.chat_id)}}()},render:function(){return n["default"].createElement("div",{className:"Container"},n["default"].createElement(o["default"],{selectedChat:this.props.selectedChat}),n["default"].createElement(d["default"],{chats:this.props.chats,selectedChat:this.props.selectedChat,messages:this.props.messages}),n["default"].createElement(f["default"],null))}}),p=function(e){return{currentUser:e.currentUser,chats:e.chats,selectedChat:e.selectedChat,messages:e.messages}},_=function(e){return{onNewChatMessage:function(t,s){e((0,c.addNewChatMessage)(t,s))},onMessageRead:function(t){e((0,c.readChatMessage)(t))},onInterlocutorTyping:function(t){e((0,c.changeIsTypingState)(t))}}};e["default"]=(0,i.connect)(p,_)(m)}),require.register("container/ChatWindow.jsx",function(e,t,s){"use strict";function a(e){return e&&e.__esModule?e:{"default":e}}Object.defineProperty(e,"__esModule",{value:!0});var r=t("react"),n=a(r),i=(t("react-redux"),t("components/MessagesBlock")),c=a(i),u=t("components/MessageForm"),o=a(u),l=function(e){var t=e.chats,s=e.selectedChat,a=e.messages;return s&&a[s]?n["default"].createElement("div",{className:"ChatWindow"},n["default"].createElement(c["default"],{chatMessages:a[s]}),n["default"].createElement(o["default"],{chat:t[s]})):n["default"].createElement("div",{className:"ChatWindow-empty"})};e["default"]=l}),require.register("container/ChatsList.jsx",function(e,t,s){"use strict";function a(e){return e&&e.__esModule?e:{"default":e}}Object.defineProperty(e,"__esModule",{value:!0});var r=t("react"),n=a(r),i=t("react-redux"),c=t("actions"),u=t("components/Chat"),o=a(u),l=function(e){var t=e.chats,s=e.selectedChat,a=e.onChatSelect;return n["default"].createElement("div",{className:"ChatList"},Object.keys(t).sort(function(e,s){return t[e].last_message_timestamp>t[s].last_message_timestamp?-1:t[e].last_message_timestamp<t[s].last_message_timestamp?1:0}).map(function(e){return n["default"].createElement(o["default"],{chat:t[e],selectedChat:s,onSelect:a,key:e})}))},d=function(e){return{chats:e.chats}},h=function(e){return{onChatSelect:function(t){e((0,c.loadChatMessages)(t)),e((0,c.selectChat)(t))}}};e["default"]=(0,i.connect)(d,h)(l)}),require.register("container/UsersList.jsx",function(e,t,s){"use strict";function a(e){return e&&e.__esModule?e:{"default":e}}Object.defineProperty(e,"__esModule",{value:!0});var r=t("react"),n=a(r),i=t("react-redux"),c=t("actions"),u=t("components/User"),o=a(u),l=function(e){var t=e.users,s=e.onChatCreate;return n["default"].createElement("div",{className:"UsersList"},t.map(function(e){return n["default"].createElement(o["default"],{username:e.username,onChatCreate:s,key:e.username})}))},d=function(e){return{users:e.users}},h=function(e){return{onChatCreate:function(t){e((0,c.createChat)(t))}}};e["default"]=(0,i.connect)(d,h)(l)}),require.register("initialize.js",function(e,t,s){"use strict";function a(e){return e&&e.__esModule?e:{"default":e}}var r=t("react-dom"),n=a(r),i=t("react"),c=a(i),u=t("redux"),o=t("redux-thunk"),l=a(o),d=t("react-redux");t("whatwg-fetch");var h=t("reducer"),f=a(h),m=t("container/App"),p=a(m),_=t("actions");t("es6-promise").polyfill(),t("whatwg-fetch");var g=(0,u.createStore)(f["default"],(0,u.applyMiddleware)(l["default"]));g.dispatch((0,_.initialFetchCurrentUser)()),g.dispatch((0,_.initialFetchUsers)()),g.dispatch((0,_.initialFetchChats)()),document.addEventListener("DOMContentLoaded",function(){var e=document.createElement("div");e.id="app",document.body.appendChild(e),n["default"].render(c["default"].createElement(d.Provider,{store:g},c["default"].createElement(p["default"],null)),e)})}),require.register("reducer.js",function(e,t,s){"use strict";Object.defineProperty(e,"__esModule",{value:!0}),e["default"]=function(){var e=arguments.length<=0||void 0===arguments[0]?a:arguments[0],t=arguments[1],s=void 0,r=void 0;switch(t.type){case"SELECT_CHAT":return Object.assign({},e,{selectedChat:t.chatId});case"ADD_NEW_CHAT_MESSAGE":if(r=Object.assign({},e.messages),r[t.chatId]){var n=Array.from(e.messages[t.chatId]);n.unshift({text:t.message.text,timestamp:t.message.timestamp,is_read:!1}),r[t.chatId]=n}return s=Object.assign({},e.chats),s[t.chatId].last_message=t.message.text,s[t.chatId].last_message_sender_id=t.message.sender_id,s[t.chatId].last_message_timestamp=t.message.timestamp,s[t.chatId].last_message_is_read=!1,Object.assign({},e,{messages:r},{chats:s});case"READ_CHAT_MESSAGE":if(r=Object.assign({},e.messages),r[t.chatId])for(var i=0;i<r[t.chatId].length&&!r[t.chatId][i].is_read;++i)r[t.chatId][i].is_read=!0;return s=Object.assign({},e.chats),s[t.chatId].last_message_is_read=!0,Object.assign({},e,{messages:r},{chats:s});case"CHANGE_IS_TYPING_STATE":return s=Object.assign({},e.chats),s[t.chatId].is_interlocutor_typing?s[t.chatId].is_interlocutor_typing=!1:s[t.chatId].is_interlocutor_typing=!0,Object.assign({},e,{chats:s});case"ADD_CHAT":return s=Array.from(e.chats),s.push(t.chat_id),Object.assign({},e,{chats:s});case"RECEIVE_CHAT_MESSAGES":return r=Object.assign({},e.messages),r[t.chatId]=t.chatMessages,Object.assign({},e,{messages:r});case"RECEIVE_CURRENT_USER":return Object.assign({},e,{currentUser:t.user});case"RECEIVE_USERS":return Object.assign({},e,{users:t.users});case"RECEIVE_CHATS":return Object.assign({},e,{chats:t.chats});default:return e}};var a={currentUser:{},users:[{username:"first"},{username:"second"},{username:"third"}],chats:{},selectedChat:"",messages:{2:[{text:"hello"},{text:"hello"},{text:"hello"},{text:"hello"},{text:"hello"},{text:"hello"},{text:"hello"}]}}}),require.register("utils/apiCalls.js",function(e,t,s){"use strict";Object.defineProperty(e,"__esModule",{value:!0});e.createChat=function(e){return new Promise(function(t,s){fetch("http://127.0.0.1:8000/chat/create_chat/?username="+e,{method:"GET",credentials:"same-origin"}).then(function(e){e.json().then(function(e){return t(e.chat_id)})})})},e.getCurrentUser=function(){return new Promise(function(e,t){fetch("http://127.0.0.1:8000/chat/get_current_user",{method:"GET",credentials:"same-origin"}).then(function(t){t.json().then(function(t){return e(t)})})})},e.getAllUsers=function(){return new Promise(function(e,t){fetch("http://127.0.0.1:8000/chat/get_all_users",{method:"GET",credentials:"same-origin"}).then(function(t){t.json().then(function(t){return e(t.users)})})})},e.getUserChats=function(){return new Promise(function(e,t){fetch("http://127.0.0.1:8000/chat/get_user_chats",{method:"GET",credentials:"same-origin"}).then(function(t){t.json().then(function(t){return e(t.chats)})})})},e.loadChatMessages=function(e){return new Promise(function(t,s){fetch("http://127.0.0.1:8000/chat/load_chat_messages/?chat_id="+e,{method:"GET",credentials:"same-origin"}).then(function(e){e.json().then(function(e){return t(e.chat_messages)})})})}}),require.register("utils/utils.js",function(e,t,s){"use strict";Object.defineProperty(e,"__esModule",{value:!0});e.waitForSocketConnection=function a(e,t){setTimeout(function(){return 1===e.readyState?void(void 0!==t&&t()):void a(e,t)},5)},e.compareDatesWithoutTime=function(e,t){return e.setHours(0,0,0,0,0),t.setHours(0,0,0,0,0),e>t}}),require.alias("process/browser.js","process"),e=require("process"),require.register("___globals___",function(e,t,s){})}(),require("___globals___");