import { Component } from '@angular/core';
import { BettingService } from '../../services/betting.service';
import { AsyncPipe } from '@angular/common';

@Component({
  selector: 'app-play-button',
  standalone: true,
  imports: [AsyncPipe],
  templateUrl: './play-button.component.html',
  styleUrl: './play-button.component.scss',
})
export class PlayButtonComponent {
  isGameStarted:boolean=false;

  constructor(private bettingService: BettingService) {}

  onPlaceBet() {
    const success = this.bettingService.placeBet();
    if (success) {
      console.log('Bet placed successfully!');
    }
  }
  onCashOut(){

  }
}
