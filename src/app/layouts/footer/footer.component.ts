import { Component, ViewChild } from '@angular/core';
import { BettingComponent } from '../betting/betting.component';
import { PlayButtonComponent } from '../play-button/play-button.component';
import { AutoPlayService } from '../../services/auto-play.service';
import { ProgressBarService } from '../../services/progress-bar.service';
import { AutoPlayComponent } from '../auto-play/auto-play.component';
import { AsyncPipe, NgClass } from '@angular/common';
import { GameStateService } from '../../services/game-state.service';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [
    BettingComponent,
    PlayButtonComponent,
    AutoPlayComponent,
    NgClass,
    AsyncPipe,
  ],
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.scss',
})
export class FooterComponent {
  constructor(
    public autoPlayService: AutoPlayService,
    private progressBarService: ProgressBarService,
    public gameState: GameStateService
  ) {
    this.progressBarService.calculateProgress();
  }
  @ViewChild(AutoPlayComponent) autoPlay!: AutoPlayComponent;

  enableAutoPlay() {
    this.gameState.enableAutoPlay();
    this.autoPlay.show();
  }
}
