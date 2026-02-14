// Function Constructor Inheritance

function BankAccount(customerName, balance = 0, accountNumber) {
  this.customerName = customerName;
  this.balance = balance;
  this.accountNumber = accountNumber;
}

const ramBankAcc = new BankAccount('Ram', 1000, 15454545);
const jacBankAcc = new BankAccount('Jac', 0, 15445533);

BankAccount.prototype.deposit = function (amount) {
  this.balance += amount;
};

console.log(BankAccount.prototype);

ramBankAcc.deposit(10);

console.log(ramBankAcc);

function SavingsAccount(customerName, balance = 0, accountNumber) {
  BankAccount.call(this, customerName, balance, accountNumber);
  this.transactionLimit = 10000;
}

SavingsAccount.prototype = Object.create(BankAccount.prototype);
SavingsAccount.prototype.constructor = SavingsAccount;

const newAcc1 = new SavingsAccount('Modu', 100, 454554455454);
newAcc1.deposit(10);
console.log(newAcc1);

// Class Inheritance

class BankAccountClass {
  customerName;
  balance = 0;
  accountNumber;

  constructor(customerName, balance = 0, accountNumber) {
    this.customerName = customerName;
    this.balance = balance;
    this.accountNumber = accountNumber;
  }

  deposit(amount) {
    this.balance += amount;
  }
}

class SavingsAccountClass extends BankAccountClass {
  transactionLimit = 50000;

  constructor(customerName, balance = 0, accountNumber) {
    super(customerName, balance, accountNumber);
  }
}

const ramBankAcc2 = new BankAccountClass('Ram', 1000, 15454545);
const jacBankAcc2 = new BankAccountClass('Jac', 0, 15445533);
console.log(ramBankAcc2);

const newAcc2 = new SavingsAccountClass('Jam', 1000, 15454545);
newAcc2.deposit(10);
console.log(newAcc2);

/*
Function Constructor Inheritance:
- Get the properties of the parent function using:
  ParentFunction.call(this, property1, property2)
- Get the methods in the prototype using:
  ChildFunction.prototype = Object.create(ParentFunction.prototype)

Class Inheritance:
- Use the "extends" keyword.
- Use "super()" inside the constructor to get parent class values.
- It also connects the prototype automatically, so no manual linking is required.
*/
