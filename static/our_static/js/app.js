!function(){"use strict";var e="undefined"==typeof window?global:window;if("function"!=typeof e.require){var t={},n={},s={},r={}.hasOwnProperty,a=/^\.\.?(\/|$)/,c=function(e,t){for(var n,s=[],r=(a.test(t)?e+"/"+t:t).split("/"),c=0,u=r.length;c<u;c++)n=r[c],".."===n?s.pop():"."!==n&&""!==n&&s.push(n);return s.join("/")},u=function(e){return e.split("/").slice(0,-1).join("/")},i=function(t){return function(n){var s=c(u(t),n);return e.require(s,t)}},o=function(e,t){var s=null;s=C&&C.createHot(e);var r={id:e,exports:{},hot:s};return n[e]=r,t(r.exports,i(e),r),r.exports},l=function(e){return s[e]?l(s[e]):e},d=function(e,t){return l(c(u(e),t))},h=function(e,s){null==s&&(s="/");var a=l(e);if(r.call(n,a))return n[a].exports;if(r.call(t,a))return o(a,t[a]);throw new Error("Cannot find module '"+e+"' from '"+s+"'")};h.alias=function(e,t){s[t]=e};var f=/\.[^.\/]+$/,p=/\/index(\.[^\/]+)?$/,m=function(e){if(f.test(e)){var t=e.replace(f,"");r.call(s,t)&&s[t].replace(f,"")!==t+"/index"||(s[t]=e)}if(p.test(e)){var n=e.replace(p,"");r.call(s,n)||(s[n]=e)}};h.register=h.define=function(e,s){if("object"==typeof e)for(var a in e)r.call(e,a)&&h.register(a,e[a]);else t[e]=s,delete n[e],m(e)},h.list=function(){var e=[];for(var n in t)r.call(t,n)&&e.push(n);return e};var C=e._hmr&&new e._hmr(d,h,t,n);h._cache=n,h.hmr=C&&C.wrap,h.brunch=!0,e.require=h}}(),function(){var e;window;require.register("actions.js",function(e,t,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0}),e.initialFetchChats=e.initialFetchUsers=e.initialFetchCurrentUser=e.loadChatMessages=e.createChat=e.updateChatLastMessage=e.addChatMessage=e.selectChat=void 0;var s=t("utils/apiCalls");e.selectChat=function(e){return{type:"SELECT_CHAT",chat:e}},e.addChatMessage=function(e,t){return{type:"ADD_CHAT_MESSAGE",chatId:e,message:t}},e.updateChatLastMessage=function(e,t){return{type:"UPDATE_CHAT_LAST_MESSAGE",chatId:e,message:t}},e.createChat=function(e){return function(t){(0,s.createChat)(e).then(function(e){t({type:"ADD_CHAT",chatId:e})})}},e.loadChatMessages=function(e){return function(t){(0,s.loadChatMessages)(e).then(function(e){t({type:"RECEIVE_CHAT_MESSAGES",chatMessages:e})})}},e.initialFetchCurrentUser=function(){return function(e){(0,s.getCurrentUser)().then(function(t){e({type:"RECEIVE_CURRENT_USER",user:t})})}},e.initialFetchUsers=function(){return function(e){(0,s.getAllUsers)().then(function(t){e({type:"RECEIVE_USERS",users:t})})}},e.initialFetchChats=function(){return function(e){(0,s.getUserChats)().then(function(t){e({type:"RECEIVE_CHATS",chats:t})})}}}),require.register("components/Chat.jsx",function(e,t,n){"use strict";function s(e){return e&&e.__esModule?e:{"default":e}}Object.defineProperty(e,"__esModule",{value:!0});var r=t("react"),a=s(r);e["default"]=a["default"].createClass({displayName:"Chat",propTypes:{chat:a["default"].PropTypes.object.isRequired,selectedChat:a["default"].PropTypes.object.isRequired,onSelect:a["default"].PropTypes.func.isRequired},handleClick:function(){this.props.onSelect(this.props.chat)},render:function(){var e=this.props,t=e.chat,n=e.selectedChat,s=t.chat_id===n.chat_id?"Chat-selected":"Chat";return a["default"].createElement("div",{className:s,onClick:this.handleClick},t.interlocutor_username,t.last_message)}})}),require.register("components/MessageForm.jsx",function(e,t,n){"use strict";function s(e){return e&&e.__esModule?e:{"default":e}}Object.defineProperty(e,"__esModule",{value:!0});var r=t("react"),a=s(r),c=void 0;e["default"]=a["default"].createClass({displayName:"MessageForm",propTypes:{chat:a["default"].PropTypes.object.isRequired,onMessage:a["default"].PropTypes.func.isRequired},componentWillMount:function(){var e=this.props,t=e.chat,n=e.onMessage;c=new WebSocket("ws://127.0.0.1:8888/tornado_chat/"+t.chat_id+"/"),c.onmessage=function(e){n(t.chat_id,e.data)}},shouldComponentUpdate:function(e){return e.chat.chat_id!==this.props.chat.chat_id},componentWillUpdate:function(e){c.close(),c=new WebSocket("ws://127.0.0.1:8888/tornado_chat/"+e.chat.chat_id+"/"),c.onmessage=function(t){e.onMessage(e.chat.chat_id,t.data)}},handleClick:function(){var e={interlocutorId:this.props.chat.interlocutor_id,message:this.refs.message.value};c.send(JSON.stringify(e)),this.refs.message.value=""},render:function(){return a["default"].createElement("div",{className:"MessageForm"},a["default"].createElement("textarea",{ref:"message",type:"text",placeholder:"Type your text here"}),a["default"].createElement("button",{onClick:this.handleClick},"Send"))}})}),require.register("components/MessagesBlock.jsx",function(e,t,n){"use strict";function s(e){return e&&e.__esModule?e:{"default":e}}Object.defineProperty(e,"__esModule",{value:!0});var r=t("react"),a=s(r);e["default"]=a["default"].createClass({displayName:"MessagesBlock",propTypes:{chatMessages:a["default"].PropTypes.array},render:function(){var e=this.props.chatMessages;return e?a["default"].createElement("div",{className:"MessagesBlock"},e.map(function(e,t){return a["default"].createElement("div",{className:"Message",key:t},e.text)})):a["default"].createElement("div",{className:"MessagesBlock"},"There is no messages")}})}),require.register("components/User.jsx",function(e,t,n){"use strict";function s(e){return e&&e.__esModule?e:{"default":e}}Object.defineProperty(e,"__esModule",{value:!0});var r=t("react"),a=s(r);e["default"]=a["default"].createClass({displayName:"User",propTypes:{username:a["default"].PropTypes.string.isRequired,onChatCreate:a["default"].PropTypes.func.isRequired},handleClick:function(){this.props.onChatCreate(this.props.username)},render:function(){var e=this.props.username;return a["default"].createElement("div",{className:"User"},a["default"].createElement("div",null,e),a["default"].createElement("button",{onClick:this.handleClick},"Start chat"))}})}),require.register("container/App.jsx",function(e,t,n){"use strict";function s(e){return e&&e.__esModule?e:{"default":e}}Object.defineProperty(e,"__esModule",{value:!0});var r=t("react"),a=s(r),c=t("react-redux"),u=t("actions"),i=t("./ChatsList"),o=s(i),l=t("./ChatWindow"),d=s(l),h=t("./UsersList"),f=s(h),p=a["default"].createClass({displayName:"App",shouldComponentUpdate:function(e){return Object.keys(e.currentUser).length},componentWillUpdate:function(e){var t=this.props.onNewChatMessage,n=new WebSocket("ws://127.0.0.1:8888/chat_app/"+e.currentUser.user_id+"/");n.onmessage=function(e){var n=JSON.parse(e.data);t(n.chat_id,n.message)}},render:function(){return a["default"].createElement("div",{className:"Container"},a["default"].createElement(o["default"],{selectedChat:this.props.selectedChat}),a["default"].createElement(d["default"],{selectedChat:this.props.selectedChat}),a["default"].createElement(f["default"],null))}}),m=function(e){return{currentUser:e.currentUser,selectedChat:e.selectedChat,messages:e.messages}},C=function(e){return{onNewChatMessage:function(t,n){e((0,u.updateChatLastMessage)(t,n))}}};e["default"]=(0,c.connect)(m,C)(p)}),require.register("container/ChatWindow.jsx",function(e,t,n){"use strict";function s(e){return e&&e.__esModule?e:{"default":e}}Object.defineProperty(e,"__esModule",{value:!0});var r=t("react"),a=s(r),c=t("react-redux"),u=t("actions"),i=t("components/MessagesBlock"),o=s(i),l=t("components/MessageForm"),d=s(l),h=function(e){var t=e.selectedChat,n=e.messages,s=e.onChatMessage;return Object.keys(t).length?a["default"].createElement("div",{className:"ChatWindow"},a["default"].createElement(o["default"],{chatMessages:n[t.chat_id]}),a["default"].createElement(d["default"],{chat:t,onMessage:s})):a["default"].createElement("div",{className:"ChatWindow-empty"})},f=function(e){return{messages:e.messages}},p=function(e){return{onChatMessage:function(t,n){e((0,u.addChatMessage)(t,n))}}};e["default"]=(0,c.connect)(f,p)(h)}),require.register("container/ChatsList.jsx",function(e,t,n){"use strict";function s(e){return e&&e.__esModule?e:{"default":e}}Object.defineProperty(e,"__esModule",{value:!0});var r=t("react"),a=s(r),c=t("react-redux"),u=t("actions"),i=t("components/Chat"),o=s(i),l=function(e){var t=e.chats,n=e.selectedChat,s=e.onChatSelect;return a["default"].createElement("div",{className:"ChatList"},Object.keys(t).map(function(e){return a["default"].createElement(o["default"],{chat:t[e],selectedChat:n,onSelect:s,key:e})}))},d=function(e){return{chats:e.chats}},h=function(e){return{onChatSelect:function(t){e((0,u.selectChat)(t)),e((0,u.loadChatMessages)(t.chat_id))}}};e["default"]=(0,c.connect)(d,h)(l)}),require.register("container/UsersList.jsx",function(e,t,n){"use strict";function s(e){return e&&e.__esModule?e:{"default":e}}Object.defineProperty(e,"__esModule",{value:!0});var r=t("react"),a=s(r),c=t("react-redux"),u=t("actions"),i=t("components/User"),o=s(i),l=function(e){var t=e.users,n=e.onChatCreate;return a["default"].createElement("div",{className:"UsersList"},t.map(function(e){return a["default"].createElement(o["default"],{username:e.username,onChatCreate:n,key:e.username})}))},d=function(e){return{users:e.users}},h=function(e){return{onChatCreate:function(t){e((0,u.createChat)(t))}}};e["default"]=(0,c.connect)(d,h)(l)}),require.register("initialize.js",function(e,t,n){"use strict";function s(e){return e&&e.__esModule?e:{"default":e}}var r=t("react-dom"),a=s(r),c=t("react"),u=s(c),i=t("redux"),o=t("redux-thunk"),l=s(o),d=t("react-redux");t("whatwg-fetch");var h=t("reducer"),f=s(h),p=t("container/App"),m=s(p),C=t("actions");t("es6-promise").polyfill(),t("whatwg-fetch");var g=(0,i.createStore)(f["default"],(0,i.applyMiddleware)(l["default"]));g.dispatch((0,C.initialFetchCurrentUser)()),g.dispatch((0,C.initialFetchUsers)()),g.dispatch((0,C.initialFetchChats)()),document.addEventListener("DOMContentLoaded",function(){var e=document.createElement("div");e.id="app",document.body.appendChild(e),a["default"].render(u["default"].createElement(d.Provider,{store:g},u["default"].createElement(m["default"],null)),e)})}),require.register("reducer.js",function(e,t,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0}),e["default"]=function(){var e=arguments.length<=0||void 0===arguments[0]?s:arguments[0],t=arguments[1],n=void 0,r=void 0;switch(t.type){case"SELECT_CHAT":return Object.assign({},e,{selectedChat:t.chat});case"ADD_CHAT_MESSAGE":var a=Array.from(e.messages[t.chatId]);return a.unshift({text:t.message}),r=Object.assign({},e.messages),r[t.chatId]=a,Object.assign({},e,{messages:r});case"UPDATE_CHAT_LAST_MESSAGE":return n=Object.assign({},e.chats),console.log(t),console.log(t.chatId),console.log(n),n[t.chatId].last_message=t.message,Object.assign({},e,{chats:n});case"ADD_CHAT":return n=Array.from(e.chats),n.push(t.chat_id),Object.assign({},e,{chats:n});case"RECEIVE_CHAT_MESSAGES":return r=Object.assign({},e.messages),r[e.selectedChat.chat_id]=t.chatMessages,Object.assign({},e,{messages:r});case"RECEIVE_CURRENT_USER":return Object.assign({},e,{currentUser:t.user});case"RECEIVE_USERS":return Object.assign({},e,{users:t.users});case"RECEIVE_CHATS":return Object.assign({},e,{chats:t.chats});default:return e}};var s={currentUser:{},users:[{username:"first"},{username:"second"},{username:"third"}],chats:{},selectedChat:{},messages:{2:[{text:"hello"},{text:"hello"},{text:"hello"},{text:"hello"},{text:"hello"},{text:"hello"},{text:"hello"}]}}}),require.register("utils/apiCalls.js",function(e,t,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0});e.createChat=function(e){return new Promise(function(t,n){fetch("http://127.0.0.1:8000/chat/create_chat/?username="+e,{method:"GET",credentials:"same-origin"}).then(function(e){e.json().then(function(e){return t(e.chat_id)})})})},e.getCurrentUser=function(){return new Promise(function(e,t){fetch("http://127.0.0.1:8000/chat/get_current_user",{method:"GET",credentials:"same-origin"}).then(function(t){t.json().then(function(t){return e(t)})})})},e.getAllUsers=function(){return new Promise(function(e,t){fetch("http://127.0.0.1:8000/chat/get_all_users",{method:"GET",credentials:"same-origin"}).then(function(t){t.json().then(function(t){return e(t.users)})})})},e.getUserChats=function(){return new Promise(function(e,t){fetch("http://127.0.0.1:8000/chat/get_user_chats",{method:"GET",credentials:"same-origin"}).then(function(t){t.json().then(function(t){return e(t.chats)})})})},e.loadChatMessages=function(e){return new Promise(function(t,n){fetch("http://127.0.0.1:8000/chat/load_chat_messages/?chat_id="+e,{method:"GET",credentials:"same-origin"}).then(function(e){e.json().then(function(e){return t(e.chat_messages)})})})}}),require.alias("process/browser.js","process"),e=require("process"),require.register("___globals___",function(e,t,n){})}(),require("___globals___");