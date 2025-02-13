import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AutoPlayComponent } from './auto-play.component';

describe('AutoPlayComponent', () => {
  let component: AutoPlayComponent;
  let fixture: ComponentFixture<AutoPlayComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AutoPlayComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AutoPlayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
