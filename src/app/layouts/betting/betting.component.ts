import { AsyncPipe, NgClass, NgIf } from '@angular/common';
import { Component, HostListener, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BettingService } from '../../services/betting.service';
import { Observable } from 'rxjs';
import { GameStateService } from '../../services/game-state.service';

@Component({
  selector: 'app-betting',
  standalone: true,
  imports: [FormsModule, NgIf, NgClass, AsyncPipe],
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
  currentBet$: Observable<number>;

  constructor(
    private bettingService: BettingService,
    public gameState: GameStateService
  ) {
    this.betVariants = this.bettingService.getBetVariants();
    this.currentBet = this.bettingService.getCurrentBet();
    this.showKeypad = this.bettingService.getShowKeypad();
    this.showVariants = this.bettingService.getShowVariants();
    this.isGameEnabled = this.bettingService.getIsGameEnabled();
    this.inputValue = this.bettingService.getInputValue();
    this.currentBet$ = this.bettingService.currentBet$;
  }

  ngOnInit() {
    this.inputValue.next(this.bettingService.currentBet.toFixed(2));
  }

  placeBet() {
    return this.bettingService.placeBet();
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
