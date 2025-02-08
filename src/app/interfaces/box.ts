export interface Box {
  isClicked: boolean;
  isRevealed: boolean;
  isBomb: boolean;
  id?: number;
  position?: {
    row: number;
    col: number;
  };
  isMarked?: boolean;
}
