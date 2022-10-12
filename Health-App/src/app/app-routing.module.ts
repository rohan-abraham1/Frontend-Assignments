import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { SearchCountryComponent } from './search-country/search-country.component';

const routes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: 'Search-Country', component: SearchCountryComponent },
  { path: '', redirectTo: '/home', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
