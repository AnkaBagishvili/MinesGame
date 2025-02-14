import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class GameStateService {
  private playgroundDisabled = new BehaviorSubject<boolean>(true);
  private bettingDisabled = new BehaviorSubject<boolean>(false);
  private autoPlayDisabled = new BehaviorSubject<boolean>(true);
  private randomizerDisabled = new BehaviorSubject<boolean>(false);
  private playButtonDisabled = new BehaviorSubject<boolean>(false);
  private autoPlayAllowed = new BehaviorSubject<boolean>(false);
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
  onCashOut() {
    this.enableBettingAfterCashOut();
  }
}
