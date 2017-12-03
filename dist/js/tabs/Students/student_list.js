"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _loading = require("../../components/loading");

var _loading2 = _interopRequireDefault(_loading);

var _reactstrap = require("reactstrap");

var _section = require("../../components/section");

var _tab_bar = require("../../components/tab_bar");

var _tab_bar2 = _interopRequireDefault(_tab_bar);

var _collapse_content = require("../../components/collapse_content");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var StudentList = function (_Component) {
    _inherits(StudentList, _Component);

    function StudentList(props) {
        _classCallCheck(this, StudentList);

        var _this = _possibleConstructorReturn(this, (StudentList.__proto__ || Object.getPrototypeOf(StudentList)).call(this, props));

        _this.state = {
            searchKeyword: null
        };

        _this.toggleCollapse = _this.toggleCollapse.bind(_this);
        _this.setSearchKeyword = _this.setSearchKeyword.bind(_this);
        _this.getFilteredStudents = _this.getFilteredStudents.bind(_this);
        return _this;
    }

    _createClass(StudentList, [{
        key: "setSearchKeyword",
        value: function setSearchKeyword(searchString) {
            //If the string is empty, that means the user isn't searching at all
            var searchKeyword = searchString === "" ? null : searchString;
            this.setState({
                searchKeyword: searchKeyword
            });
        }
    }, {
        key: "getFilteredStudents",
        value: function getFilteredStudents() {
            if (this.props.students === null || this.state.searchKeyword === null) {
                return null;
            }

            var searchKeyword = this.state.searchKeyword.toLowerCase();

            var filteredStudents = this.props.students.filter(function (student) {
                var fullName = (student.first_name + " " + student.middle_name + " " + student.family_name).toLowerCase();
                return fullName.includes(searchKeyword) || student.id_number.includes(searchKeyword);
            });

            return filteredStudents.map(function (student) {
                return student.id;
            });
        }
    }, {
        key: "toggleCollapse",
        value: function toggleCollapse() {
            this.setState({
                collapsed: !this.state.collapsed
            });
        }
    }, {
        key: "render",
        value: function render() {
            var isSearching = this.state.searchKeyword !== null;

            var className = "sidebar h-100 collapsible ";
            if (this.state.collapsed) {
                className += "collapsed";
            }

            return _react2.default.createElement(
                "div",
                { className: className,
                    id: "student-list" },
                _react2.default.createElement(
                    _collapse_content.ExpandContent,
                    { className: "d-flex flex-column h-100" },
                    _react2.default.createElement(StudentListHead, { setSearchKeyword: this.setSearchKeyword,
                        toggleCollapse: this.toggleCollapse,
                        activeTab: this.props.activeTab }),
                    _react2.default.createElement(StudentListTable, { students: this.props.students,
                        filtered: this.getFilteredStudents(),
                        activeStudent: this.props.activeStudent,
                        setActiveStudent: this.props.setActiveStudent,
                        currentStudentCategory: this.props.activeTab.name,
                        isSearching: isSearching }),
                    _react2.default.createElement(_tab_bar2.default, { tabs: this.props.tabs,
                        activeTab: this.props.activeTab,
                        setActiveTab: this.props.setActiveTab })
                ),
                _react2.default.createElement(_collapse_content.CollapseContent, { title: "Students",
                    toggle: this.toggleCollapse })
            );
        }
    }]);

    return StudentList;
}(_react.Component);

var StudentListHead = function (_Component2) {
    _inherits(StudentListHead, _Component2);

    function StudentListHead(props) {
        _classCallCheck(this, StudentListHead);

        var _this2 = _possibleConstructorReturn(this, (StudentListHead.__proto__ || Object.getPrototypeOf(StudentListHead)).call(this, props));

        _this2.onSearchInputChange = _this2.onSearchInputChange.bind(_this2);
        return _this2;
    }

    _createClass(StudentListHead, [{
        key: "onSearchInputChange",
        value: function onSearchInputChange(event) {
            var searchInput = event.target.value;
            this.props.setSearchKeyword(searchInput);
        }
    }, {
        key: "render",
        value: function render() {
            return _react2.default.createElement(
                "div",
                { className: "page-head" },
                _react2.default.createElement(
                    "div",
                    { className: "page-head-controls" },
                    _react2.default.createElement(_collapse_content.CollapseButton, { toggleCollapse: this.props.toggleCollapse })
                ),
                _react2.default.createElement(
                    "h4",
                    { className: "page-head-title" },
                    this.props.activeTab.name,
                    " Students"
                ),
                _react2.default.createElement(_reactstrap.Input, { type: "search",
                    placeholder: "Search",
                    className: "search-input",
                    onChange: this.onSearchInputChange })
            );
        }
    }]);

    return StudentListHead;
}(_react.Component);

