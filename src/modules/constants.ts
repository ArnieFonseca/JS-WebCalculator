export namespace Constants {
    const NUMERIC_KEYS: string[] = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9']
    const NAVIGATION_KEYS = ['Backspace', 'Delete', 'ArrowLeft', 'ArrowRight']

    export const DECIMAL_PERIOD: string = '.'
    export const ALLOWED_KEYS = [...NUMERIC_KEYS, ...NAVIGATION_KEYS]
    export const ENTER_KEY = 'Enter'
    export const HTML_OPTION_ELEMENT = 'option'

    export namespace HtmlFields {
        export const BTN_CALC = 'btnCalc'
        export const TX_FIRST = 'txFirst'
        export const TX_SECOND = 'txSecond'
        export const SP_RESULT = 'spResult'
        export const CBO_OPERATION = 'cboOperation'
        export const IMG_WAIT = 'imgWait'
    }
    export namespace String {
        export const EMPTY = ''
        export const NONE ='none'
    }

    export namespace Color {
        export const BLACK = '#000000'
        export const RED = '#f40202'
    }

    export namespace ErrorMessages {
        export const FIELD_REQUIRED = 'not entered, field is required'
        export const INVALID_OPERATION = 'Invalid operation'
        export const ERROR_FETCHING_DATA = 'Error fetching data from server'
    }

    export namespace Server {
        export const BASE_URL = 'http://localhost:3000/api'
        export const OPERATIONS_ENDPOINT = '/operations'
    }
}