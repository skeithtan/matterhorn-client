"use strict";

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = undefined;

var _createClass = function () {
    function defineProperties(target, props) {
        for (var i = 0; i < props.length; i++) {
            var descriptor = props[i];descriptor.enumerable = descriptor.enumerable || false;descriptor.configurable = true;if ("value" in descriptor) descriptor.writable = true;Object.defineProperty(target, descriptor.key, descriptor);
        }
    }return function (Constructor, protoProps, staticProps) {
        if (protoProps) defineProperties(Constructor.prototype, protoProps);if (staticProps) defineProperties(Constructor, staticProps);return Constructor;
    };
}();

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _tab_bar = require("../components/tab_bar");

var _tab_bar2 = _interopRequireDefault(_tab_bar);

var _graphql = require("../graphql");

var _graphql2 = _interopRequireDefault(_graphql);

var _error_state = require("../components/error_state");

var _error_state2 = _interopRequireDefault(_error_state);

var _loading = require("../components/loading");

var _loading2 = _interopRequireDefault(_loading);

var _section = require("../components/section");

var _reactstrap = require("reactstrap");

var _form_validator = require("../form_validator");

var _form_validator2 = _interopRequireDefault(_form_validator);

var _settings = require("../settings");

var _settings2 = _interopRequireDefault(_settings);

var _authorization = require("../authorization");

var _authorization2 = _interopRequireDefault(_authorization);

var _dismissable_toast_maker = require("../dismissable_toast_maker");

var _izitoast = require("izitoast");

var _izitoast2 = _interopRequireDefault(_izitoast);

var _jquery = require("jquery");

var _jquery2 = _interopRequireDefault(_jquery);

function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : { default: obj };
}

function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
        throw new TypeError("Cannot call a class as a function");
    }
}

function _possibleConstructorReturn(self, call) {
    if (!self) {
        throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
    }return call && ((typeof call === "undefined" ? "undefined" : _typeof(call)) === "object" || typeof call === "function") ? call : self;
}

function _inherits(subClass, superClass) {
    if (typeof superClass !== "function" && superClass !== null) {
        throw new TypeError("Super expression must either be null or a function, not " + (typeof superClass === "undefined" ? "undefined" : _typeof(superClass)));
    }subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } });if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
}

var tabs = [{
    name: "Inbound",
    image: "../../images/inboundgrey.png",
    activeImage: "../../images/inboundgreen.png"
}, {
    name: "Outbound",
    image: "../../images/airplanegrey.png",
    activeImage: "../../images/airplanegreen.png"
}];

function makeRequirementsQuery(isInbound) {
    return _graphql2.default.query("\n    {\n        " + (isInbound ? "inbound_requirements" : "outbound_requirements") + " {\n            id\n            name\n        }\n    }\n    ");
}

