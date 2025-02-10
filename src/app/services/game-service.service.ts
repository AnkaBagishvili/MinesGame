import { Injectable } from '@angular/core';
import { Box } from '../interfaces/box';

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
}
