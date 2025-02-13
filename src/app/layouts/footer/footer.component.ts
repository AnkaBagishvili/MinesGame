import { Component, OnDestroy, ViewChild } from '@angular/core';
import { BettingComponent } from '../betting/betting.component';
import { PlayButtonComponent } from '../play-button/play-button.component';
import { AutoPlayService } from '../../services/auto-play.service';
import { ProgressBarService } from '../../services/progress-bar.service';
import { AutoPlayComponent } from '../auto-play/auto-play.component';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [BettingComponent, PlayButtonComponent, AutoPlayComponent],
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.scss',
})
export class FooterComponent {
  constructor(
    public autoPlayService: AutoPlayService,
    private progressBarService: ProgressBarService
  ) {
    this.progressBarService.calculateProgress();
  }
  @ViewChild(AutoPlayComponent) autoPlay!: AutoPlayComponent;

  showAutoPlay() {
    this.autoPlay.show();
  }
}
