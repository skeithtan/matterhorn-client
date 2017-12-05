"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _graphql = require("../../../graphql");

var _graphql2 = _interopRequireDefault(_graphql);

var _error_state = require("../../../components/error_state");

var _error_state2 = _interopRequireDefault(_error_state);

var _loading = require("../../../components/loading");

var _loading2 = _interopRequireDefault(_loading);

var _section = require("../../../components/section");

var _reactstrap = require("reactstrap");

var _settings = require("../../../settings");

var _settings2 = _interopRequireDefault(_settings);

var _authorization = require("../../../authorization");

var _authorization2 = _interopRequireDefault(_authorization);

var _modals = require("./modals");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

function makeRequirementsQuery(isInbound) {
    return _graphql2.default.query("\n    {\n        " + (isInbound ? "inbound_requirements" : "outbound_requirements") + " {\n            id\n            name\n        }\n    }\n    ");
}

function makeInboundApplicationQuery(id) {
    return _graphql2.default.query("\n    {\n      student(id:" + id + ") {\n                inboundstudentprogram {\n                    id\n                    is_requirements_complete\n                    application_requirements {\n                        id\n                    }\n                }\n        }\n    }\n    ");
}

function makeOutboundApplicationQuery(id) {
    return _graphql2.default.query("\n    {\n      student(id:" + id + ") {\n                outboundstudentprogram {\n                    id\n                    is_requirements_complete\n                    application_requirements {\n                        id\n                    }\n                }\n        }\n    }\n    ");
}

