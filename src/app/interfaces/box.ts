export interface Box {
  isClicked: boolean;
  isRevealed: boolean;
  isBomb: boolean;
  isStar: boolean;
  id?: number;
  position?: {
    row: number;
    col: number;
  };
  isMarked?: boolean;
}
