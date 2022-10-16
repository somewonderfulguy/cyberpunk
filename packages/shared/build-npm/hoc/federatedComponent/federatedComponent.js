"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.federatedComponent = void 0;

var _react = _interopRequireWildcard(require("react"));

var _reactErrorBoundary = require("react-error-boundary");

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _extends() { _extends = Object.assign ? Object.assign.bind() : function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _iterableToArrayLimit(arr, i) { var _i = arr == null ? null : typeof Symbol !== "undefined" && arr[Symbol.iterator] || arr["@@iterator"]; if (_i == null) return; var _arr = []; var _n = true; var _d = false; var _s, _e; try { for (_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

var errorStyle = {
  display: 'inline-block',
  background: 'rgba(255, 0, 0, 0.226)',
  padding: '5px 15px 20px'
};
var errorButtonStyle = {
  cursor: 'pointer'
};

var DefaultFallbackComponent = function DefaultFallbackComponent(_ref) {
  var error = _ref.error,
      resetErrorBoundary = _ref.resetErrorBoundary;
  return /*#__PURE__*/_react.default.createElement("div", {
    role: "alert",
    style: errorStyle
  }, /*#__PURE__*/_react.default.createElement("p", null, "Federated module failed!"), /*#__PURE__*/_react.default.createElement("pre", null, error.message), /*#__PURE__*/_react.default.createElement("button", {
    onClick: resetErrorBoundary,
    style: errorButtonStyle,
    title: "Reset component"
  }, "Try to reset"));
};

var errorHandler = function errorHandler(error, info) {
  var isNpm = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;

  var logStyle = function logStyle() {
    var size = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 18;
    return "color: white; background: red; font-size: ".concat(size, "px");
  };

  console.log("%c".concat(isNpm ? 'NPM' : 'Federated', " module failed!"), logStyle(24));
  console.dir(error);
  console.dir(info.componentStack);
};

var ResetWrapper = function ResetWrapper(_ref2) {
  var render = _ref2.render;

  var getKey = function getKey() {
    return new Date().getTime();
  };

  var _useState = (0, _react.useState)(function () {
    return getKey();
  }),
      _useState2 = _slicedToArray(_useState, 2),
      key = _useState2[0],
      setKey = _useState2[1];

  var resetComponent = (0, _react.useCallback)(function () {
    return void setKey(getKey());
  }, []);
  return (
    /*#__PURE__*/
    // changing key resets node completely and internal state of all subcomponents
    _react.default.createElement(_react.Fragment, {
      key: key
    }, render(resetComponent))
  );
};

var federatedComponent = function federatedComponent(_ref3) {
  var Component = _ref3.Component,
      delayedElement = _ref3.delayedElement,
      FinalFallback = _ref3.FinalFallback,
      Fallback = _ref3.Fallback;

  var SuspenceWrapper = function SuspenceWrapper(_ref4) {
    var children = _ref4.children;
    return /*#__PURE__*/_react.default.createElement(_react.Suspense, {
      fallback: delayedElement !== null && delayedElement !== void 0 ? delayedElement : /*#__PURE__*/_react.default.createElement("div", {
        "aria-busy": "true"
      })
    }, children);
  };

  return function (props) {
    return /*#__PURE__*/_react.default.createElement(ResetWrapper, {
      render: function render(resetComponent) {
        return /*#__PURE__*/_react.default.createElement(_reactErrorBoundary.ErrorBoundary, {
          fallbackRender: function fallbackRender(errorProps) {
            var renderFallback = function renderFallback(fallbackProps) {
              return FinalFallback ? /*#__PURE__*/_react.default.createElement(FinalFallback, _extends({}, fallbackProps, props)) : /*#__PURE__*/_react.default.createElement(DefaultFallbackComponent, _extends({}, fallbackProps, props, {
                resetErrorBoundary: resetComponent
              }));
            };

            return Fallback ? /*#__PURE__*/_react.default.createElement(_reactErrorBoundary.ErrorBoundary, {
              fallbackRender: function fallbackRender(nestedErrorProps) {
                return renderFallback(nestedErrorProps);
              },
              onError: function onError() {
                for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
                  args[_key] = arguments[_key];
                }

                return errorHandler.apply(void 0, args.concat([true]));
              }
            }, /*#__PURE__*/_react.default.createElement(SuspenceWrapper, null, /*#__PURE__*/_react.default.createElement(Fallback, props))) : renderFallback(errorProps);
          },
          onError: function onError() {
            return errorHandler.apply(void 0, arguments);
          }
        }, /*#__PURE__*/_react.default.createElement(SuspenceWrapper, null, /*#__PURE__*/_react.default.createElement(Component, props)));
      }
    });
  };
};

exports.federatedComponent = federatedComponent;