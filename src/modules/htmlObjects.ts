import { Constants } from './constants.js'

const btnCalc = document.getElementById(Constants.HtmlFields.BTN_CALC) as HTMLButtonElement
const spResult = document.getElementById(Constants.HtmlFields.SP_RESULT) as HTMLSpanElement
const txFirst = document.getElementById(Constants.HtmlFields.TX_FIRST) as HTMLInputElement
const txSecond = document.getElementById(Constants.HtmlFields.TX_SECOND) as HTMLInputElement
const cboOperation = document.getElementById(Constants.HtmlFields.CBO_OPERATION) as HTMLSelectElement

const imgWait = document.getElementById(Constants.HtmlFields.IMG_WAIT) as HTMLImageElement
export { btnCalc, spResult, txFirst, txSecond, cboOperation, imgWait }