import { NgFor, NgIf } from '@angular/common';
import { Component, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-betting',
  standalone: true,
  imports: [FormsModule, NgFor, NgIf],
  templateUrl: './betting.component.html',
  styleUrl: './betting.component.scss',
})
export class BettingComponent {
  public betVariants = [
    0.1, 0.2, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8, 1.2, 2.0, 4.0, 10.0, 20.0, 50.0,
    100.0,
  ];

  currentBet = signal<number>(0.1);
  showKeypad = signal<boolean>(false);
  showVariants = signal<boolean>(false);
  isGameEnabled = signal<boolean>(true);
  inputValue = '0.10';

  ngOnInit() {
    this.inputValue = this.currentBet().toFixed(2);
  }

  onKeyDown(event: KeyboardEvent) {
    // Allow: backspace, delete, tab, escape, enter
    if (
      [46, 8, 9, 27, 13].indexOf(event.keyCode) !== -1 ||
      // Allow: Ctrl+A
      (event.keyCode === 65 && event.ctrlKey === true) ||
      // Allow: home, end, left, right
      (event.keyCode >= 35 && event.keyCode <= 39)
    ) {
      return;
    }

    // Block non-number inputs
    if (
      (event.shiftKey || event.keyCode < 48 || event.keyCode > 57) &&
      (event.keyCode < 96 || event.keyCode > 105) &&
      event.keyCode !== 190 &&
      event.keyCode !== 110
    ) {
      event.preventDefault();
      return;
    }

    // Handle decimal point
    if (event.key === '.' && this.inputValue.includes('.')) {
      event.preventDefault();
      return;
    }

    // Preview the new value
    const newValue =
      event.key === 'Backspace'
        ? this.inputValue.slice(0, -1)
        : this.inputValue + event.key;

    // Validate the new value
    if (!this.isValidInput(newValue)) {
      event.preventDefault();
    }
  }

  onKeypadClick(value: string) {
    if (value === '.' && this.inputValue.includes('.')) return;

    const newValue = this.inputValue + value;
    if (this.isValidInput(newValue)) {
      this.inputValue = newValue;
    }
  }

  onDelete() {
    this.inputValue = this.inputValue.slice(0, -1);
    if (this.inputValue === '' || this.inputValue === '0') {
      this.inputValue = '0';
    }
  }

  isValidInput(value: string): boolean {
    if (value === '') return true;
    if (value === '.') return true;

    // Check decimal places
    if (value.includes('.')) {
      const [, decimals] = value.split('.');
      if (decimals && decimals.length > 2) return false;
    }

    const numValue = parseFloat(value);
    return !isNaN(numValue) && numValue <= 100;
  }

  isValidBet(): boolean {
    const value = parseFloat(this.inputValue);
    return !isNaN(value) && value >= 0.1 && value <= 100;
  }

  confirmInput() {
    if (!this.isValidBet()) return;

    const value = parseFloat(this.inputValue);
    const closestBet = this.betVariants.reduce((prev, curr) => {
      return Math.abs(curr - value) < Math.abs(prev - value) ? curr : prev;
    });

    this.currentBet.set(closestBet);
    this.inputValue = closestBet.toFixed(2);
    this.showKeypad.set(false);
  }

  onInputBlur() {
    if (this.isValidBet()) {
      this.confirmInput();
    } else {
      this.inputValue = this.currentBet().toFixed(2);
    }
  }

  toggleKeypad() {
    if (!this.isGameEnabled()) return;
    this.showKeypad.set(!this.showKeypad());
    this.showVariants.set(false);
  }

  toggleVariants() {
    if (!this.isGameEnabled()) return;
    this.showVariants.set(!this.showVariants());
    this.showKeypad.set(false);
  }

  selectBetAmount(amount: number) {
    this.currentBet.set(amount);
    this.inputValue = amount.toFixed(2);
    this.showVariants.set(false);
  }

  increaseBet() {
    const currentIndex = this.betVariants.indexOf(this.currentBet());
    if (currentIndex < this.betVariants.length - 1) {
      const newBet = this.betVariants[currentIndex + 1];
      this.currentBet.set(newBet);
      this.inputValue = newBet.toFixed(2);
    }
  }

  decreaseBet() {
    const currentIndex = this.betVariants.indexOf(this.currentBet());
    if (currentIndex > 0) {
      const newBet = this.betVariants[currentIndex - 1];
      this.currentBet.set(newBet);
      this.inputValue = newBet.toFixed(2);
    }
  }
}
