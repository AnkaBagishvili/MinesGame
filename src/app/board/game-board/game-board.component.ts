import { Component } from '@angular/core';
import { PlayGroundComponent } from '../play-ground/play-ground.component';
import { ProgressComponent } from '../../layouts/progress/progress.component';
import { RandomizerComponent } from '../../layouts/randomizer/randomizer.component';
import { HowToPlayComponent } from '../../layouts/how-to-play/how-to-play.component';

@Component({
  selector: 'app-game-board',
  standalone: true,
  imports: [PlayGroundComponent, ProgressComponent, RandomizerComponent],
 templateUrl: './game-board.component.html',
  styleUrl: './game-board.component.scss',
})
export class GameBoardComponent {}
