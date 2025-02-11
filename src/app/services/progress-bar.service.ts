import { Injectable } from '@angular/core';
import { GameServiceService } from './game-service.service';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ProgressBarService {
  private totalStars: number = 0;
  private progressSubject = new BehaviorSubject<number>(0);
  progress$ = this.progressSubject.asObservable();

  constructor(private gameService: GameServiceService) {
    this.updateTotalStars();
  }

  private updateTotalStars(): void {
    const totalBoxes = this.gameService.boxes.length;
    const totalMines = this.gameService.BOMB_COUNT;
    this.totalStars = totalBoxes - totalMines;
  }

  calculateProgress(): number {
    this.updateTotalStars();

    if (this.gameService.gameOver) {
      setTimeout(() => {
        this.progressSubject.next(0);
      }, 5000);
      return this.progressSubject.getValue();
    }

    const revealedStars = this.gameService.boxes.filter(
      (box) => box.isRevealed && box.isStar
    ).length;

    const progress = (revealedStars / this.totalStars) * 100;
    this.progressSubject.next(progress);
    return progress;
  }
}