var Requirements = function (_Component) {
    _inherits(Requirements, _Component);

    function Requirements(props) {
        _classCallCheck(this, Requirements);

        var _this = _possibleConstructorReturn(this, (Requirements.__proto__ || Object.getPrototypeOf(Requirements)).call(this, props));

        _this.state = {
            activeTab: tabs[0],
            addRequirementIsShowing: false,
            requirements: null
        };

        _this.fetchRequirements = _this.fetchRequirements.bind(_this);
        _this.refreshRequirements = _this.refreshRequirements.bind(_this);
        _this.toggleAddRequirement = _this.toggleAddRequirement.bind(_this);
        _this.setActiveTab = _this.setActiveTab.bind(_this);

        _this.fetchRequirements();
        return _this;
    }

    _createClass(Requirements, [{
        key: "refreshRequirements",
        value: function refreshRequirements() {
            this.setState({
                requirements: null
            });

            this.fetchRequirements();
        }
    }, {
        key: "fetchRequirements",
        value: function fetchRequirements(isInbound) {
            var _this2 = this;

            if (this.state.error) {
                this.setState({
                    error: null
                });
            }

            if (isInbound === undefined) {
                isInbound = this.state.activeTab.name === "Inbound";
            }

            makeRequirementsQuery(isInbound).then(function (requirements) {
                return _this2.setState({
                    requirements: isInbound ? requirements.inbound_requirements : requirements.outbound_requirements
                });
            }).catch(function (error) {
                return _this2.setState({
                    error: error
                });
            });
        }
    }, {
        key: "toggleAddRequirement",
        value: function toggleAddRequirement() {
            this.setState({
                addRequirementIsShowing: !this.state.addRequirementIsShowing
            });
        }
    }, {
        key: "setActiveTab",
        value: function setActiveTab(tab) {
            this.setState({
                activeTab: tab,
                requirements: null
            });

            this.fetchRequirements(tab.name === "Inbound");
        }
    }, {
        key: "render",
        value: function render() {
            var _this3 = this;

            if (this.state.error) {
                return _react2.default.createElement(_error_state2.default, { onRetryButtonClick: function onRetryButtonClick() {
                        return _this3.fetchRequirements(_this3.props.inbound);
                    } }, this.state.error.toString());
            }

            if (this.state.requirements === null) {
                return _react2.default.createElement(_loading2.default, null);
            }

            return _react2.default.createElement("div", { className: "container-fluid d-flex flex-column p-0 h-100" }, _react2.default.createElement(RequirementsHead, { inbound: this.state.activeTab.name === "Inbound",
                toggleAddRequirement: this.toggleAddRequirement }), _react2.default.createElement(RequirementsBody, { requirements: this.state.requirements,
                inbound: this.state.activeTab.name === "Inbound" }), _react2.default.createElement(RequirementFormModal, { onSuccess: this.refreshRequirements,
                inbound: this.state.activeTab.name === "Inbound",
                isOpen: this.state.addRequirementIsShowing,
                toggle: this.toggleAddRequirement }), _react2.default.createElement(_tab_bar2.default, { setActiveTab: this.setActiveTab,
                activeTab: this.state.activeTab,
                tabs: tabs }));
        }
    }]);

    return Requirements;
}(_react.Component);

var RequirementsHead = function (_Component2) {
    _inherits(RequirementsHead, _Component2);

    function RequirementsHead() {
        _classCallCheck(this, RequirementsHead);

        return _possibleConstructorReturn(this, (RequirementsHead.__proto__ || Object.getPrototypeOf(RequirementsHead)).apply(this, arguments));
    }

    _createClass(RequirementsHead, [{
        key: "render",
        value: function render() {
            return _react2.default.createElement("div", { className: "page-head pt-5 d-flex flex-row align-items-end" }, _react2.default.createElement("div", { className: "mr-auto" }, _react2.default.createElement("h4", { className: "page-head-title mb-0" }, this.props.inbound ? "Inbound" : "Outbound", " Application Requirements")), _react2.default.createElement("div", null, _react2.default.createElement(_reactstrap.Button, { outline: true,
                color: "success",
                onClick: this.props.toggleAddRequirement,
                size: "sm" }, "Add")));
        }
    }]);

    return RequirementsHead;
}(_react.Component);

