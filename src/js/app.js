
// BUDGET CONTROLLER
/*
var budgetController = (function(){
    var Expense = function(id, description, value){
        this.id = id;
        this.description = description;
        this.value = value;
        this.percentage = -1;
    };

    Expense.prototype.calcPercentage = function(totalIncome){
        if(totalIncome > 0){
            this.percentage = Math.round((this.value / totalIncome) * 100)
        }else{
            this.percentage = -1
        }
    }
    Expense.prototype.getPercentage = function(){
        return this.percentage;
    }

    var Income = function(id, description, value){
        this.id = id;
        this.description = description;
        this.value = value;
    };

    var calculateTotal = function(type){
        var sum = 0;
        data.allItems[type].forEach(function(current){
            sum += current.value;
        });
        data.totals[type] = sum;

    }

    var data = {
        allItems: {
            inc: [],
            exp: []
        },
        totals: {
            exp: 0,
            inc: 0
        },
        budget: 0,
        percentage: -1     
    }

    return {
        addItem: function(type, des, val){
            var id;
            if(data.allItems[type].length > 0){
                id = data.allItems[type][data.allItems[type].length - 1].id + 1;
            } else{
                id = 0;
            }
            if (type === 'exp'){
                var newItem = new Expense(id, des, val);
            } else if (type === 'inc'){
                var newItem = new Income(id, des, val);
            }

            data.allItems[type].push(newItem);
            return newItem;
        },

        deleteItem: function(type, id){
            var ids, index;
            ids = data.allItems[type].map(function(current){
                return current.id;
            });

            index = ids.indexOf(id); 
            if(index !== -1){
                data.allItems[type].splice(index, 1);
            }
        },

        calculateBudget: function(){
        //1. Calculate total income and expenses
            calculateTotal('exp');
            calculateTotal('inc');
        //2. Calculate the budget: income - expenses

            data.budget = data.totals.inc - data.totals.exp;

        //3. Calculate the percentage of income
            if(data.totals.inc > 0){
                data.percentage = Math.round((data.totals.exp / data.totals.inc) * 100)
            }else{
                data.percentage = -1;
            }

        },

        calculatePercentages: function(){
            data.allItems.exp.forEach(function(cur){
                cur.calcPercentage(data.totals.inc);
            })
        },

        getPercentages: function(){
            var allPerc = data.allItems.exp.map(function(cur){
                return cur.getPercentage();
            });
            return allPerc;
        },

        getBudget: function(){
            return{
                budget: data.budget,
                totalInc: data.totals.inc,
                totalExp: data.totals.exp,
                percentage: data.percentage + ' %'
            }
        },

        testing: function(){
            console.log(data)
        }
    }
})();

// UI CONTROLLER
var UIController = (function(){

    
    var DOMStrings = {
        inputType: '.add__type',
        inputDescription: '.add__description',
        inputValue: '.add__value',
        inputBtn: '.add__btn',
        incomeContainer: '.income__list',
        expensesContainer: '.expenses__list',
        budgetValue: '.budget__value',
        budgetIncome: '.budget__income--value',
        budgetExpense: '.budget__expenses--value',
        budgetPercentage: '.budget__expenses--percentage',
        container: '.container',
        expensesPercLabel: '.item__percentage',
        dateLabel: '.budget__title--month'
    }

    var formatNumber = function(num, type){
        var numSplit, int, dec, sign;

        num = Math.abs(num);
        num = num.toFixed(2);
        numSplit = num.split('.');
        int = numSplit[0];
        if (int.length > 3){
            int = int.substr(0, int.length - 3) + ',' + int.substr(int.length - 3, 3)
        }
        dec = numSplit[1];

        return (type === 'exp' ? '-' : '+') + ' ' + int + '.' + dec
    }

    var nodeListForEach = function(list, callback){
        for(var i=0; i<list.length; i++){
            callback(list[i], i)
        }
    }

    return{
        getInput: function(){

            return{
                type: document.querySelector(DOMStrings.inputType).value,
                description: document.querySelector(DOMStrings.inputDescription).value,
                value: parseFloat(document.querySelector(DOMStrings.inputValue).value)
            }
        },

        addListItem: function(obj, type){
            var newHTML, element;
            if(type === 'inc'){
                element = DOMStrings.incomeContainer;
                var html = '<div class="item clearfix" id="inc-%id%"> <div class="item__description">%description%</div> <div class="right clearfix"> <div class="item__value">%value%</div> <div class="item__delete"> <button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button> </div> </div> </div>'
            } else if(type === 'exp'){
                element = DOMStrings.expensesContainer;
                var html = '<div class="item clearfix" id="exp-%id%"> <div class="item__description">%description%</div> <div class="right clearfix"> <div class="item__value">%value%</div> <div class="item__percentage">21%</div> <div class="item__delete"> <button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button> </div> </div> </div>'
            }

            newHTML = html.replace('%id%', obj.id)
            newHTML = newHTML.replace('%description%', obj.description)
            newHTML = newHTML.replace('%value%', formatNumber(obj.value, type))

            document.querySelector(element).insertAdjacentHTML('beforeend', newHTML);
        },

        deleteListItem: function(selectorID){
            var el = document.getElementById(selectorID);
            el.parentNode.removeChild(el);
        },

        clearFields: function(){
            var fields, fieldsArr;
            fields = document.querySelectorAll(DOMStrings.inputDescription + ', ' + DOMStrings.inputValue);
            fieldsArr = Array.prototype.slice.call(fields);
            fieldsArr.forEach(function(current) {
               current.value = "";
            });
            fieldsArr[0].focus();
        },

        displayBudget: function(obj){
            var type;
            type > 0 ? type = 'inc' : type = 'exp';
            document.querySelector(DOMStrings.budgetValue).textContent = formatNumber(obj.budget, type);
            document.querySelector(DOMStrings.budgetIncome).textContent = formatNumber(obj.totalInc, 'inc');
            document.querySelector(DOMStrings.budgetExpense).textContent = formatNumber(obj.totalExp, 'exp');
            if(obj.totalInc > 0) {
                document.querySelector(DOMStrings.budgetPercentage).textContent = obj.percentage;
            } else{
                document.querySelector(DOMStrings.budgetPercentage).textContent = '-';
            }
        },

        displayPercentages: function(percentages){
            var fields = document.querySelectorAll(DOMStrings.expensesPercLabel);
            nodeListForEach(fields, function(current, index){
                if(percentages[index] > 0){
                    current.textContent = percentages[index] + '%';
                } else{
                    current.textContent = '-'
                }
            });
        },
        displayMonth: function(){
            var date, year;
            date = new Date();
            year = date.getFullYear();
            var months = ['January','February','March','April','May','June','July','August','September','October','November','December'];
            var thisMonth = months[date.getMonth()];
            
            document.querySelector(DOMStrings.dateLabel).textContent = thisMonth + ' ' + year;
        },

        changedType: function(){
            var fields = document.querySelectorAll(
                DOMStrings.inputType + ',' + 
                DOMStrings.inputDescription + ',' + 
                DOMStrings.inputValue);

            nodeListForEach(fields, function(cur){
                cur.classList.toggle('red-focus');
            });
           document.querySelector(DOMStrings.inputBtn).classList.toggle('red');
        },

        getDOMStrings: function(){
            return DOMStrings;
        }
    }
})();

// GLOBAL APP CONTROLLER
var controller = (function(budgetCtrl, UICtrl){

    var setupEventListeners = function(){
        var DOM = UICtrl.getDOMStrings();
        document.querySelector(DOM.inputBtn).addEventListener('click', ctrlAddItem);

        document.addEventListener('keypress', function(event){
            if(event.keyCode === 13 || event.which === 13){
                ctrlAddItem();
            }
        });
        document.querySelector(DOM.container).addEventListener('click', ctrlDeleteItem);

        document.querySelector(DOM.inputType).addEventListener('change', UICtrl.changedType);
    }

    var ctrlDeleteItem = function(event){
        var itemID, type, ID;
        itemID = event.target.parentNode.parentNode.parentNode.parentNode.id;

        if(itemID){
            splitID = itemID.split('-')
            type = splitID[0]
            ID = parseInt(splitID[1])
        }
        // 1. Delete the item from the data structure
        
        budgetCtrl.deleteItem(type, ID)

        // 2. Delete the item from the UI
        UICtrl.deleteListItem(itemID)
        // 3. Update and show the new budget
        updateBudget();

        // 6. Calculate and update percentages
        updatePercentages(); 
    }

    var updateBudget = function() {

        //1. Calculate the budget
        budgetCtrl.calculateBudget();

        //2. Return budget
        var budget = budgetCtrl.getBudget();

        //3. Display the budget on the UI
        UICtrl.displayBudget(budget);
        }

    var updatePercentages = function(){

        // 1. Calculate percentages
        budgetCtrl.calculatePercentages()

        // 2. Read percentages from the budget controller
        var percentages = budgetCtrl.getPercentages()

        // 3. Update the UI with the new percentages
        UICtrl.displayPercentages(percentages);
        }

    var ctrlAddItem = function() {
        //1. Get the field input data
        var input = UICtrl.getInput();
        // Should not be not a number, if it's !== to is a number
        if(input.description !== "" && !isNaN(input.value) && input.value > 0) {
    	    //2. add the item to the budget controller
            var newItem = budgetCtrl.addItem(input.type, input.description, input.value);

            //3. add the item to the UI
            UICtrl.addListItem(newItem, input.type);

            //4. Clear fields
            UICtrl.clearFields();

            //5. Calculate and update budget
            updateBudget();

            // 6. Calculate and update percentages 

            updatePercentages();
        }
        
    }  

    return {
        init: function(){
            console.log('Application has started.')
            UICtrl.displayMonth();
            UICtrl.displayBudget({
                budget: 0,
                totalInc: 0,
                totalExp: 0,
                percentage: 0
                    });            
            setupEventListeners();
        }
    }
 

})(budgetController, UIController);

controller.init();

*/
/*

var budgetController = (function(){
    var Expense = function(id, description, value){
        this.id = id;
        this.description = description;
        this.value = value;
        this.percentage = -1;
    };

    Expense.prototype.calcPercentage = function(totalIncome){
        if(totalIncome > 0){
            this.percentage = Math.round((this.value / totalIncome) * 100); 
        } else {
            this.percentage = -1;
        }
    };

    Expense.prototype.getPercentage = function(){
        return this.percentage;
    };

    var Income = function(id, description, value){
        this.id = id;
        this.description = description;
        this.value = value;
    };

    var calculateTotal = function(type){
        var sum = 0;
        data.allItems[type].forEach(function(cur){
            sum += cur.value
        })
        data.totals[type] = sum;
    };

    var data = {
        allItems:{
            exp: [],
            inc: []
        },
        totals: {
            exp: 0,
            inc: 0
        },
        budget: 0,
        percentage: -1
    };

    return{
        addItem: function(type, des, val){
            var newItem, ID;
            // Create new ID
            if(data.allItems[type].length > 0){
                //[1 2 3 4 5], next ID = 6
                //[1 2 4 6 8], next ID = 9
                //[1 2 4 6 8] => data.allItems[type] for example array of an incomes

                // I am looking for array of inc or expense, and then I am looking for last ID in this array
                // I am going to get the last it of this array if I look for the length -1 and dot id and the next id is plus 1
                ID = data.allItems[type][data.allItems[type].length -1].id + 1
            } else{
                ID = 0;
            }
            // Create new item based on 'inc' or 'exp'
            if(type === 'exp'){
                newItem = new Expense(ID, des, val);
            } else if(type === 'inc') {
                newItem = new Income(ID, des, val);
            }
            // Push it into our data structure
            data.allItems[type].push(newItem)
            // Return the new element
            return newItem;
        },
        
        deleteItem: function(type, id){
            var ids, index;
            // id = 6
            // data.allItems[type][id];
            // ids = [1 2 4 6 8]
            // index = 3

            ids = data.allItems[type].map(function(current){
                return current.id;
            });
            index = ids.indexOf(id);

            if(index !== -1){
                data.allItems[type].splice(index, 1)
            }

        },

        calculateBudget: function(){

            // calculate total income and expenses 
            calculateTotal('exp');
            calculateTotal('inc');
            
            // calculate the budget: income - expenses

            data.budget = data.totals.inc - data.totals.exp;
            
            // Calculate the percentage of income that we spend

            if(data.totals.inc > 0){
                data.percentage = Math.round((data.totals.exp / data.totals.inc) * 100)
            } else{
                data.percentage = -1;
            }
            
        },

        calculatePercentages: function(){

            /*
            a = 20
            b = 10
            c = 40
            income = 100
            a = 20/100 = 20%
            b = 10/100 = 10%
            c = 40/100 = 40%
            */
           /*
            data.allItems.exp.forEach(function(cur){
                cur.calcPercentage(data.totals.inc);
            });
        },

        getPercentages: function(){
            var allPerc = data.allItems.exp.map(function(cur){
               return cur.getPercentage();
            });
            return allPerc;
        },

        getBudget: function(){
            return{
                budget: data.budget,
                totalInc: data.totals.inc,
                totalExp: data.totals.exp,
                percentage: data.percentage 
            };
        },

        testing: function() {
            console.log(data)
        }
    }

})();


var UIController = (function(){

    var DOMStrings = {
        inputType: '.add__type',
        inputDescription: '.add__description',
        inputValue: '.add__value',
        inputBtn: '.add__btn',
        incomeContainer: '.income__list',
        expensesContainer: '.expenses__list',
        budgetLabel: '.budget__value',
        incomeLabel: '.budget__income--value',
        expensesLabel: '.budget__expenses--value',
        percentageLabel: '.budget__expenses--percentage',
        container: '.container',
        expensesPercLabel: '.item__percentage',
        dateLabel: '.budget__title--month'
    };
    var formatNumber = function(num, type){
        var numSplit, int, dec, type;
        // + or - before number
        // exactly 2 decimal points
        // coma separating the thousands
        // 2310.4567 => 2,310.46
        // 2000 => + 2,000.00

        num = Math.abs(num);
        num = num.toFixed(2);
        numSplit = num.split('.');

        int = numSplit[0];
        if(int.length > 3){
            int = int.substr(0, int.length - 3) + ',' + int.substr(int.length - 3, 3);
        }

        dec = numSplit[1];

        return (type === 'exp' ? '-' : '+') + ' ' + int + '.' + dec;
    };

    var nodeListForEach = function(list, callback){
        for(var i=0; i < list.length; i++){
            callback(list[i], i);
        }
    };

    return { // This return is used so the function isn't private and we can call the function in controller method
        getinput: function(){
            return{ // this return is used so we can return the values
                type: document.querySelector(DOMStrings.inputType).value,
                description: document.querySelector(DOMStrings.inputDescription).value,
                value: parseFloat(document.querySelector(DOMStrings.inputValue).value)
            };  
        },

        addListItem: function(obj, type){
            var html, newHtml, element;
            // Create HTML string with placeholder text
            if (type === 'inc'){
                element = DOMStrings.incomeContainer;
            html = '<div class="item clearfix" id="inc-%id%"> <div class="item__description">%description%</div> <div class="right clearfix"> <div class="item__value">%value%</div> <div class="item__delete"> <button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button> </div> </div> </div>'
        } else if(type === 'exp'){
                element = DOMStrings.expensesContainer;
                html = '<div class="item clearfix" id="exp-%id%"><div class="item__description">%description%</div><div class="right clearfix"><div class="item__value">%value%</div><div class="item__percentage">21%</div><div class="item__delete"><button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button></div></div></div>';
            }

            // Replace the placeholder text with some actual data

            newHtml = html.replace('%id%', obj.id);
            newHtml = newHtml.replace('%description%', obj.description)
            newHtml = newHtml.replace('%value%', formatNumber(obj.value, type))          
            // Insert the HTML into the dom
            
            document.querySelector(element).insertAdjacentHTML('beforeend', newHtml);
        },

        deleteListItem: function(selectorID){
            var el = document.getElementById(selectorID)
            el.parentNode.removeChild(el)
        },

        clearFields: function(){
            //Two way of doing this, first one:
            //let fields;
            //fields = document.querySelectorAll(DOMStrings.inputDescription + ', ' + DOMStrings.inputValue)
            //let fieldsArray = Array.from(fields);
            //callback function after forEach
            //fieldsArray.forEach(function(cur){
              // cur.value = "";
            //});
            //fieldsArray[0].focus();
            // Second one: 
            var fields, fieldsArray;
            fields = document.querySelectorAll(DOMStrings.inputDescription + ', ' + DOMStrings.inputValue)
            fieldsArray = Array.prototype.slice.call(fields);
            //callback function after forEach
            fieldsArray.forEach(function(cur){
               cur.value = "";
            });
            fieldsArray[0].focus();
        },

        displayBudget: function(obj) {
            obj.budget > 0 ? type = 'inc' : type = 'exp'
            document.querySelector(DOMStrings.budgetLabel).textContent = formatNumber(obj.budget, type);
            document.querySelector(DOMStrings.incomeLabel).textContent = formatNumber(obj.totalInc, 'inc');
            document.querySelector(DOMStrings.expensesLabel).textContent = formatNumber(obj.totalExp, 'exp');
            if (obj.percentage > 0) {
                document.querySelector(DOMStrings.percentageLabel).textContent = obj.percentage + '%';
            } else {
                document.querySelector(DOMStrings.percentageLabel).textContent = '---';
            }
        },

        displayPercentages: function(percentages){
            var fields = document.querySelectorAll(DOMStrings.expensesPercLabel);
            nodeListForEach(fields, function(current, index){
                if(percentages[index] > 0){
                    current.textContent = percentages[index] + '%';
                } else{
                    current.textContent = '---';
                }
            });
        },

        displayMonth: function(){
            var now, year, month, months;
            now = new Date();
            year = now.getFullYear();
            months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']
            month = months[now.getMonth()]
            document.querySelector(DOMStrings.dateLabel).textContent = month + ' ' + year;
        },

        changedType: function(){
            var fields = document.querySelectorAll(DOMStrings.inputType + ', ' + DOMStrings.inputDescription + ', ' + DOMStrings.inputValue)

            nodeListForEach(fields, function(cur){
                cur.classList.toggle('red-focus');
            })
            document.querySelector(DOMStrings.inputBtn).classList.toggle('red');
        },

        getDOMStrings: function(){
            return DOMStrings; // exposing the domstrings into the public
        }

    };

})();

var controller = (function(budgetCtrl, UICtrl){


    var setupEventListeners = function(){
        var DOM = UICtrl.getDOMStrings();

        document.querySelector(DOM.inputBtn).addEventListener('click', ctrlAddItem);

        document.addEventListener('keypress', function(event){
            if(event.keyCode === 13 || event.which === 13){
                ctrlAddItem();
            }
        });
        document.querySelector(DOM.container).addEventListener('click', ctrlDeleteItem);
        document.querySelector(DOM.inputType).addEventListener('change', UICtrl.changedType);
    }

    var updateBudget = function(){

        // 1. Calculate the budget 
        budgetCtrl.calculateBudget();

        // 2. Return the budget
        var budget = budgetCtrl.getBudget();

        // 3. Display the budget
        UICtrl.displayBudget(budget);
        console.log(budget);
    };

    var updatePercentages = function(){
        // 1. Calculate the percentages

        budgetCtrl.calculatePercentages();

        // 2. Read them from the budget controller

        var percentages = budgetCtrl.getPercentages()

        // 3. Update the UI with the new percentages

        UICtrl.displayPercentages(percentages)
        console.log(percentages)
    };

    var ctrlAddItem = function(){
        var input, newItem;
        // 1.Get the field input data

        input = UICtrl.getinput();


        if(input.description !== "" && !isNaN(input.value) && input.value > 0){

            // 2. Add the item to the budget controller
            newItem = budgetCtrl.addItem(input.type, input.description, input.value)

            // 3. Add new item to the UI
    
            UICtrl.addListItem(newItem, input.type)
    
            // 4. Clear the fields
            UICtrl.clearFields()
    
            // 5. Calculate and update budget
            updateBudget();

            // 6. Calculate and update percentages
            updatePercentages();
        }

    };

    var ctrlDeleteItem = function(event){
        var itemID, splitID, type , ID;
        itemID = event.target.parentNode.parentNode.parentNode.parentNode.id
        if(itemID){
            //inc-1
            splitID = itemID.split('-');
            type = splitID[0];
            ID = parseInt(splitID[1]);
            // 1. Delete item from the data structer

            budgetCtrl.deleteItem(type, ID);

            // 2. Delete the item from the UI

            UICtrl.deleteListItem(itemID)

            // 3. Update and show the new budget

            updateBudget();        

            // 4. Calculate and update percentages
            updatePercentages();
        }
    }

    return {
        init: function(){
            console.log('Application has started');
            UICtrl.displayMonth();
            UICtrl.displayBudget({
                budget: 0,
                totalInc: 0,
                totalExp: 0,
                percentage: -1 
            });
            setupEventListeners();
        }
    }
    
})(budgetController, UIController);

controller.init();



*/

