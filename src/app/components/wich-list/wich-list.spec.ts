import { ComponentFixture, TestBed } from '@angular/core/testing';
import { WichList } from './wich-list';

describe('WichList', () => {
  let component: WichList;
  let fixture: ComponentFixture<WichList>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [WichList],
    }).compileComponents();

    fixture = TestBed.createComponent(WichList);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
