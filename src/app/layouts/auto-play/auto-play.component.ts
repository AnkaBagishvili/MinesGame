import { Component, OnDestroy } from '@angular/core';
import { RaundOptions } from '../../interfaces/raund-options';
import { AutoPlayService } from '../../services/auto-play.service';
import { GameServiceService } from '../../services/game-service.service';
import { FormsModule, NgModel } from '@angular/forms';
import { BettingService } from '../../services/betting.service';
import { BalanceService } from '../../services/balance.service';

@Component({
  selector: 'app-auto-play',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './auto-play.component.html',
  styleUrl: './auto-play.component.scss',
})
export class AutoPlayComponent implements OnDestroy {
  isVisible = false;
  private currentRound = 0;
  private maxRounds = 0;
  private initialBalance = 0;
  private checkInterval: any;
  private isWaitingForNextRound = false;
  private roundTimeout: any;

  roundOptions: RaundOptions[] = [
    { value: 3, selected: true },
    { value: 10, selected: false },
    { value: 25, selected: false },
    { value: 100, selected: false },
  ];

  stopOnDecrease = {
    enabled: false,
    value: 0.0,
  };

  selectRound(selectedOption: RaundOptions) {
    this.roundOptions.forEach((option) => {
      option.selected = option === selectedOption;
    });
  }

  incrementValue(condition: { value: number }) {
    condition.value = +(condition.value + 0.01).toFixed(2);
  }

  decrementValue(condition: { value: number }) {
    if (condition.value > 0) {
      condition.value = +(condition.value - 0.01).toFixed(2);
    }
  }
  
  close() {
    this.isVisible = false;

  }

  show() {
    this.isVisible = true;
  }
  stopOnWin = {
    enabled: false,
    value: 0.0,
  };

  constructor(
    private autoPlayService: AutoPlayService,
    private gameService: GameServiceService,
    private bettingService: BettingService,
    private balanceService: BalanceService
  ) {}

  ngOnDestroy() {
    this.stopAutoPlay();
  }

  startAuto() {
    const selectedRounds = this.roundOptions.find(
      (option) => option.selected
    )?.value;
    if (!selectedRounds) return;

    this.maxRounds = selectedRounds;
    this.currentRound = 0;
    this.initialBalance = this.balanceService.balance;
    this.isWaitingForNextRound = false;

    this.gameService.initializeGame();
    if (this.bettingService.placeBet()) {
      this.currentRound++;
      this.autoPlayService.startAutoPlay(500);
      this.monitorAutoPlay();
      this.close();
    }
  }

  private monitorAutoPlay() {
    if (this.checkInterval) {
      clearInterval(this.checkInterval);
    }

    this.checkInterval = setInterval(() => {
      if (this.shouldStop()) {
        this.stopAutoPlay();
        return;
      }

      if (this.gameService.gameOver && !this.isWaitingForNextRound) {
        this.isWaitingForNextRound = true;

        if (this.roundTimeout) {
          clearTimeout(this.roundTimeout);
        }

        this.roundTimeout = setTimeout(() => {
          if (this.shouldStop()) {
            this.stopAutoPlay();
            return;
          }

          this.gameService.initializeGame();

          setTimeout(() => {
            if (this.balanceService.balance <= 0) {
              this.stopAutoPlay();
              return;
            }

            if (this.bettingService.placeBet()) {
              this.currentRound++;
              this.isWaitingForNextRound = false;
              this.autoPlayService.startAutoPlay(500);
              console.log('Next round started successfully');
            } else {
              this.stopAutoPlay();
            }
          }, 100);
        }, 5000);
      }
    }, 500);
  }

  private shouldStop(): boolean {
    if (this.currentRound > this.maxRounds) {
      return true;
    }

    if (this.stopOnDecrease.enabled) {
      const currentBalance = this.balanceService.balance;
      const decrease = this.initialBalance - currentBalance;
      if (decrease >= this.stopOnDecrease.value) {
        return true;
      }
    }

    return false;
  }

  private stopAutoPlay() {
    console.log('Stopping auto-play');
    this.autoPlayService.stopAutoPlay();

    if (this.checkInterval) {
      clearInterval(this.checkInterval);
      this.checkInterval = null;
    }

    if (this.roundTimeout) {
      clearTimeout(this.roundTimeout);
      this.roundTimeout = null;
    }

    this.isWaitingForNextRound = false;
  }
}
