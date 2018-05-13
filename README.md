# Glamazon
CLI app based on Amazon store-front

Initial MySQL Database:
![Original Products Table](/images/orig_products_table.jpeg)

## Customer CLI App
Running this application will first display all of the items available for sale.
![Product Log](/images/customer_productlog.jpeg)

The app will prompt users with two messages:
    * The first will ask them the ID of the product they would like to buy
    * The second will ask how many units of the product they would like to buy

Once the customer has placed the order, the app will check if Glamazon has enough of the product to meet the customer's request. If the store does not, the order will be prevented from going through.
![Insufficient Qty](/images/customer_insufficientqty.jpeg)

However, if the store has enough product, the customer's order will be fulfilled and the store's product inventory will be updated. The total cost of the customer's purchase will be displayed.
![Order confirmed](/images/customer_orderconfirm.jpeg)

See it in action: https://drive.google.com/file/d/1ZLbQWJiOyXYpiICDY5G91jRp-XaXPpfU/view


## Manager CLI APP
Running this application will display a menu with four options:
    * View Products for Sale
    * View Low Inventory
    * Add to Inventory
    * Add New Product

If a manager selects `View Products for Sale`, the app lists every available item: the item IDs, names, prices, and quantities.
![View Products for Sale](/images/manager_viewall.jpeg)

If a manager selects `View Low Inventory`, then it will list all items with an inventory count lower than five.
![View Low Inventory](/images/manager_viewlow.jpeg)

If a manager selects `Add to Inventory`, the app will display a prompt that will let the manager add more stock of any item currently in the store.
![Add to Inventory](/images/manager_restock.jpeg)

If a manager selects `Add New Product`, it will allow the manager to add a completely new product to the store.
![Add New Product](/images/manager_addNew.jpeg)


See it in action: https://drive.google.com/file/d/1xuNTYLYL0K8y_N_T4KngzhPAUO8HrzYq/view