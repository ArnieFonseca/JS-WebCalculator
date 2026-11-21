"use strict";
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Constants = void 0;
var Constants;
(function (Constants) {
    var NUMERIC_KEYS = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'];
    var NAVIGATION_KEYS = ['Backspace', 'Delete', 'ArrowLeft', 'ArrowRight'];
    Constants.DECIMAL_PERIOD = '.';
    Constants.ALLOWED_KEYS = __spreadArray(__spreadArray([], NUMERIC_KEYS, true), NAVIGATION_KEYS, true);
    Constants.ENTER_KEY = 'Enter';
    Constants.HTML_OPTION_ELEMENT = 'option';
    var HtmlFields;
    (function (HtmlFields) {
        HtmlFields.BTN_CALC = 'btnCalc';
        HtmlFields.TX_FIRST = 'txFirst';
        HtmlFields.TX_SECOND = 'txSecond';
        HtmlFields.SP_RESULT = 'spResult';
        HtmlFields.CBO_OPERATION = 'cboOperation';
    })(HtmlFields = Constants.HtmlFields || (Constants.HtmlFields = {}));
    var String;
    (function (String) {
        String.EMPTY = '';
    })(String = Constants.String || (Constants.String = {}));
    var Color;
    (function (Color) {
        Color.BLACK = '#000000';
        Color.RED = '#f40202';
    })(Color = Constants.Color || (Constants.Color = {}));
    var ErrorMessages;
    (function (ErrorMessages) {
        ErrorMessages.FIELD_REQUIRED = 'not entered, field is required';
        ErrorMessages.INVALID_OPERATION = 'Invalid operation';
        ErrorMessages.ERROR_FETCHING_DATA = 'Error fetching data from server';
    })(ErrorMessages = Constants.ErrorMessages || (Constants.ErrorMessages = {}));
    var Server;
    (function (Server) {
        Server.BASE_URL = 'http://localhost:3000/calc';
        Server.OPERATIONS_ENDPOINT = '/operations';
    })(Server = Constants.Server || (Constants.Server = {}));
})(Constants || (exports.Constants = Constants = {}));
