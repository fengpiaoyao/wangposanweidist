"undefined"==typeof self&&(self={}),self.onmessage=function(s){"use strict";var e=s.data.array,s=self.webkitPostMessage||self.postMessage;try{s({array:e},[e.buffer])}catch(e){s({})}};