import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SearchCountryComponent } from './search-country/search-country.component';

const routes: Routes = [
  { path: 'Search-Country', component: SearchCountryComponent },
  // { path: 'edit/:id', component: CreateEmployeeComponent },
  { path: '', redirectTo: '/Search-Country', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
