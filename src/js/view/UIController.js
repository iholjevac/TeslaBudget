import {elements} from './base';

export const getInput = () => {
    return {
        type: elements.inputType.value,
        description: elements.inputDescription.value,
        value: parseFloat(elements.inputValue.value)
    }
}

export const renderBudget = (income, expense) => {
    const budget = income - expense;
    elements.budgetValue.textContent = budget;
}

export const renderIncExp = (item, element, type) => {
    const markup = `
    <div class="item clearfix" id="${item.id}">
    <div class="item__description">${item.description}</div>
    <div class="right clearfix">
        <div class="item__value">${item.value}</div>
        <div class="item__delete">
            <button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button>
        </div>
    </div>
    </div>
    `;
    element.insertAdjacentHTML('beforeend', markup);
}

export const removeIncExp = (id) => {
    //const el = document.getElementById(id);
    //el.parentNode.removeChild(el);
}