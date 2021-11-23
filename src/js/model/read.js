import {elements} from '../view/base'
import * as UICtrl from '../view/UIController';


export const readStorageFeb = () => {
    elements.expensesContainer.innerHTML = '';
    const storage = JSON.parse(localStorage.getItem('expensesFeb'))
    if(storage) state.february.expenses = storage;
    if(storage) storage.forEach(cur => UICtrl.renderIncExp(cur, elements.expensesContainer))

}
export const readStorageTotalsFeb = () => {
    const storage = JSON.parse(localStorage.getItem('totalsFeb'))
    state.february.totals = storage;
    document.querySelector('.budget__expenses--value').innerHTML = state.february.totals
    const store = JSON.parse(localStorage.getItem('totalFeb'))
    if(store) state.february.total = store;
    document.querySelector('.budget__income--value').innerHTML = state.february.total
    const stora = JSON.parse(localStorage.getItem('totFeb'))
    if(stora) state.february.tot = stora;
    document.querySelector('.budget__value').innerHTML = state.february.tot;
}

export const readStorageJan = () => {
    elements.expensesContainer.innerHTML = '';
    const storage = JSON.parse(localStorage.getItem('expensesJan'))
    if(storage) state.january.expenses = storage;
    if(storage) storage.forEach(el => UICtrl.renderIncExp(el, elements.expensesContainer))

}
export const readStorageTotalsJan = () => {
    const storage = JSON.parse(localStorage.getItem('totalsJan'))
    state.january.totals = storage;
    document.querySelector('.budget__expenses--value').innerHTML = state.january.totals
    const store = JSON.parse(localStorage.getItem('totalJan'))
    if(store) state.january.total = store;
    document.querySelector('.budget__income--value').innerHTML = state.january.total
    const stora = JSON.parse(localStorage.getItem('totJan'))
    if(stora) state.january.tot = stora;
    document.querySelector('.budget__value').innerHTML = state.january.tot;
}
export const readStorageNov = () => {
    elements.expensesContainer.innerHTML = '';
    const storage = JSON.parse(localStorage.getItem('expensesNov'))
    if(storage) state.november.expenses = storage;
    if(storage) storage.forEach(el => UICtrl.renderIncExp(el, elements.expensesContainer))
}
export const readStorageTotalsNov = () => {
    const storage = JSON.parse(localStorage.getItem('totalsNov'))
    state.november.totals = storage;
    document.querySelector('.budget__expenses--value').innerHTML = state.november.totals
    const store = JSON.parse(localStorage.getItem('totalNov'))
    if(store) state.november.total = store;
    document.querySelector('.budget__income--value').innerHTML = state.november.total
    const stora = JSON.parse(localStorage.getItem('totNov'))
    if(stora) state.november.tot = stora;
    document.querySelector('.budget__value').innerHTML = state.november.tot;
}
export const readStorageDec = () => {
    elements.expensesContainer.innerHTML = '';
    const storage = JSON.parse(localStorage.getItem('expensesDec'))
    console.log('dec' + storage)
    if(storage) state.december.expenses = storage;
    if(storage) storage.forEach(el => UICtrl.renderIncExp(el, elements.expensesContainer))
}
export const readStorageTotalsDec = () => {
    const storage = JSON.parse(localStorage.getItem('totalsDec'))
    state.december.totals = storage;
    if(storage) document.querySelector('.budget__expenses--value').innerHTML = state.december.totals
    const store = JSON.parse(localStorage.getItem('totalDec'))
    if(store) state.december.total = store;
    document.querySelector('.budget__income--value').innerHTML = state.december.total
    const stora = JSON.parse(localStorage.getItem('totDec'))
    if(stora) state.december.tot = stora;
    document.querySelector('.budget__value').innerHTML = state.december.tot;
}
export const readStorageIncNov = () => {
    elements.incomeContainer.innerHTML = '';
    const storage = JSON.parse(localStorage.getItem('incomesNov'))
    if(storage) state.november.incomes = storage;
    if(storage) storage.forEach(el => UICtrl.renderIncExp(el, elements.incomeContainer))
}
export const readStorageIncJan = () => {
    elements.incomeContainer.innerHTML = '';
    const storage = JSON.parse(localStorage.getItem('incomesJan'))
    if(storage) state.january.incomes = storage;
    if(storage) storage.forEach(el => UICtrl.renderIncExp(el, elements.incomeContainer))
}
export const readStorageIncFeb = () => {
    elements.incomeContainer.innerHTML = '';
    const storage = JSON.parse(localStorage.getItem('incomesFeb'))
    if(storage) state.february.incomes = storage;
    if(storage) storage.forEach(el => UICtrl.renderIncExp(el, elements.incomeContainer))
}
export const readStorageIncDec = () => {
    elements.incomeContainer.innerHTML = '';
    const storage = JSON.parse(localStorage.getItem('incomesDec'))
    if(storage) state.december.incomes = storage;
    if(storage) storage.forEach(el => UICtrl.renderIncExp(el, elements.incomeContainer))
}