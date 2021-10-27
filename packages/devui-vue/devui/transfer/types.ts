
export interface IItem {
    key: string
    value: string
    disabled: boolean
}

export interface ITitles {
    [index: number]: string
}

export interface IModel {
    [index: number]: string | number
}

export interface TState {
    data: IItem[]
    allChecked: boolean
    checkedNum: number
    query: string
    checkedValues: string[]
    filterData: IItem[]
    disabled: boolean
}

export interface TResult {
    model: string[]
    data: IItem[]
}



// import { ComputedRef } from 'vue'
// export type TItem = {
//     key: string
//     value: string
//     disabled: boolean
//     checked?: boolean
// }

// export type TState = {
//     data: TItem[]
//     allChecked: boolean
//     // disabled: boolean // ComputedRef// 
//     checkedNum: number
//     query: string
//     checkedValues: string[]
//     filterData: TItem[]
// }

// export type TResult = {
//     model: string[]
//     data: TItem[]
// }
