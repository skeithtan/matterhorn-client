"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.RestoreInstitutionModal = exports.RestoreStudentModal = exports.RestoreMemorandumModal = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _reactstrap = require("reactstrap");

var _jquery = require("jquery");

var _jquery2 = _interopRequireDefault(_jquery);

var _authorization = require("../../../authorization");

var _authorization2 = _interopRequireDefault(_authorization);

var _dismissable_toast_maker = require("../../../dismissable_toast_maker");

var _settings = require("../../../settings");

var _settings2 = _interopRequireDefault(_settings);

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
            var _this2 = this;

            this.props.toggle();
            var dismissToast = (0, _dismissable_toast_maker.makeInfoToast)({
                title: "Restoring",
                message: "Restoring memorandum..."
            });

            _jquery2.default.ajax({
                url: _settings2.default.serverURL + "/archives/memorandums/" + this.props.memorandum.id + "/restore/",
                method: "PUT",
                beforeSend: _authorization2.default
            }).done(function () {

                dismissToast();
                iziToast.success({
                    title: "Success",
                    message: "Successfully restored memorandum"
                });
                _this2.props.onRestoreSuccess();
            }).fail(function (response) {

                dismissToast();
                console.log(response);
                iziToast.error({
                    title: "Error",
                    message: "Unable to restore memorandum"
                });
            });
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

var RestoreStudentModal = function (_Component2) {
    _inherits(RestoreStudentModal, _Component2);

    function RestoreStudentModal(props) {
        _classCallCheck(this, RestoreStudentModal);

        var _this3 = _possibleConstructorReturn(this, (RestoreStudentModal.__proto__ || Object.getPrototypeOf(RestoreStudentModal)).call(this, props));

        _this3.confirmRestore = _this3.confirmRestore.bind(_this3);
        return _this3;
    }

    _createClass(RestoreStudentModal, [{
        key: "confirmRestore",
        value: function confirmRestore() {
            var _this4 = this;

            this.props.toggle();
            var dismissToast = (0, _dismissable_toast_maker.makeInfoToast)({
                title: "Restoring",
                message: "Restoring student..."
            });

            _jquery2.default.ajax({
                url: _settings2.default.serverURL + "/archives/students/" + this.props.student.id + "/restore/",
                method: "PUT",
                beforeSend: _authorization2.default
            }).done(function () {

                dismissToast();
                iziToast.success({
                    title: "Success",
                    message: "Successfully restored student"
                });
                _this4.props.onRestoreSuccess();
            }).fail(function (response) {

                dismissToast();
                console.log(response);
                iziToast.error({
                    title: "Error",
                    message: "Unable to restore student"
                });
            });
        }
    }, {
        key: "render",
        value: function render() {
            var student = this.props.student;
            var fullName = student.first_name + " " + student.middle_name + " " + student.family_name;

            return _react2.default.createElement(
                RestoreModal,
                { confirmRestore: this.confirmRestore,
                    isOpen: this.props.isOpen,
                    toggle: this.props.toggle },
                _react2.default.createElement(
                    _reactstrap.ModalHeader,
                    { className: "text-primary" },
                    "Would you like to restore ",
                    fullName,
                    "?"
                )
            );
        }
    }]);

    return RestoreStudentModal;
}(_react.Component);

var RestoreInstitutionModal = function (_Component3) {
    _inherits(RestoreInstitutionModal, _Component3);

    function RestoreInstitutionModal(props) {
        _classCallCheck(this, RestoreInstitutionModal);

        var _this5 = _possibleConstructorReturn(this, (RestoreInstitutionModal.__proto__ || Object.getPrototypeOf(RestoreInstitutionModal)).call(this, props));

        _this5.confirmRestore = _this5.confirmRestore.bind(_this5);
        return _this5;
    }

    _createClass(RestoreInstitutionModal, [{
        key: "confirmRestore",
        value: function confirmRestore() {
            var _this6 = this;

            this.props.toggle();
            var dismissToast = (0, _dismissable_toast_maker.makeInfoToast)({
                title: "Restoring",
                message: "Restoring institution..."
            });

            _jquery2.default.ajax({
                url: _settings2.default.serverURL + "/archives/institutions/" + this.props.institution.id + "/restore/",
                method: "PUT",
                beforeSend: _authorization2.default
            }).done(function () {

                dismissToast();
                iziToast.success({
                    title: "Success",
                    message: "Successfully restored institution"
                });

                _this6.props.onRestoreSuccess();
            }).fail(function (response) {

                dismissToast();
                console.log(response);
                iziToast.error({
                    title: "Error",
                    message: "Unable to restore memorandum"
                });
            });
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
                    "Would you like to restore ",
                    this.props.institution.name,
                    "?"
                )
            );
        }
    }]);

    return RestoreInstitutionModal;
}(_react.Component);

var RestoreModal = function (_Component4) {
    _inherits(RestoreModal, _Component4);

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
exports.RestoreStudentModal = RestoreStudentModal;
exports.RestoreInstitutionModal = RestoreInstitutionModal;
//# sourceMappingURL=modals.js.map