import { Injectable } from '@angular/core';
import { AngularFirestoreCollection, AngularFirestore, DocumentChangeAction } from '@angular/fire/firestore';
import { Games } from '../interfaces/player';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import * as firebase from 'firebase/app';
import { ThrowStmt } from '@angular/compiler';
// import 'firebase/<PACKAGE>';

@Injectable({
  providedIn: 'root'
})
export class FireBaseService {
  private gamesRef: AngularFirestoreCollection<Games>

  constructor(private db: AngularFirestore) {
    this.gamesRef = this.db.collection<Games>('games')
  }

  getGamesObservable(): Observable<Games[]> {
    return this.gamesRef.snapshotChanges()
      .pipe(
        map((items: DocumentChangeAction<Games>[]): Games[] => {
          return items.map((item: DocumentChangeAction<Games>): Games => {
            return {
              id: item.payload.doc.data().id,
              players: item.payload.doc.data().players,
              tee: item.payload.doc.data().tee,
            }
          })
        })
      );
  }

  getCurrentGameObservable(_id: number) {
    let doc = this.db.collection<Games>('games', ref => ref.where('id', "==", _id))
    

    return doc.valueChanges()
  }

  saveGame(tee: string, id: number) {
    return this.gamesRef.add({id, tee})
      .then(_ => {
        console.log('success on add')
      })
      .catch(error => console.log('add', error));
  }

  updateGame(_id: number, _value: any, type: string, name?: string) {
    let doc = this.db.collection<Games>('games', ref => ref.where('id', "==", _id))

    doc.snapshotChanges()
    .pipe(
        map( actions => actions.map(a => {
          const data = a.payload.doc.data()
          const id = a.payload.doc.id;
          console.log(id)
          return {data, id};
        }))
    ).subscribe((_doc: any) => {
      let id = _doc[0].id
      // console.log(res[0].payload.data)
      if(type === "player") {
        this.db.collection(`games/`).doc(id).update({[`players`]: firebase.firestore.FieldValue.arrayUnion({
          name: _value,
          in: 0,
          out: 0,
          total: 0
        })})
      }
      else if(type === "in") {
        let playerIndex = _doc[0].data.players.findIndex(player => player.name === name);
        console.log(playerIndex)
        this.db.collection(`games/`).doc(id).update({[`players`]: firebase.firestore.FieldValue.arrayUnion({
          name: name,
          in: _value
        })})    
      }
      // else if(type === "out") {
      //   this.db.collection(`games/`).doc(id).update({[`players.${name}.scores.out`]: _value})
      // }
      // else if(type === "total") {
      //   this.db.collection(`games/`).doc(id).update({[`players.${name}.scores.total`]: _value})
      // }
      
    })

  }

  deletePlayer(_id: number, _name: string) {
    let doc = this.db.collection<Games>('games', ref => ref.where('id', "==", _id))

    doc.snapshotChanges()
    .subscribe((res: any) => {
      let id = res[0].payload.doc.id
      console.log(id)
      this.db.collection(`games/`).doc(id).update({['players']: firebase.firestore.FieldValue.arrayRemove({
        name: _name
      })})
      .then(_ => {
        console.log('success on delete')
      })
    })
  }

  deleteGame(_id: number) {
    let doc = this.db.collection<Games>('games', ref => ref.where('id', "==", _id))

    doc.snapshotChanges()
    .subscribe((res: any) => {
      let id = res[0].payload.doc.id
      this.db.collection(`games/`).doc(id).delete()
    })
  }

}