/*
var budgetController = (function () {

    var Expense = function (id, description, value) {
        this.id = id;
        this.description = description;
        this.value = value;
        this.percentage = -1;
    }

    Expense.prototype.calcPercentage = function (totalIncome){
        if(totalIncome  > 0){
            this.percentage = Math.round((this.value / totalIncome) * 100)
        } else {
            this.percentage = -1
        }

    };

    Expense.prototype.getPercentage = function(){
        return this.percentage;
    }

    var Income = function (id, description, value) {
        this.id = id;
        this.description = description;
        this.value = value;
    }

    var calculateTotal = function(type) {
        var sum = 0;
        data.allItems[type].forEach(function(cur) {
            sum += cur.value
        })
        data.totals[type] = sum;
    }

    var data = {
        allItems: {
            exp: [],
            inc: []
        },
        totals: {
            exp: 0,            
            inc: 0
        },
        budget: 0,
        percentage: -1,
    }
    return {
        addItem: function (type, des, val){
            var newItem, ID;
            //var id = 0;
            if(data.allItems[type].length > 0){
                ID = parseInt(data.allItems[type][data.allItems[type].length - 1].id + 1);
            } else{
                ID = 0
            }
            if(type === 'exp'){
                newItem = new Expense(ID, des, val);
            } else if(type === 'inc'){
                newItem = new Income(ID, des, val);
            }
            data.allItems[type].push(newItem);
            return newItem;
        },

        deleteItem: function(type, id) {

            // id = 6
            // data.allItems[type][id];
            // ids = [1, 2, 4, 6, 8]
            // index = 3
            var ids = data.allItems[type].map(function(current) {
                return current.id;
            })

            var index = ids.indexOf(id);

            if(index !== -1) {
                data.allItems[type].splice(index, 1);
            }

        },

        calculateBudget: function() {

            // calculate total income and expenses
            calculateTotal('exp');
            calculateTotal('inc');

            //calculate the budget: income - expenses
            data.budget = data.totals.inc - data.totals.exp

            if(data.totals. inc > 0) data.percentage = Math.round((data.totals.exp / data.totals.inc) * 100) + ' ' + '%'

        },

        calculatePercentages: function(){
            data.allItems.exp.forEach(current => {
                current.calcPercentage(data.totals.inc)
            })
        },

        getPercentages: function(){
            var allPerc = data.allItems.exp.map((cur) => {
                return cur.getPercentage();
            });
            return allPerc;
        },

        getBudget: function() {
            return {
                budget: data.budget,
                totalInc: data.totals.inc,
                totalExp: data.totals.exp,
                percentage: data.percentage,
            }
        },

        testing: function(){
            console.log(data)
        }
    }
    

    
})()

var UIController = (function() {

    var DOMStrings = {
        inputType: '.add__type',
        inputDescription: '.add__description',
        inputValue: '.add__value',
        inputBtn: '.add__btn',
        incomeContainer: '.income__list',
        expensesContainer: '.expenses__list',
        budgetLabel: '.budget__value',
        incomeLabel: '.budget__income--value',
        expenseLabel: '.budget__expenses--value',
        percentageLabel: '.budget__expenses--percentage',
        container: '.container',
        expensesPercLabel: '.item__percentage',
        displayMonth: '.budget__title--month'

    }

    var formatNumber = function(num, type){
        // + or - before number

        // exactly 2 decimal points

        //comma separating the thousands
        num = Math.abs(num);
        num = num.toFixed(2);

        var numSplit = num.split('.');
        var int = numSplit[0];
        if(int.length > 3){
            int = int.substr(0, int.length - 3) + ',' + int.substr(int.length - 3, int.length)
        }

        var dec = numSplit[1]
        type=== 'exp' ? sign = '-' : sign = '+';

        return (type ===  'exp' ? '-' : '+') + ' ' +  int +  '.' + dec
    }
    var nodeListForEach = function(list, callback){
        for(var i  = 0; i<list.length;  i++){
            callback(list[i], i)
        }
    };

    return {
        getInput: function() {
            return {
                type: document.querySelector(DOMStrings.inputType).value,
                description: document.querySelector(DOMStrings.inputDescription).value,
                value: parseFloat(document.querySelector(DOMStrings.inputValue).value)
            }
        },
        addListItem: function (obj, type){
            var html, newHTML, element;
            // Create HTML string with placeholder text
            if(type === 'inc'){
                element = DOMStrings.incomeContainer;
                html = '<div class="item clearfix" id="inc-%id%"> <div class="item__description">%description%</div> <div class="right clearfix"> <div class="item__value">%value%</div> <div class="item__delete"> <button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button> </div> </div> </div>'
            } else {
                element = DOMStrings.expensesContainer;
                html = '<div class="item clearfix" id="exp-%id%"> <div class="item__description">%description%</div> <div class="right clearfix"> <div class="item__value">%value%</div> <div class="item__percentage">21%</div> <div class="item__delete"> <button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button> </div> </div> </div>'
            }
            // Replace the placeholder text with some actual data
            newHTML = html.replace('%id%', obj.id);
            newHTML = newHTML.replace('%description%', obj.description);
            newHTML = newHTML.replace('%value%', formatNumber(obj.value, type));

            // Insert the HTML into the DOM
            document.querySelector(element).insertAdjacentHTML('beforeend', newHTML)
        },

        deleteListItem: function(selectorID) {
            var el = document.getElementById(selectorID);
            el.parentNode.removeChild(el);
        },

        clearFields: function () {
            var fields = document.querySelectorAll(DOMStrings.inputDescription + ', ' + DOMStrings.inputValue);
            var fieldsArray = Array.prototype.slice.call(fields);
            fieldsArray.forEach(e => e.value = '');
            fieldsArray[0].focus();
        },

        displayBudget: function (obj) {
            var months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
            var date = new Date();
            var type;
            obj.budget >= 0 ? type = 'inc' : type = 'exp'
            document.querySelector(DOMStrings.budgetLabel).innerHTML = formatNumber(obj.budget, type);
            document.querySelector(DOMStrings.incomeLabel).innerHTML = formatNumber(obj.totalInc, 'inc');
            document.querySelector(DOMStrings.expenseLabel).innerHTML = formatNumber(obj.totalExp, 'exp');
            document.querySelector(DOMStrings.displayMonth).innerHTML = months[date.getMonth()] + ' ' + date.getFullYear();

            if(obj.budget > 0) {
                document.querySelector(DOMStrings.percentageLabel).innerHTML = obj.percentage;
            } else {
                document.querySelector(DOMStrings.percentageLabel).innerHTML = '-';
            }
        },
        displayPercentages: function(percentages) {
            var fields = document.querySelectorAll(DOMStrings.expensesPercLabel);

            nodeListForEach(fields, function(current, index) {
                if(percentages[index] > 0){
                    current.textContent = percentages[index] + '%';
                } else {
                    current.textContent = '----'
                }
            })
        },

        changedType: function() {
            var fields = document.querySelectorAll(
                DOMStrings.inputType + ','  +
                DOMStrings.inputDescription + ',' +
                DOMStrings.inputValue
            );
            nodeListForEach(fields, function(cur){
                cur.classList.toggle('red-focus')
            }) 
            document.querySelector(DOMStrings.inputBtn).classList.toggle('red')
        },

        getDOMStrings: function() {
                return DOMStrings
        }
    }

})()

var controller = (function(budgetCtrl, UICtrl) {

    var setupEventListeners = function () {

        var DOM = UICtrl.getDOMStrings();

        document.querySelector(DOM.inputBtn).addEventListener('click', ctrlAddItem);
    
        document.addEventListener('keypress', function(event){
            if(event.keyCode === 13) {
                ctrlAddItem();
            }
        })  
        document.querySelector(DOM.container).addEventListener('click', ctrlDeleteItem) 
        document.querySelector(DOM.inputType).addEventListener('change', UICtrl.changedType) 
    }

    var updatePercentages = function () {

        // 1. Calculate percentages
        budgetCtrl.calculatePercentages();

        // 2. Read percentages from the budget controller
        var percentages = budgetCtrl.getPercentages();

        // 3. Update the UI with the new percentages
        UICtrl.displayPercentages(percentages)

    }

    var updateBudget = function () {
        // 1. calculate the budget
        budgetCtrl.calculateBudget();
        // 2. return the budget
        var budget = budgetCtrl.getBudget();
        // 3. Display the budget on the UI
        console.log(budget)
        UICtrl.displayBudget(budget);
    }

    var ctrlAddItem = function () {

        // get the field input data
        var input = UICtrl.getInput()
        console.log(input);
        // add the item to the budget controller
        if(input.description !== '' && !isNaN(input.value) && input.value > 0){
            var newItem = budgetCtrl.addItem(input.type, input.description, input.value);
            budgetCtrl.testing(input.type)
            // add the new item to the user interface
            UICtrl.addListItem(newItem, input.type)
            UICtrl.clearFields();
            // calculate and update budget
            updateBudget();     
            updatePercentages();
       
        }

    };

    var ctrlDeleteItem = function (event) {
        var itemID, splitID, type, ID;
        itemID = event.target.parentNode.parentNode.parentNode.parentNode.id
        if(itemID){
            //inc-1
            splitID = itemID.split('-');
            type = splitID[0];
            ID = parseInt(splitID[1])

            // 1. Delete the item from the data structure

            budgetCtrl.deleteItem(type, ID);

            // 2. Delete the item from the user interface

            UICtrl.deleteListItem(itemID);

            // 3. Update and show the new budget

            updateBudget();

            // 4. Calculate and update percentages

            updatePercentages();
        }
    }

    return {
        init: function () {
            UICtrl.displayBudget({
                budget: 0,
                totalInc: 0,
                totalExp: 0,
                percentage: -1
            });
            setupEventListeners();   
        }
    }

})(budgetController, UIController)
controller.init()





*/

