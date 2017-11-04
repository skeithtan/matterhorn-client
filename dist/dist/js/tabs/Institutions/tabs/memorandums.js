"use strict";

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

Object.defineProperty(exports, "__esModule", {
    value: true
});

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

var _moment = require("moment");

var _moment2 = _interopRequireDefault(_moment);

var _graphql = require("../../../graphql");

var _graphql2 = _interopRequireDefault(_graphql);

var _loading = require("../../../loading");

var _loading2 = _interopRequireDefault(_loading);

var _settings = require("../../../settings");

var _settings2 = _interopRequireDefault(_settings);

var _reactstrap = require("reactstrap");

var _section = require("../../../components/section");

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

function fetchInstitution(id, onResponse) {
    (0, _graphql2.default)({
        query: "\n        {\n            institution(id: " + id + ") {\n                id\n                name\n                memorandumSet {\n                    id\n                    category\n                    memorandumFile\n                    dateEffective\n                    dateExpiration\n                    collegeInitiator\n                    memorandumlinkageSet {\n                        linkage\n                    }\n                }\n            }\n        }\n       ",
        onResponse: onResponse
    });
}

var Memorandums = function (_Component) {
    _inherits(Memorandums, _Component);

    function Memorandums(props) {
        _classCallCheck(this, Memorandums);

        var _this = _possibleConstructorReturn(this, (Memorandums.__proto__ || Object.getPrototypeOf(Memorandums)).call(this, props));

        _this.state = {
            institution: null,
            institutionID: props.institution.id
        };

        //Fetch active institution details
        fetchInstitution(props.institution.id, function (response) {
            console.log(response);

            _this.setState({
                institution: response.data.institution
            });
        });
        return _this;
    }

    _createClass(Memorandums, [{
        key: "componentWillReceiveProps",
        value: function componentWillReceiveProps(nextProps) {
            var _this2 = this;

            this.setState({
                institutionID: nextProps.institution.id,
                institution: null
            });

            fetchInstitution(nextProps.institution.id, function (response) {
                _this2.setState({
                    institution: response.data.institution
                });
            });
        }
    }, {
        key: "render",
        value: function render() {
            if (this.state.institution === null) {
                return _react2.default.createElement(_loading2.default, null);
            }

            return _react2.default.createElement("div", { id: "institution-memorandums", className: "d-flex flex-column p-0 h-100" }, _react2.default.createElement(MemorandumHead, { institution: this.state.institution }), _react2.default.createElement(MemorandumBody, { memorandums: this.state.institution.memorandumSet }));
        }
    }]);

    return Memorandums;
}(_react.Component);

var MemorandumHead = function (_Component2) {
    _inherits(MemorandumHead, _Component2);

    function MemorandumHead(props) {
        _classCallCheck(this, MemorandumHead);

        return _possibleConstructorReturn(this, (MemorandumHead.__proto__ || Object.getPrototypeOf(MemorandumHead)).call(this, props));
    }

    _createClass(MemorandumHead, [{
        key: "render",
        value: function render() {
            return _react2.default.createElement("div", { className: "page-head pt-5 d-flex flex-row align-items-end" }, _react2.default.createElement("div", { className: "mr-auto" }, _react2.default.createElement("h5", { className: "mb-0 text-secondary" }, "Memorandums"), _react2.default.createElement("h4", { className: "page-head-title mb-0" }, this.props.institution.name)), _react2.default.createElement("div", { className: "page-head-actions" }, _react2.default.createElement(_reactstrap.Button, { outline: true, size: "sm", color: "success" }, "Add a Memorandum")));
        }
    }]);

    return MemorandumHead;
}(_react.Component);

var MemorandumBody = function (_Component3) {
    _inherits(MemorandumBody, _Component3);

    function MemorandumBody(props) {
        _classCallCheck(this, MemorandumBody);

        //Parse dates
        var _this4 = _possibleConstructorReturn(this, (MemorandumBody.__proto__ || Object.getPrototypeOf(MemorandumBody)).call(this, props));

        props.memorandums.forEach(function (memorandum) {
            memorandum.versionDate = (0, _moment2.default)(memorandum.versionDate);
            memorandum.dateEffective = (0, _moment2.default)(memorandum.dateEffective);
            memorandum.dateExpiration = (0, _moment2.default)(memorandum.dateExpiration);
        });

        //Sort by most recent
        props.memorandums.sort(function (a, b) {
            var aTime = a.dateEffective;
            var bTime = b.dateEffective;

            if (aTime.isBefore(bTime)) {
                return 1;
            }

            if (aTime.isAfter(bTime)) {
                return -1;
            }

            return 0;
        });

        var agreements = [];
        var understandings = [];

        //Categorize
        props.memorandums.forEach(function (memorandum) {
            switch (memorandum.category) {
                case "MOA":
                    agreements.push(memorandum);
                    return;
                case "MOU":
                    understandings.push(memorandum);
                    return;
                default:
                    return;
            }
        });

        _this4.state = {
            showing: null,
            agreements: agreements,
            understandings: understandings
        };
        return _this4;
    }

    _createClass(MemorandumBody, [{
        key: "render",
        value: function render() {
            return _react2.default.createElement("div", { className: "page-body" }, _react2.default.createElement(MemorandumListSection, { memorandums: this.state.agreements }, "Memorandums of Agreement"), _react2.default.createElement(MemorandumListSection, { memorandums: this.state.understandings }, "Memorandums of Understanding"));
        }
    }]);

    return MemorandumBody;
}(_react.Component);

