import { Component, OnDestroy, OnInit } from '@angular/core';
import { Box } from '../../interfaces/box';
import { AsyncPipe, NgFor, NgIf, NgStyle } from '@angular/common';
import { GameServiceService } from '../../services/game-service.service';
import { ProgressBarService } from '../../services/progress-bar.service';
import { GameStateService } from '../../services/game-state.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-play-ground',
  standalone: true,
  imports: [NgFor, NgIf, NgStyle],
  templateUrl: './play-ground.component.html',
  styleUrl: './play-ground.component.scss',
})
export class PlayGroundComponent implements OnInit, OnDestroy {
  private resetSubscription!: Subscription;

  get boxes(): Box[] {
    return this.gameService.boxes;
  }

  constructor(
    private gameService: GameServiceService,
    private progressBarService: ProgressBarService,
    public gameStateService: GameStateService
  ) {}

  ngOnInit() {
    this.gameService.initializeGame();

    // Subscribe to reset event
    this.resetSubscription = this.gameStateService.playgroundReset$.subscribe(
      (reset) => {
        if (reset) {
          this.resetPlayground();
        }
      }
    );
  }

  ngOnDestroy() {
    this.gameService.clearTimers();
    if (this.resetSubscription) {
      this.resetSubscription.unsubscribe();
    }
  }

  revealBox(index: number) {
    this.gameService.revealBox(index);
    this.progressBarService.calculateProgress();
  }

  private resetPlayground() {
    // Reset game state
    this.gameService.initializeGame();
    this.progressBarService.calculateProgress();
  }
}
