export class Account {
  _id: string;
  name: string;
  balance: number;
  shares: Array<string>;

  /**
   * Accept an object of type Account, build an object with those parameters
   * as a class instance with class methods.
   */
  constructor(prototype: Account) {
    Object.assign(this, prototype);
  }

  get id() { return this._id; }
  get reserve() { return this.balance; }

  /**
   * Transfer money from one account to another. Don't do anything if
   * if there is insufficient funds.
   */
  transfer(dest: Account, amount: number) {
    dest.deposit(amount);
    return this.withdraw(amount);
  }

  withdraw(amount: number): boolean {
    if (amount > this.balance) {
      return false;
    }
    this.balance -= amount;
    return true;
  }

  deposit(amount: number) {
    this.balance += amount;
  }
}
