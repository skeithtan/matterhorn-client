"use strict";

Object.defineProperty(exports, "__esModule", {
    value : true,
});
var countries = ["Afghanistan", "Albania", "Algeria", "Andorra", "Angola", "Antigua and Barbuda", "Argentina", "Armenia", "Australia", "Austria", "Azerbaijan", "Bahamas", "Bahrain", "Bangladesh", "Barbados", "Belarus", "Belgium", "Belize", "Benin", "Bhutan", "Bolivia", "Bosnia and Herzegovina", "Botswana", "Brazil", "Brunei Darussalam", "Bulgaria", "Burkina Faso", "Burundi", "Cambodia", "Cameroon", "Canada", "Cape Verde", "Central African Republic", "Chad", "Chile", "Colombia", "Comoros", "Costa Rica", "Croatia", "Cuba", "Cyprus", "Czech Republic", "Côte d'Ivoire", "Democratic Republic of the Congo", "Denmark", "Djibouti", "Dominica", "Dominican Republic", "East Timor", "Ecuador", "Egypt", "El Salvador", "Equatorial Guinea", "Eritrea", "Estonia", "Ethiopia", "Federated States of Micronesia", "Fiji", "Finland", "France", "Gabon", "Georgia", "Germany", "Ghana", "Greece", "Grenada", "Guatemala", "Guinea", "Guinea-Bissau", "Guyana", "Haiti", "Honduras", "Hong Kong", "Hungary", "Iceland", "India", "Indonesia", "Iran", "Iraq", "Israel", "Italy", "Jamaica", "Japan", "Jordan", "Kazakhstan", "Kenya", "Kingdom of the Netherlands", "Kiribati", "Kuwait", "Kyrgyzstan", "Laos", "Latvia", "Lebanon", "Lesotho", "Liberia", "Libya", "Liechtenstein", "Lithuania", "Luxembourg", "Macedonia", "Madagascar", "Malawi", "Malaysia", "Maldives", "Mali", "Malta", "Marshall Islands", "Mauritania", "Mauritius", "Mexico", "Moldova", "Monaco", "Mongolia", "Montenegro", "Morocco", "Mozambique", "Myanmar", "Namibia", "Nauru", "Nepal", "New Zealand", "Nicaragua", "Niger", "Nigeria", "North Korea", "Norway", "Oman", "Pakistan", "Palau", "Panama", "Papua New Guinea", "Paraguay", "People's Republic of China", "Peru", "Philippines", "Poland", "Portugal", "Qatar", "Republic of Ireland", "Republic of the Congo", "Romania", "Russia", "Rwanda", "Saint Kitts and Nevis", "Saint Lucia", "Saint Vincent and the Grenadines", "Samoa", "San Marino", "Saudi Arabia", "Senegal", "Serbia", "Seychelles", "Sierra Leone", "Singapore", "Slovakia", "Slovenia", "Solomon Islands", "Somalia", "South Africa", "South Korea", "Spain", "Sri Lanka", "Sudan", "Suriname", "Swaziland", "Sweden", "Switzerland", "Syria", "São Tomé and Príncipe", "Tajikistan", "Tanzania", "Thailand", "The Gambia", "Togo", "Tonga", "Trinidad and Tobago", "Tunisia", "Turkey", "Turkmenistan", "Tuvalu", "Uganda", "Ukraine", "United Arab Emirates", "United Kingdom", "United States", "Uruguay", "Uzbekistan", "Vanuatu", "Vatican City", "Venezuela", "Vietnam", "Yemen", "Zambia", "Zimbabwe"];

var colleges = {
    "CCS" : "College of Computer Studies",
    "RVRCOB" : "Ramon V. Del Rosario College of Business",
    "CLA" : "College of Liberal Arts",
    "SOE" : "School of Economics",
    "GCOE" : "Gokongwei College of Engineering",
    "COL" : "College of Law",
    "BAGCED" : "Brother Andrew Gonzales College of Education",
};

var civilStatuses = {
    "S" : "Single",
    "M" : "Married",
    "D" : "Divorced",
    "W" : "Widowed",
};

var linkages = {
    "S" : "Scholarship",
    "OI" : "OJT/Internship",
    "FE" : "Faculty Exchange",
    "SE" : "Student Exchange",
    "RE" : "Researcher / Expert Exchange",
    "SP" : "Support for Projects Exchange",
    "RP" : "Research and Publication",
    "AP" : "Academic Program",
    "PF" : "Project Funding",
    "EMPI" : "Exchange of Materials, Publications and Information",
    "CE" : "Cultural Exchange",
    "SAMC" : "Seminars and Academic Meetings / Conferences",
    "TAP" : "Technical or Administrative Programs",
    "O" : "Established Office",
    "ASE" : "Administrative and Staff Exchange",
    "EM" : "Executive Meetings",
};

var settings = {
    serverURL : "http://127.0.0.1:8000",
    uploadcarePublicKey : "80541ebc3ae0d844afec",
    countries : countries,
    colleges : colleges,
    civilStatuses : civilStatuses,
    linkages : linkages,
};

exports.default = settings;
//# sourceMappingURL=settings.js.map