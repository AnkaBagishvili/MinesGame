import { Component } from '@angular/core';
import { BettingService } from '../../services/betting.service';

@Component({
  selector: 'app-play-button',
  standalone: true,
  imports: [],
  templateUrl: './play-button.component.html',
  styleUrl: './play-button.component.scss',
})
export class PlayButtonComponent {
  constructor(private bettingService: BettingService) {}

  onPlaceBet() {
    const success = this.bettingService.placeBet();
    if (success) {
      console.log('Bet placed successfully!');
    }
  }
}
