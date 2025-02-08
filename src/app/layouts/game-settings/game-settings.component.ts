import { NgIf } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormsModule, NgModel } from '@angular/forms';

@Component({
  selector: 'app-game-settings',
  standalone: true,
  imports: [FormsModule, NgIf],
  templateUrl: './game-settings.component.html',
  styleUrl: './game-settings.component.scss',
})
export class GameSettingsComponent {
  @Input() isVisible: boolean = false;
  @Output() visibleChange = new EventEmitter<boolean>();
  sound: boolean = true;

  onOverlayClick(event: MouseEvent) {
    if ((event.target as HTMLElement).className === 'settings-overlay') {
      this.closeSettings();
    }
  }

  closeSettings() {
    this.isVisible = false;
    this.visibleChange.emit(false);
  }

  onFreeBetsClick() {
    console.log('Free Bets clicked');
  }

  onBetHistoryClick() {
    console.log('Bet History clicked');
  }

  onGameLimitsClick() {
    console.log('Game Limits clicked');
  }

  onHowToPlayClick() {
    console.log('How to Play clicked');
  }

  onGameRulesClick() {
    console.log('Game Rules clicked');
  }

  onProvablyFairClick() {
    console.log('Provably Fair clicked');
  }

  onBackToHomeClick() {
    console.log('Back to Home clicked');
  }
}
