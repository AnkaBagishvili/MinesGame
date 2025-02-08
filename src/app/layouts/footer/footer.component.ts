import { Component } from '@angular/core';
import { BettingComponent } from '../betting/betting.component';
import { PlayButtonComponent } from '../play-button/play-button.component';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [BettingComponent, PlayButtonComponent],
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.scss',
})
export class FooterComponent {
  // toggleAutoGame() {
  //   this.isAutoGame.set(!this.isAutoGame());
  // }
  // setAutoGame(value: boolean) {
  //   this.isAutoGame.set(value);
  // }
}
