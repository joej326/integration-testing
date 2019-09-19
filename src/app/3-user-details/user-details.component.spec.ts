/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { UserDetailsComponent } from './user-details.component';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';

class RouterStub {
  navigate(params) {

  }
}

// with integration testing we have to figure out a way to trigger a route change without explicity calling the ts code.
// Here we set up a means to trigger a "route change" whose functionality will behave like the actual ActivatedRoute would.
// in our "test navigation method" below, we use our "push" method as the route change functionality.
class ActivatedRouteStub {
  private subject = new Subject();

  push(value) {
    this.subject.next(value);
  }

  get params() {
    return this.subject.asObservable();
  }

}

xdescribe('UserDetailsComponent', () => {
  let component: UserDetailsComponent;
  let fixture: ComponentFixture<UserDetailsComponent>;


  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        { provide: Router, useClass: RouterStub }, // we use object syntax here to tell angular to use our stub instead of the actual router
        { provide: ActivatedRoute, useClass: ActivatedRouteStub }
      ],
      declarations: [ UserDetailsComponent ]
    });


    fixture = TestBed.createComponent(UserDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  // we are testing the route change which has a subscription in the .ts
  it('should test navigation', () => {

    let router = TestBed.get(Router);
    const spy = spyOn(router, 'navigate');

    let route: ActivatedRouteStub = TestBed.get(ActivatedRoute);
    route.push({id: 0});

    expect(spy).toHaveBeenCalledWith(['users']);
  });
});
