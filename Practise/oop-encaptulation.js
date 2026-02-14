class BankAccountClass {
  customerName;
  balance = 0;
  #accountNumber;

  constructor(customerName, balance = 0, accountNumber) {
    this.customerName = customerName;
    this.balance = balance;
    this.#accountNumber = accountNumber; // assign to private field
  }

  deposit(amount) {
    this.balance += amount;
  }

  setAccountNumber(accountNumber) {
    this.#accountNumber = accountNumber;
  }

  getAccountNumber() {
    return this.#accountNumber;
  }
}

const ramBankAcc2 = new BankAccountClass('Ram', 1000, 15454545);

console.log(ramBankAcc2);

// Access private field via getter
console.log(ramBankAcc2.getAccountNumber());
