!function(t){var e={};function n(r){if(e[r])return e[r].exports;var o=e[r]={i:r,l:!1,exports:{}};return t[r].call(o.exports,o,o.exports,n),o.l=!0,o.exports}n.m=t,n.c=e,n.d=function(t,e,r){n.o(t,e)||Object.defineProperty(t,e,{enumerable:!0,get:r})},n.r=function(t){"undefined"!==typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0})},n.t=function(t,e){if(1&e&&(t=n(t)),8&e)return t;if(4&e&&"object"===typeof t&&t&&t.__esModule)return t;var r=Object.create(null);if(n.r(r),Object.defineProperty(r,"default",{enumerable:!0,value:t}),2&e&&"string"!=typeof t)for(var o in t)n.d(r,o,function(e){return t[e]}.bind(null,o));return r},n.n=function(t){var e=t&&t.__esModule?function(){return t.default}:function(){return t};return n.d(e,"a",e),e},n.o=function(t,e){return Object.prototype.hasOwnProperty.call(t,e)},n.p="/react-web-audio-graph/",n(n.s=0)}([function(t,e,n){"use strict";function r(t,e){for(var n=0;n<e.length;n++){var r=e[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(t,r.key,r)}}function o(t,e){return(o=Object.setPrototypeOf||function(t,e){return t.__proto__=e,t})(t,e)}function u(t){return(u=Object.setPrototypeOf?Object.getPrototypeOf:function(t){return t.__proto__||Object.getPrototypeOf(t)})(t)}function i(){if("undefined"===typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if("function"===typeof Proxy)return!0;try{return Date.prototype.toString.call(Reflect.construct(Date,[],(function(){}))),!0}catch(t){return!1}}function c(t){return(c="function"===typeof Symbol&&"symbol"===typeof Symbol.iterator?function(t){return typeof t}:function(t){return t&&"function"===typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t})(t)}function f(t,e){return!e||"object"!==c(e)&&"function"!==typeof e?function(t){if(void 0===t)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return t}(t):e}function l(t,e,n){return(l=i()?Reflect.construct:function(t,e,n){var r=[null];r.push.apply(r,e);var u=new(Function.bind.apply(t,r));return n&&o(u,n.prototype),u}).apply(null,arguments)}function a(t){var e="function"===typeof Map?new Map:void 0;return(a=function(t){if(null===t||(n=t,-1===Function.toString.call(n).indexOf("[native code]")))return t;var n;if("function"!==typeof t)throw new TypeError("Super expression must either be null or a function");if("undefined"!==typeof e){if(e.has(t))return e.get(t);e.set(t,r)}function r(){return l(t,arguments,u(this).constructor)}return r.prototype=Object.create(t.prototype,{constructor:{value:r,enumerable:!1,writable:!0,configurable:!0}}),o(r,t)})(t)}n.r(e);var p=function(t){!function(t,e){if("function"!==typeof e&&null!==e)throw new TypeError("Super expression must either be null or a function");t.prototype=Object.create(e&&e.prototype,{constructor:{value:t,writable:!0,configurable:!0}}),e&&o(t,e)}(a,t);var e,n,c,l=function(t){var e=i();return function(){var n,r=u(t);if(e){var o=u(this).constructor;n=Reflect.construct(r,arguments,o)}else n=r.apply(this,arguments);return f(this,n)}}(a);function a(t){var e,n,r,o,u;!function(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}(this,a),(u=l.call(this,t)).transform=void 0;var i=null!==(e=null===t||void 0===t?void 0:t.processorOptions.inputMax)&&void 0!==e?e:1,c=null!==(n=null===t||void 0===t?void 0:t.processorOptions.inputMin)&&void 0!==n?n:-1,f=null!==(r=null===t||void 0===t?void 0:t.processorOptions.outputMax)&&void 0!==r?r:1,p=null!==(o=null===t||void 0===t?void 0:t.processorOptions.outputMin)&&void 0!==o?o:0;return u.transform=s.bind(void 0,c,i,p,f),u}return e=a,(n=[{key:"process",value:function(t,e){for(var n=t[0],r=e[0],o=0;o<r.length;++o)for(var u=r[o].length,i=0;i<u;i++){var c,f;r[o][i]=this.transform(null!==(c=null===n||void 0===n||null===(f=n[o])||void 0===f?void 0:f[i])&&void 0!==c?c:0)}return!0}}])&&r(e.prototype,n),c&&r(e,c),a}(a(AudioWorkletProcessor));function s(t,e,n,r,o){return n+(o-t)*(r-n)/(e-t)}registerProcessor("transformer-processor",p)}]);
//# sourceMappingURL=d5dbf86340fca9aa51a1.worklet.js.map