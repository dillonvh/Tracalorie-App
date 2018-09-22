// Storage Controller

// Item Controller
const ItemCtrl = (function(){
    // Item constructor
    const Item = function(id, name ,calories){
        this.id = id;
        this.name = name;
        this.calories = calories;
    };

    // Data Structure / State
    const data = {
        items: [],
        currentItem: null,
        totalCalories: 0
    };

    return {
        getItems: function(){
            return data.items;
        },

        addItem: function(name, calories){
            let ID = (data.items.length > 0) ? data.items[data.items.length-1].id + 1 : 0;
            // Calories to number
            calories = parseInt(calories);
            // Add to items array
            const item = new Item(ID, name, calories);
            data.items.push(item);

            return item;
        },

        logData: function(){
            return data;
        }
    };
})();

// UI Controller
const UICtrl = (function(){
    const UISelectors = {
        itemList: '#item-list',
        addBtn: '.add-btn',
        itemNameInput: '#item-name',
        itemCaloriesInput: '#item-calories'
    };

    return {
        populateItemList: function(items){
            let html = '';
            items.forEach(item => {
                html += `
                <li class="collection-item" id="item-${item.id}">
                    <strong>${item.name}: </strong><em>${item.calories} Calories</em>
                    <a href="#" class="secondary-content"><i class="edit-item fa fa-pencil-alt"></i></a>
                </li>
                `;
            });
            document.querySelector(UISelectors.itemList).innerHTML = html;
        },
        
        getSelectors: function(){
            return UISelectors;
        },

        getItemInput: function(){
            return { 
                itemNameInput: document.querySelector(UISelectors.itemNameInput).value,
                itemCaloriesInput: document.querySelector(UISelectors.itemCaloriesInput).value
            }
        },

        addListItem: function(item){
            document.querySelector(UISelectors.itemList).style.display = 'block';
            // Create li element
            const li = document.createElement('li');
            li.classList.add('collection-item');
            li.id = `item-${item.id}`;
            li.innerHTML = `
                <strong>${item.name}: </strong><em>${item.calories} Calories</em>
                <a href="#" class="secondary-content"><i class="edit-item fa fa-pencil-alt"></i></a>
            `;
            // Insert li
            document.querySelector(UISelectors.itemList).insertAdjacentElement('beforeend', li);
        },

        clearFields: function(){
            document.querySelector(UISelectors.itemNameInput).value = '';
            document.querySelector(UISelectors.itemCaloriesInput).value = '';
        },

        hideList: function(){
            document.querySelector(UISelectors.itemList).style.display = 'none';
        },
    };
})();


// App Controller
const App = (function(ItemCtrl, UICtrl){
    // Event listeners
    const loadEventListeners = function(){
        const UISelectors = UICtrl.getSelectors();

        document.querySelector(UISelectors.addBtn).addEventListener('click', itemAddSubmit);
    }

    itemAddSubmit = function(e){
        // Get form input from UI Controller
        const {itemNameInput: itemName, itemCaloriesInput: itemCalories} = UICtrl.getItemInput();
        
        if(itemName !== '' && itemCalories !== ''){
            const newItem = ItemCtrl.addItem(itemName, itemCalories);
            // Add item to UI List
            UICtrl.addListItem(newItem);
            // Clear input fields
            UICtrl.clearFields();
        }

        e.preventDefault();
    }
    
    return {
        init: function(){
            console.log('Initializing app...');
            const items = ItemCtrl.getItems();

            // Check if any items in list
            if(items.length === 0){
                UICtrl.hideList();
            } else{
                // Populate list with items
                UICtrl.populateItemList(items);
            }

            // Load event listeners
            loadEventListeners();
        }
    };
})(ItemCtrl, UICtrl);

App.init();

