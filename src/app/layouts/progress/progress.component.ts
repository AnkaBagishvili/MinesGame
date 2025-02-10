import { Component, OnInit } from '@angular/core';
import { ProgressBarService } from '../../services/progress-bar.service';
import { Subscription } from 'rxjs';
import { NgFor, NgIf } from '@angular/common';
import { GameServiceService } from '../../services/game-service.service';

@Component({
  selector: 'app-progress',
  standalone: true,
  imports: [NgIf, NgFor],
  templateUrl: './progress.component.html',
  styleUrl: './progress.component.scss',
})
export class ProgressComponent implements OnInit {
  mines: number[] = [];
  currentMines: number = 1;
  dropdownOpen: boolean = false;

  toggleDropdown() {
    this.dropdownOpen = !this.dropdownOpen;
  }

  selectMines(mines: number) {
    this.currentMines = mines;
    this.dropdownOpen = false;
    this.gameService.setBombCount(mines);
  }

  progress: number = 0;
  private subscription!: Subscription;

  constructor(
    private progressBarService: ProgressBarService,
    private gameService: GameServiceService
  ) {
    this.gameService.setBombCount(this.currentMines);
  }

  ngOnInit() {
    for (let i = 1; i <= 20; i++) {
      this.mines.push(i);
    }

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
