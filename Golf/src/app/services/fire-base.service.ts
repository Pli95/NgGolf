import { Injectable } from '@angular/core';
import { AngularFirestoreCollection, AngularFirestore, DocumentChangeAction } from '@angular/fire/firestore';
import { Games, Player } from '../interfaces/player';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import * as firebase from 'firebase/app';
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

  saveGame(tee: string, players: Player[]) {
    return this.gamesRef.add({id: "test", players ,tee})
      .then(_ => {
        console.log('success on add')
      })
      .catch(error => console.log('add', error));
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