var ApplicationRequirements = function (_Component) {
    _inherits(ApplicationRequirements, _Component);

    function ApplicationRequirements(props) {
        _classCallCheck(this, ApplicationRequirements);

        var _this = _possibleConstructorReturn(this, (ApplicationRequirements.__proto__ || Object.getPrototypeOf(ApplicationRequirements)).call(this, props));

        _this.state = {
            applicantRequirements: null,
            requirements: null,
            isRequirementsComplete: false,
            studentProgramId: null,
            errors: null,
            deployApplicantIsShowing: false,
            acceptApplicantIsShowing: false
        };

        _this.fetchRequirements = _this.fetchRequirements.bind(_this);
        _this.refreshRequirements = _this.refreshRequirements.bind(_this);
        _this.toggleDeployApplicant = _this.toggleDeployApplicant.bind(_this);
        _this.toggleAcceptApplicant = _this.toggleAcceptApplicant.bind(_this);

        _this.fetchRequirements(props.inbound, props.student.id);
        return _this;
    }

    _createClass(ApplicationRequirements, [{
        key: "fetchRequirements",
        value: function fetchRequirements(inbound, studentId) {
            var _this2 = this;

            if (this.state.error) {
                this.setState({
                    error: null
                });
            }

            makeRequirementsQuery(inbound).then(function (result) {
                return _this2.setState({
                    requirements: inbound ? result.inbound_requirements : result.outbound_requirements
                });
            }).catch(function (error) {
                return _this2.setState({
                    error: error
                });
            });

            if (inbound) {
                makeInboundApplicationQuery(studentId).then(function (result) {
                    return _this2.setState({
                        applicantRequirements: result.student.inboundstudentprogram.application_requirements.map(function (requirement) {
                            return requirement.id;
                        }),
                        isRequirementsComplete: result.student.inboundstudentprogram.is_requirements_complete,
                        studentProgramId: result.student.inboundstudentprogram.id
                    });
                }).catch(function (error) {
                    return _this2.setState({
                        error: error
                    });
                });
            } else {
                makeOutboundApplicationQuery(studentId).then(function (result) {
                    return _this2.setState({
                        applicantRequirements: result.student.outboundstudentprogram.application_requirements.map(function (requirement) {
                            return requirement.id;
                        }),
                        isRequirementsComplete: result.student.outboundstudentprogram.is_requirements_complete,
                        studentProgramId: result.student.outboundstudentprogram.id
                    });
                }).catch(function (error) {
                    return _this2.setState({
                        error: error
                    });
                });
            }
        }
    }, {
        key: "refreshRequirements",
        value: function refreshRequirements() {
            // console.log(this.props);
            // this.fetchRequirements(this.props.inbound, this.props.student.id);
            //
            this.setState({
                requirements: null,
                applicantRequirements: null
            });
        }
    }, {
        key: "toggleDeployApplicant",
        value: function toggleDeployApplicant() {
            this.setState({
                deployApplicantIsShowing: !this.state.deployApplicantIsShowing
            });
        }
    }, {
        key: "toggleAcceptApplicant",
        value: function toggleAcceptApplicant() {
            this.setState({
                acceptApplicantIsShowing: !this.state.acceptApplicantIsShowing
            });
        }
    }, {
        key: "componentWillReceiveProps",
        value: function componentWillReceiveProps(props) {
            this.setState({
                applicantRequirements: null
            });

            this.fetchRequirements(props.inbound, props.student.id);
        }
    }, {
        key: "render",
        value: function render() {
            var _this3 = this;

            if (this.state.error) {
                return _react2.default.createElement(
                    _error_state2.default,
                    { onRetryButtonClick: function onRetryButtonClick() {
                            return _this3.fetchRequirements(_this3.props.inbound, _this3.props.student.id);
                        } },
                    this.state.error.toString()
                );
            }

            if (this.state.applicantRequirements === null || this.state.requirements === null) {
                return _react2.default.createElement(_loading2.default, null);
            }

            return _react2.default.createElement(
                "div",
                { className: "d-flex flex-column p-0 h-100" },
                _react2.default.createElement(ApplicationHead, { student: this.props.student,
                    inbound: this.props.inbound,
                    toggleModal: this.props.inbound ? this.toggleAcceptApplicant : this.toggleDeployApplicant,
                    isRequirementsComplete: this.state.isRequirementsComplete }),
                _react2.default.createElement(RequirementsBody, { requirements: this.state.requirements,
                    student: this.props.student,
                    inbound: this.props.inbound,
                    refreshRequirements: function refreshRequirements() {
                        return _this3.fetchRequirements(_this3.props.inbound, _this3.props.student.id);
                    },
                    studentProgramId: this.state.studentProgramId,
                    applicantRequirements: this.state.applicantRequirements }),
                !this.props.inbound && this.state.isRequirementsComplete && _react2.default.createElement(_modals.DeployApplicantModal, { isOpen: this.state.deployApplicantIsShowing,
                    student: this.props.student,
                    refreshStudents: this.props.refreshStudents,
                    toggle: this.toggleDeployApplicant }),
                this.props.inbound && this.state.isRequirementsComplete && _react2.default.createElement(_modals.AcceptApplicantModal, { isOpen: this.state.acceptApplicantIsShowing,
                    student: this.props.student,
                    refreshStudents: this.props.refreshStudents,
                    toggle: this.toggleAcceptApplicant })
            );
        }
    }]);

    return ApplicationRequirements;
}(_react.Component);

var ApplicationHead = function (_Component2) {
    _inherits(ApplicationHead, _Component2);

    function ApplicationHead() {
        _classCallCheck(this, ApplicationHead);

        return _possibleConstructorReturn(this, (ApplicationHead.__proto__ || Object.getPrototypeOf(ApplicationHead)).apply(this, arguments));
    }

    _createClass(ApplicationHead, [{
        key: "render",
        value: function render() {
            return _react2.default.createElement(
                "div",
                { className: "page-head pt-5 d-flex flex-row align-items-center" },
                _react2.default.createElement(
                    "div",
                    { className: "mr-auto" },
                    _react2.default.createElement(
                        "h5",
                        { className: "mb-0 text-secondary" },
                        "Application Requirements"
                    ),
                    _react2.default.createElement(
                        "h4",
                        { className: "page-head-title justify-content-left d-inline-block mb-0 mr-2" },
                        this.props.student.first_name,
                        " ",
                        this.props.student.middle_name,
                        " ",
                        this.props.student.family_name,
                        _react2.default.createElement(
                            "small",
                            { className: "text-muted ml-2" },
                            this.props.student.id_number
                        )
                    )
                ),
                this.props.isRequirementsComplete && _react2.default.createElement(
                    _reactstrap.Button,
                    { outline: true,
                        size: "sm",
                        className: "mr-2",
                        onClick: this.props.toggleModal,
                        color: "success" },
                    this.props.inbound ? "Accept " : "Deploy ",
                    " Student"
                ),
                _react2.default.createElement(
                    _reactstrap.Button,
                    { outline: true,
                        size: "sm",
                        color: "danger" },
                    "Cancel Application"
                )
            );
        }
    }]);

    return ApplicationHead;
}(_react.Component);

