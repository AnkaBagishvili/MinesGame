import { Component } from '@angular/core';
import { GameServiceService } from '../../services/game-service.service';
import { ProgressBarService } from '../../services/progress-bar.service';
import { FormsModule } from '@angular/forms';
import { AsyncPipe, NgClass } from '@angular/common';
import { GameStateService } from '../../services/game-state.service';

@Component({
  selector: 'app-randomizer',
  standalone: true,
  imports: [FormsModule, AsyncPipe, NgClass, AsyncPipe],
  templateUrl: './randomizer.component.html',
  styleUrl: './randomizer.component.scss',
})
export class RandomizerComponent {
  constructor(
    private gameService: GameServiceService,
    private progressBarService: ProgressBarService,
    public gameState: GameStateService
  ) {}

  enableAutoPlay() {
    this.gameState.enableAutoPlay();
  }
  onRandomClick() {
    this.gameService.randomReveal();

    this.progressBarService.calculateProgress();
  }
  onAutoPlayCheckboxChange(event: Event) {
    const checkbox = event.target as HTMLInputElement;
    this.gameState.toggleAutoPlayAllowed(checkbox.checked);
    console.log('AutoPlay allowed:', checkbox.checked);
  }
}
