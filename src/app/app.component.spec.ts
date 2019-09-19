/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { AppComponent } from './app.component';
import { RouterOutlet, RouterLinkWithHref } from '@angular/router';

describe('AppComponent', () => {
  let component: AppComponent;
  let fixture: ComponentFixture<AppComponent>;


  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ RouterTestingModule.withRoutes() ], // note that we are provided with this route testing module.
      declarations: [ AppComponent ]                // the routes are the ones in the app module
    });

    fixture = TestBed.createComponent(AppComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });


  it('should test router-outlet', () => {
    let de = fixture.debugElement.query(By.directive(RouterOutlet));
    expect(de).not.toBe(null);
  });

  it('should route to /todos', () => {      // RouterLinkWithHref is the ts equivalent of HTML's routerLink.
    let routerLinksInThePage = fixture.debugElement.queryAll(By.directive(RouterLinkWithHref));
    // expect(de).not.toBe(null);
  });
});
