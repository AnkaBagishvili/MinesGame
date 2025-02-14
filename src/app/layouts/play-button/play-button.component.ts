import { Component } from '@angular/core';
import { BettingService } from '../../services/betting.service';
import { AsyncPipe, CurrencyPipe, NgClass, NgIf } from '@angular/common';
import { BehaviorSubject } from 'rxjs';
import { BalanceService } from '../../services/balance.service';
import { ProgressBarService } from '../../services/progress-bar.service';
import { GameServiceService } from '../../services/game-service.service';
import { GameStateService } from '../../services/game-state.service';

@Component({
  selector: 'app-play-button',
  standalone: true,
  imports: [NgIf, AsyncPipe, CurrencyPipe, NgClass],
  templateUrl: './play-button.component.html',
  styleUrl: './play-button.component.scss',
})
export class PlayButtonComponent {
  isGameStarted = new BehaviorSubject<boolean>(false);
  balance: number = 0;
  winnings$ = new BehaviorSubject<number>(0);

  constructor(
    private bettingService: BettingService,
    private balanceService: BalanceService,
    private progressBarService: ProgressBarService,
    private gameService: GameServiceService,
    public gameState: GameStateService
  ) {
    this.balanceService.balance$.subscribe((balance) => {
      this.balance = balance;
    });
  }
  enablePlayground() {
    this.gameState.enablePlayground();
  }

  onPlaceBet() {
    const success = this.bettingService.placeBet();

    if (success) {
      this.isGameStarted.next(true);
      this.gameState.enablePlayground();
    }
  }

  //new
  onCashOut() {
    console.log('onCashOut triggered');
    this.isGameStarted.next(false);
    const progress = this.progressBarService.calculateProgress();
    const winnings = progress * this.bettingService.currentBet;
    this.balanceService.updateBalance(winnings);

    this.winnings$.next(winnings);

    this.gameState.onCashOut();

    console.log('Winnings:', winnings);
  }
}
