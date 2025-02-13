import { CurrencyPipe, NgFor, NgIf } from '@angular/common';
import { Component } from '@angular/core';
import { HowToPlayComponent } from '../how-to-play/how-to-play.component';
import { GameSettingsComponent } from '../game-settings/game-settings.component';
import { BalanceService } from '../../services/balance.service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [
    NgIf,
    NgFor,
    CurrencyPipe,
    HowToPlayComponent,
    GameSettingsComponent,
  ],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
})
export class HeaderComponent {
  games = ['MINES', 'SLOTS', 'BLACKJACK'];
  currentGame = 'MINES';
  dropdownOpen = false;
  isHowToPlayVisible: boolean = false;
  isSettingsVisible = false;
  balance: number = 0;

  constructor(private balanceService: BalanceService) {
    this.balanceService.balance$.subscribe((balance) => {
      this.balance = balance;
    });
  }

  selectGame(game: string) {
    this.currentGame = game;
    this.dropdownOpen = false;
  }

  placeBet(amount: number) {
    this.balanceService.updateBalance(-amount);
  }
}
