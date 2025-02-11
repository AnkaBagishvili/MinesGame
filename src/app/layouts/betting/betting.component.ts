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

  onInputFocus() {
    if (this.inputValue) {
      this.inputValue = '';
    }
  }

  @HostListener('document:click', ['$event'])
  onMouseClick(event: MouseEvent) {
    const element = event.target as HTMLElement;
    if (!element.closest('.bet-container')) {
      this.showKeypad.set(false);
      this.showVariants.set(false);

      this.inputValue = this.clampInputValue(this.inputValue);
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
      this.inputValue = this.inputValue.slice(0, -1);
      if (this.inputValue === '') this.inputValue = '0';
      return;
    }

    this.inputValue += value;
  }

  confirmInput() {
    this.inputValue = this.clampInputValue(this.inputValue);

    const numValue = parseFloat(this.inputValue);
    if (this.isValidInput(this.inputValue)) {
      this.currentBet.set(numValue);
      this.showKeypad.set(false);
    }
  }

  selectBetVariant(value: number) {
    if (!this.isGameEnabled()) return;

    this.currentBet.set(value);
    this.inputValue = value.toFixed(2);
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
    this.inputValue = newValue.toFixed(2);
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
