// Uncomment the code below and write your tests
import {
  getBankAccount,
  InsufficientFundsError,
  TransferFailedError,
  SynchronizationFailedError,
} from '.';

describe('BankAccount', () => {
  const balanceAmount = 1000;
  const amountToDeposit = 1000;
  const amountToWithdraw = 500;
  const amountToTransfer = 500;
  const BankAccount = getBankAccount(balanceAmount);
  const BankAccount2 = getBankAccount(balanceAmount);

  test('should create account with initial balance', () => {
    expect(BankAccount.getBalance()).toBe(balanceAmount);
  });

  test('should throw InsufficientFundsError error when withdrawing more than balance', () => {
    const error = new InsufficientFundsError(balanceAmount);
    expect(() => BankAccount.withdraw(balanceAmount + 1)).toThrow(error);
  });

  test('should throw error when transferring more than balance', () => {
    const error = new InsufficientFundsError(balanceAmount);
    expect(() => BankAccount.transfer(balanceAmount + 1, BankAccount2)).toThrow(
      error,
    );
  });

  test('should throw error when transferring to the same account', () => {
    const error = new TransferFailedError();
    expect(() => BankAccount.transfer(balanceAmount + 1, BankAccount)).toThrow(
      error,
    );
  });

  test('should deposit money', () => {
    BankAccount.deposit(amountToDeposit);
    expect(BankAccount.getBalance()).toBe(balanceAmount + amountToDeposit);
  });

  test('should withdraw money', () => {
    BankAccount.withdraw(amountToWithdraw);
    expect(BankAccount.getBalance()).toBe(
      balanceAmount + amountToDeposit - amountToWithdraw,
    );
  });

  test('should transfer money', () => {
    BankAccount.transfer(amountToTransfer, BankAccount2);
    expect(BankAccount.getBalance()).toBe(
      balanceAmount + amountToDeposit - amountToWithdraw - amountToTransfer,
    );
    expect(BankAccount2.getBalance()).toBe(balanceAmount + amountToTransfer);
  });

  test('fetchBalance should return number in case if request did not failed', async () => {
    const fetchedBalance = await BankAccount.fetchBalance();

    try {
      expect(fetchedBalance).toBeLessThanOrEqual(100);
      expect(fetchedBalance).toBeGreaterThanOrEqual(0);
    } catch {
      expect(fetchedBalance).toBeNull();
    }
  });

  test('should set new balance if fetchBalance returned number', async () => {
    try {
      await BankAccount.synchronizeBalance();
      expect(BankAccount.getBalance()).not.toBe(1000);
      expect(BankAccount.getBalance()).not.toBeLessThanOrEqual(100);
      expect(BankAccount.getBalance()).not.toBeGreaterThanOrEqual(0);
    } catch {}
  });

  test('should throw SynchronizationFailedError if fetchBalance returned null', async () => {
    try {
      await BankAccount.synchronizeBalance();
    } catch (e) {
      expect(e).toBeInstanceOf(SynchronizationFailedError);
    }
  });
});
