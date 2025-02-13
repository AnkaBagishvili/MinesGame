import { Injectable } from '@angular/core';
import { GameServiceService } from './game-service.service';
import { ProgressBarService } from './progress-bar.service';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AutoPlayService {
  private isAutoPlaying: boolean = false;
  private autoPlayInterval: any;

  constructor(
    private gameService: GameServiceService,
    private progressBarService: ProgressBarService
  ) {}

  startAutoPlay(intervalMs: number = 100) {
    if (this.isAutoPlaying || this.gameService.gameOver) {
      return;
    }
    this.isAutoPlaying = true;
    this.autoPlayInterval = setInterval(() => {
      if (this.gameService.gameOver) {
        this.stopAutoPlay();
        return;
      }
      this.gameService.randomReveal();
      this.progressBarService.calculateProgress();
    }, intervalMs);
  }

  stopAutoPlay() {
    this.isAutoPlaying = false;
    if (this.autoPlayInterval) {
      clearInterval(this.autoPlayInterval);
      this.autoPlayInterval = null;
    }
    this.progressBarService.calculateProgress();
  }

  isPlaying(): boolean {
    return this.isAutoPlaying;
  }

  toggleAutoPlay(intervalMs: number = 500) {
    if (this.isAutoPlaying) {
      this.stopAutoPlay();
    } else {
      this.startAutoPlay(intervalMs);
    }
  }
}