var RequirementsBody = function (_Component3) {
    _inherits(RequirementsBody, _Component3);

    function RequirementsBody(props) {
        _classCallCheck(this, RequirementsBody);

        return _possibleConstructorReturn(this, (RequirementsBody.__proto__ || Object.getPrototypeOf(RequirementsBody)).call(this, props));
    }

    _createClass(RequirementsBody, [{
        key: "render",
        value: function render() {
            var _this6 = this;

            var rows = this.props.requirements.map(function (requirement) {
                return _react2.default.createElement(RequirementRow, { key: requirement.id,
                    applicantRequirements: _this6.props.applicantRequirements,
                    student: _this6.props.student,
                    inbound: _this6.props.inbound,
                    refreshRequirements: _this6.props.refreshRequirements,
                    studentProgramId: _this6.props.studentProgramId,
                    done: _this6.props.applicantRequirements.includes(requirement.id),
                    requirement: requirement });
            });

            return _react2.default.createElement(
                _section.SectionTable,
                null,
                rows
            );
        }
    }]);

    return RequirementsBody;
}(_react.Component);

var RequirementRow = function (_Component4) {
    _inherits(RequirementRow, _Component4);

    function RequirementRow(props) {
        _classCallCheck(this, RequirementRow);

        var _this7 = _possibleConstructorReturn(this, (RequirementRow.__proto__ || Object.getPrototypeOf(RequirementRow)).call(this, props));

        _this7.markAsDone = _this7.markAsDone.bind(_this7);
        _this7.markAsUndone = _this7.markAsUndone.bind(_this7);
        return _this7;
    }

    _createClass(RequirementRow, [{
        key: "markAsDone",
        value: function markAsDone() {
            var _this8 = this;

            var requirements = this.props.applicantRequirements.concat([this.props.requirement.id]);

            $.ajax({
                method: "PUT",
                url: _settings2.default.serverURL + "/programs/" + (this.props.inbound ? "inbound" : "outbound") + "/students/" + this.props.studentProgramId + "/",
                beforeSend: _authorization2.default,
                data: JSON.stringify({
                    application_requirements: requirements
                }),
                contentType: "application/json"
            }).done(function () {
                _this8.props.refreshRequirements();
            });
        }
    }, {
        key: "markAsUndone",
        value: function markAsUndone() {
            var _this9 = this;

            $.ajax({
                method: "PUT",
                url: _settings2.default.serverURL + "/programs/" + (this.props.inbound ? "inbound" : "outbound") + "/students/" + this.props.studentProgramId + "/",
                beforeSend: _authorization2.default,
                data: JSON.stringify({
                    application_requirements: this.props.applicantRequirements.filter(function (requirement) {
                        return requirement !== _this9.props.requirement.id;
                    })
                }),
                contentType: "application/json"
            }).done(function () {
                _this9.props.refreshRequirements();
            });
        }
    }, {
        key: "render",
        value: function render() {
            return _react2.default.createElement(
                _section.SectionRow,
                { large: true,
                    className: "d-flex flex-row align-items-center" },
                this.props.done && _react2.default.createElement(
                    "b",
                    { className: "text-success mr-3" },
                    "\u2713"
                ),
                _react2.default.createElement(
                    "p",
                    { className: "lead mr-auto mb-0" },
                    this.props.requirement.name
                ),
                this.props.done && _react2.default.createElement(
                    _reactstrap.Button,
                    { outline: true,
                        size: "sm",
                        onClick: this.markAsUndone,
                        color: "warning" },
                    "Mark as undone"
                ),
                !this.props.done && _react2.default.createElement(
                    _reactstrap.Button,
                    { outline: true,
                        size: "sm",
                        onClick: this.markAsDone,
                        color: "success" },
                    "Mark as done"
                )
            );
        }
    }]);

    return RequirementRow;
}(_react.Component);

exports.default = ApplicationRequirements;
//# sourceMappingURL=application_requirements.js.map