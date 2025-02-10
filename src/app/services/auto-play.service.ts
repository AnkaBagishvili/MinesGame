// import { Injectable } from '@angular/core';
// import { GameServiceService } from './game-service.service';

// @Injectable({
//   providedIn: 'root',
// })
// export class AutoPlayService {
//   private isAutoPlaying: boolean = false;
//   private autoPlayInterval: any;
//   constructor(private gameService: GameServiceService) {}
//   startAutoPlay(intervalMs: number = 100) {
//     if (this.isAutoPlaying || this.gameService.gameOver) {
//       return;
//     }
//     this.isAutoPlaying = true;
//     this.autoPlayInterval = setInterval(() => {
//       if (this.gameService.gameOver) {
//         this.stopAutoPlay();
//         return;
//       }
//       this.randomReveal();
//     }, intervalMs);
//   }
//   stopAutoPlay() {
//     this.isAutoPlaying = false;
//     if (this.autoPlayInterval) {
//       clearInterval(this.autoPlayInterval);
//       this.autoPlayInterval = null;
//     }
//   }
//   randomReveal() {
//     const unrevealedBoxes = this.getUnrevealedBoxIndices();
//     if (unrevealedBoxes.length === 0 || this.gameService.gameOver) {
//       this.stopAutoPlay();
//       return;
//     }
//     const safeBoxes = unrevealedBoxes.filter(
//       (index) => !this.gameService.boxes[index].isBomb
//     );
//     if (safeBoxes.length > 0) {
//       const randomIndex = Math.floor(Math.random() * safeBoxes.length);
//       this.gameService.revealBox(safeBoxes[randomIndex]);
//     } else {
//       const randomIndex = Math.floor(Math.random() * unrevealedBoxes.length);
//       this.gameService.revealBox(unrevealedBoxes[randomIndex]);
//     }
//   }
//   private getUnrevealedBoxIndices(): number[] {
//     return this.gameService.boxes
//       .map((box, index) => ({ box, index }))
//       .filter(({ box }) => !box.isRevealed)
//       .map(({ index }) => index);
//   }
//   isPlaying(): boolean {
//     return this.isAutoPlaying;
//   }
//   toggleAutoPlay(intervalMs: number = 500) {
//     if (this.isAutoPlaying) {
//       this.stopAutoPlay();
//     } else {
//       this.startAutoPlay(intervalMs);
//     }
//   }
// }