import Expense from './model/Expenses';
import Income from './model/Incomes';
import * as UICtrl from './view/UIController';
import * as persist from './model/persist'
import * as read from './model/read';
import * as calc from './model/calculateBudget'
import {elements} from './view/base';
import uniqid from 'uniqid';


import x from './test'

console.log('I imported this from another module: ' + x);

const state = {
   january: {
       expenses: [],
       incomes: []
   },   
   february: {
        expenses: [],
        incomes: [],
    },
    november: {
        expenses: [],
        incomes: []
    },
    december: {
        expenses: [],
        incomes: []
    },
};
window.state = state;

const init = () => {
    const month = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']
    let date = new Date().getMonth()
    const monthDate = month[date]
    console.log(monthDate)
    document.querySelector('.budget__title--month').textContent = monthDate
}
init()

// const persistData = () => {
//     localStorage.setItem('expenses', JSON.stringify(state.expenses))
// }
// const persistDataInc = () => {
//     localStorage.setItem('incomes', JSON.stringify(state.incomes))
// }
// const readStorage = () => {
//     const storage = JSON.parse(localStorage.getItem('expenses'))
//     if(storage) state.expenses = storage;
// }
// const readStorageInc = () => {
//     const storage = JSON.parse(localStorage.getItem('incomes'))
//     if(storage) state.incomes = storage;
// }
const calculatePercentage = () => {
    const percentage = state.totals/state.total * 100
    state.percentage = Math.round(percentage * 100)/100 
    document.querySelector('.budget__expenses--percentage').innerHTML = state.percentage + '%'; 
}
const ctrlAddItem = (el) => {
    const input = UICtrl.getInput();
    const id = uniqid();
        if(input.type === 'exp') {
            console.log('if statement works')
            //let month = state.january.expenses
            const expense = new Expense(id, input.description, input.value);
            //state.expenses.addLike(id, input.description, input.value)
            //state.expenses.push(expense)
            //if(state.expenses.length > 1){
            el.push(expense)
            //persistDataFeb()
            //persistDataJan()
            //const please = state.expenses.forEach((el) => console.log(el))
            //console.log(please)
            console.log('test' + el.at(-1).id)
            UICtrl.renderIncExp(el.at(-1), elements.expensesContainer)
            // for(let i = 0; i< state.expenses.length; i++){
            //     consolmonthstate.january.expenses.forEach((el) => persistData(el))
            console.log(el)
            let currMonth = document.querySelector('.budget__title--month').textContent
            let month = currMonth.toLowerCase()
            if(month === 'february'){
                calc.calculateBudget('exp', state.february.incomes, state.february.expenses, state.february.totals, state.february.total, state.february.tot)
            }else if(month === 'january'){
                calc.calculateBudget('exp')
            }else if(month === 'november'){
                calc.calculateBudget('exp')
            }else if(month === 'december'){
                calc.calculateBudget('exp')
            }
            //calculateBudget('exp')
    
            //document.querySelector('.budget__expenses--value').innerHTML = state.totals;
            // for(let i = 0; i< state.expenses.length; i++){
            //     console.log(state.expenses.likes[i])
            // }
            //console.log(state.expenses[0].likes)
    }else {
        const income = new Income(id, input.description, input.value);
        //state.incomes.push(income)
        el.push(income)
        //calculateBudget('inc')
        let currMonth = document.querySelector('.budget__title--month').textContent
        let month = currMonth.toLowerCase()
        if(month === 'february'){
            calc.calculateBudget('inc', state.february.incomes, state.february.totals, state.february.total, state.february.tot)
            console.log(state.february.totals, state.february.total, state.february.tot)
        } else if(month === 'january'){
            calc.calculateBudget('inc')
        }else if(month === 'november'){
            calc.calculateBudget('inc')
        }else if(month === 'december'){
            calc.calculateBudget('inc')
        }
        //console.log(state.total)
        //document.querySelector('.budget__income--value').innerHTML = state.total;

        UICtrl.renderIncExp(el.at(-1), elements.incomeContainer)

        //persistDataInc()

        console.log(el)       
    }
    
    if(state.totals === '' || state.total === '') {
        state.percentage = 0
    } else {
        calculatePercentage()
    }

}

