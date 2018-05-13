var inquirer = require("inquirer");
var mysql = require("mysql");
var restockQty;
var restockItem;
var newStockQty;

var connection = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root",
    password: "password",
    database: "glamazon_db"
});

connection.connect(function(err) {
    if (err) throw err;
    displayMenu();
});

function displayMenu() {
inquirer.prompt([
    {
        type: "rawlist",
        name: "menuOption",
        message: "What would you like to do?",
        choices: ["View Products for Sale", "View Low Inventory", "Restock a Product", "Add a New Product"]
    }
]).then(function(response) {
    if (response.menuOption === "View Products for Sale") {
        viewProducts();
    }
    if (response.menuOption === "View Low Inventory") {
        viewLowInv();
    }
    if (response.menuOption === "Restock a Product") {
        restockMenu();
    }
    if (response.menuOption === "Add a New Product") {
        addNew();
    }
})
}


function viewProducts() {
    console.log("Here are the current items availabile:\n");
    connection.query("SELECT item_id, product_name, price, stock_quantity FROM products",
    function(err, res) {
        if (err) throw err;
        console.log("ID\tQty\tProduct & Price");
        console.log("_________________________________");
        for (var i=0;i<res.length; i++) {
            console.log(res[i].item_id + "\t" + res[i].stock_quantity + "\t" + res[i].product_name + " - $" + res[i].price);
        }
        console.log("----------------------------------------------");
        displayMenu();
    })
}

function viewLowInv() {
    console.log("Here is the list of inventory that needs to be restocked:\n");
    connection.query("SELECT product_name, stock_quantity FROM products WHERE stock_quantity < 5",
    function(err, res) {
        if (err) throw err;
        console.log("Qty\tProduct");
        console.log("_________________________________");
        for (var i=0;i<res.length; i++) {
            console.log(res[i].stock_quantity + "\t" + res[i].product_name);
        }
        console.log("----------------------------------------------");
        displayMenu();
    })
}

function restockMenu() {
    //run query of db 
    connection.query("SELECT * FROM products", function(err, res_productName) {
        if (err) throw err;
        //use results of query in prompt for product choices to restock
        inquirer.prompt([
            {
                type: "rawlist",
                name: "restockSelection",
                message: "Choose which product to restock:",
                choices: function() {
                    var restockArray = [];
                    for (var i=0; i<res_productName.length; i++) {
                        restockArray.push(res_productName[i].product_name);
                    }
                    return restockArray;
                }
            }
        ]).then(function(answer) {
            //when finished prompting, pull the stock quantity of the selected product
            connection.query("SELECT stock_quantity FROM products WHERE ?",
            {
                product_name: answer.restockSelection
            },
            function(err, res) {
                if (err) throw err;
                restockItem = answer.restockSelection;
                //ask the user how much stock they would like to replenish
                inquirer.prompt([
                    {
                        type: "input",
                        name: "restockQty",
                        message: "We currently have " + res[0].stock_quantity + " in stock. How much stock would you like to add?",
                        validate: function(value) {
                            if (isNaN(value) === false) {
                            return true;
                            }
                            console.log("Please enter a number");
                        }
                    }
                ]).then(function(answer2) {
                    restockQty = parseInt(answer2.restockQty);
                    newStockQty = restockQty + res[0].stock_quantity;
                    //using user input from previous prompt, update stock quantity of product
                    connection.query("UPDATE products SET ? WHERE ?",
                    [
                    {
                        stock_quantity: newStockQty
                    },
                    {
                        product_name: restockItem
                    }
                    ],
                    function(err, res) {
                        if (err) throw err;
                        console.log(res.affectedRows + " product stocked! We now have " + newStockQty + " units of " + restockItem);
                        displayMenu();
                    })
                })
            })

        })
    })
}

function addNew() {
    connection.query("SELECT * FROM products", function(err, res)
    {
       if(err) throw err; 
        inquirer.prompt([
            {
                type: "input",
                name: "newProduct",
                message: "Enter name of new product: "
            },
            {
                type: "rawlist",
                name: "newProductDept",
                message: "Which department does this product belong to?",
                choices: function(){
                    var departmentArray = [];
                    for (var i=0; i<res.length; i++) {
                        departmentArray.push(res[i].department_name);
                    }
                    return departmentArray;
                }

            },
            {
                type: "input",
                name: "newProductPrice",
                message: "Please list the price for this new product: ",
                validate: function(value) {
                    if (isNaN(value) === false) {
                        return true;
                    }
                    console.log("{Please enter a number");
                }
            },
            {
                type: "input",
                name: "newProductQty",
                message: "How much of the new product would you like to stock?",
                validate: function(value) {
                    if (isNaN(value) === false) {
                        return true;
                    }
                    console.log("{Please enter a number");
                }
            }
        ]).then(function(answer) {
            var query = connection.query("INSERT INTO products SET ?",
            {
                product_name: answer.newProduct,
                department_name: answer.newProductDept,
                price: answer.newProductPrice,
                stock_quantity: parseInt(answer.newProductQty)
            }, function(err, res) {
                if (err) throw err;
                console.log(res.affectedRows + " product inserted!");
                displayMenu();
            }
            )
        })
    });
}