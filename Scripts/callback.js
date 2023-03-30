
/**
 * Event Handler for the Window Load Event
 */
window.onload =  () => {

    /**
     * Prevent non-numeric inputs
     * @param {number} keyCode The Key Code returned by the Browser
     * @returns True indicates the input is numeric
     */
    const isNumeric = (keyCode) => Constant.Value.NUMERIC_INPUT.some(k => k === keyCode)

    /**
     * Event Handler for the Key Down Event
     * @param {event} event Then Event Object returned by the Browser
     * @returns True indicates the input is numeric, otherwise discard
     */
    const input_onkeydown = (event) => {

        // THis will allows only one decimal point
        if (event.currentTarget.value.includes(Constant.Value.DECIMAL_POINT)){
            if ( event.key == Constant.Value.DECIMAL_POINT) {
                event.preventDefault()
                return false // Discard input
            }
        }
        
        // Only number plus one decimal point
        Constant.HTMLElement.result.innerHTML = 'Press button to calculate'
        if (isNumeric(event.keyCode) === false) { // Ensure value is numeric
            event.preventDefault()
            return false // Discard input                    
        }
    }

    /**
     * Hide/Show animated Icon
     */
    const toggleImageVisibility = () => {
        if (Constant.HTMLElement.imgLoader.style.visibility === Constant.Value.HIDDEN) {
            Constant.HTMLElement.imgLoader.style.visibility = Constant.Value.VISIBLE
        } else {
            Constant.HTMLElement.imgLoader.style.visibility = Constant.Value.HIDDEN
        }
    }
 

    /**
     * Event Handler for the Click Event
     */
    const btn_onclick = () => {
        
        if (isValidateInput(Constant.HTMLElement.first, Constant.HTMLElement.second, Constant.HTMLElement.result)) {

            const operation = Constant.HTMLElement.cboOperation.value
            calculate(first.value, second.value, displayResult, eval(operation))

            Constant.HTMLElement.result.innerHTML = "Please wait ...."
            toggleImageVisibility()
        }
    } 
    
    /**
     * Get the Operation Type from the Dropdown Option Attribute
     * @returns operation type (e.g.; monadic or diadic)
     */
    const getOperationType = () => {
        const selectIndex =  Constant.HTMLElement.cboOperation.selectedIndex         
        const opType = Constant.HTMLElement.cboOperation.options[selectIndex].attributes[Constant.Value.OP].value

        return opType
    }

    /**
     * Event Handled for Dropdown Change Event
     */
    const cbo_onchange = () => {
                
        const opType = getOperationType()

        // Disable or enable send input text based on the Monadic/Diadic option type
        if (opType == Constant.Value.MONADIC){            
            Constant.HTMLElement.second.disabled = true
        }
        else{            
            Constant.HTMLElement.second.disabled = false
        }
    }

    /**
     * Callback to display results
     * @param {number} rst The result of the operation
     */
    const displayResult = (rst) => {
        console.log('Entering callback')
        Constant.HTMLElement.result.innerHTML = `The result is <strong>${rst}</strong>`
        console.log('Exiting callback')
        toggleImageVisibility()
    }

    /**
     * Verify that data is entered
     * @param {HTMLInputElement} fst First number (HTML Element Input text)
     * @param {HTMLInputElement} snd Second number (HTML Element Input text)
     * @param {HTMLParagraphElement} rst Result container (HTML Element)
     * @returns True indicates that both input are numeric
     */
    const isValidateInput = (fst, snd, rst) => {

        // Validate input array items; either one or two depending Monadic/Diadic opType
        const validateHelper =  arr => {
            let isOk = true
            arr.forEach(item => {
                if (item.value.trim().length === 0) {
                    rst.innerHTML = `The field <b>${item.id}</b> is invalid input`
                    item.focus()
                    isOk = false
                }
            })

            return isOk
        }
                     
        const opType = getOperationType()                
         
        // validates one or both input fields based on the Monadic/Diadic option type
        if (opType == Constant.Value.MONADIC)
             return   validateHelper([fst])         // Passing one value
        else    
            return   validateHelper([snd, fst])     // Passing both values

    }

    /**
     * Start the calculation asynchronized
     * @param {number} x First  number
     * @param {number} y Second number
     * @param {CallableFunction} callback The function that will display the result
     * @param {CallableFunction} operation To be performed (e.g., Add. Multiply ...)
     */
    const calculate = (x, y, callback, operation) => {
        console.log('Entering calculate')

        const opType = getOperationType() 
        
        // Helper function Async
        function calcHelper() {
            console.log('Entering calHelper')

            //TODO
            if (opType == Constant.Value.MONADIC){
                const monadicOp = operation(parseFloat(x))                  // Passing one value
                callback(monadicOp)                                         // Monadic operation
            }
            else{
                const diadicOp = operation(parseFloat(x), parseFloat(y))    // Passing two values
                callback(diadicOp)                                          // Diadic operation
            }
            console.log('Exiting calcHelper')
        }

        // Async calculation
        setTimeout(calcHelper, Constant.Value.ASYNC_DELAY)

        console.log('Exiting calculate')
    }

    /**
     * Hide/Display the image
     */
    toggleImageVisibility()

    /**
     * Attach Event Handlers
     */
     Constant.HTMLElement.first.onkeydown = input_onkeydown
     Constant.HTMLElement.second.onkeydown = input_onkeydown
     Constant.HTMLElement.btn.onclick = btn_onclick
     Constant.HTMLElement.cboOperation.onchange = cbo_onchange

}