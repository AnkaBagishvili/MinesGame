import { inject, Injectable, signal } from '@angular/core';
import { Box } from '../interfaces/box';
import { Subject } from 'rxjs';
import { ProgressBarService } from './progress-bar.service';

@Injectable({
  providedIn: 'root',
})
export class GameServiceService {
  boxes: Box[] = [];
  gameOver: boolean = false;
  readonly TOTAL_BOXES = 25;
  BOMB_COUNT = 5;
  restartCountdown: number = 5;
  private countdownInterval: any;
  private restartTimeout: any;
  gameInitialized$: any;

  setBombCount(mines: number) {
    this.BOMB_COUNT = mines;
    this.initializeGame();
  }

  initializeGame() {
    this.clearTimers();

    this.gameOver = false;
    this.restartCountdown = 5;
    this.boxes = [];

    for (let i = 0; i < this.TOTAL_BOXES; i++) {
      this.boxes.push({
        isRevealed: false,
        isBomb: false,
        isClicked: false,
      });
    }

    let bombsPlaced = 0;
    while (bombsPlaced < this.BOMB_COUNT) {
      const randomIndex = Math.floor(Math.random() * this.TOTAL_BOXES);
      if (!this.boxes[randomIndex].isBomb) {
        this.boxes[randomIndex].isBomb = true;
        bombsPlaced++;
      }
    }
  }

  revealBox(index: number) {
    if (this.gameOver || this.boxes[index].isRevealed) {
      return;
    }

    this.boxes[index].isRevealed = true;
    this.boxes[index].isClicked = true;

    if (this.boxes[index].isBomb) {
      this.endGame();
    }
  }

  endGame() {
    this.gameOver = true;
    this.boxes.forEach((box) => {
      if (!box.isClicked) {
        box.isRevealed = true;
      }
    });

    this.countdownInterval = setInterval(() => {
      this.restartCountdown--;
      if (this.restartCountdown <= 0) {
        clearInterval(this.countdownInterval);
      }
    }, 1000);

    this.restartTimeout = setTimeout(() => {
      this.initializeGame();
    }, 5000);
  }

  clearTimers() {
    if (this.countdownInterval) {
      clearInterval(this.countdownInterval);
    }
    if (this.restartTimeout) {
      clearTimeout(this.restartTimeout);
    }
  }

  //Randomizer
  private getUnrevealedSafeBoxes(): number[] {
    return this.boxes
      .map((box, index) => ({ box, index }))
      .filter(({ box }) => !box.isRevealed && !box.isBomb)
      .map(({ index }) => index);
  }

  private getUnrevealedBoxes(): number[] {
    return this.boxes
      .map((box, index) => ({ box, index }))
      .filter(({ box }) => !box.isRevealed)
      .map(({ index }) => index);
  }

  randomReveal(preferSafe: boolean = true) {
    if (this.gameOver) {
      return;
    }

    let availableBoxes = preferSafe
      ? this.getUnrevealedSafeBoxes()
      : this.getUnrevealedBoxes();

    if (availableBoxes.length === 0 && !this.gameOver && preferSafe) {
      availableBoxes = this.getUnrevealedBoxes();
    }

    if (availableBoxes.length === 0) {
      return;
    }

    const randomIndex = Math.floor(Math.random() * availableBoxes.length);
    const boxToReveal = availableBoxes[randomIndex];

    this.revealBox(boxToReveal);
  }

  autoReveal(
    count: number = 1,
    intervalMs: number = 100,
    preferSafe: boolean = true
  ) {
    if (this.gameOver || count <= 0) {
      return;
    }

    let revealed = 0;
    const interval = setInterval(() => {
      if (this.gameOver || revealed >= count) {
        clearInterval(interval);
        return;
      }

      this.randomReveal(preferSafe);
      revealed++;
    }, intervalMs);

    return interval;
  }
}
