import { NgIf } from '@angular/common';
import { Component, HostListener, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-betting',
  standalone: true,
  imports: [FormsModule, NgIf],
  templateUrl: './betting.component.html',
  styleUrl: './betting.component.scss',
})
export class BettingComponent {
  betVariants = [
    0.1, 0.2, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8, 1.2, 2.0, 4.0, 10.0, 20.0, 50.0,
    100.0,
  ];

  currentBet = signal(0.1);
  showKeypad = signal(false);
  showVariants = signal(false);
  isGameEnabled = signal(true);
  inputValue = '0.10';

  ngOnInit() {
    this.inputValue = this.currentBet().toFixed(2);
  }

  @HostListener('document:click', ['$event'])
  onMouseClick(event: MouseEvent) {
    const element = event.target as HTMLElement;
    if (!element.closest('.bet-container')) {
      this.showKeypad.set(false);
      this.showVariants.set(false);
    }
  }

  @HostListener('document:keydown', ['$event'])
  onKeyboardClick(event: KeyboardEvent) {
    if (!this.isGameEnabled()) return;

    if (/^\d$/.test(event.key)) {
      this.handleKeypadInput(event.key);
      return;
    }

    switch (event.key) {
      case 'Backspace':
        this.handleKeypadInput('←');
        break;
      case '.':
        this.handleKeypadInput('.');
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

    // Handle backspace
    if (value === '←') {
      this.inputValue = this.inputValue.slice(0, -1);
      if (this.inputValue === '') this.inputValue = '0';
      return;
    }

    // If starting new input, clear the field
    if (this.inputValue === '0' || this.inputValue === '0.00') {
      if (value === '.') {
        this.inputValue = '0.';
      } else {
        this.inputValue = value;
      }
      return;
    }

    // Handle decimal point
    if (value === '.') {
      if (!this.inputValue.includes('.')) {
        this.inputValue += '.';
      }
      return;
    }

    // Remove any trailing zeros after decimal
    let cleanValue = this.inputValue.replace(/\.?0+$/, '');

    // If no decimal point yet
    if (!cleanValue.includes('.')) {
      if (cleanValue.length === 2) {
        // Automatically add decimal point after 2 digits
        cleanValue = cleanValue + '.';
      }
    }

    // Handle digits
    const newValue = cleanValue + value;

    if (this.isValidInput(newValue)) {
      this.inputValue = newValue;

      // Format with trailing zeros if we have a decimal point
      if (this.inputValue.includes('.')) {
        const parts = this.inputValue.split('.');
        if (parts[1].length === 0) {
          this.inputValue += '00';
        } else if (parts[1].length === 1) {
          this.inputValue += '0';
        }
      }
    }
  }

  adjustBet(amount: number) {
    const currentValue = parseFloat(this.inputValue);
    const newValue = (currentValue + amount).toFixed(2);
    if (this.isValidInput(newValue)) {
      this.inputValue = newValue;
      this.currentBet.set(parseFloat(newValue));
    }
  }

  selectBetVariant(value: number) {
    if (!this.isGameEnabled()) return;

    this.currentBet.set(value);
    this.inputValue = value.toFixed(2);
    this.showVariants.set(false);
  }

  confirmInput() {
    const numValue = parseFloat(this.inputValue);
    if (
      this.isValidInput(this.inputValue) &&
      numValue >= 0.1 &&
      numValue <= 100
    ) {
      this.currentBet.set(numValue);
      this.showKeypad.set(false);
      // Format the input value to always show 2 decimal places
      this.inputValue = numValue.toFixed(2);
    }
  }

  private isValidInput(value: string): boolean {
    if (!value) return false;

    const numValue = parseFloat(value);
    if (isNaN(numValue)) return false;

    // Allow incomplete decimal inputs during typing
    if (value.endsWith('.')) return true;

    // Check decimal places
    if (value.includes('.') && value.split('.')[1].length > 2) return false;

    return numValue >= 0 && numValue <= 100;
  }
}
