import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class BettingService {
  private readonly betVariants = [
    0.1, 0.2, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8, 1.2, 2.0, 4.0, 10.0, 20.0, 50.0,
    100.0,
  ];

  private currentBet = signal(0.1);
  private showKeypad = signal(false);
  private showVariants = signal(false);
  private isGameEnabled = signal(true);
  private inputValue = signal('0.10');

  constructor() {
    this.inputValue.set(this.currentBet().toFixed(2));
  }

  getBetVariants() {
    return this.betVariants;
  }

  getCurrentBet() {
    return this.currentBet;
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

  onInputFocus() {
    if (this.inputValue()) {
      this.inputValue.set('');
    }
  }

  handleDocumentClick(element: HTMLElement) {
    if (!element.closest('.bet-container')) {
      this.showKeypad.set(false);
      this.showVariants.set(false);
      this.inputValue.set(this.clampInputValue(this.inputValue()));
    }
  }

  handleKeyboardInput(event: KeyboardEvent) {
    if (!this.isGameEnabled()) return;

    if (/^\d$/.test(event.key)) {
      this.handleKeypadInput(event.key);
      return;
    }

    switch (event.key) {
      case 'Backspace':
        this.handleKeypadInput('←');
        break;
      case 'Escape':
        this.showKeypad.set(false);
        this.showVariants.set(false);
        break;
      case 'Enter':
        this.confirmInput();
        break;
    }
  }

  handleKeypadInput(value: string) {
    if (!this.isGameEnabled()) return;

    if (value === '←') {
      const newValue = this.inputValue().slice(0, -1);
      this.inputValue.set(newValue === '' ? '0' : newValue);
      return;
    }

    this.inputValue.set(this.inputValue() + value);
  }

  confirmInput() {
    const clampedValue = this.clampInputValue(this.inputValue());
    this.inputValue.set(clampedValue);

    const numValue = parseFloat(clampedValue);
    if (this.isValidInput(clampedValue)) {
      this.currentBet.set(numValue);
      this.showKeypad.set(false);
    }
  }

  selectBetVariant(value: number) {
    if (!this.isGameEnabled()) return;

    this.currentBet.set(value);
    this.inputValue.set(value.toFixed(2));
    this.showVariants.set(false);
  }

  adjustBet(isIncrease: boolean) {
    const currentValue = this.currentBet();
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
    this.currentBet.set(newValue);
    this.inputValue.set(newValue.toFixed(2));
  }

  toggleShowVariants() {
    this.showVariants.update((value) => !value);
  }

  setShowKeypad(value: boolean) {
    this.showKeypad.set(value);
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
