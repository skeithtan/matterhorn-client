"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _graphql = require("../graphql");

var _graphql2 = _interopRequireDefault(_graphql);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function makeYearsQuery() {
    return _graphql2.default.query("\n    {\n        academic_years {\n            academic_year_start\n        }\n    }\n    ");
}

exports.default = makeYearsQuery;
//# sourceMappingURL=academic_years_query.js.map