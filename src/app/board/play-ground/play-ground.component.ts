import { Component, OnDestroy, OnInit } from '@angular/core';
import { Box } from '../../interfaces/box';
import { NgFor, NgIf, NgStyle } from '@angular/common';
import { GameServiceService } from '../../services/game-service.service';
import { ProgressBarService } from '../../services/progress-bar.service';

@Component({
  selector: 'app-play-ground',
  standalone: true,
  imports: [NgFor, NgIf, NgStyle],
  templateUrl: './play-ground.component.html',
  styleUrl: './play-ground.component.scss',
})
export class PlayGroundComponent implements OnInit, OnDestroy {
  get boxes(): Box[] {
    return this.gameService.boxes;
  }

  constructor(
    private gameService: GameServiceService,
    private progressBarService: ProgressBarService
  ) {}

  ngOnInit() {
    this.gameService.initializeGame();
  }

  ngOnDestroy() {
    this.gameService.clearTimers();
  }

  revealBox(index: number) {
    this.gameService.revealBox(index);
    this.progressBarService.calculateProgress();
  }
}
