import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class BalanceService {
  private _balance = new BehaviorSubject<number>(3000);
  balance$ = this._balance.asObservable();

  get balance(): number {
    return this._balance.value;
  }

  updateBalance(amount: number) {
    this._balance.next(this._balance.value + amount);
  }

}