elements.inputBtn.addEventListener('click',() => {
    const input = UICtrl.getInput();
    let currMonth = document.querySelector('.budget__title--month').textContent
    let month = currMonth.toLowerCase()
    console.log(month + ' thats it');
    console.log(state.january.expenses)
    if(month === 'february'){
        if(input.type === 'exp'){
            ctrlAddItem(state.february.expenses)
            persist.persistDataPerMonth('expensesFeb', state.february.expenses)
            persist.persistDataPerMonth('totalsFeb', state.february.totals)
            persist.persistDataPerMonth('totalFeb', state.february.total)
            persist.persistDataPerMonth('totFeb', state.february.tot)
            calc.calculateBudget()
            state.february.tot = state.february.total - state.february.totals
            document.querySelector('.budget__value').innerHTML = state.february.tot;
        }else if(input.type === 'inc') {
            ctrlAddItem(state.february.incomes)
            persist.persistDataPerMonth('incomesFeb', state.february.incomes)
            calc.calculateBudget()

        }
    }else if(month === 'january'){
        if(input.type === 'exp'){
            ctrlAddItem(state.january.expenses)
            persist.persistDataPerMonth('expensesJan', state.january.expenses)
            persist.persistDataPerMonth('totalsJan', state.january.totals)
            persist.persistDataPerMonth('totalJan', state.january.total)
            persist.persistDataPerMonth('totJan', state.january.tot)
            state.january.tot = state.january.total - state.january.totals
            document.querySelector('.budget__value').innerHTML = state.january.tot;
            calc.calculateBudget()
        }else if (input.type === 'inc'){
            ctrlAddItem(state.january.incomes)
            persist.persistDataPerMonth('incomesJan', state.january.incomes)
        }
    }else if(month === 'november'){
        if(input.type === 'exp'){
            ctrlAddItem(state.november.expenses)
            persist.persistDataPerMonth('expensesNov', state.november.expenses)
        }else if(input.type === 'inc') {
            ctrlAddItem(state.november.incomes)
            persist.persistDataPerMonth('incomesNov', state.november.incomes)
        }
        persist.persistDataPerMonth('expensesNov', state.november.expenses)
        persist.persistDataPerMonth('totalsNov', state.november.totals)
        persist.persistDataPerMonth('totalNov', state.november.total)
        persist.persistDataPerMonth('totNov', state.november.tot)
        calc.calculateBudget()
    }else if(month === 'december'){
        if(input.type === 'exp'){
            ctrlAddItem(state.december.expenses)
            persist.persistDataPerMonth('expensesDec', state.december.expenses)
        }else if(input.type === 'inc') {
            ctrlAddItem(state.december.incomes)
            persist.persistDataPerMonth('incomesDec', state.december.incomes)
        }
        persist.persistDataPerMonth('totalsDec', state.december.totals)
        persist.persistDataPerMonth('totalDec', state.december.total)
        persist.persistDataPerMonth('totDec', state.december.tot)
        calc.calculateBudget()
    }
});


