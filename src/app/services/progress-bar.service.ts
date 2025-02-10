import { Injectable } from '@angular/core';
import { GameServiceService } from './game-service.service';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ProgressBarService {
  private totalStars = 20;
  private progressSubject = new BehaviorSubject<number>(0);
  progress$ = this.progressSubject.asObservable();

  constructor(private gameService: GameServiceService) {}

  setTotalStars(totalStars: number) {
    this.totalStars = totalStars;
  }

  calculateProgress(): number {
    const revealedStars = this.gameService.boxes.filter(
      (box) => box.isRevealed && !box.isBomb
    ).length;
    const progress = (revealedStars / this.totalStars) * 100;
    this.progressSubject.next(progress);
    return progress;
  }
}
