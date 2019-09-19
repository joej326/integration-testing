import { VoterComponent } from './voter.component';
import { TestBed, ComponentFixture } from '@angular/core/testing';
import { By } from '@angular/platform-browser';


describe('VoterComponent', () => {

  let component: VoterComponent;
  let fixture: ComponentFixture<VoterComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ VoterComponent ]
    });


    fixture = TestBed.createComponent(VoterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });



  it('should render total votes', () => {
    component.othersVote = 20;
    component.myVote = 1;

    // we modified the above properties, and we need to tell angular to detect the changes.
    fixture.detectChanges();

    // debugElement represents the DOM
    let el: HTMLElement = fixture.debugElement.query(By.css('.vote-count')).nativeElement; // using native element cuz we wanna test the innerText

    expect(el.innerText).toBe(21);

  });

  it('should test highlighting', () => {
    component.myVote = 1;
    fixture.detectChanges();

    // debugElement represents the DOM
    let el = fixture.debugElement.query(By.css('.glyphicon-menu-up'));                  // note: not using nativeElement here

    expect(el.classes['highlighted']).toBeTruthy();

  });

  it('should increase total votes when I click the upvote button', () => {
    component.myVote = 1;
    fixture.detectChanges();

    // debugElement represents the DOM
    let button = fixture.debugElement.query(By.css('.glyphicon-menu-up'));
    button.triggerEventHandler('click', null); // second arg is an object w/ data about the event. Don't need extra data in this case.

    // IMPORTANT:
    // button.triggerEventHandler is an integration test.
    // we could alternatively do: component.upVote(); but that would be a unit test.
    // it is recommended to make a separate voter.component.unit.spec.ts to separate your intergration tests from your unit tests.

    expect(component.totalVotes).toBe(1);

  });
});
