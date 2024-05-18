#! / usr/bin / env node
import inquirer from "inquirer";
class bankAccount {
    accountNumber;
    balance;
    constructor(accountNumber, balance) {
        this.accountNumber = accountNumber;
        this.balance = balance;
    }
    withdraw(amount) {
        if (this.balance >= amount) {
            this.balance -= amount;
            console.log(`You have withdrawn of $ ${amount} successfully. Your new balance is ${this.balance}`);
        }
        else {
            console.log(`Insufficient balance. Your balance is ${this.balance}`);
        }
    }
    deposit(amount) {
        if (amount > 100) {
            amount -= 1;
        }
        this.balance += amount;
        console.log(`You have deposited of $ ${amount} successfully. Remaining balance : $ ${this.balance}`);
    }
    checkBalance() {
        console.log(`Your balance is ${this.balance}`);
    }
}
class customer {
    firstName;
    LastName;
    gender;
    age;
    mobileNumber;
    account;
    constructor(firstName, LastName, gender, age, mobileNumber, account) {
        this.firstName = firstName;
        this.LastName = LastName;
        this.gender = gender;
        this.age = age;
        this.mobileNumber = mobileNumber;
        this.account = account;
    }
}
const account = [
    new bankAccount(1234, 500),
    new bankAccount(4321, 1000),
    new bankAccount(5678, 2000),
];
const customers = [
    new customer("Peter", "Nishwar", "Male", 50, 123456789, account[0]),
    new customer("Jenny", "Johnson", "Female", 30, 987654321, account[1]),
    new customer("Eric", "Yaqoob", "Male", 31, 111111111, account[2]),
];
async function service() {
    do {
        const accountNumberInput = await inquirer.prompt([
            {
                name: "accountNumber",
                type: "number",
                message: "Enter your account number:"
            },
        ]);
        const customer = customers.find((customer) => customer.account.accountNumber === accountNumberInput.accountNumber);
        if (customer) {
            console.log(`Welcome, ${customer.firstName} ${customer.LastName}!\n`);
            const ans = await inquirer.prompt([
                {
                    name: "select",
                    type: "list",
                    message: "Select an operation:",
                    choices: ["Withdraw", "Deposit", "Check Balance", "Exit"],
                }
            ]);
            switch (ans.select) {
                case "Deposit":
                    const depositAmount = await inquirer.prompt({
                        name: "amount",
                        type: "number",
                        message: "Enter the amount to deposit:"
                    });
                    customer.account.deposit(depositAmount.amount);
                    break;
                case "Withdraw":
                    const withdrawAmount = await inquirer.prompt({
                        name: "amount",
                        type: "number",
                        message: "Enter the amount to withdraw:",
                    });
                    customer.account.deposit(withdrawAmount.amount);
                    break;
                case "Check Balance":
                    customer.account.checkBalance();
                    break;
                case "Exit":
                    console.log("Existing Bank Program....");
                    console.log("\nThank you for using our services. Have a great day!");
                    return;
            }
        }
        else {
            console.log("Invalid account number. Please try again.");
        }
    } while (true);
}
service();
