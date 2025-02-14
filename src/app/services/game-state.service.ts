import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { GameServiceService } from './game-service.service';
import { BalanceService } from './balance.service';
import { BettingService } from './betting.service';

@Injectable({
  providedIn: 'root',
})
export class GameStateService {
  private playgroundDisabled = new BehaviorSubject<boolean>(true);
  private bettingDisabled = new BehaviorSubject<boolean>(false);
  private autoPlayDisabled = new BehaviorSubject<boolean>(true);
  private randomizerDisabled = new BehaviorSubject<boolean>(false);
  private playButtonDisabled = new BehaviorSubject<boolean>(false);
  public autoPlayAllowed = new BehaviorSubject<boolean>(false);
  private randomButtonDisabled = new BehaviorSubject<boolean>(true);

  playgroundDisabled$ = this.playgroundDisabled.asObservable();
  bettingDisabled$ = this.bettingDisabled.asObservable();
  autoPlayDisabled$ = this.autoPlayDisabled.asObservable();
  randomizerDisabled$ = this.randomizerDisabled.asObservable();
  playButtonDisabled$ = this.playButtonDisabled.asObservable();
  autoPlayAllowed$ = this.autoPlayAllowed.asObservable();
  randomButtonDisabled$ = this.randomButtonDisabled.asObservable();

  enablePlayground() {
    this.playgroundDisabled.next(false);
    this.bettingDisabled.next(true);
    this.playButtonDisabled.next(false);
    this.randomButtonDisabled.next(false); // Enable the random button
  }

  enableAutoPlay() {
    if (this.autoPlayAllowed.getValue()) {
      this.autoPlayDisabled.next(false);
      this.playButtonDisabled.next(true);
    }
  }

  toggleAutoPlayAllowed(isChecked: boolean) {
    this.autoPlayAllowed.next(isChecked);
  }

  startAutoPlay() {
    this.autoPlayAllowed.next(false);
    this.playgroundDisabled.next(true);
    this.bettingDisabled.next(true);
    this.autoPlayDisabled.next(true);
    this.playButtonDisabled.next(true);
    this.randomizerDisabled.next(false);
    this.randomButtonDisabled.next(true);
  }
  enableBettingAfterCashOut() {
    this.playgroundDisabled.next(true);
    this.bettingDisabled.next(false);
  }

  private revealedStarsSubject = new BehaviorSubject<number>(0);
  revealedStars$ = this.revealedStarsSubject.asObservable();

  private playgroundReset = new BehaviorSubject<boolean>(false);
  playgroundReset$ = this.playgroundReset.asObservable();

  constructor(
    private gameService: GameServiceService,
    private bettinService: BettingService
  ) {}

  resetRevealedStars() {
    this.gameService.boxes.forEach((box) => {
      box.isRevealed = false;
    });
    this.revealedStarsSubject.next(0);
  }

  increaseRevealedStars() {
    const revealedStars = this.gameService.boxes.filter(
      (box) => box.isRevealed && box.isStar
    ).length;
    this.revealedStarsSubject.next(revealedStars);
  }

  resetPlayground() {
    this.playgroundReset.next(true);
    this.resetBettingState();
  }

  resetBettingState() {
    this.bettinService._currentBet.next(0.1);
    this.bettinService.inputValue.next('0.10');
  }

  onCashOut() {
    this.resetRevealedStars();
    this.resetPlayground();
    this.enableBettingAfterCashOut();
    this.randomButtonDisabled.next(true);
  }
}
