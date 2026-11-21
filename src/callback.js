"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var htmlObjects_js_1 = require("./modules/htmlObjects.js");
var constants_js_1 = require("./modules/constants.js");
/**
 * Keydown Event Handler
 * @param event key pressed from the keyboard
 * @returns void
 */
var onKeydown = function (event) {
    // Allowed keys Navigation and Numeric keys
    if (constants_js_1.Constants.ALLOWED_KEYS.some(function (k) { return k === event.key; })) {
        return;
    }
    // Allow one and only one decimal point
    if (event.currentTarget.value.includes(constants_js_1.Constants.DECIMAL_PERIOD)) {
        if (event.key == constants_js_1.Constants.DECIMAL_PERIOD) {
            event.preventDefault();
            return;
        }
        else {
            return;
        }
    }
    // Allow Enter key to trigger the calculation
    if (event.key === constants_js_1.Constants.ENTER_KEY) {
        htmlObjects_js_1.btnCalc.click();
        return;
    }
    // destroy keyboard input
    event.preventDefault();
};
/**
 * Change Event Handler for the dropdown
 */
htmlObjects_js_1.cboOperation.onchange = function () {
    htmlObjects_js_1.spResult.textContent = constants_js_1.Constants.String.EMPTY;
};
/**
 * Click Event Handler for the Calculate button
 */
htmlObjects_js_1.btnCalc.onclick = function () {
    htmlObjects_js_1.spResult.textContent = constants_js_1.Constants.String.EMPTY;
    htmlObjects_js_1.spResult.style.color = constants_js_1.Constants.Color.RED;
    var txArr = [htmlObjects_js_1.txFirst, htmlObjects_js_1.txSecond];
    var isError = false;
    txArr.reverse().forEach(function (elem) {
        if (elem.value.trim() === constants_js_1.Constants.String.EMPTY) {
            htmlObjects_js_1.spResult.textContent = "".concat(elem.title, " ").concat(constants_js_1.Constants.ErrorMessages.FIELD_REQUIRED);
            isError = true;
            elem.focus();
        }
    });
    if (!isError) {
        htmlObjects_js_1.spResult.style.color = constants_js_1.Constants.Color.BLACK;
        var operation = htmlObjects_js_1.cboOperation.value;
        calcOnServer(operation, parseFloat(htmlObjects_js_1.txFirst.value), parseFloat(htmlObjects_js_1.txSecond.value), loadResult);
    }
};
/**
 * Load the result of the operation into the span element
 * @param result number returned from the server
 */
var loadResult = function (result) {
    htmlObjects_js_1.spResult.textContent = String(result);
};
/**
 * Load the options into the select element
 * @param options array of OperationOption returned from the server
 */
var loadComboBox = function (options) {
    // Populate the select element with options from the server
    options.forEach(function (option) {
        var opt = document.createElement(constants_js_1.Constants.HTML_OPTION_ELEMENT);
        opt.value = option.operation;
        opt.textContent = option.description;
        htmlObjects_js_1.cboOperation.appendChild(opt);
    });
};
/**
 * Call the server for the given operation and execute the callback with the result
 * @param operation string representing the operation to perform
 * @param first number representing the first operand
 * @param second number representing the second operand
 * @param callback function to be called with the result of the server call
 */
var calcOnServer = function (operation, first, second, callback) {
    var url = "".concat(constants_js_1.Constants.Server.BASE_URL, "/").concat(operation, "/").concat(first, "/").concat(second);
    // const fn = (data: ResultData) =>  callback(data.result)    
    // callServer(url, fn)
    fetch(url)
        .then(function (response) { return response.json(); })
        .then(function (data) {
        callback(data.result);
    })
        .catch(function (error) {
        console.error(constants_js_1.Constants.ErrorMessages.ERROR_FETCHING_DATA, error);
        htmlObjects_js_1.spResult.textContent = constants_js_1.Constants.ErrorMessages.ERROR_FETCHING_DATA;
    });
};
/**
 * Call the server for the dropdown options
 * @param url string representing the URL to call
 * @param callback function to be called with the options returned from the server
 */
var initializeDropdown = function (url, callback) {
    fetch(url)
        .then(function (response) { return response.json(); })
        .then(function (data) {
        callback(data.result);
    })
        .catch(function (error) {
        console.error(constants_js_1.Constants.ErrorMessages.ERROR_FETCHING_DATA, error);
        htmlObjects_js_1.spResult.textContent = constants_js_1.Constants.ErrorMessages.ERROR_FETCHING_DATA;
    });
};
/**
 * Initialize the application
 */
var initialize = function () {
    var GET_OPERATIONS_URL = "".concat(constants_js_1.Constants.Server.BASE_URL).concat(constants_js_1.Constants.Server.OPERATIONS_ENDPOINT);
    initializeDropdown(GET_OPERATIONS_URL, loadComboBox);
    // Bind Event Handler to HTML Input Elements     
    htmlObjects_js_1.txFirst.onkeydown = onKeydown;
    htmlObjects_js_1.txSecond.onkeydown = onKeydown;
};
/**
 * Call the initialize function to set up the application
 */
initialize();
