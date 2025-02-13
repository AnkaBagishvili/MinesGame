import { Component } from '@angular/core';
import { GameServiceService } from '../../services/game-service.service';
import { ProgressBarService } from '../../services/progress-bar.service';
import { FormsModule } from '@angular/forms';
import { AutoPlayService } from '../../services/auto-play.service';

@Component({
  selector: 'app-randomizer',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './randomizer.component.html',
  styleUrl: './randomizer.component.scss',
})
export class RandomizerComponent {
  constructor(
    private gameService: GameServiceService,
    private progressBarService: ProgressBarService
  ) {}

  onRandomClick() {
    this.gameService.randomReveal();

    this.progressBarService.calculateProgress();
  }
}
