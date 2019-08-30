import { Component, OnInit } from '@angular/core';
import { Hero } from '../hero';
import { HttpClient } from '@angular/common/http';
import { MessageService } from '../message.service';
import { tap } from 'rxjs/operators';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: [ './dashboard.component.css' ]
})
export class DashboardComponent implements OnInit {
  heroes: Hero[] = [];
  private heroesUrl = 'api/heroes';  // URL to web api

  constructor(private http: HttpClient,
              private messageService: MessageService) { }

  ngOnInit() {
    this.getHeroes();
  }

  getHeroes(): void {
   this.http.get<Hero[]>(this.heroesUrl)
   .pipe(
    tap(_ => this.messageService.add(`Dashboard: fetched heroes`)))
      .subscribe(heroes => this.heroes = heroes.slice(1, 5));
  }

}
