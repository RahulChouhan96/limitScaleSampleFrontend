import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { FormComponent } from './components/form/form.component';
import { ListComponent } from './components/list/list.component';
import { AllDataComponent } from './components/all-data/all-data.component';
import { EditComponent } from './components/edit/edit.component';
import { SearchResultsComponent } from './components/search-results/search-results.component';


const routes: Routes = [
  {path: "", component: FormComponent},
  {path: "seeAll", component: ListComponent},
  {path: "allDataOneUser/:_id", component: AllDataComponent},
  {path: "edit/:_id", component: EditComponent},
  {path: "searchData/:key", component: SearchResultsComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
