import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RemoteControllingComponent } from './remote-controlling.component';

describe('RemoteControllingComponent', () => {
  let component: RemoteControllingComponent;
  let fixture: ComponentFixture<RemoteControllingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RemoteControllingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RemoteControllingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
