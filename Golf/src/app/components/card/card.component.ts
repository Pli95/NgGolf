import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { switchMap, tap, map } from 'rxjs/operators';
import { GolfCoursesService } from 'src/app/services/golf-courses.service';
import { Location } from '@angular/common';
import { MatDialog } from '@angular/material/dialog';
import { CharacterDialogComponent } from './character-dialog/character-dialog.component';
import { Observable, of } from 'rxjs';
import { Games, Player } from 'src/app/interfaces/player';
import { FireBaseService } from 'src/app/services/fire-base.service';
import { FinishDialogComponent } from './finish-dialog/finish-dialog.component';
import * as confetti from 'canvas-confetti'

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss']
})
export class CardComponent implements OnInit {
  num: number = Math.ceil(Math.random() * 1000);
  // num: number = 419
  isNew = true;
  selectedTee: any;
  teeType: string;
  teeInfo: any[] = [];
  hover = false;
  half: number;
  yardNum = [];
  parNum = [];
  playerNum = [];
  outTotal: number;
  inTotal: number;
  total: number;
  yardIn: number;
  yardOut: number;
  yardTotal: number;
  data: Games;
  player: Player = { name: '' };

  games$: Observable<Games[]>;
  game$: Observable<any>


  constructor(
    private route: ActivatedRoute,
    private courseService: GolfCoursesService,
    private dbService: FireBaseService,
    private location: Location,
    public dialog: MatDialog,
  ) { }

  ngOnInit(): void {
    this.route.params.pipe(
      switchMap(params => {
        this.teeType = params.tee
        return this.courseService.getCourseById(params.id)
      }),
      tap(course => {
        this.selectedTee = course.holes
        course.holes.forEach(hole => {
          this.teeInfo.push(hole.teeBoxes.filter(tee => tee.teeType === this.teeType)[0])
        })

        this.teeInfo.forEach(hole => {
          this.yardNum.push(hole.yards)
          this.parNum.push(hole.par)
        })

        this.doMath(this.yardNum)
        this.yardOut = this.outTotal
        this.yardIn = this.inTotal
        this.yardTotal = this.total
        this.doMath(this.parNum)
        this.half = this.selectedTee.length / 2
      })
    ).subscribe();

    this.getCurrentGame()
  }

  openDialog() {
    const dialogRef = this.dialog.open(CharacterDialogComponent, {
      width: '300px',
      data: { name: this.player.name }
    })

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        if (this.isNew) {
          this.saveGame()
        }
        this.updatePlayer(result, "player")
        this.player.name = null
      }
    })
  }

  saveGame() {
    this.dbService.saveGame(this.teeType, this.num)
    this.isNew = false
  }

  getGames() {
    this.games$ = this.dbService.getGamesObservable();
    this.games$.forEach(games => {
      games.forEach(game => {
        if (game.id === this.num) {
          console.log(game.players)
        }
      })
    })

  }

  updatePlayer(value, type: string) {
    this.dbService.updateGame(this.num, value, type)
  }

  updateScore(value, type: string, name: string) {
    this.dbService.updateGame(this.num, value, type, name)
  }

  deletePlayer(name) {
    this.dbService.deletePlayer(this.num, name)
    console.log('delete player')

  }

  onBlur(event, name, inTotal, outTotal, inOrOut) {
    let score = Number(event.target.value)
    if (!score) {
      score = 0
    }

    if (inOrOut === 'in') {
      inTotal += score
      //update to db
      this.updateScore(inTotal, "in", name)
    }
    else {
      outTotal += score
      //update to db
    }

    let total = inTotal + outTotal
    //update to db

  }

  finishGame() {
    // confetti.create()()
    const dialogRef = this.dialog.open(FinishDialogComponent, {
      width: '300px',
      data: { id: this.num, par: this.total }
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    })
  }

  goBack() {
    this.location.back()
  }

  doMath(nums: Array<number>) {
    this.outTotal = 0
    this.inTotal = 0
    let outHalf = nums.splice(0, nums.length / 2)
    outHalf.forEach(num => [
      this.outTotal += num
    ])
    nums.forEach(num => {
      this.inTotal += num
    })
    this.total = this.outTotal + this.inTotal
  }

  getCurrentGame() {
    this.game$ = this.dbService.getCurrentGameObservable(this.num)
    this.game$.forEach(data => {
      data[0].players.forEach(player => {
        console.log(player)
      })
    })
  }

}
