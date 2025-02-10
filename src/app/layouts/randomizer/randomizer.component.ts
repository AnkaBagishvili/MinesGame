import { Component } from '@angular/core';
import { GameServiceService } from '../../services/game-service.service';

@Component({
  selector: 'app-randomizer',
  standalone: true,
  imports: [],
  templateUrl: './randomizer.component.html',
  styleUrl: './randomizer.component.scss',
})
export class RandomizerComponent {
  constructor(private gameService: GameServiceService) {}

  onRandomClick() {
    this.gameService.randomReveal();
  }
}
