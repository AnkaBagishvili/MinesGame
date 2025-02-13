import { Component } from '@angular/core';
import { BettingService } from '../../services/betting.service';
import { AsyncPipe, CurrencyPipe, NgIf } from '@angular/common';
import { BehaviorSubject } from 'rxjs';
import { BalanceService } from '../../services/balance.service';
import { ProgressBarService } from '../../services/progress-bar.service';
import { GameServiceService } from '../../services/game-service.service';

@Component({
  selector: 'app-play-button',
  standalone: true,
  imports: [NgIf,AsyncPipe,CurrencyPipe],
  templateUrl:'./play-button.component.html',
  styleUrl: './play-button.component.scss',
})
export class PlayButtonComponent {
  isGameStarted = new BehaviorSubject<boolean>(false);
  balance:number=0;
  winnings$ = new BehaviorSubject<number>(0)

  constructor(private bettingService: BettingService,
    private balanceService:BalanceService,
    private progressBarService:ProgressBarService,
    private gameService:GameServiceService,
  ) {this.balanceService.balance$.subscribe((balance) => {
    this.balance = balance;
  });}

  onPlaceBet() {
    const success = this.bettingService.placeBet(); 

    if (success) {
      this.isGameStarted.next(true); 
    }
  }

  //new
  onCashOut() {
    this.isGameStarted.next(false);
    const progress = this.progressBarService.calculateProgress()
    const winnings = (progress)*this.bettingService.currentBet
    this.balanceService.updateBalance(winnings);


    
    this.winnings$.next(winnings);
    // this.gameService.clearTimers()
    // this.gameService.initializeGame()

    // need to implement restartFunction for onCashOut() initializeGame/GameOver and clearTimers doesnt work
  }
}
