import { NgFor, NgIf } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-how-to-play',
  standalone: true,
  imports: [NgFor, NgIf],
  templateUrl: './how-to-play.component.html',
  styleUrl: './how-to-play.component.scss',
})
export class HowToPlayComponent {
  @Input() isVisible: boolean = false;
  @Output() visibleChange = new EventEmitter<boolean>();

  onOverlayClick(event: MouseEvent) {
    if ((event.target as HTMLElement).className === 'modal-overlay') {
      this.close();
    }
  }
  close() {
    this.isVisible = false;
    this.visibleChange.emit(false);
  }

  isStar(i: number, j: number): boolean {
    // Positions
    const starPositions = [
      { x: 1, y: 1 },
      { x: 2, y: 3 },
      { x: 3, y: 2 },
    ];
    return starPositions.some((pos) => pos.x === i && pos.y === j);
  }
}