var RequirementFormModal = function (_Component3) {
    _inherits(RequirementFormModal, _Component3);

    function RequirementFormModal(props) {
        _classCallCheck(this, RequirementFormModal);

        var _this5 = _possibleConstructorReturn(this, (RequirementFormModal.__proto__ || Object.getPrototypeOf(RequirementFormModal)).call(this, props));

        _this5.state = {
            form: {
                name: ""
            }
        };

        _this5.submitRequirement = _this5.submitRequirement.bind(_this5);
        return _this5;
    }

    _createClass(RequirementFormModal, [{
        key: "submitRequirement",
        value: function submitRequirement() {
            var _this6 = this;

            var url = _settings2.default.serverURL + "/programs";
            url += this.props.inbound ? "/inbound/requirements/" : "/outbound/requirements/";

            var dismissToast = (0, _dismissable_toast_maker.makeInfoToast)({
                title: "Submitting...",
                message: "Adding requirement..."
            });

            _jquery2.default.post({
                url: url,
                beforeSend: _authorization2.default,
                data: this.state.form
            }).done(function () {
                dismissToast();
                _izitoast2.default.success({
                    title: "Success",
                    message: "Successfully added requirement"
                });
                _this6.props.onSuccess();
            }).fail(function (response) {
                dismissToast();
                _izitoast2.default.error({
                    title: "Error",
                    message: "Unable to add requirement"
                });
                //TODO: iziToast
                console.log(response);
            });

            this.props.toggle();
        }
    }, {
        key: "render",
        value: function render() {
            var _this7 = this;

            var _validateForm = (0, _form_validator2.default)([{
                name: "Requirement",
                characterLimit: 64,
                value: this.state.form.name
            }]),
                formHasErrors = _validateForm.formHasErrors,
                fieldErrors = _validateForm.fieldErrors;

            return _react2.default.createElement(_reactstrap.Modal, { isOpen: this.props.isOpen,
                toggle: this.props.toggle,
                size: "sm" }, _react2.default.createElement(_reactstrap.ModalHeader, { toggle: this.props.toggle }, _react2.default.createElement("small", { className: "mb-0" }, "Add a requirement")), _react2.default.createElement(_reactstrap.ModalBody, { className: "form" }, _react2.default.createElement(_reactstrap.Form, null, _react2.default.createElement(_reactstrap.FormGroup, null, _react2.default.createElement(_reactstrap.Input, { placeholder: "Requirement",
                valid: !formHasErrors,
                value: this.state.form.name,
                onChange: function onChange(event) {
                    return _this7.setState({
                        form: {
                            name: event.target.value
                        }
                    });
                } }), _react2.default.createElement(_reactstrap.FormFeedback, null, fieldErrors["Requirement"][0])))), _react2.default.createElement(_reactstrap.ModalFooter, null, _react2.default.createElement(_reactstrap.Button, { outline: true,
                color: "success",
                onClick: this.submitRequirement,
                disabled: formHasErrors }, "Add")));
        }
    }]);

    return RequirementFormModal;
}(_react.Component);

var RequirementsBody = function (_Component4) {
    _inherits(RequirementsBody, _Component4);

    function RequirementsBody(props) {
        _classCallCheck(this, RequirementsBody);

        var _this8 = _possibleConstructorReturn(this, (RequirementsBody.__proto__ || Object.getPrototypeOf(RequirementsBody)).call(this, props));

        _this8.state = {
            error: null
        };

        _this8.deleteRequirement = _this8.deleteRequirement.bind(_this8);
        return _this8;
    }

    _createClass(RequirementsBody, [{
        key: "deleteRequirement",
        value: function deleteRequirement(requirementId) {
            //TODO: This

            // $.delete({
            //      url : `${settings.serverURL}/programs/inbound/requirements/`,
            //  })
            //  .done()
            //  .fail(error => {
            //
            //  });
            //

            this.props.refreshRequirements();
        }
    }, {
        key: "render",
        value: function render() {
            var _this9 = this;

            var rows = this.props.requirements.map(function (requirement) {

                var onDeleteButtonClick = function onDeleteButtonClick() {
                    if (!confirm("Are you sure you want to remove the requirement \"" + requirement.name + "\"?")) {
                        return;
                    }

                    _this9.deleteRequirement(requirement.id);
                };

                return _react2.default.createElement(RequirementRow, { key: requirement.id,
                    requirement: requirement,
                    onDeleteButtonClick: onDeleteButtonClick });
            });

            return _react2.default.createElement("div", { className: "page-body" }, _react2.default.createElement(_section.Section, null, _react2.default.createElement(_section.SectionTable, null, rows)));
        }
    }]);

    return RequirementsBody;
}(_react.Component);

var RequirementRow = function (_Component5) {
    _inherits(RequirementRow, _Component5);

    function RequirementRow() {
        _classCallCheck(this, RequirementRow);

        return _possibleConstructorReturn(this, (RequirementRow.__proto__ || Object.getPrototypeOf(RequirementRow)).apply(this, arguments));
    }

    _createClass(RequirementRow, [{
        key: "render",
        value: function render() {
            return _react2.default.createElement(_section.SectionRow, { className: "d-flex flex-row" }, _react2.default.createElement(_section.SectionRowContent, { large: true,
                className: "mr-auto" }, this.props.requirement.name), _react2.default.createElement(_reactstrap.Button, { outline: true,
                size: "sm",
                onClick: this.props.onDeleteButtonClick,
                color: "danger" }, "-"));
        }
    }]);

    return RequirementRow;
}(_react.Component);

exports.default = Requirements;
//# sourceMappingURL=requirements.js.map
//# sourceMappingURL=requirements.js.map