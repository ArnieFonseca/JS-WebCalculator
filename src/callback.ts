import { btnCalc, spResult, txFirst, txSecond, cboOperation, imgWait } from './modules/htmlObjects.js'
import { Constants } from './modules/constants.js'
import type { ResultOperations, OperationOption, LoadComboBox, CallServerForOperation, CallServerForDropdown, ResultData } from './types/types.js'

/**
 * Keydown Event Handler
 * @param event key pressed from the keyboard
 * @returns void
 */
const onKeydown = (event: KeyboardEvent): void => {

    // Allowed keys Navigation and Numeric keys
    if (Constants.ALLOWED_KEYS.some((k: string) => k === event.key)) {
        return
    }

    // Allow one and only one decimal point
    if ((event.currentTarget as HTMLInputElement).value.includes(Constants.DECIMAL_PERIOD)) {
        if (event.key == Constants.DECIMAL_PERIOD) {
            event.preventDefault()
            return
        } else {
            return
        }
    }

    // Allow Enter key to trigger the calculation
    if (event.key === Constants.ENTER_KEY) {
        btnCalc.click()
        return
    }

    // destroy keyboard input
    event.preventDefault()

}

/**
 * Change Event Handler for the dropdown
 */
cboOperation.onchange = (): void => {
    spResult.textContent = Constants.String.EMPTY
}

/**
 * Click Event Handler for the Calculate button
 */
btnCalc.onclick = (): void => {

    spResult.textContent = Constants.String.EMPTY
    spResult.style.color = Constants.Color.RED

    const txArr = [txFirst, txSecond]
    let isError = false
    txArr.reverse().forEach(elem => {
        if (elem.value.trim() === Constants.String.EMPTY) {
            spResult.textContent = `${elem.title} ${Constants.ErrorMessages.FIELD_REQUIRED}`
            isError = true
            elem.focus()
        }
    })

    if (!isError) {
        spResult.style.color = Constants.Color.BLACK

        const operation = cboOperation.value
        calcOnServer(operation, parseFloat(txFirst.value), parseFloat(txSecond.value), loadResult)
    }
}

/**
 * Load the result of the operation into the span element
 * @param result number returned from the server
 */
const loadResult = (result: number): void => {
    spResult.textContent = String(result)
}

/**
 * Load the options into the select element
 * @param options array of OperationOption returned from the server
 */
const loadComboBox: LoadComboBox = (options): void => {
    // Populate the select element with options from the server
    options.forEach((option: OperationOption) => {
        const opt = document.createElement(Constants.HTML_OPTION_ELEMENT)
        opt.value = option.operation
        opt.textContent = option.description
        cboOperation.appendChild(opt)
    })
}

/**
 * Call the server for the given operation and execute the callback with the result
 * @param operation string representing the operation to perform
 * @param first number representing the first operand
 * @param second number representing the second operand
 * @param callback function to be called with the result of the server call
 */
const calcOnServer: CallServerForOperation = (operation, first, second, callback): void => {

    const url = `${Constants.Server.BASE_URL}/${operation}/${first}/${second}`
 
    imgWait.style.display = Constants.String.EMPTY
    
    fetch(url)
        .then(response => response.json())
        .then((data: ResultData) => {
            callback(data.result)
        })
        .catch(error => {
            console.error(Constants.ErrorMessages.ERROR_FETCHING_DATA, error)
            spResult.textContent = Constants.ErrorMessages.ERROR_FETCHING_DATA
        })
        .finally( () => imgWait.style.display = Constants.String.NONE)
}

/**
 * Call the server for the dropdown options
 * @param url string representing the URL to call
 * @param callback function to be called with the options returned from the server
 */
const initializeDropdown: CallServerForDropdown = (url, callback): void => {

    imgWait.style.display = Constants.String.EMPTY

    fetch(url)
        .then(response => response.json())
        .then((data) => {
            console.log(data)
            callback(data)
        })
        .catch(error => {
            console.error(Constants.ErrorMessages.ERROR_FETCHING_DATA, error)
            spResult.textContent = Constants.ErrorMessages.ERROR_FETCHING_DATA
        })
        .finally(() => imgWait.style.display = Constants.String.NONE)



}

/** 
 * Initialize the application
 */
const initialize = (): void => {

    imgWait.style.display = Constants.String.NONE

    const GET_OPERATIONS_URL = `${Constants.Server.BASE_URL}${Constants.Server.OPERATIONS_ENDPOINT}`
    initializeDropdown(GET_OPERATIONS_URL, loadComboBox)

    // Bind Event Handler to HTML Input Elements     
    txFirst.onkeydown = onKeydown
    txSecond.onkeydown = onKeydown
}

/** 
 * Call the initialize function to set up the application
 */
initialize()
