var inquirer = require("inquirer");
var mysql = require("mysql");
var itemQty;
var itemPrice;
var itemName;
var orderQty;
var newQty;

var connection = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root",
    password: "password",
    database: "glamazon_db"
});

connection.connect(function(err) {
    if (err) throw err;
    displayItems();
});

// displays current product log
function displayItems() {
    console.log("------------------------------------------------------------------------------------\n");
    console.log("｡･:*:･ﾟ★,｡･:*:･ﾟ☆ Pulling log of all products...｡･:*:･ﾟ★,｡･:*:･ﾟ☆\n");
    connection.query("SELECT item_id, product_name, price FROM products \G", function (err, res) {
        if (err) throw err;
        console.log("ID\tProduct");
        console.log("_________________________");
        for (var i=0;i<res.length; i++) {
            console.log(res[i].item_id + "\t" + res[i].product_name + " - $" + res[i].price);
        }
        console.log("------------------------------------------------------------------------------------\n");
        // runs the first prompt
        actionPrompt();
    })
}

// asks user for product ID, then quantity for order
function actionPrompt() {
    inquirer.prompt([
        {
            type: "input",
            name: "orderID",
            message: "Please enter the ID of the product you are looking to buy."
        },
        {
            type: "input",
            name: "orderQty",
            message: "How many units would you like to buy?"
        }
    ]).then(function(response) {
        //checks the quantity in the DB based on product ID and stores into variable itemQty
        var query = connection.query(
            "SELECT * FROM products WHERE ?",
        {item_id: response.orderID}, function (err, res) {
            if (err) throw err;
            checkOrder(response, res);
        }); 
    })
}

function checkOrder(response, res) {     
//if customer's order qty exceeds stock qty, then notify customer of insufficient qty
if (response.orderQty > res[0].stock_quantity) { //*********************************************************** */
    console.log("------------------------------------------------------------------------------------\n");
    console.log("｡･:*:･ﾟ★,｡･:*:･ﾟ☆ Insufficient quantity. Please check again next week.｡･:*:･ﾟ★,｡･:*:･ﾟ☆");
    console.log("------------------------------------------------------------------------------------\n");
} else {
    var orderTotal = response.orderQty * res[0].price; //****************************************************** */
    console.log("------------------------------------------------------------------------------------\n");
    console.log("｡･:*:･ﾟ★,｡･:*:･ﾟ☆ Thank you for your order of " + res[0].product_name + "! It is currently being processed. Your total purchase comes to $" + orderTotal + "｡･:*:･ﾟ★,｡･:*:･ﾟ☆"); //**************************** */
    var updatedInvQty = res[0].stock_quantity - response.orderQty;
    var itemToUpdate = res[0].item_id;
    var item = res[0].product_name;
    updateStock(updatedInvQty, itemToUpdate, item);
}
}

//******************************************************************* */
function updateStock(updatedInvQty, itemToUpdate, item) {
    console.log("------------------------------------------------------------------------------------\n");
    console.log("                 Updating inventory log...                 ");
    var query = connection.query(
        "UPDATE products SET ? WHERE ?",
        [
        {
            stock_quantity: updatedInvQty
        },
        {
            item_id: itemToUpdate
        }],
         function(err, res2) {
            if(err) throw err;
            // console.log(res2);
            console.log("｡･:*:･ﾟ★,｡･:*:･ﾟ☆" + item + " inventory updated!｡･:*:･ﾟ★,｡･:*:･ﾟ☆");
            console.log("------------------------------------------------------------------------------------\n");
            displayItems();
        }
    )

}