import e,{useState as r,useCallback as t,Fragment as n,Suspense as o}from"react";import{ErrorBoundary as a}from"react-error-boundary";var i,s={},c={};var l,u,f={};
/**
 * @license React
 * react-jsx-runtime.development.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */function p(){return l||(l=1,"production"!==process.env.NODE_ENV&&function(){var r=e,t=Symbol.for("react.element"),n=Symbol.for("react.portal"),o=Symbol.for("react.fragment"),a=Symbol.for("react.strict_mode"),i=Symbol.for("react.profiler"),s=Symbol.for("react.provider"),c=Symbol.for("react.context"),l=Symbol.for("react.forward_ref"),u=Symbol.for("react.suspense"),p=Symbol.for("react.suspense_list"),d=Symbol.for("react.memo"),y=Symbol.for("react.lazy"),m=Symbol.for("react.offscreen"),v=Symbol.iterator;var g=r.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED;function b(e){for(var r=arguments.length,t=new Array(r>1?r-1:0),n=1;n<r;n++)t[n-1]=arguments[n];h("error",e,t)}function h(e,r,t){var n=g.ReactDebugCurrentFrame.getStackAddendum();""!==n&&(r+="%s",t=t.concat([n]));var o=t.map((function(e){return String(e)}));o.unshift("Warning: "+r),Function.prototype.apply.call(console[e],console,o)}var _;function j(e){return e.displayName||"Context"}function k(e){if(null==e)return null;if("number"==typeof e.tag&&b("Received an unexpected object in getComponentNameFromType(). This is likely a bug in React. Please file an issue."),"function"==typeof e)return e.displayName||e.name||null;if("string"==typeof e)return e;switch(e){case o:return"Fragment";case n:return"Portal";case i:return"Profiler";case a:return"StrictMode";case u:return"Suspense";case p:return"SuspenseList"}if("object"==typeof e)switch(e.$$typeof){case c:return j(e)+".Consumer";case s:return j(e._context)+".Provider";case l:return function(e,r,t){var n=e.displayName;if(n)return n;var o=r.displayName||r.name||"";return""!==o?t+"("+o+")":t}(e,e.render,"ForwardRef");case d:var r=e.displayName||null;return null!==r?r:k(e.type)||"Memo";case y:var t=e,f=t._payload,m=t._init;try{return k(m(f))}catch(e){return null}}return null}_=Symbol.for("react.module.reference");var O,w,S,x,E,R,T,P=Object.assign,C=0;function N(){}N.__reactDisabledLog=!0;var $,F=g.ReactCurrentDispatcher;function D(e,r,t){if(void 0===$)try{throw Error()}catch(e){var n=e.stack.trim().match(/\n( *(at )?)/);$=n&&n[1]||""}return"\n"+$+e}var I,L=!1,W="function"==typeof WeakMap?WeakMap:Map;function B(e,r){if(!e||L)return"";var t,n=I.get(e);if(void 0!==n)return n;L=!0;var o,a=Error.prepareStackTrace;Error.prepareStackTrace=void 0,o=F.current,F.current=null,function(){if(0===C){O=console.log,w=console.info,S=console.warn,x=console.error,E=console.group,R=console.groupCollapsed,T=console.groupEnd;var e={configurable:!0,enumerable:!0,value:N,writable:!0};Object.defineProperties(console,{info:e,log:e,warn:e,error:e,group:e,groupCollapsed:e,groupEnd:e})}C++}();try{if(r){var i=function(){throw Error()};if(Object.defineProperty(i.prototype,"props",{set:function(){throw Error()}}),"object"==typeof Reflect&&Reflect.construct){try{Reflect.construct(i,[])}catch(e){t=e}Reflect.construct(e,[],i)}else{try{i.call()}catch(e){t=e}e.call(i.prototype)}}else{try{throw Error()}catch(e){t=e}e()}}catch(r){if(r&&t&&"string"==typeof r.stack){for(var s=r.stack.split("\n"),c=t.stack.split("\n"),l=s.length-1,u=c.length-1;l>=1&&u>=0&&s[l]!==c[u];)u--;for(;l>=1&&u>=0;l--,u--)if(s[l]!==c[u]){if(1!==l||1!==u)do{if(l--,--u<0||s[l]!==c[u]){var f="\n"+s[l].replace(" at new "," at ");return e.displayName&&f.includes("<anonymous>")&&(f=f.replace("<anonymous>",e.displayName)),"function"==typeof e&&I.set(e,f),f}}while(l>=1&&u>=0);break}}}finally{L=!1,F.current=o,function(){if(0==--C){var e={configurable:!0,enumerable:!0,writable:!0};Object.defineProperties(console,{log:P({},e,{value:O}),info:P({},e,{value:w}),warn:P({},e,{value:S}),error:P({},e,{value:x}),group:P({},e,{value:E}),groupCollapsed:P({},e,{value:R}),groupEnd:P({},e,{value:T})})}C<0&&b("disabledDepth fell below zero. This is a bug in React. Please file an issue.")}(),Error.prepareStackTrace=a}var p=e?e.displayName||e.name:"",d=p?D(p):"";return"function"==typeof e&&I.set(e,d),d}function M(e,r,t){if(null==e)return"";if("function"==typeof e)return B(e,!(!(n=e.prototype)||!n.isReactComponent));var n;if("string"==typeof e)return D(e);switch(e){case u:return D("Suspense");case p:return D("SuspenseList")}if("object"==typeof e)switch(e.$$typeof){case l:return B(e.render,!1);case d:return M(e.type,r,t);case y:var o=e,a=o._payload,i=o._init;try{return M(i(a),r,t)}catch(e){}}return""}I=new W;var U=Object.prototype.hasOwnProperty,A={},z=g.ReactDebugCurrentFrame;function Y(e){if(e){var r=e._owner,t=M(e.type,e._source,r?r.type:null);z.setExtraStackFrame(t)}else z.setExtraStackFrame(null)}var V=Array.isArray;function q(e){return V(e)}function Q(e){return""+e}function Z(e){if(function(e){try{return Q(e),!1}catch(e){return!0}}(e))return b("The provided key is an unsupported type %s. This value must be coerced to a string before before using it here.",function(e){return"function"==typeof Symbol&&Symbol.toStringTag&&e[Symbol.toStringTag]||e.constructor.name||"Object"}(e)),Q(e)}var H,J,X,G=g.ReactCurrentOwner,K={key:!0,ref:!0,__self:!0,__source:!0};X={};function ee(e,r,n,o,a){var i,s={},c=null,l=null;for(i in void 0!==n&&(Z(n),c=""+n),function(e){if(U.call(e,"key")){var r=Object.getOwnPropertyDescriptor(e,"key").get;if(r&&r.isReactWarning)return!1}return void 0!==e.key}(r)&&(Z(r.key),c=""+r.key),function(e){if(U.call(e,"ref")){var r=Object.getOwnPropertyDescriptor(e,"ref").get;if(r&&r.isReactWarning)return!1}return void 0!==e.ref}(r)&&(l=r.ref,function(e,r){if("string"==typeof e.ref&&G.current&&r&&G.current.stateNode!==r){var t=k(G.current.type);X[t]||(b('Component "%s" contains the string ref "%s". Support for string refs will be removed in a future major release. This case cannot be automatically converted to an arrow function. We ask you to manually fix this case by using useRef() or createRef() instead. Learn more about using refs safely here: https://reactjs.org/link/strict-mode-string-ref',k(G.current.type),e.ref),X[t]=!0)}}(r,a)),r)U.call(r,i)&&!K.hasOwnProperty(i)&&(s[i]=r[i]);if(e&&e.defaultProps){var u=e.defaultProps;for(i in u)void 0===s[i]&&(s[i]=u[i])}if(c||l){var f="function"==typeof e?e.displayName||e.name||"Unknown":e;c&&function(e,r){var t=function(){H||(H=!0,b("%s: `key` is not a prop. Trying to access it will result in `undefined` being returned. If you need to access the same value within the child component, you should pass it as a different prop. (https://reactjs.org/link/special-props)",r))};t.isReactWarning=!0,Object.defineProperty(e,"key",{get:t,configurable:!0})}(s,f),l&&function(e,r){var t=function(){J||(J=!0,b("%s: `ref` is not a prop. Trying to access it will result in `undefined` being returned. If you need to access the same value within the child component, you should pass it as a different prop. (https://reactjs.org/link/special-props)",r))};t.isReactWarning=!0,Object.defineProperty(e,"ref",{get:t,configurable:!0})}(s,f)}return function(e,r,n,o,a,i,s){var c={$$typeof:t,type:e,key:r,ref:n,props:s,_owner:i,_store:{}};return Object.defineProperty(c._store,"validated",{configurable:!1,enumerable:!1,writable:!0,value:!1}),Object.defineProperty(c,"_self",{configurable:!1,enumerable:!1,writable:!1,value:o}),Object.defineProperty(c,"_source",{configurable:!1,enumerable:!1,writable:!1,value:a}),Object.freeze&&(Object.freeze(c.props),Object.freeze(c)),c}(e,c,l,a,o,G.current,s)}var re,te=g.ReactCurrentOwner,ne=g.ReactDebugCurrentFrame;function oe(e){if(e){var r=e._owner,t=M(e.type,e._source,r?r.type:null);ne.setExtraStackFrame(t)}else ne.setExtraStackFrame(null)}function ae(e){return"object"==typeof e&&null!==e&&e.$$typeof===t}function ie(){if(te.current){var e=k(te.current.type);if(e)return"\n\nCheck the render method of `"+e+"`."}return""}re=!1;var se={};function ce(e,r){if(e._store&&!e._store.validated&&null==e.key){e._store.validated=!0;var t=function(e){var r=ie();if(!r){var t="string"==typeof e?e:e.displayName||e.name;t&&(r="\n\nCheck the top-level render call using <"+t+">.")}return r}(r);if(!se[t]){se[t]=!0;var n="";e&&e._owner&&e._owner!==te.current&&(n=" It was passed a child from "+k(e._owner.type)+"."),oe(e),b('Each child in a list should have a unique "key" prop.%s%s See https://reactjs.org/link/warning-keys for more information.',t,n),oe(null)}}}function le(e,r){if("object"==typeof e)if(q(e))for(var t=0;t<e.length;t++){var n=e[t];ae(n)&&ce(n,r)}else if(ae(e))e._store&&(e._store.validated=!0);else if(e){var o=function(e){if(null===e||"object"!=typeof e)return null;var r=v&&e[v]||e["@@iterator"];return"function"==typeof r?r:null}(e);if("function"==typeof o&&o!==e.entries)for(var a,i=o.call(e);!(a=i.next()).done;)ae(a.value)&&ce(a.value,r)}}function ue(e){var r,t=e.type;if(null!=t&&"string"!=typeof t){if("function"==typeof t)r=t.propTypes;else{if("object"!=typeof t||t.$$typeof!==l&&t.$$typeof!==d)return;r=t.propTypes}if(r){var n=k(t);!function(e,r,t,n,o){var a=Function.call.bind(U);for(var i in e)if(a(e,i)){var s=void 0;try{if("function"!=typeof e[i]){var c=Error((n||"React class")+": "+t+" type `"+i+"` is invalid; it must be a function, usually from the `prop-types` package, but received `"+typeof e[i]+"`.This often happens because of typos such as `PropTypes.function` instead of `PropTypes.func`.");throw c.name="Invariant Violation",c}s=e[i](r,i,n,t,null,"SECRET_DO_NOT_PASS_THIS_OR_YOU_WILL_BE_FIRED")}catch(e){s=e}!s||s instanceof Error||(Y(o),b("%s: type specification of %s `%s` is invalid; the type checker function must return `null` or an `Error` but returned a %s. You may have forgotten to pass an argument to the type checker creator (arrayOf, instanceOf, objectOf, oneOf, oneOfType, and shape all require an argument).",n||"React class",t,i,typeof s),Y(null)),s instanceof Error&&!(s.message in A)&&(A[s.message]=!0,Y(o),b("Failed %s type: %s",t,s.message),Y(null))}}(r,e.props,"prop",n,e)}else if(void 0!==t.PropTypes&&!re){re=!0,b("Component %s declared `PropTypes` instead of `propTypes`. Did you misspell the property assignment?",k(t)||"Unknown")}"function"!=typeof t.getDefaultProps||t.getDefaultProps.isReactClassApproved||b("getDefaultProps is only used on classic React.createClass definitions. Use a static property named `defaultProps` instead.")}}function fe(e,r,n,f,v,g){var h=function(e){return"string"==typeof e||"function"==typeof e||e===o||e===i||e===a||e===u||e===p||e===m||"object"==typeof e&&null!==e&&(e.$$typeof===y||e.$$typeof===d||e.$$typeof===s||e.$$typeof===c||e.$$typeof===l||e.$$typeof===_||void 0!==e.getModuleId)}(e);if(!h){var j="";(void 0===e||"object"==typeof e&&null!==e&&0===Object.keys(e).length)&&(j+=" You likely forgot to export your component from the file it's defined in, or you might have mixed up default and named imports.");var O,w=function(e){return void 0!==e?"\n\nCheck your code at "+e.fileName.replace(/^.*[\\\/]/,"")+":"+e.lineNumber+".":""}(v);j+=w||ie(),null===e?O="null":q(e)?O="array":void 0!==e&&e.$$typeof===t?(O="<"+(k(e.type)||"Unknown")+" />",j=" Did you accidentally export a JSX literal instead of a component?"):O=typeof e,b("React.jsx: type is invalid -- expected a string (for built-in components) or a class/function (for composite components) but got: %s.%s",O,j)}var S=ee(e,r,n,v,g);if(null==S)return S;if(h){var x=r.children;if(void 0!==x)if(f)if(q(x)){for(var E=0;E<x.length;E++)le(x[E],e);Object.freeze&&Object.freeze(x)}else b("React.jsx: Static children should always be an array. You are likely explicitly calling React.jsxs or React.jsxDEV. Use the Babel transform instead.");else le(x,e)}return e===o?function(e){for(var r=Object.keys(e.props),t=0;t<r.length;t++){var n=r[t];if("children"!==n&&"key"!==n){oe(e),b("Invalid prop `%s` supplied to `React.Fragment`. React.Fragment can only have `key` and `children` props.",n),oe(null);break}}null!==e.ref&&(oe(e),b("Invalid attribute `ref` supplied to `React.Fragment`."),oe(null))}(S):ue(S),S}var pe=function(e,r,t){return fe(e,r,t,!1)},de=function(e,r,t){return fe(e,r,t,!0)};f.Fragment=o,f.jsx=pe,f.jsxs=de}()),f}u={get exports(){return s},set exports(e){s=e}},"production"===process.env.NODE_ENV?u.exports=function(){if(i)return c;i=1;var r=e,t=Symbol.for("react.element"),n=Symbol.for("react.fragment"),o=Object.prototype.hasOwnProperty,a=r.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED.ReactCurrentOwner,s={key:!0,ref:!0,__self:!0,__source:!0};function l(e,r,n){var i,c={},l=null,u=null;for(i in void 0!==n&&(l=""+n),void 0!==r.key&&(l=""+r.key),void 0!==r.ref&&(u=r.ref),r)o.call(r,i)&&!s.hasOwnProperty(i)&&(c[i]=r[i]);if(e&&e.defaultProps)for(i in r=e.defaultProps)void 0===c[i]&&(c[i]=r[i]);return{$$typeof:t,type:e,key:l,ref:u,props:c,_owner:a.current}}return c.Fragment=n,c.jsx=l,c.jsxs=l,c}():u.exports=p();var d="federated-module_error__-YQZp",y="federated-module_errorButton__-Mreg";!function(e,r){void 0===r&&(r={});var t=r.insertAt;if(e&&"undefined"!=typeof document){var n=document.head||document.getElementsByTagName("head")[0],o=document.createElement("style");o.type="text/css","top"===t&&n.firstChild?n.insertBefore(o,n.firstChild):n.appendChild(o),o.styleSheet?o.styleSheet.cssText=e:o.appendChild(document.createTextNode(e))}}(".federated-module_error__-YQZp{background:rgba(255,0,0,.226);display:inline-block;padding:5px 15px 20px}.federated-module_errorButton__-Mreg{cursor:pointer}");const m=({children:e,error:r,resetErrorBoundary:t})=>s.jsxs("div",Object.assign({role:"alert",className:d},{children:[s.jsx("p",{children:e}),s.jsx("pre",{children:r.message}),s.jsx("button",Object.assign({onClick:t,className:y,title:"Reset component"},{children:"Try to reset"}))]})),v=({render:e})=>{const o=()=>(new Date).getTime(),[a,i]=r((()=>o())),c=t((()=>{i(o())}),[]);return s.jsx(n,{children:e(c)},a)},g=({Component:e,delayedElement:r,Fallback:t})=>{const n=({children:e})=>s.jsx(o,Object.assign({fallback:null!=r?r:s.jsx("div",{"aria-busy":"true"})},{children:e}));return r=>s.jsx(v,{render:o=>s.jsx(a,Object.assign({fallbackRender:e=>{const n=Object.assign(Object.assign(Object.assign({},e),r),{resetErrorBoundary:o});return t?s.jsx(t,Object.assign({},n)):s.jsx(m,Object.assign({},n,{children:"Federated module failed!"}))},onError:(e,r)=>((e,r)=>{console.log(`%c${r.errorMessage}`,"color: white; background: red; font-size: 24px"),console.dir(e),r.componentStack&&console.dir(r.componentStack)})(e,Object.assign(Object.assign({},r),{errorMessage:"Federated module failed!"}))},{children:s.jsx(n,{children:s.jsx(e,Object.assign({},r))})}))})};export{g as federatedComponent};
//# sourceMappingURL=index.js.map