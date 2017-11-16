"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.RestoreMemorandumModal = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _reactstrap = require("reactstrap");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var RestoreMemorandumModal = function (_Component) {
    _inherits(RestoreMemorandumModal, _Component);

    function RestoreMemorandumModal(props) {
        _classCallCheck(this, RestoreMemorandumModal);

        var _this = _possibleConstructorReturn(this, (RestoreMemorandumModal.__proto__ || Object.getPrototypeOf(RestoreMemorandumModal)).call(this, props));

        _this.confirmRestore = _this.confirmRestore.bind(_this);
        return _this;
    }

    _createClass(RestoreMemorandumModal, [{
        key: "confirmRestore",
        value: function confirmRestore() {
            alert("Restored!");
            //TODO: Actual restoration
            this.props.toggle();
        }
    }, {
        key: "render",
        value: function render() {
            return _react2.default.createElement(
                RestoreModal,
                { confirmRestore: this.confirmRestore,
                    isOpen: this.props.isOpen,
                    toggle: this.props.toggle },
                _react2.default.createElement(
                    _reactstrap.ModalHeader,
                    { className: "text-primary" },
                    "Would you like to restore this memorandum?"
                )
            );
        }
    }]);

    return RestoreMemorandumModal;
}(_react.Component);

var RestoreModal = function (_Component2) {
    _inherits(RestoreModal, _Component2);

    function RestoreModal(props) {
        _classCallCheck(this, RestoreModal);

        return _possibleConstructorReturn(this, (RestoreModal.__proto__ || Object.getPrototypeOf(RestoreModal)).call(this, props));
    }

    _createClass(RestoreModal, [{
        key: "render",
        value: function render() {
            return _react2.default.createElement(
                _reactstrap.Modal,
                { isOpen: this.props.isOpen,
                    toggle: this.props.toggle,
                    backdrop: true },
                this.props.children,
                _react2.default.createElement(
                    _reactstrap.ModalFooter,
                    null,
                    _react2.default.createElement(
                        _reactstrap.Button,
                        { outline: true,
                            color: "primary",
                            onClick: this.props.confirmRestore },
                        "Restore"
                    )
                )
            );
        }
    }]);

    return RestoreModal;
}(_react.Component);

exports.RestoreMemorandumModal = RestoreMemorandumModal;
//# sourceMappingURL=modals.js.map