var StudentListTable = function (_Component3) {
    _inherits(StudentListTable, _Component3);

    function StudentListTable(props) {
        _classCallCheck(this, StudentListTable);

        var _this3 = _possibleConstructorReturn(this, (StudentListTable.__proto__ || Object.getPrototypeOf(StudentListTable)).call(this, props));

        _this3.getStudentsByFamilyNameInitials = _this3.getStudentsByFamilyNameInitials.bind(_this3);
        _this3.emptyState = _this3.emptyState.bind(_this3);
        return _this3;
    }

    // DO not make this static


    _createClass(StudentListTable, [{
        key: "emptyState",
        value: function emptyState() {
            return _react2.default.createElement(
                "div",
                { className: "loading-container" },
                _react2.default.createElement(
                    "h4",
                    null,
                    "There are no ",
                    this.props.currentStudentCategory,
                    " students."
                ),
                _react2.default.createElement(
                    "p",
                    null,
                    "When added, ",
                    this.props.currentStudentCategory,
                    " students will show up here."
                ),
                this.props.currentStudentCategory === "Inbound" && _react2.default.createElement(
                    _reactstrap.Button,
                    { outline: true,
                        color: "success",
                        onClick: this.props.toggleAddStudent },
                    "Add a Student"
                )
            );
        }
    }, {
        key: "getStudentsByFamilyNameInitials",
        value: function getStudentsByFamilyNameInitials() {
            var _this4 = this;

            //Get first letter
            var familyNameInitials = this.props.students.map(function (student) {
                return student.family_name[0];
            });

            //Get uniques only
            familyNameInitials = familyNameInitials.filter(function (value, index, self) {
                return self.indexOf(value) === index;
            });

            // Sort alphabetically
            familyNameInitials = familyNameInitials.sort(function (a, b) {
                if (a < b) {
                    return -1;
                }
                if (a > b) {
                    return 1;
                }
                return 0;
            });

            var categorizedByInitial = [];

            // Categorize by family name initial
            familyNameInitials.forEach(function (initial) {
                var students = [];
                categorizedByInitial.push({
                    initial: initial,
                    students: students
                });

                _this4.props.students.forEach(function (student) {
                    var studentInitial = student.family_name[0];

                    if (studentInitial === initial) {
                        students.push(student);
                    }
                });
            });

            return categorizedByInitial;
        }
    }, {
        key: "render",
        value: function render() {
            var _this5 = this;

            if (this.props.students === null) {
                return _react2.default.createElement(_loading2.default, null);
            }

            if (this.props.students.length === 0) {
                return this.emptyState();
            }

            if (this.props.isSearching && this.props.filtered.length === 0) {
                return StudentListTable.noResultsState();
            }

            var familyNameInitials = this.getStudentsByFamilyNameInitials();

            var sections = familyNameInitials.map(function (familyNameInitial, index) {

                var students = familyNameInitial.students;

                var collapsed = false;

                if (_this5.props.isSearching) {
                    collapsed = true;

                    students.forEach(function (student) {
                        if (_this5.props.filtered.includes(student.id)) {
                            collapsed = false;
                        }
                    });
                }

                return _react2.default.createElement(StudentSection, { key: index,
                    collapsed: collapsed,
                    isSearching: _this5.props.isSearching,
                    title: familyNameInitial.initial,
                    activeStudent: _this5.props.activeStudent,
                    students: familyNameInitial.students,
                    filtered: _this5.props.filtered,
                    setActiveStudent: _this5.props.setActiveStudent });
            });

            return _react2.default.createElement(
                "div",
                { className: "page-body" },
                sections
            );
        }
    }], [{
        key: "noResultsState",
        value: function noResultsState() {
            return _react2.default.createElement(
                "div",
                { className: "loading-container" },
                _react2.default.createElement(
                    "h3",
                    null,
                    "No results found"
                )
            );
        }
    }]);

    return StudentListTable;
}(_react.Component);

var StudentSection = function (_Component4) {
    _inherits(StudentSection, _Component4);

    function StudentSection(props) {
        _classCallCheck(this, StudentSection);

        return _possibleConstructorReturn(this, (StudentSection.__proto__ || Object.getPrototypeOf(StudentSection)).call(this, props));
    }

    _createClass(StudentSection, [{
        key: "render",
        value: function render() {
            var _this7 = this;

            var rows = this.props.students.map(function (student) {
                var isActive = false;

                if (_this7.props.activeStudent !== null) {
                    isActive = _this7.props.activeStudent.id.toString() === student.id.toString();
                }

                var setActiveStudent = function setActiveStudent() {
                    return _this7.props.setActiveStudent(student);
                };

                var collapsed = false;
                if (_this7.props.isSearching) {
                    collapsed = !_this7.props.filtered.includes(student.id);
                }

                return _react2.default.createElement(
                    _section.SectionRow,
                    { selectable: true,
                        collapsed: collapsed,
                        onClick: setActiveStudent,
                        active: isActive,
                        key: student.id },
                    _react2.default.createElement(
                        "small",
                        { className: "d-block" },
                        student.id_number
                    ),
                    _react2.default.createElement(
                        "b",
                        null,
                        student.family_name
                    ),
                    ", ",
                    student.first_name,
                    " ",
                    student.middle_name
                );
            });

            return _react2.default.createElement(
                _section.Section,
                { collapsed: this.props.collapsed },
                _react2.default.createElement(
                    _section.SectionTitle,
                    null,
                    this.props.title
                ),
                _react2.default.createElement(
                    _section.SectionTable,
                    null,
                    rows
                )
            );
        }
    }]);

    return StudentSection;
}(_react.Component);

exports.default = StudentList;
//# sourceMappingURL=student_list.js.map