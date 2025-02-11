import { NgIf } from '@angular/common';
import { Component, HostListener, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BettingService } from '../../services/betting.service';

@Component({
  selector: 'app-betting',
  standalone: true,
  imports: [FormsModule, NgIf],
  templateUrl: './betting.component.html',
  styleUrl: './betting.component.scss',
})
export class BettingComponent {
  readonly betVariants: number[];
  readonly currentBet;
  readonly showKeypad;
  readonly showVariants;
  readonly isGameEnabled;
  readonly inputValue;

  constructor(private bettingService: BettingService) {
    this.betVariants = this.bettingService.getBetVariants();
    this.currentBet = this.bettingService.getCurrentBet();
    this.showKeypad = this.bettingService.getShowKeypad();
    this.showVariants = this.bettingService.getShowVariants();
    this.isGameEnabled = this.bettingService.getIsGameEnabled();
    this.inputValue = this.bettingService.getInputValue();
  }

  setShowKeypad(value: boolean) {
    this.bettingService.setShowKeypad(value);
  }

  onInputFocus() {
    this.bettingService.onInputFocus();
  }

  @HostListener('document:click', ['$event'])
  onMouseClick(event: MouseEvent) {
    this.bettingService.handleDocumentClick(event.target as HTMLElement);
  }

  @HostListener('document:keydown', ['$event'])
  onKeyboardClick(event: KeyboardEvent) {
    this.bettingService.handleKeyboardInput(event);
  }

  handleKeypadInput(value: string) {
    this.bettingService.handleKeypadInput(value);
  }

  confirmInput() {
    this.bettingService.confirmInput();
  }

  selectBetVariant(value: number) {
    this.bettingService.selectBetVariant(value);
  }

  adjustBet(isIncrease: boolean) {
    this.bettingService.adjustBet(isIncrease);
  }

  toggleShowVariants() {
    this.bettingService.toggleShowVariants();
  }
}
