import { CurrencyPipe, NgFor, NgIf } from '@angular/common';
import { Component } from '@angular/core';
import { HowToPlayComponent } from '../how-to-play/how-to-play.component';
import { GameSettingsComponent } from '../game-settings/game-settings.component';

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
  balance = 3000.28;
  dropdownOpen = false;

  //Choose Game
  toggleDropdown() {
    this.dropdownOpen = !this.dropdownOpen;
  }

  selectGame(game: string) {
    this.currentGame = game;
    this.dropdownOpen = false;
  }

  //How to play
  isHowToPlayVisible: boolean = false;

  showHowToPlay() {
    this.isHowToPlayVisible = true;
  }

  //GameSettings
  isSettingsVisible = false;

  toggleMenu() {
    this.isSettingsVisible = true;
  }
}
