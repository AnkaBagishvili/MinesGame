import { Injectable, signal } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { BalanceService } from './balance.service';

@Injectable({
  providedIn: 'root',
})
export class BettingService {
  private readonly betVariants = [
    0.1, 0.2, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8, 1.2, 2.0, 4.0, 10.0, 20.0, 50.0,
    100.0,
  ];

  private _currentBet = new BehaviorSubject<number>(0.1);
  currentBet$ = this._currentBet.asObservable();

  private showKeypad = new BehaviorSubject<boolean>(false);
  private showVariants = new BehaviorSubject<boolean>(false);
  private isGameEnabled = new BehaviorSubject<boolean>(true);
  private inputValue = new BehaviorSubject<string>('0.10');

  constructor(private balanceService: BalanceService) {
    this.inputValue.next(this._currentBet.value.toFixed(2));
  }

  getBetVariants() {
    return this.betVariants;
  }

  get currentBet(): number {
    return this._currentBet.value;
  }

  getCurrentBet() {
    return this._currentBet;
  }

  getShowKeypad() {
    return this.showKeypad;
  }

  getShowVariants() {
    return this.showVariants;
  }

  getIsGameEnabled() {
    return this.isGameEnabled;
  }

  getInputValue() {
    return this.inputValue;
  }

  // Betting methods
  setCurrentBet(value: number) {
    this._currentBet.next(value);
    this.inputValue.next(value.toFixed(2));
  }

  placeBet(): boolean {
    const betAmount = this._currentBet.value;
    if (betAmount > this.balanceService.balance) {
      alert('Insufficient balance to place this bet!');
      return false;
    }
    this.balanceService.updateBalance(-betAmount);
    return true;
  }

  onInputFocus() {
    if (this.inputValue.value) {
      this.inputValue.next('');
    }
  }

  handleDocumentClick(element: HTMLElement) {
    if (!element.closest('.bet-container')) {
      this.showKeypad.next(false);
      this.showVariants.next(false);
      this.inputValue.next(this.clampInputValue(this.inputValue.value));
    }
  }

  handleKeyboardInput(event: KeyboardEvent) {
    if (!this.isGameEnabled.value) return;

    if (/^\d$/.test(event.key)) {
      this.handleKeypadInput(event.key);
      return;
    }

    switch (event.key) {
      case 'Backspace':
        this.handleKeypadInput('←');
        break;
      case 'Escape':
        this.showKeypad.next(false);
        this.showVariants.next(false);
        break;
      case 'Enter':
        this.confirmInput();
        break;
    }
  }

  handleKeypadInput(value: string) {
    if (!this.isGameEnabled.value) return;

    if (value === '←') {
      const newValue = this.inputValue.value.slice(0, -1);
      this.inputValue.next(newValue === '' ? '0' : newValue);
      return;
    }

    this.inputValue.next(this.inputValue.value + value);
  }

  confirmInput() {
    const clampedValue = this.clampInputValue(this.inputValue.value);
    this.inputValue.next(clampedValue);

    const numValue = parseFloat(clampedValue);
    if (this.isValidInput(clampedValue)) {
      this._currentBet.next(numValue);
      this.showKeypad.next(false);
    }
  }

  selectBetVariant(value: number) {
    if (!this.isGameEnabled.value) return;

    this._currentBet.next(value);
    this.inputValue.next(value.toFixed(2));
    this.showVariants.next(false);
  }

  adjustBet(isIncrease: boolean) {
    const currentValue = this._currentBet.value;
    const currentIndex = this.betVariants.indexOf(currentValue);

    let newIndex;
    if (isIncrease) {
      newIndex =
        currentIndex < this.betVariants.length - 1
          ? currentIndex + 1
          : currentIndex;
    } else {
      newIndex = currentIndex > 0 ? currentIndex - 1 : currentIndex;
    }

    const newValue = this.betVariants[newIndex];
    this._currentBet.next(newValue);
    this.inputValue.next(newValue.toFixed(2));
  }

  toggleShowVariants() {
    this.showVariants.next(!this.showVariants.value);
  }

  setShowKeypad(value: boolean) {
    this.showKeypad.next(value);
  }

  private isValidInput(value: string): boolean {
    if (!value) return false;

    const numValue = parseFloat(value);
    return !isNaN(numValue) && numValue >= 0.1 && numValue <= 100;
  }

  private clampInputValue(value: string): string {
    const numValue = parseFloat(value);
    if (isNaN(numValue)) return '0.10';

    if (numValue < 0.1) return '0.10';
    if (numValue > 100) return '100.00';

    return numValue.toFixed(2);
  }
}
