import uniqid from 'uniqid';

// export const expensesData = []; 

// export default class Expense {
//     constructor(){
//         this.id = id;
//         this.description = description;
//         this.value = value;
//     }
//     addItem(id, des, val){
//     //     //const ID = 'kjgskf'
//     //     if(type === 'exp') {
//     //         const newItem = new Expense(this.id, this.description, this.value)
//     //         console.log(newItem)
//     //     }
//         //const id = uniqid()
//         const newItem = new Expense(id, des, val)
//         this.expensesData.push(newItem);
//         console.log(this.expensesData)
//     } 
// }

export default class Expense {
    constructor(id, description, value){
        this.id = id;
        this.description = description;
        this.value = value;
    }
    // addItem (des, val, element) {
    //     const exp = {
    //         id: uniqid(),
    //         des,
    //         val
    //     }
    //     this.expense.push(exp)
    //     return exp
    // }
}