var MemorandumListSection = function (_Component4) {
    _inherits(MemorandumListSection, _Component4);

    function MemorandumListSection(props) {
        _classCallCheck(this, MemorandumListSection);

        var _this5 = _possibleConstructorReturn(this, (MemorandumListSection.__proto__ || Object.getPrototypeOf(MemorandumListSection)).call(this, props));

        _this5.state = {
            activeMemorandum: null
        };

        _this5.emptyState = _this5.emptyState.bind(_this5);
        _this5.setActiveMemorandum = _this5.setActiveMemorandum.bind(_this5);
        return _this5;
    }

    _createClass(MemorandumListSection, [{
        key: "setActiveMemorandum",
        value: function setActiveMemorandum(memorandum) {
            console.log(memorandum);
            if (this.state.activeMemorandum === null) {
                this.setState({
                    activeMemorandum: memorandum
                });

                return;
            }

            this.setState({
                // Collapse if clicked memorandum is already the active memorandum
                activeMemorandum: this.state.activeMemorandum.id === memorandum.id ? null : memorandum
            });
        }
    }, {
        key: "emptyState",
        value: function emptyState() {
            return _react2.default.createElement("div", { className: "p-5 text-center bg-light" }, _react2.default.createElement("h5", { className: "text-secondary" }, "There are no ", this.props.children, "s for this institution"));
        }
    }, {
        key: "render",
        value: function render() {
            var _this6 = this;

            if (this.props.memorandums.length === 0) {
                return _react2.default.createElement(_section.Section, null, _react2.default.createElement(_section.SectionTitle, null, this.props.children), this.emptyState());
            }

            var rows = this.props.memorandums.map(function (memorandum) {
                var isShowing = false;

                if (_this6.state.activeMemorandum !== null) {
                    isShowing = _this6.state.activeMemorandum.id === memorandum.id;
                }

                var onMemorandumRowClick = function onMemorandumRowClick() {
                    return _this6.setActiveMemorandum(memorandum);
                };
                return _react2.default.createElement(MemorandumRow, { isShowing: isShowing, memorandum: memorandum, onClick: onMemorandumRowClick,
                    key: memorandum.id });
            });

            return _react2.default.createElement(_section.Section, null, _react2.default.createElement(_section.SectionTitle, null, this.props.children), _react2.default.createElement(_section.SectionTable, { className: "memorandums-accordion" }, rows), _react2.default.createElement(_section.SectionFooter, null, "Select a memorandum to see its details"));
        }
    }]);

    return MemorandumListSection;
}(_react.Component);

var MemorandumRow = function (_Component5) {
    _inherits(MemorandumRow, _Component5);

    function MemorandumRow(props) {
        _classCallCheck(this, MemorandumRow);

        return _possibleConstructorReturn(this, (MemorandumRow.__proto__ || Object.getPrototypeOf(MemorandumRow)).call(this, props));
    }

    _createClass(MemorandumRow, [{
        key: "render",
        value: function render() {
            var memorandum = this.props.memorandum;

            function formatDate(date) {
                return date.format("LL");
            }

            var dateEffective = formatDate(memorandum.dateEffective);
            var dateExpiration = memorandum.dateExpiration === null ? "No expiration" : formatDate(memorandum.dateExpiration);
            var collegeInitiator = memorandum.collegeInitiator === null ? "No college initiator" : memorandum.collegeInitiator;
            var linkages = memorandum.memorandumlinkageSet;

            var linkagesText = "No linkages";

            if (linkages.length > 0) {
                linkagesText = "";

                linkages.forEach(function (linkageCode, index) {
                    linkagesText += _settings2.default.linkages[linkageCode.linkage];

                    if (index + 1 !== linkages.length) {
                        linkagesText += ", ";
                    }
                });
            }

            return _react2.default.createElement(_reactstrap.Card, null, _react2.default.createElement(_section.SectionRow, { selectable: true, active: this.props.isShowing, onClick: this.props.onClick }, _react2.default.createElement(_section.SectionRowContent, { large: true }, "Effective ", dateEffective)), _react2.default.createElement(_reactstrap.Collapse, { isOpen: this.props.isShowing }, _react2.default.createElement(_reactstrap.CardBody, { className: "p-0" }, _react2.default.createElement(_section.SectionTable, null, _react2.default.createElement(_section.SectionRow, { className: "bg-light" }, _react2.default.createElement(_section.SectionRowTitle, null, "Date Expiration"), _react2.default.createElement(_section.SectionRowContent, { large: true }, dateExpiration)), _react2.default.createElement(_section.SectionRow, { className: "bg-light" }, _react2.default.createElement(_section.SectionRowTitle, null, "College Initiator"), _react2.default.createElement(_section.SectionRowContent, { large: true }, collegeInitiator)), _react2.default.createElement(_section.SectionRow, { className: "bg-light" }, _react2.default.createElement(_section.SectionRowTitle, null, "Linkages"), _react2.default.createElement(_section.SectionRowContent, { large: true }, linkagesText)), _react2.default.createElement(_section.SectionRow, { className: "bg-light d-flex flex-row" }, _react2.default.createElement("div", { className: "mr-auto" }, _react2.default.createElement(_reactstrap.Button, { outline: true, size: "sm", color: "success", className: "mr-2" }, "View Memorandum"), _react2.default.createElement(_reactstrap.Button, { outline: true, size: "sm", color: "success" }, "Edit Details")), _react2.default.createElement(_reactstrap.Button, { outline: true, size: "sm", color: "danger" }, "Delete Memorandum"))))));
        }
    }]);

    return MemorandumRow;
}(_react.Component);

exports.default = Memorandums;
//# sourceMappingURL=memorandums.js.map
//# sourceMappingURL=memorandums.js.map