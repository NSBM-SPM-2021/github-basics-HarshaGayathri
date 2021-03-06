import { Component } from '@angular/core';
import { map } from 'rxjs/operators';
import { Breakpoints, BreakpointObserver } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { AppService } from '../app.service';
import { NotifierService } from '../notifier.service';
import { HOST } from 'src/common';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  /** Based on the screen size, switch from standard to one column per row */
  
  cards : CardI[] = [];
  cardsForHandset = [];
  cardForweb = [];
  
  isHandset:boolean = false;

  isHandsetObserver: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset).pipe(
    map(({ matches }) => {
      if (matches) {
        return true;
      }
      return false;
    })
  );

  cardsForWeb: any;

  constructor(private breakpointObserver: BreakpointObserver,
    public appService:AppService,
    private notifierService:NotifierService ) {}

  ngOnInit(){

    this.isHandsetObserver.subscribe((currentObserverValue: boolean) => {
      this.isHandset = currentObserverValue;
      this.loadCards();

    });

    this.appService.getDeals().subscribe(
      response=> {
        this.cardsForHandset = response.handsetCards;
        this.cardsForWeb = response.webCards;
        this.loadCards();
        this.notifierService.showNotification('Today deals loaded successfully.Click on any deal!','Ok','success');

      },
      error =>{
        //alert('There was an error in receiving data from server.Please try again later');
        this.notifierService.showNotification('There was an error in receiving data from server!','Ok','error');
      }
      
    );
  }

  loadCards() {
    this.cards = this.isHandset? this.cardsForHandset:this.cardsForWeb;
    console.log(JSON.stringify(this.cards));

  }

  getImage(imageName: string): string {
    return 'url('+ HOST +'images/'+ imageName + '.jpg' + ')';
  }


}


interface CardI{
  "imageName":string,
  "title":string,
  "cols":number,
  "rows":number
}