document.addEventListener('keypress', function(event){
    if(event.keyCode === 13) {
        ctrlAddItem();
    }
}) 

window.addEventListener('load', () => {
        let currMonth = document.querySelector('.budget__title--month').textContent
        let month = currMonth.toLowerCase()
        if(month === 'january'){
            read.readStorageTotalsJan()
            read.readStorageJan()
            calc.calculateBudget()
            read.readStorageIncJan()
        }else if(month === 'february'){
            read.readStorageTotalsFeb()
            read.readStorageFeb()
            read.readStorageIncFeb()
            calc.calculateBudget()
        }else if(month === 'november'){
            read.readStorageTotalsNov()
            read.readStorageNov()
            read.readStorageIncNov()
            calc.calculateBudget()
        }else if(month === 'december'){
            read.readStorageTotalsDec()
            read.readStorageDec()
            read.readStorageIncDec()
            calc.calculateBudget()
        }
        //readStorage()

        // document.querySelector('.budget__title--month').innerHTML = 'November'
        // const nov =  document.querySelector('.budget__title--month').textContent
        // const novMonth = nov.toLowerCase()
        // if(novMonth) readStorageIncNov()

        //elements.expensesContainer.innerHTML = '';
        //const storeNov = JSON.parse(localStorage.getItem('expensesNov'))
        //if(storeNov) storeNov.forEach(el => UICtrl.renderIncExp(el, elements.expensesContainer))

        const store = JSON.parse(localStorage.getItem('expenses'))
        if(store) store.forEach(el => UICtrl.renderIncExp(el, elements.expensesContainer))
        //readStorageInc()
        const storeInc = JSON.parse(localStorage.getItem('incomes'))
        //if(storeInc) storeInc.forEach(el => UICtrl.renderIncExp(el, elements.incomeContainer))
        //calculateBudget('inc')
        //calculateBudget('exp')
})
document.querySelector('.bottom').addEventListener('click', e => {
    const id = e.target.parentNode.parentNode.parentNode.parentNode.id
    if(e.target.matches('.income, .income *')){
        console.log('it matches')
        if(e.target.matches('.item__delete--btn, .item__delete--btn *')){
            //const incomeIndex = state.incomes.findIndex(el => el.id === id)
            //state.incomes.splice(incomeIndex, 1)
            let currMonth = document.querySelector('.budget__title--month').textContent
            let month = currMonth.toLowerCase()
            if(month === 'november'){
                const incomeIndexNov = state.november.incomes.findIndex(el => el.id === id)
                state.november.incomes.splice(incomeIndexNov, 1)
                persist.persistDataPerMonth('incomesNov', state.november.incomes)
                //UICtrl.removeIncExp(id)
                read.readStorageIncNov()
                calc.calculateBudget('inc')
                persist.persistDataPerMonth('totalNov', state.november.total)
                persist.persistDataPerMonth('totNov', state.november.tot)
                //const storeNov = JSON.parse(localStorage.getItem('expensesNov'))
                //if(storeNov) storeNov.forEach(el => UICtrl.renderIncExp(el, elements.expensesContainer))
            }else if(month === 'january'){
                const incomeIndexJan = state.january.incomes.findIndex(el => el.id === id)
                state.january.incomes.splice(incomeIndexJan, 1)
                persist.persistDataPerMonth('incomesJan', state.january.incomes)
                //UICtrl.removeIncExp(id)
                read.readStorageIncJan()
                calc.calculateBudget('inc')
                persist.persistDataPerMonth('totalJan', state.january.total)
                persist.persistDataPerMonth('totJan', state.january.tot)
                //const storeNov = JSON.parse(localStorage.getItem('expensesNov'))
                //if(storeNov) storeNov.forEach(el => UICtrl.renderIncExp(el, elements.expensesContainer))
            }else if(month === 'february'){
                const incomeIndexFeb = state.february.incomes.findIndex(el => el.id === id)
                state.february.incomes.splice(incomeIndexFeb, 1)
                persist.persistDataPerMonth('incomesFeb', state.february.incomes)
                //UICtrl.removeIncExp(id)
                read.readStorageIncFeb()
                calc.calculateBudget('inc')
                persist.persistDataPerMonth('totalFeb', state.february.total)
                persist.persistDataPerMonth('totFeb', state.february.tot)
                //const storeNov = JSON.parse(localStorage.getItem('expensesNov'))
                //if(storeNov) storeNov.forEach(el => UICtrl.renderIncExp(el, elements.expensesContainer))
            }else if(month === 'december'){
                const incomeIndexDec = state.december.incomes.findIndex(el => el.id === id)
                state.december.incomes.splice(incomeIndexDec, 1)
                persist.persistDataPerMonth('incomesDec', state.december.incomes)
                //UICtrl.removeIncExp(id)
                read.readStorageIncDec()
                calc.calculateBudget('inc')
                persist.persistDataPerMonth('totalDec', state.december.total)
                persist.persistDataPerMonth('totDec', state.december.tot)
                //const storeNov = JSON.parse(localStorage.getItem('expensesNov'))
                //if(storeNov) storeNov.forEach(el => UICtrl.renderIncExp(el, elements.expensesContainer))
            }
            //calculateBudget('inc')
                //persistDataInc()
                //readStorageInc()
            //UICtrl.removeIncExp(id)
            //document.querySelector('.budget__expenses--value').innerHTML = state.totals;
            console.log(state)
        }
    }
    if(e.target.matches('.expenses, .expenses *')){
        if(e.target.matches('.item__delete--btn, .item__delete--btn *')){
            //console.log('delete')
            //const expenseIndex = state.expenses.findIndex(el => el.id === id)
            //state.expenses.splice(expenseIndex, 1)
            UICtrl.removeIncExp(id)
            let currMonth = document.querySelector('.budget__title--month').textContent
            let month = currMonth.toLowerCase()
            if(month === 'november'){
                const expenseIndexNov = state.november.expenses.findIndex(el => el.id === id)
                state.november.expenses.splice(expenseIndexNov, 1)
                persist.persistDataPerMonth('expensesNov', state.november.expenses)
                //UICtrl.removeIncExp(id)
                read.readStorageNov()
                calc.calculateBudget('exp')
                persist.persistDataPerMonth('totalsNov', state.november.totals)
                persist.persistDataPerMonth('totNov', state.november.tot)
                //const storeNov = JSON.parse(localStorage.getItem('expensesNov'))
                //if(storeNov) storeNov.forEach(el => UICtrl.renderIncExp(el, elements.expensesContainer))
            }else if(month === 'january'){
                const expenseIndexNov = state.january.expenses.findIndex(el => el.id === id)
                state.january.expenses.splice(expenseIndexNov, 1)
                persist.persistDataPerMonth('expensesJan', state.january.expenses)
                //UICtrl.removeIncExp(id)
                read.readStorageJan()
                calc.calculateBudget('exp')
                persist.persistDataPerMonth('totalsJan', state.january.totals)
                persist.persistDataPerMonth('totJan', state.january.tot)
                //const storeNov = JSON.parse(localStorage.getItem('expensesNov'))
                //if(storeNov) storeNov.forEach(el => UICtrl.renderIncExp(el, elements.expensesContainer))
            }else if(month === 'february'){
                const expenseIndexNov = state.february.expenses.findIndex(el => el.id === id)
                state.february.expenses.splice(expenseIndexNov, 1)
                persist.persistDataPerMonth('expensesFeb', state.february.expenses)
                //UICtrl.removeIncExp(id)
                read.readStorageFeb()
                calc.calculateBudget('exp')
                persist.persistDataPerMonth('totalsFeb', state.february.totals)
                persist.persistDataPerMonth('totFeb', state.february.tot)

                //const storeNov = JSON.parse(localStorage.getItem('expensesNov'))
                //if(storeNov) storeNov.forEach(el => UICtrl.renderIncExp(el, elements.expensesContainer))
            }else if(month === 'december'){
                const expenseIndexDec = state.december.expenses.findIndex(el => el.id === id)
                state.december.expenses.splice(expenseIndexDec, 1)
                persist.persistDataPerMonth('expensesDec', state.december.expenses)
                //UICtrl.removeIncExp(id)
                read.readStorageDec()
                calc.calculateBudget('exp')
                persist.persistDataPerMonth('totalsDec', state.december.totals)
                persist.persistDataPerMonth('totDec', state.december.tot)

                //const storeNov = JSON.parse(localStorage.getItem('expensesNov'))
                //if(storeNov) storeNov.forEach(el => UICtrl.renderIncExp(el, elements.expensesContainer))
            }
            //calculateBudget('exp')
                //persistData()
                //readStorage()

            //document.querySelector('.budget__income--value').innerHTML = state.total;
            //console.log(expenseIndex)
    } 
            //console.log(parseInt(el.value))
                    // }
            //const test = el.findIndex(el => el.id === id)    
            //console.log(test)    
            // if(el.id === id){
            //     console.log('it is a match')
            //     el.splice(el, 1)
            // }
        //})
    }
})
document.querySelector('.first__month').addEventListener('click', () => {
    // let currMonth = document.querySelector('.budget__title--month').textContent
    // document.querySelector('.budget__title--month').innerHTML = currMonth
    // let month = currMonth.toLowerCase()
    // console.log('its January')
    // console.log(month + ' thats it');
    // console.log(state.january.expenses)
    // if(month === 'january'){
    //     ctrlAddItem(state.january.expenses);  
    // }
    console.log(`It's January`)
    document.querySelector('.budget__title--month').innerHTML = 'January'
    //const jan =  document.querySelector('.budget__title--month').textContent
    //const janMonth = jan.toLowerCase()
    //ctrlAddItem(state.january.expenses); 
    //elements.expensesContainer.innerHTML = '';
    //const store = JSON.parse(localStorage.getItem('expensesJan'))
    //if(store) store.forEach(el => UICtrl.renderIncExp(el, elements.expensesContainer))
    calc.calculateBudget()
    read.readStorageJan()
    read.readStorageTotalsJan()
    read.readStorageIncJan()
})

