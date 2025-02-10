import { Component } from '@angular/core';
import { PlayGroundComponent } from '../play-ground/play-ground.component';
import { ProgressComponent } from '../../layouts/progress/progress.component';

@Component({
  selector: 'app-game-board',
  standalone: true,
  imports: [PlayGroundComponent, ProgressComponent],
  templateUrl: './game-board.component.html',
  styleUrl: './game-board.component.scss',
})
export class GameBoardComponent {}
