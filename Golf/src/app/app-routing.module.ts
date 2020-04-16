import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CoursesComponent } from './components/courses/courses.component';
import { CardComponent } from './components/card/card.component';
import { TeeTypeComponent } from './components/tee-type/tee-type.component';
import { LoadGamesComponent } from './components/load-games/load-games.component';


const routes: Routes = [
  { path: '', redirectTo: '/courses', pathMatch: 'full'},
  { path: 'courses', component: CoursesComponent},
  { path: 'load-games', component: LoadGamesComponent},
  { path: 'courses/:id', component: TeeTypeComponent},
  { path: 'courses/:id/:tee', component: CardComponent},
  { path: '**', redirectTo: '/courses'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
