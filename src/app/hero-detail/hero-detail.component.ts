import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { MessageService } from '../message.service';
import { tap } from 'rxjs/operators';

import { Hero } from '../hero';

@Component({
  selector: 'app-hero-detail',
  templateUrl: './hero-detail.component.html',
  styleUrls: [ './hero-detail.component.css' ]
})
export class HeroDetailComponent implements OnInit {
  hero: Hero;
  private heroesUrl = 'api/heroes';  // URL to web api

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  constructor(
    private route: ActivatedRoute,
    private location: Location,
    private http: HttpClient,
    private messageService: MessageService
  ) {}

  ngOnInit(): void {
    this.getHero();
  }

  getHero(): void {
    const id = +this.route.snapshot.paramMap.get('id');
    const url = `${this.heroesUrl}/${id}`;
    this.http.get<Hero>(url).pipe(
    tap(_ => this.messageService.add(`fetched hero id=${id} from hero-detail.component`)))
    .subscribe(hero => this.hero = hero);
  }

  goBack(): void {
    this.location.back();
  }

  save(): void {
    this.http.put(this.heroesUrl, this.hero, this.httpOptions).pipe(
        tap(_ =>  this.messageService.add(`updated hero id=${this.hero.id} from hero-detail.component`)))
        .subscribe(() => this.goBack());
  }
}
