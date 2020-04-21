import { Component, OnInit } from '@angular/core';
import { FireBaseService } from 'src/app/services/fire-base.service';
import { Observable } from 'rxjs';
import { Games } from 'src/app/interfaces/player';

@Component({
  selector: 'app-load-games',
  templateUrl: './load-games.component.html',
  styleUrls: ['./load-games.component.scss']
})
export class LoadGamesComponent implements OnInit {

  public games$: Observable<Games[]>
  isEmpty: boolean
  players

  constructor(
    private dbService: FireBaseService,
  ) { }

  ngOnInit(): void {
    this.getGames();
  }

  getGames() {
    this.games$ = this.dbService.getGamesObservable();
  }

  deleteGame(id) {
    this.dbService.deleteGame(id)
    window.location.reload
  }

}
