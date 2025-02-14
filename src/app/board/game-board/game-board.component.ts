import { Component } from '@angular/core';
import { PlayGroundComponent } from '../play-ground/play-ground.component';
import { ProgressComponent } from '../../layouts/progress/progress.component';
import { RandomizerComponent } from '../../layouts/randomizer/randomizer.component';
import { GameStateService } from '../../services/game-state.service';
import { AsyncPipe, NgClass } from '@angular/common';

@Component({
  selector: 'app-game-board',
  standalone: true,
  imports: [PlayGroundComponent, ProgressComponent, RandomizerComponent,AsyncPipe,NgClass],
 templateUrl: './game-board.component.html',
  styleUrl: './game-board.component.scss',
})
export class GameBoardComponent {
  constructor(public gameState: GameStateService) {}

  enablePlayground() {
    this.gameState.enablePlayground();
  }

  enableAutoPlay() {
    this.gameState.enableAutoPlay();
  }

  startAuto() {
    this.gameState.startAutoPlay();
  }
}