document.querySelector('.second__month').addEventListener('click',() => {
    console.log(`It's February`)
    document.querySelector('.budget__title--month').innerHTML = 'February'
    //if(month === 'February'){
        //const store = JSON.parse(localStorage.getItem('expensesFeb'))
        //if(store) store.forEach(el => UICtrl.renderIncExp(el, elements.expensesContainer))
    calc.calculateBudget()
    read.readStorageFeb()
    read.readStorageTotalsFeb()
    read.readStorageIncFeb()
    //}
})


document.querySelector('.month').addEventListener('click',() => {
    console.log(`It's November`)
    document.querySelector('.budget__title--month').innerHTML = 'November'
    //elements.expensesContainer.innerHTML = '';
    //const store = JSON.parse(localStorage.getItem('expensesNov'))
    //if(store) store.forEach(el => UICtrl.renderIncExp(el, elements.expensesContainer))
    calc.calculateBudget()
    read.readStorageNov()
    read.readStorageTotalsNov()
    read.readStorageIncNov()
})

document.querySelector('.last__month').addEventListener('click',() => {
    console.log(`It's December`)
    document.querySelector('.budget__title--month').innerHTML = 'December'
    //elements.expensesContainer.innerHTML = '';
    //const store = JSON.parse(localStorage.getItem('expensesNov'))
    //if(store) store.forEach(el => UICtrl.renderIncExp(el, elements.expensesContainer))
    // calc.calculateBudget()
    read.readStorageDec()
    read.readStorageTotalsDec()
    read.readStorageIncDec()
    state.december.tot = state.december.total - state.december.totals
    document.querySelector('.budget__value').innerHTML = state.december.tot;

})











