import { Component } from '@angular/core';
import { BettingComponent } from '../betting/betting.component';
import { PlayButtonComponent } from '../play-button/play-button.component';
import { AutoPlayService } from '../../services/auto-play.service';
import { ProgressBarService } from '../../services/progress-bar.service';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [BettingComponent, PlayButtonComponent],
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.scss',
})
export class FooterComponent {
  constructor(
    public autoPlayService: AutoPlayService,
    private progressBarService: ProgressBarService
  ) {
    this.autoPlayService.toggleAutoPlay();
    this.progressBarService.calculateProgress();
  }
}
