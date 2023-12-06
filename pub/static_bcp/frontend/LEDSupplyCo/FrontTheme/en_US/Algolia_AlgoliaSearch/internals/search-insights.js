!function(e,t){"object"==typeof exports&&"undefined"!=typeof module?t(exports):"function"==typeof define&&define.amd?define(["exports"],t):t((e=e||self).AlgoliaAnalytics={})}(this,function(e){"use strict";var t=function(){try{return Boolean(navigator.cookieEnabled)}catch(e){return!1}},r=function(){try{return Boolean(navigator.sendBeacon)}catch(e){return!1}},n=function(){try{return Boolean(XMLHttpRequest)}catch(e){return!1}},o=function(e){return void 0===e},i=function(e){return"string"==typeof e},s=function(e){return"number"==typeof e},a=function(e){return"function"==typeof e};var c="insights-js (1.7.1)";var u=["de","us"],p=2592e6;var h,f,l,d,w=function(){return"xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g,function(e){var t=16*Math.random()|0;return("x"===e?t:3&t|8).toString(16)})},b="_ALGOLIA",y=function(e,t,r){var n=new Date;n.setTime(n.getTime()+r);var o="expires="+n.toUTCString();document.cookie=e+"="+t+";"+o+";path=/"},v=function(e){for(var t=e+"=",r=document.cookie.split(";"),n=0;n<r.length;n++){for(var o=r[n];" "===o.charAt(0);)o=o.substring(1);if(0===o.indexOf(t))return o.substring(t.length,o.length)}return""};Object.keys||(Object.keys=(h=Object.prototype.hasOwnProperty,f=!{toString:null}.propertyIsEnumerable("toString"),d=(l=["toString","toLocaleString","valueOf","hasOwnProperty","isPrototypeOf","propertyIsEnumerable","constructor"]).length,function(e){if("function"!=typeof e&&("object"!=typeof e||null===e))throw new TypeError("Object.keys called on non-object");var t,r,n=[];for(t in e)h.call(e,t)&&n.push(t);if(f)for(r=0;r<d;r++)h.call(e,l[r])&&n.push(l[r]);return n})),"function"!=typeof Object.assign&&(Object.assign=function(e,t){var r=arguments;if(null==e)throw new TypeError("Cannot convert undefined or null to object");for(var n=Object(e),o=1;o<arguments.length;o++){var i=r[o];if(null!=i)for(var s in i)Object.prototype.hasOwnProperty.call(i,s)&&(n[s]=i[s])}return n});var g=function(e){var r=e.requestFn;this._ua="",this._uaURIEncoded="",this.version="1.7.1",this._hasCredentials=!1,this.sendEvent=function(e){return function(t,r){if(!this._userHasOptedOut){if(!this._hasCredentials)throw new Error("Before calling any methods on the analytics, you first need to call the 'init' function with appId and apiKey parameters");if(""===r.userToken||""===this._userToken)throw new Error("`userToken` cannot be an empty string.");var n=r.userToken||this._userToken;if(o(n))throw new Error("Before calling any methods on the analytics, you first need to call 'setUserToken' function or include 'userToken' in the event payload.");if(!i(r.index))throw new TypeError("expected required parameter `index` to be a string");if(!i(r.eventName))throw new TypeError("expected required parameter `eventName` to be a string");if(!o(r.userToken)&&!i(r.userToken))throw new TypeError("expected optional parameter `userToken` to be a string");var a={eventType:t,eventName:r.eventName,userToken:n,index:r.index};if(!o(r.timestamp)){if(!s(r.timestamp))throw new TypeError("expected optional parameter `timestamp` to be a number");a.timestamp=r.timestamp}if(!o(r.queryID)){if(!i(r.queryID))throw new TypeError("expected optional parameter `queryID` to be a string");a.queryID=r.queryID}if(!o(r.objectIDs)){if(!Array.isArray(r.objectIDs))throw new TypeError("expected optional parameter `objectIDs` to be an array");a.objectIDs=r.objectIDs}if(!o(r.positions)){if(!Array.isArray(r.positions))throw new TypeError("expected optional parameter `positions` to be an array");if(o(r.objectIDs))throw new Error("cannot use `positions` without providing `objectIDs`");if(r.objectIDs.length!==r.positions.length)throw new Error("objectIDs and positions need to be of the same size");a.positions=r.positions}if(!o(r.filters)){if(!o(r.objectIDs))throw new Error("cannot use `objectIDs` and `filters` for the same event");if(!Array.isArray(r.filters))throw new TypeError("expected optional parameter `filters` to be an array");a.filters=r.filters}if(o(r.objectIDs)&&o(r.filters))throw new Error("expected either `objectIDs` or `filters` to be provided");return function(e,t,r,n,o,i){return e(o+"/1/events?X-Algolia-Application-Id="+t+"&X-Algolia-API-Key="+r+"&X-Algolia-Agent="+n,{events:i})}(e,this._appId,this._apiKey,this._uaURIEncoded,this._endpointOrigin,[a])}}}(r).bind(this),this.init=function(e){var t;if(!e)throw new Error("Init function should be called with an object argument containing your apiKey and appId");if(o(e.apiKey)||!i(e.apiKey))throw new Error("apiKey is missing, please provide it so we can authenticate the application");if(o(e.appId)||!i(e.appId))throw new Error("appId is missing, please provide it, so we can properly attribute data to your application");if(!o(e.region)&&-1===u.indexOf(e.region))throw new Error("optional region is incorrect, please provide either one of: "+u.join(", ")+".");if(!(o(e.cookieDuration)||s(e.cookieDuration)&&isFinite(e.cookieDuration)&&Math.floor(e.cookieDuration)===e.cookieDuration))throw new Error("optional cookieDuration is incorrect, expected an integer.");this._apiKey=e.apiKey,this._appId=e.appId,this._userHasOptedOut=!!e.userHasOptedOut,this._region=e.region,this._endpointOrigin=e.region?"https://insights."+e.region+".algolia.io":"https://insights.algolia.io",this._useCookie=null===(t=e.useCookie)||void 0===t||t,this._cookieDuration=e.cookieDuration?e.cookieDuration:6*p,this._hasCredentials=!0,this._ua=c,this._uaURIEncoded=encodeURIComponent(c),e.userToken?this.setUserToken(e.userToken):!this._userHasOptedOut&&this._useCookie&&this.setAnonymousUserToken()}.bind(this),this.initSearch=function(e){if(!this._hasCredentials)throw new Error("Before calling any methods on the analytics, you first need to call the 'init' function with appId and apiKey parameters");if(!e)throw new Error("initSearch function requires an argument with getQueryID and hitsContainer arguments");if(!e.getQueryID||"function"!=typeof e.getQueryID)throw new Error("getQueryID must be a function that returns the queryID of the last search operation");this.getQueryID=e.getQueryID}.bind(this),this.addAlgoliaAgent=function(e){-1===this._ua.indexOf("; "+e)&&(this._ua+="; "+e,this._uaURIEncoded=encodeURIComponent(this._ua))}.bind(this),this.setUserToken=function(e){this._userToken=e,a(this._onUserTokenChangeCallback)&&this._onUserTokenChangeCallback(this._userToken)}.bind(this),this.setAnonymousUserToken=function(){if(t()){var e=v(b);e&&""!==e&&0===e.indexOf("anonymous-")?this.setUserToken(e):(this.setUserToken("anonymous-"+w()),y(b,this._userToken,this._cookieDuration))}}.bind(this),this.getUserToken=function(e,t){return a(t)&&t(null,this._userToken),this._userToken}.bind(this),this.onUserTokenChange=function(e,t){this._onUserTokenChangeCallback=e,t&&t.immediate&&a(this._onUserTokenChangeCallback)&&this._onUserTokenChangeCallback(this._userToken)}.bind(this),this.clickedObjectIDsAfterSearch=function(e){if(!e)throw new Error("No params were sent to clickedObjectIDsAfterSearch function, please provide `queryID`,  `objectIDs` and `positions` to be reported");if(!e.queryID)throw new Error("required queryID parameter was not sent, click event can not be properly sent without");if(!e.objectIDs)throw new Error("required objectIDs parameter was not sent, click event can not be properly sent without");if(!e.positions)throw new Error("required positions parameter was not sent, click event can not be properly sent without");this.sendEvent("click",e)}.bind(this),this.clickedObjectIDs=function(e){if(!e)throw new Error("No params were sent to clickedObjectIDs function, please provide `objectIDs` to be reported");if(!e.objectIDs)throw new Error("required `objectIDs` parameter was not sent, click event can not be properly sent without");this.sendEvent("click",e)}.bind(this),this.clickedFilters=function(e){if(!e)throw new Error("No params were sent to clickedFilters function, please provide `filters` to be reported");if(!e.filters)throw new Error("required `filters` parameter was not sent, click event can not be properly sent without");this.sendEvent("click",e)}.bind(this),this.convertedObjectIDsAfterSearch=function(e){if(!e)throw new Error("No params were sent to convertedObjectIDsAfterSearch function, please provide `queryID` and `objectIDs` to be reported");if(!e.queryID)throw new Error("required queryID parameter was not sent, conversion event can not be properly sent without");if(!e.objectIDs)throw new Error("required objectIDs parameter was not sent, conversion event can not be properly sent without");this.sendEvent("conversion",e)}.bind(this),this.convertedObjectIDs=function(e){if(!e)throw new Error("No params were sent to convertedObjectIDs function, please provide `objectIDs` to be reported");if(!e.objectIDs)throw new Error("required objectIDs parameter was not sent, conversion event can not be properly sent without");this.sendEvent("conversion",e)}.bind(this),this.convertedFilters=function(e){if(!e)throw new Error("No params were sent to convertedFilters function, please provide `filters` to be reported");if(!e.filters)throw new Error("required filters parameter was not sent, conversion event can not be properly sent without");this.sendEvent("conversion",e)}.bind(this),this.viewedObjectIDs=function(e){if(!e)throw new Error("No params were sent to viewedObjectIDs function, please provide `objectIDs` to be reported");if(!e.objectIDs)throw new Error("required objectIDs parameter was not sent, view event can not be properly sent without");this.sendEvent("view",e)}.bind(this),this.viewedFilters=function(e){if(!e)throw new Error("No params were sent to viewedFilters function, please provide `filters` to be reported");if(!e.filters)throw new Error("required filters parameter was not sent, view event can not be properly sent without");this.sendEvent("view",e)}.bind(this),this._get=function(e,t){t(this[e])}.bind(this)},I=function(e,t){var r=JSON.stringify(t);navigator.sendBeacon(e,r)},m=function(e,t){var r=JSON.stringify(t),n=new XMLHttpRequest;n.open("POST",e),n.send(r)};function k(e){var t,r=e.AlgoliaAnalyticsObject;if(r){var n=(t=this,function(e){for(var r=[],n=arguments.length-1;n-- >0;)r[n]=arguments[n+1];e&&a(t[e])?t[e].apply(t,r):console.warn("The method `"+e+"` doesn't exist.")}),o=e[r];o.queue=o.queue||[];var i=o.queue;i.forEach(function(e){var t=[].slice.call(e),r=t[0],o=t.slice(1);n.apply(void 0,[r].concat(o))}),i.push=function(e){var t=[].slice.call(e),r=t[0],o=t.slice(1);n.apply(void 0,[r].concat(o))}}}function D(e){var t=new g({requestFn:e});return"undefined"!=typeof window&&k.call(t,window),t}var E=D(function(){if(r())return I;if(n())return m;throw new Error("Could not find a supported HTTP request client in this environment.")}());e.createInsightsClient=D,e.default=E,Object.defineProperty(e,"__esModule",{value:!0})});