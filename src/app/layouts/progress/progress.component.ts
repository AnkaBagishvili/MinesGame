import { Component } from '@angular/core';
import { ProgressBarService } from '../../services/progress-bar.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-progress',
  standalone: true,
  imports: [],
  templateUrl: './progress.component.html',
  styleUrl: './progress.component.scss',
})
export class ProgressComponent {
  progress: number = 0;
  private subscription!: Subscription;

  constructor(private progressBarService: ProgressBarService) {}

  ngOnInit() {
    this.subscription = this.progressBarService.progress$.subscribe(
      (progress) => {
        this.progress = Math.round(progress);
      }
    );
  }

  ngOnDestroy() {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }
}
