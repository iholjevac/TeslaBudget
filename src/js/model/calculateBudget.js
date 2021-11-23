export const calculateBudget = (type) => {
    let currMonth = document.querySelector('.budget__title--month').textContent
    let month = currMonth.toLowerCase()
    let sum = 0
    let suma = 0;
    if(month === 'february'){
        if(state.february.expenses.length === 0){
            state.february.totals = 0;
        }
        if(state.february.incomes.length === 0){
            state.february.total = 0;
        }
    
        if(type === 'exp'){
            state.february.expenses.forEach((el, i) =>{
                //console.log(parseInt(el.value))
                        // }
                sum += el.value;
                state.february.totals = sum;
                state.february.tot = state.february.total - state.february.totals
            })
            //calculatePercentage()
            document.querySelector('.budget__value').innerHTML = state.february.tot;
            document.querySelector('.budget__expenses--value').innerHTML = state.february.totals;
        }else if(type === 'inc'){
            state.february.incomes.forEach((el, i) =>{
                //console.log(parseInt(el.value))
                        // }
                suma += el.value;
                state.february.total = suma;
                state.february.tot = state.february.total - state.february.totals
            })
        }
            document.querySelector('.budget__income--value').innerHTML = state.february.total;
            //state.tot = state.total - state.totals
            document.querySelector('.budget__value').innerHTML = state.february.tot;
            //calculatePercentage();
    
        //UICtrl.renderBudget(state.february.total - state.february.totals)
    }else if(month === 'january'){
        if(state.january.expenses.length === 0){
            state.january.totals = 0;
        }
        if(state.january.incomes.length === 0){
            state.january.total = 0;
        }
    
        if(type === 'exp'){
            state.january.expenses.forEach((el, i) =>{
                //console.log(parseInt(el.value))
                        // }
                sum += el.value;
                state.january.totals = sum;
                state.january.tot = state.january.total - state.january.totals
            })
            //calculatePercentage()
            document.querySelector('.budget__value').innerHTML = state.january.tot;
            document.querySelector('.budget__expenses--value').innerHTML = state.january.totals;
        }else if(type === 'inc'){
            state.january.incomes.forEach((el, i) =>{
                //console.log(parseInt(el.value))
                        // }
                suma += el.value;
                state.january.total = suma;
                state.january.tot = state.january.total - state.january.totals
            })
        }
            document.querySelector('.budget__income--value').innerHTML = state.january.total;
            //state.tot = state.total - state.totals
            document.querySelector('.budget__value').innerHTML = state.january.tot;
            //calculatePercentage();
    
        //UICtrl.renderBudget(state.february.total - state.february.totals)
    }else if(month === 'november'){
        if(state.november.expenses.length === 0){
            state.november.totals = 0;
        }
        if(state.november.incomes.length === 0){
            state.november.total = 0;
        }
    
        if(type === 'exp'){
            state.november.expenses.forEach((el, i) =>{
                //console.log(parseInt(el.value))
                        // }
                sum += el.value;
                state.november.totals = sum;
                state.november.tot = state.november.total - state.november.totals
            })
            //calculatePercentage()
            document.querySelector('.budget__value').innerHTML = state.november.tot;
            document.querySelector('.budget__expenses--value').innerHTML = state.november.totals;
        }else if(type === 'inc'){
            state.november.incomes.forEach((el, i) =>{
                //console.log(parseInt(el.value))
                        // }
                suma += el.value;
                state.november.total = suma;
                state.november.tot = state.november.total - state.november.totals
            })
        }
            document.querySelector('.budget__income--value').innerHTML = state.november.total;
            //state.tot = state.total - state.totals
            document.querySelector('.budget__value').innerHTML = state.november.tot;
            //calculatePercentage();
    
        //UICtrl.renderBudget(state.february.total - state.february.totals)
    }else if(month === 'december'){
        if(state.december.expenses.length === 0){
            state.december.totals = 0;
        }
        if(state.december.incomes.length === 0){
            state.december.total = 0;
        }
    
        if(type === 'exp'){
            state.december.expenses.forEach((el, i) =>{
                //console.log(parseInt(el.value))
                        // }
                sum += el.value;
                state.december.totals = sum;
                state.december.tot = state.december.total - state.december.totals
            })
            //calculatePercentage()
            document.querySelector('.budget__value').innerHTML = state.december.tot;
            document.querySelector('.budget__expenses--value').innerHTML = state.december.totals;
        }else if(type === 'inc'){
            state.december.incomes.forEach((el, i) =>{
                //console.log(parseInt(el.value))
                        // }
                suma += el.value;
                state.december.total = suma;
                state.december.tot = state.december.total - state.december.totals
            })
        }
            document.querySelector('.budget__income--value').innerHTML = state.december.total;
            //state.tot = state.total - state.totals
            document.querySelector('.budget__value').innerHTML = state.december.tot;
            //calculatePercentage();
    
        //UICtrl.renderBudget(state.february.total - state.february.totals)
    }

}