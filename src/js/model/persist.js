// export const persistDataFeb = () => {
//     localStorage.setItem('expensesFeb', JSON.stringify(state.february.expenses))
// }
// export const persistDataJan = () => {
//     localStorage.setItem('expensesJan', JSON.stringify(state.january.expenses))
// }
// export const persistDataNov = () => {
//     localStorage.setItem('expensesNov', JSON.stringify(state.november.expenses))
// }
// export const persistDataIncNov = (str, el) => {
//     //localStorage.setItem('incomesNov', JSON.stringify(state.november.incomes))
//     localStorage.setItem(str, JSON.stringify(el))
// }
// export const persistDataIncJan = () => {
//     localStorage.setItem('incomesJan', JSON.stringify(state.january.incomes))
// }
// export const persistDataIncFeb = () => {
//     localStorage.setItem('incomesFeb', JSON.stringify(state.february.incomes))
// }

export const persistDataPerMonth = (str, el) => {
    //localStorage.setItem('incomesNov', JSON.stringify(state.november.incomes))
    localStorage.setItem(str, JSON.stringify(el))
}

