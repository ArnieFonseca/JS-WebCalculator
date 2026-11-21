/**
 * This file contains the interfaces and types used in the application.
 */ 

export interface OperationOption {
    operation: string
    description: string
}

export interface ResultData {
    result: number
}

export type CallbackForDropdown = (options: OperationOption[]) => void

export type LoadResult = (result: number) => void

export type LoadComboBox = (options: OperationOption[]) => void

export type CallServerForOperation = (operation: string, first: number, second: number, callback: LoadResult) => void

export type CallServerForDropdown = (url: string, callback: CallbackForDropdown) => void