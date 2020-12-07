(this["webpackJsonpreact-web-audio-graph"]=this["webpackJsonpreact-web-audio-graph"]||[]).push([[0],{25:function(e,t,n){},29:function(e,t,n){"use strict";n.r(t);var c=n(1),r=n(0),a=n.n(r),i=n(7),o=n.n(i),u=(n(25),n(3)),s=n(2),l=Object(r.createContext)(null);var d=function(e){var t=e.children,n=Object(r.useMemo)((function(){try{return window.AudioContext||(window.AudioContext=window.webkitAudioContext),new window.AudioContext}catch(e){}}),[]),a=Object(r.useCallback)((function(){"suspended"===(null===n||void 0===n?void 0:n.state)&&n.resume()}),[n]);return n?Object(c.jsx)("div",{onClick:a,children:Object(c.jsx)(l.Provider,{value:n,children:t})}):Object(c.jsx)("div",{children:"Sorry, but the Web Audio API is not supported by your browser."})},j=n(4),f=n(15),m=n(5),b=n.n(m),h=n(12),v=n(34),p=n(35),O=n(10);function x(e){var t,n;null===(t=(n=e).stop)||void 0===t||t.call(n),e.disconnect()}var g=function(e){var t=e.children,n=Object(r.useRef)({}),a=Object(r.useMemo)((function(){return{addNode:function(e,t){n.current[e]=t},getNode:function(e){return n.current[e]},nodes:n.current,removeNode:function(e){x(n.current[e]),delete n.current[e]},removeNodes:function(){Object.keys(n.current).map((function(e){return n.current[e]})).forEach((function(e){return x(e)})),n.current={}}}}),[]);return Object(c.jsx)("div",{children:Object(c.jsx)(k.Provider,{value:a,children:t})})};function y(e){var t,n;return+(null!==(t=null===(n=e.match(/-(\d+)$/))||void 0===n?void 0:n[1])&&void 0!==t?t:0)}function N(e,t){if(!e.source||!e.target||!e.sourceHandle||!e.targetHandle)throw new Error("Invalid connection");var n=e.targetHandle.startsWith("input"),c=t(e.source),r=t(e.target);return{inputIndex:n?y(e.targetHandle):void 0,outputIndex:y(e.sourceHandle),source:c,target:n?r:r[e.targetHandle]}}function C(e,t){var n=N(e,t),c=n.inputIndex,r=n.outputIndex,a=n.source,i=n.target;try{null!=c?a.connect(i,r,c):a.connect(i,r)}catch(o){console.error(o)}}function w(){var e=_().getNode;return Object(r.useCallback)((function(t){return function(e,t){var n=N(e,t),c=n.inputIndex,r=n.outputIndex,a=n.source,i=n.target;try{null!=c?a.disconnect(i,r,c):a.disconnect(i,r)}catch(o){console.error(o)}}(t,e)}),[e])}var k=Object(r.createContext)(null);function _(){return Object(r.useContext)(k)}function E(e,t){var n=_(),c=n.addNode,a=n.getNode,i=n.removeNode,o=Object(s.k)((function(e){return e.edges}));Object(r.useEffect)((function(){return c(e,t),o.filter((function(t){return t.source===e||t.target===e})).forEach((function(e){return C(e,a)})),function(){i(e)}}),[c,a,t,e,i])}var S=n(16);function A(e){var t=e.node,n=e.paused,a=e.type,i=Object(S.a)(e,["node","paused","type"]),o=Object(r.useRef)(new Uint8Array(t.frequencyBinCount)),u=Object(r.useRef)(null),s=Object(r.useCallback)((function(){var e=u.current,t=null===e||void 0===e?void 0:e.getContext("2d");e&&t&&(a===F.TimeDomain?function(e,t){var n=0,c=e.canvas.height,r=e.canvas.width,a=t.length,i=r/a;e.fillStyle="#001400",e.fillRect(0,0,r,256),e.lineWidth=2,e.strokeStyle="#00c800",e.beginPath(),e.moveTo(n,c-t[0]/128*c/2);for(var o=1;o<a;o++){var u=t[o]/128*c/2;e.lineTo(n,c-u),n+=i}e.stroke()}(t,o.current):a===F.Frequency&&function(e,t){var n=0,c=e.canvas.height,r=e.canvas.width,a=t.length,i=r/a;e.fillStyle="#001400",e.fillRect(0,0,r,256),e.fillStyle="#00c800";for(var o=0;o<a;o++){var u=c*(t[o]/255),s=c-u;e.fillRect(n,s,i,u),n+=i}}(t,o.current))}),[a]),l=Object(r.useCallback)((function(){var e=t.frequencyBinCount,n=new Uint8Array(e);a===F.TimeDomain?t.getByteTimeDomainData(n):a===F.Frequency&&t.getByteFrequencyData(n),o.current=n}),[t,a]);return function(e,t){var n=Object(r.useRef)(),c=Object(r.useRef)(),a=null===t||void 0===t?void 0:t.maxFPS,i=Object(r.useCallback)((function(t){if(null!=n.current){var r=t-n.current;(!a||r>1e3/a)&&(e(r),n.current=t)}else e(0),n.current=t;c.current=requestAnimationFrame(i)}),[e]);Object(r.useEffect)((function(){return c.current=requestAnimationFrame(i),function(){null!=c.current&&cancelAnimationFrame(c.current)}}),[i])}(Object(r.useCallback)((function(){n||(l(),s())}),[s,l,n])),Object(c.jsx)("canvas",Object(j.a)({ref:u,style:{display:"block"}},i))}var M=a.a.memo(A);function D(e){var t=e.children,n=e.id,r=e.inputs,a=e.outputs,i=e.title,o=e.type;return Object(c.jsxs)("div",{className:"customNode",title:n,children:[Object(c.jsx)("div",{className:"customNode_header",children:null!==i&&void 0!==i?i:o}),Object(c.jsxs)("div",{className:"customNode_body",children:[r&&Object(c.jsx)("div",{className:"customNode_inputs",children:r.map((function(e){return Object(c.jsxs)("div",{className:"customNode_item",children:[Object(c.jsx)(s.c,{id:e,position:s.d.Left,type:"target"}),e]},e)}))}),a&&Object(c.jsx)("div",{className:"customNode_outputs",children:a.map((function(e){return Object(c.jsxs)("div",{className:"customNode_item",children:[Object(c.jsx)(s.c,{id:e,position:s.d.Right,type:"source"}),e]},e)}))})]}),t]})}var F,q=a.a.memo(D);function R(e){var t=e.data,n=e.id,a=e.selected,i=e.type,o=t.fftSizeExp,u=void 0===o?11:o,s=t.onChange,d=t.paused,j=void 0!==d&&d,f=t.type,m=void 0===f?F.TimeDomain:f,b=Object(r.useContext)(l),h=Object(r.useMemo)((function(){return b.createAnalyser()}),[b]);return E(n,h),Object(r.useEffect)((function(){h.fftSize=Math.pow(2,u)}),[h,u]),Object(c.jsxs)(q,{id:n,inputs:["input","fftSize"],outputs:["output"],title:"Analyser: ".concat(m),type:i,children:[Object(c.jsx)("div",{className:"customNode_item",children:Object(c.jsx)(M,{type:m,node:h,paused:j,height:64,width:256})}),a&&Object(c.jsxs)("div",{className:"customNode_editor",children:[Object(c.jsxs)("div",{className:"customNode_item",children:[Object(c.jsx)("input",{className:"nodrag",type:"range",max:"11",min:"5",onChange:function(e){return s({fftSizeExp:+e.target.value})},step:1,value:u}),Math.pow(2,u)]}),Object(c.jsxs)("div",{className:"customNode_item",style:{justifyContent:"space-between"},children:[Object(c.jsxs)("select",{onChange:function(e){return s({type:e.target.value})},value:m,children:[Object(c.jsx)("option",{value:F.Frequency,children:F.Frequency}),Object(c.jsx)("option",{value:F.TimeDomain,children:F.TimeDomain})]}),Object(c.jsxs)("label",{style:{alignItems:"center",display:"flex"},children:[Object(c.jsx)("input",{className:"nodrag",type:"checkbox",checked:j,onChange:function(e){return s({paused:!j})}}),"Paused"]})]})]})]})}!function(e){e.Frequency="Frequency",e.TimeDomain="Time Domain"}(F||(F={}));var T=a.a.memo(R);function P(e){var t=e.data,n=e.id,a=e.selected,i=e.type,o=t.detune,u=void 0===o?0:o,s=t.gain,d=void 0===s?0:s,j=t.frequency,f=void 0===j?350:j,m=t.Q,b=void 0===m?1:m,h=t.onChange,v=t.type,p=void 0===v?"lowpass":v,O=Object(r.useContext)(l),x=Object(r.useMemo)((function(){return O.createBiquadFilter()}),[O]);return E(n,x),Object(r.useEffect)((function(){x.detune.value=u}),[x,u]),Object(r.useEffect)((function(){x.frequency.value=f}),[x,f]),Object(r.useEffect)((function(){x.gain.value=d}),[x,d]),Object(r.useEffect)((function(){x.Q.value=b}),[x,b]),Object(r.useEffect)((function(){x.type=p}),[x,p]),Object(c.jsx)(q,{id:n,inputs:["input","detune","frequency","gain","Q"],outputs:["output"],title:"Filter: ".concat(p),type:i,children:a&&Object(c.jsxs)("div",{className:"customNode_editor",children:[Object(c.jsx)("div",{className:"customNode_item",children:Object(c.jsx)("input",{className:"nodrag",min:-100,max:100,onChange:function(e){return h({detune:+e.target.value})},step:1,type:"range",value:u})}),Object(c.jsx)("div",{className:"customNode_item",children:Object(c.jsx)("input",{className:"nodrag",min:0,max:22050,onChange:function(e){return h({frequency:+e.target.value})},type:"number",value:f})}),Object(c.jsx)("div",{className:"customNode_item",children:Object(c.jsx)("input",{className:"nodrag",min:-40,max:40,onChange:function(e){return h({gain:+e.target.value})},step:.1,type:"range",value:d})}),Object(c.jsx)("div",{className:"customNode_item",children:Object(c.jsx)("input",{className:"nodrag",min:1e-4,max:1e3,onChange:function(e){return h({Q:+e.target.value})},type:"number",value:b})}),Object(c.jsx)("div",{className:"customNode_item",children:Object(c.jsxs)("select",{onChange:function(e){return h({type:e.target.value})},value:p,children:[Object(c.jsx)("option",{value:"lowpass",children:"lowpass"}),Object(c.jsx)("option",{value:"highpass",children:"highpass"}),Object(c.jsx)("option",{value:"bandpass",children:"bandpass"}),Object(c.jsx)("option",{value:"lowshelf",children:"lowshelf"}),Object(c.jsx)("option",{value:"highshelf",children:"highshelf"}),Object(c.jsx)("option",{value:"peaking",children:"peaking"}),Object(c.jsx)("option",{value:"notch",children:"notch"}),Object(c.jsx)("option",{value:"allpass",children:"allpass"})]})})]})})}var I=a.a.memo(P),B={2:"Stereo",4:"Quad",6:"5.1"};function z(e){var t=e.data,n=e.id,a=e.selected,i=e.type,o=t.inputs,u=void 0===o?2:o,s=t.onChange,d=Object(r.useContext)(l),j=Object(r.useMemo)((function(){return d.createChannelMerger(u)}),[d,u]);return E(n,j),Object(c.jsx)(q,{id:n,inputs:Array(j.numberOfInputs).fill(0).map((function(e,t){return"input-".concat(t)})),outputs:["output"],type:i,children:a&&Object(c.jsx)("div",{className:"customNode_editor",children:Object(c.jsx)("div",{className:"customNode_item",style:{alignItems:"flex-start",flexDirection:"column"},children:Object.keys(B).map((function(e){return Object(c.jsxs)("label",{children:[Object(c.jsx)("input",{checked:u===+e,className:"nodrag",onChange:function(e){return s({inputs:+e.target.value})},type:"radio",value:+e})," ",B[e]]},e)}))})})})}var G=a.a.memo(z);function H(e){var t=e.data,n=e.id,a=e.selected,i=e.type,o=t.onChange,u=t.outputs,s=void 0===u?2:u,d=Object(r.useContext)(l),j=Object(r.useMemo)((function(){return d.createChannelSplitter(s)}),[d,s]);return E(n,j),Object(c.jsx)(q,{id:n,inputs:["input"],outputs:Array(j.numberOfOutputs).fill(0).map((function(e,t){return"output-".concat(t)})),type:i,children:a&&Object(c.jsx)("div",{className:"customNode_editor",children:Object(c.jsx)("div",{className:"customNode_item",style:{alignItems:"flex-start",flexDirection:"column"},children:Object.keys(B).map((function(e){return Object(c.jsxs)("label",{children:[Object(c.jsx)("input",{checked:s===+e,className:"nodrag",onChange:function(e){return o({outputs:+e.target.value})},type:"radio",value:+e})," ",B[e]]},e)}))})})})}var W=a.a.memo(H);function J(e){var t=e.data,n=e.id,a=e.selected,i=e.type,o=t.offset,u=void 0===o?1:o,s=t.onChange,d=Object(r.useContext)(l),j=Object(r.useMemo)((function(){return d.createConstantSource()}),[d]);return Object(r.useEffect)((function(){return j.start(),function(){return j.stop()}}),[j]),E(n,j),Object(r.useEffect)((function(){return j.offset.value=u}),[j,u]),Object(c.jsx)(q,{id:n,outputs:["output"],title:"Constant: ".concat(u),type:i,children:a&&Object(c.jsx)("div",{className:"customNode_editor",children:Object(c.jsx)("div",{className:"customNode_item",children:Object(c.jsx)("input",{className:"nodrag",type:"number",onChange:function(e){return s({offset:+e.target.value})},style:{width:"100%"},value:u})})})})}var L=a.a.memo(J);function Q(e){return Math.max(.001,Math.min(179.999,e))}function X(e){var t=e.data,n=e.id,a=e.selected,i=e.type,o=t.delayTime,u=void 0===o?1:o,s=t.maxDelayTime,d=void 0===s?1:s,j=t.onChange,f=Object(r.useContext)(l),m=Object(r.useMemo)((function(){return f.createDelay(Q(d))}),[f,d]);return E(n,m),Object(r.useEffect)((function(){m.delayTime.value=u}),[m,u]),Object(c.jsx)(q,{id:n,inputs:["input","delayTime"],outputs:["output"],title:"Delay: ".concat(u," s"),type:i,children:a&&Object(c.jsxs)("div",{className:"customNode_editor",children:[Object(c.jsx)("div",{className:"customNode_item",children:Object(c.jsx)("input",{className:"nodrag",max:m.delayTime.maxValue,min:m.delayTime.minValue,step:.1,onChange:function(e){return j({delayTime:+e.target.value})},type:"range",value:u})}),Object(c.jsx)("div",{className:"customNode_item",children:Object(c.jsx)("input",{className:"nodrag",onChange:function(e){return j({maxDelayTime:+e.target.value})},max:0,min:180,type:"number",value:Q(d)})})]})})}var U=a.a.memo(X);function V(e){var t=e.id,n=e.type;return E(t,Object(r.useContext)(l).destination),Object(c.jsx)(q,{id:t,inputs:["input"],type:n})}var Y=a.a.memo(V);function Z(e){var t=e.data,n=e.id,a=e.selected,i=e.type,o=t.attack,u=void 0===o?.003:o,s=t.knee,d=void 0===s?30:s,j=t.onChange,f=t.ratio,m=void 0===f?12:f,b=t.release,h=void 0===b?.25:b,v=t.threshold,p=void 0===v?-24:v,O=Object(r.useContext)(l),x=Object(r.useMemo)((function(){return O.createDynamicsCompressor()}),[O]);return E(n,x),Object(r.useEffect)((function(){x.threshold.value=p}),[x,p]),Object(r.useEffect)((function(){x.knee.value=d}),[x,d]),Object(r.useEffect)((function(){x.ratio.value=m}),[x,m]),Object(r.useEffect)((function(){x.attack.value=u}),[x,u]),Object(r.useEffect)((function(){x.release.value=h}),[x,h]),Object(c.jsx)(q,{id:n,inputs:["input","threshold","knee","ratio","attack","release"],outputs:["output"],type:i,children:a&&Object(c.jsxs)("div",{className:"customNode_editor",children:[Object(c.jsx)("div",{className:"customNode_item",children:Object(c.jsx)("input",{className:"nodrag",type:"range",max:"0",min:"-100",step:"1",onChange:function(e){return j({threshold:+e.target.value})},value:p})}),Object(c.jsx)("div",{className:"customNode_item",children:Object(c.jsx)("input",{className:"nodrag",type:"range",max:"40",min:"0",step:"1",onChange:function(e){return j({knee:+e.target.value})},value:d})}),Object(c.jsx)("div",{className:"customNode_item",children:Object(c.jsx)("input",{className:"nodrag",type:"range",max:"20",min:"1",step:"1",onChange:function(e){return j({ratio:+e.target.value})},value:m})}),Object(c.jsx)("div",{className:"customNode_item",children:Object(c.jsx)("input",{className:"nodrag",type:"range",max:"1",min:"0",step:"0.001",onChange:function(e){return j({attack:+e.target.value})},value:u})}),Object(c.jsx)("div",{className:"customNode_item",children:Object(c.jsx)("input",{className:"nodrag",type:"range",max:"1",min:"0",step:"0.001",onChange:function(e){return j({release:+e.target.value})},value:h})})]})})}var $=a.a.memo(Z);function K(e){var t=e.data,n=e.id,a=e.selected,i=e.type,o=t.gain,u=void 0===o?1:o,s=t.onChange,d=Object(r.useContext)(l),j=Object(r.useMemo)((function(){return d.createGain()}),[d]);return E(n,j),Object(r.useEffect)((function(){j.gain.value=u}),[j,u]),Object(c.jsx)(q,{id:n,inputs:["input","gain"],outputs:["output"],title:"Gain: ".concat(u),type:i,children:a&&Object(c.jsx)("div",{className:"customNode_editor",children:Object(c.jsx)("div",{className:"customNode_item",children:Object(c.jsx)("input",{className:"nodrag",type:"range",max:"1",min:"-1",step:"0.01",onChange:function(e){return s({gain:+e.target.value})},value:u})})})})}var ee=a.a.memo(K);function te(e){for(var t=e.length,n=e.getChannelData(0),c=0;c<t;c++)n[c]=2*Math.random()-1;return e}function ne(e){for(var t=e.length,n=e.getChannelData(0),c=0,r=0,a=0,i=0,o=0,u=0,s=0,l=0;l<t;l++){var d=2*Math.random()-1;c=.99886*c+.0555179*d,r=.99332*r+.0750759*d,a=.969*a+.153852*d,i=.8665*i+.3104856*d,o=.55*o+.5329522*d,u=-.7616*u-.016898*d,n[l]=c+r+a+i+o+u+s+.5362*d,n[l]*=.11,s=.115926*d}return e}function ce(e){for(var t=e.length,n=e.getChannelData(0),c=0,r=0;r<t;r++){var a=2*Math.random()-1;n[r]=(c+.02*a)/1.02,c=n[r],n[r]*=3.5}return e}function re(e){var t=e.data,n=e.id,a=e.selected,i=e.type,o=t.onChange,u=t.type,s=void 0===u?"white":u,d=Object(r.useContext)(l),j=Object(r.useMemo)((function(){var e=5*d.sampleRate,t=(0,{brown:ce,pink:ne,white:te}[s])(d.createBuffer(1,e,d.sampleRate));console.log(t.getChannelData(0));var n=d.createBufferSource();return n.buffer=t,n.loop=!0,n}),[d,s]);return Object(r.useEffect)((function(){return j.start(),function(){return j.stop()}}),[j]),E(n,j),Object(c.jsx)(q,{id:n,inputs:["input"],outputs:["output"],title:"Noise: ".concat(s),type:i,children:a&&Object(c.jsx)("div",{className:"customNode_editor",children:Object(c.jsx)("div",{className:"customNode_item",children:Object(c.jsxs)("select",{onChange:function(e){return o({type:e.target.value})},value:s,children:[Object(c.jsx)("option",{value:"white",children:"white"}),Object(c.jsx)("option",{value:"pink",children:"pink"}),Object(c.jsx)("option",{value:"brown",children:"brown"})]})})})})}var ae=a.a.memo(re);function ie(e){var t=e.data,n=e.id,a=e.selected,i=e.type,o=t.detune,u=void 0===o?0:o,s=t.frequency,d=void 0===s?440:s,j=t.onChange,f=t.type,m=void 0===f?"sine":f,b=Object(r.useContext)(l),h=Object(r.useMemo)((function(){return b.createOscillator()}),[b]);return Object(r.useEffect)((function(){return h.start(),function(){return h.stop()}}),[h]),E(n,h),Object(r.useEffect)((function(){h.detune.value=null!==u&&void 0!==u?u:0}),[h,u]),Object(r.useEffect)((function(){h.frequency.value=null!==d&&void 0!==d?d:440}),[h,d]),Object(r.useEffect)((function(){h.type=null!==m&&void 0!==m?m:"sine"}),[h,m]),Object(c.jsx)(q,{id:n,inputs:["detune","frequency"],outputs:["output"],title:"".concat(d," Hz ").concat(m),type:i,children:a&&Object(c.jsxs)("div",{className:"customNode_editor",children:[Object(c.jsx)("div",{className:"customNode_item",children:Object(c.jsx)("input",{className:"nodrag",min:-100,max:100,onChange:function(e){return j({detune:+e.target.value})},step:1,type:"number",value:u})}),Object(c.jsx)("div",{className:"customNode_item",children:Object(c.jsx)("input",{className:"nodrag",min:0,max:2e4,onChange:function(e){return j({frequency:+e.target.value})},type:"number",value:d})}),Object(c.jsx)("div",{className:"customNode_item",children:Object(c.jsxs)("select",{onChange:function(e){return j({type:e.target.value})},value:m,children:[Object(c.jsx)("option",{value:"sawtooth",children:"sawtooth"}),Object(c.jsx)("option",{value:"square",children:"square"}),Object(c.jsx)("option",{value:"sine",children:"sine"}),Object(c.jsx)("option",{value:"triangle",children:"triangle"})]})})]})})}var oe=a.a.memo(ie),ue=["C","C\u266f","D","D\u266f","E","F","F\u266f","G","G\u266f","A","A\u266f","B"];function se(e){if(e<0||e>11)throw new RangeError("Octave must be between 0 and 11, is ".concat(e))}function le(e,t){!function(e){if(e<0||e>10)throw new RangeError("Octave must be between 0 and 10, is ".concat(e))}(e),se(t);return 16.3516*Math.pow(2,e+t/12)}function de(e){return se(e),ue[e]}var je={display:"inline-block",textAlign:"center",width:7},fe=Object(j.a)(Object(j.a)({},je),{},{verticalAlign:"sub"}),me=Object(j.a)(Object(j.a)({},je),{},{transform:"translateX(-100%)",verticalAlign:"super"});function be(e){var t=e.octave,n=e.twelfth,r=de(n).split(""),a=Object(u.a)(r,2),i=a[0],o=a[1],s=le(t,n);return Object(c.jsxs)("span",{children:[i,Object(c.jsx)("small",{style:fe,children:t}),o&&Object(c.jsx)("small",{style:me,children:o}),Object(c.jsxs)("small",{children:[" (",s.toFixed(2)," Hz)"]})]})}var he=a.a.memo(be);function ve(e){var t=e.data,n=e.id,a=e.selected,i=e.type,o=t.detune,u=void 0===o?0:o,s=t.octave,d=void 0===s?4:s,j=t.onChange,f=t.twelfth,m=void 0===f?0:f,b=t.type,h=void 0===b?"sine":b,v=le(d,m),p=Object(r.useContext)(l),O=Object(r.useMemo)((function(){return p.createOscillator()}),[p]);return Object(r.useEffect)((function(){return O.start(),function(){return O.stop()}}),[O]),E(n,O),Object(r.useEffect)((function(){O.detune.value=null!==u&&void 0!==u?u:0}),[O,u]),Object(r.useEffect)((function(){O.frequency.value=v}),[O,v]),Object(r.useEffect)((function(){O.type=null!==h&&void 0!==h?h:"sine"}),[O,h]),Object(c.jsx)(q,{id:n,inputs:["detune"],outputs:["output"],title:Object(c.jsx)(he,{octave:d,twelfth:m}),type:i,children:a&&Object(c.jsxs)("div",{className:"customNode_editor",children:[Object(c.jsx)("div",{className:"customNode_item",children:Object(c.jsx)("input",{className:"nodrag",min:-100,max:100,onChange:function(e){return j({detune:+e.target.value})},step:1,style:{width:"100%"},type:"range",value:u})}),Object(c.jsxs)("div",{className:"customNode_item",children:[Object(c.jsx)("select",{onChange:function(e){return j({twelfth:+e.target.value})},style:{width:"50%"},value:m,children:Array(12).fill(0).map((function(e,t){return Object(c.jsx)("option",{value:t,children:de(t)},t)}))}),Object(c.jsx)("select",{onChange:function(e){return j({octave:+e.target.value})},style:{width:"50%"},value:d,children:Array(11).fill(0).map((function(e,t){return Object(c.jsx)("option",{value:t,children:t},t)}))})]}),Object(c.jsx)("div",{className:"customNode_item",children:Object(c.jsxs)("select",{onChange:function(e){return j({type:e.target.value})},style:{width:"100%"},value:h,children:[Object(c.jsx)("option",{value:"sawtooth",children:"sawtooth"}),Object(c.jsx)("option",{value:"square",children:"square"}),Object(c.jsx)("option",{value:"sine",children:"sine"}),Object(c.jsx)("option",{value:"triangle",children:"triangle"})]})})]})})}function pe(e){var t=e.data,n=e.id,a=e.selected,i=e.type,o=t.pan,u=void 0===o?0:o,s=t.onChange,d=Object(r.useContext)(l),j=Object(r.useMemo)((function(){return d.createStereoPanner()}),[d]);return E(n,j),Object(r.useEffect)((function(){j.pan.value=u}),[j,u]),Object(c.jsx)(q,{id:n,inputs:["input","pan"],outputs:["output"],title:"Stereo: ".concat(Math.abs(100*u).toFixed(0),"% ").concat(u>0?"Right":u<0?"Left":""),type:i,children:a&&Object(c.jsx)("div",{className:"customNode_editor",children:Object(c.jsx)("div",{className:"customNode_item",children:Object(c.jsx)("input",{className:"nodrag",type:"range",max:"1",min:"-1",step:"0.01",onChange:function(e){return s({pan:+e.target.value})},value:u})})})})}function Oe(e){var t,n=e.data,a=e.id,i=e.selected,o=e.type,s=n.onChange,d=n.oversample,j=Object(r.useState)(null!==(t=n.curveFn)&&void 0!==t?t:"const k = 50;\nconst samples = curve.length;\nconst deg = Math.PI / 180;\nfor (let i = 0; i < samples; i++) {\n  const x = (i * 2) / samples - 1;\n  curve[i] = ((3 + k) * x * 20 * deg) / (Math.PI + k * Math.abs(x));\n}\nreturn curve;"),f=Object(u.a)(j,2),m=f[0],b=f[1],h=Object(r.useState)(m),v=Object(u.a)(h,2),p=v[0],O=v[1],x=Object(r.useContext)(l),g=Object(r.useMemo)((function(){return x.createWaveShaper()}),[x]);E(a,g);var y=Object(r.useMemo)((function(){var e=new Float32Array(x.sampleRate);return new Function("curve",p)(e)}),[x.sampleRate,p]);Object(r.useEffect)((function(){g.curve=y}),[g,y]),Object(r.useEffect)((function(){g.oversample=d}),[g,d]);var N=Object(r.useCallback)((function(){try{new Function("curve",m)(new Float32Array(x.sampleRate)),O(m),s({curveFn:m})}catch(e){console.error(e)}}),[x.sampleRate,m,s]);return Object(c.jsx)(q,{id:a,inputs:["input"],outputs:["output"],type:o,children:i&&Object(c.jsxs)("div",{className:"customNode_editor",children:[Object(c.jsxs)("div",{className:"customNode_item",style:{flexWrap:"wrap"},children:[Object(c.jsx)("textarea",{className:"nodrag",onChange:function(e){return b(e.target.value)},rows:8,style:{width:"100%"},value:m}),Object(c.jsx)("button",{onClick:N,children:"save"})]}),Object(c.jsx)("div",{className:"customNode_item",children:Object(c.jsxs)("select",{onChange:function(e){return s({oversample:e.target.value})},value:d,children:[Object(c.jsx)("option",{value:"none",children:"none"}),Object(c.jsx)("option",{value:"2x",children:"2x"}),Object(c.jsx)("option",{value:"4x",children:"4x"})]})})]})})}var xe={Analyser:T,BiquadFilter:I,ChannelMerger:G,ChannelSplitter:W,ConstantSource:L,Delay:U,Destination:Y,DynamicsCompressor:$,Gain:ee,Noise:ae,Oscillator:oe,OscillatorNote:a.a.memo(ve),StereoPanner:a.a.memo(pe),WaveShaper:a.a.memo(Oe)};function ge(e,t){return ye.apply(this,arguments)}function ye(){return(ye=Object(h.a)(b.a.mark((function e(t,n){var c;return b.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:c=t.filter(s.h).reduce((function(e,t){return e[t.source]=!0,e[t.target]=!0,e}),{});case 1:if(!Object.keys(c).length){e.next=7;break}return Object.keys(n).forEach((function(e){delete c[e]})),e.next=5,new Promise((function(e){return setTimeout(e,0)}));case 5:e.next=1;break;case 7:case"end":return e.stop()}}),e)})))).apply(this,arguments)}function Ne(e){var t=e.elements,n=e.transform,i=a.a.useState(!1),o=Object(u.a)(i,2),l=o[0],d=o[1],m=a.a.useState(),g=Object(u.a)(m,2),y=g[0],N=g[1],k=a.a.useState(null),E=Object(u.a)(k,2),S=E[0],A=E[1],M=Object(v.a)(S,y,{placement:"bottom-start"}),D=M.styles,F=M.attributes,q=Object(s.k)((function(e){return e.transform})),R=Object(r.useState)(t),T=Object(u.a)(R,2),P=T[0],I=T[1],B=_().nodes,z=function(){var e=_().getNode;return Object(r.useCallback)((function(t){return C(t,e)}),[e])}(),G=w(),H=function(){var e=_().getNode;return Object(r.useCallback)((function(t){return x(e(t))}),[e])}(),W=function(e){return function(t){I(Object(O.a)((function(n){var c=n.filter(s.i).find((function(t){return t.id===e}));c&&Object.keys(t).forEach((function(e){return c.data[e]=t[e]}))})))}},J=function(){var e=Object(h.a)(b.a.mark((function e(c){return b.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return c.setTransform(n),I(Object(O.a)((function(e){e.filter(s.i).forEach((function(e){e.data.onChange=W(e.id)}))}))),e.next=4,ge(t,B);case 4:t.filter(s.h).forEach((function(e){return z(e)}));case 6:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}(),L=Object(r.useCallback)((function(e){e.filter(s.h).forEach((function(e){return G(e)})),e.filter(s.i).forEach((function(e){return H(e.id)})),I((function(t){return Object(s.j)(e,t)}))}),[G,H]),Q=Object(r.useCallback)((function(e){var t="".concat(e,"-").concat(Object(p.a)()),n={id:t,data:{onChange:W(t)},type:e,position:{x:(S.getBoundingClientRect().left-q[0])/q[2],y:(S.getBoundingClientRect().top-q[1])/q[2]}};I((function(e){return[].concat(Object(f.a)(e),[n])})),d(!1)}),[q,S]);return Object(c.jsxs)(c.Fragment,{children:[Object(c.jsxs)(s.g,{defaultPosition:[n.x,n.y],defaultZoom:n.zoom,elements:P,nodeTypes:xe,onConnect:function(e){I((function(t){return Object(s.f)(e,t)})),z(e)},onEdgeUpdate:function(e,t){G(e),I((function(t){return Object(s.j)([e],t)})),I((function(e){return Object(s.f)(t,e)})),z(t)},onElementsRemove:L,onLoad:J,onNodeDragStop:function(e,t){I(Object(O.a)((function(e){var n=e.filter(s.i).find((function(e){return e.id===t.id}));n&&(n.position=t.position)})))},onPaneClick:function(e){d(!!(null===y||void 0===y?void 0:y.contains(e.target)))},onPaneContextMenu:function(e){e.preventDefault(),d(!0),A({getBoundingClientRect:function(){return{top:10*Math.floor(e.clientY/10),left:10*Math.floor(e.clientX/10),height:0,width:0}}})},onlyRenderVisibleElements:!1,snapToGrid:!0,snapGrid:[10,10],style:{zIndex:0},children:[Object(c.jsx)(s.a,{gap:10}),Object(c.jsx)(s.b,{})]}),l&&Object(c.jsx)("div",Object(j.a)(Object(j.a)({ref:function(e){return e&&N(e)},style:D.popper},F.popper),{},{children:Object(c.jsxs)("ul",{className:"contextMenu",children:[Object(c.jsx)("li",{onClick:function(){return Q("Analyser")},children:"Add Analyser"}),Object(c.jsx)("li",{onClick:function(){return Q("BiquadFilter")},children:"Add Biquad Filter"}),Object(c.jsx)("li",{onClick:function(){return Q("ChannelMerger")},children:"Add Channel Merger"}),Object(c.jsx)("li",{onClick:function(){return Q("ChannelSplitter")},children:"Add Channel Splitter"}),Object(c.jsx)("li",{onClick:function(){return Q("ConstantSource")},children:"Add Constant Source"}),Object(c.jsx)("li",{onClick:function(){return Q("Delay")},children:"Add Delay"}),Object(c.jsx)("li",{onClick:function(){return Q("Destination")},children:"Add Destination"}),Object(c.jsx)("li",{onClick:function(){return Q("DynamicsCompressor")},children:"Add Dynamics Compressor"}),Object(c.jsx)("li",{onClick:function(){return Q("Gain")},children:"Add Gain"}),Object(c.jsx)("li",{onClick:function(){return Q("Noise")},children:"Add Noise"}),Object(c.jsx)("li",{onClick:function(){return Q("Oscillator")},children:"Add Oscillator"}),Object(c.jsx)("li",{onClick:function(){return Q("OscillatorNote")},children:"Add Oscillator Note"}),Object(c.jsx)("li",{onClick:function(){return Q("StereoPanner")},children:"Add Stereo Panner"}),Object(c.jsx)("li",{onClick:function(){return Q("WaveShaper")},children:"Add Wave Shaper"})]})}))]})}var Ce=a.a.memo(Ne),we={fontSize:12,height:"100%",resize:"none",width:"100%"},ke={display:"flex",position:"absolute",right:"100%",top:-10,transform:"rotate(-90deg)",transformOrigin:"bottom right"},_e=function(){return{id:Object(p.a)(),elements:[],transform:{x:0,y:0,zoom:1}}};var Ee=function(e){var t=e.setProject,n=_().removeNodes,a=Object(r.useState)(!1),i=Object(u.a)(a,2),o=i[0],l=i[1],d=Object(s.k)((function(e){return e.elements})),f=Object(s.k)((function(e){return e.transform})),m=d.map((function(e){return Object(j.a)(Object(j.a)({},e),{},{__rf:void 0})})),b={x:f[0],y:f[1],zoom:f[2]},h=JSON.stringify({elements:m,transform:b}),v=Object(r.useMemo)((function(){return function(e){return{height:"100%",padding:10,position:"absolute",right:0,top:0,transform:e?"translateX(0)":"translateX(100%)",transition:"transform 0.4s ease",width:400}}(o)}),[o]);Object(r.useEffect)((function(){var e=atob(window.location.hash.substr(1));try{var n=JSON.parse(e),c=n.elements,r=n.transform;t({elements:c,id:Object(p.a)(),transform:r})}catch(a){console.error(a)}}),[t]),Object(r.useEffect)((function(){window.location.hash=btoa(h)}),[h]);var O=Object(r.useCallback)((function(e){try{var n=JSON.parse(e.target.value),c=n.elements,r=n.transform;t({elements:c,id:Object(p.a)(),transform:r})}catch(e){console.error(e)}}),[t]),x=Object(r.useCallback)((function(){n(),t(_e)}),[n,t]),g=Object(r.useCallback)((function(){return l((function(e){return!e}))}),[]);return Object(c.jsxs)("div",{style:v,children:[Object(c.jsx)("textarea",{onChange:O,style:we,value:JSON.stringify({elements:m,transform:b},null,2)}),Object(c.jsxs)("div",{style:ke,children:[Object(c.jsx)("button",{onClick:x,style:{marginRight:10},children:"clear"}),Object(c.jsx)("button",{onClick:g,children:o?"hide":"show"})]})]})};var Se=function(){var e=Object(r.useState)(_e),t=Object(u.a)(e,2),n=t[0],a=t[1];return Object(c.jsx)(d,{children:Object(c.jsx)(s.e,{children:Object(c.jsx)(g,{children:Object(c.jsxs)("div",{style:{alignItems:"stretch",display:"flex",height:"100vh"},children:[Object(c.jsx)(Ce,{elements:n.elements,transform:n.transform},n.id),Object(c.jsx)(Ee,{setProject:a})]})})})})},Ae=function(e){e&&e instanceof Function&&n.e(3).then(n.bind(null,36)).then((function(t){var n=t.getCLS,c=t.getFID,r=t.getFCP,a=t.getLCP,i=t.getTTFB;n(e),c(e),r(e),a(e),i(e)}))};o.a.render(Object(c.jsx)(a.a.StrictMode,{children:Object(c.jsx)(Se,{})}),document.getElementById("root")),Ae()}},[[29,1,2]]]);
//# sourceMappingURL=main.226cfc67.chunk.js.map