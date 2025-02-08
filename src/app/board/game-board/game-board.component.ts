import { Component } from '@angular/core';
import { PlayGroundComponent } from '../play-ground/play-ground.component';

@Component({
  selector: 'app-game-board',
  standalone: true,
  imports: [PlayGroundComponent],
  templateUrl: './game-board.component.html',
  styleUrl: './game-board.component.scss',
})
export class GameBoardComponent {}
