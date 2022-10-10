import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FormBuilderComponent } from './views/form-builder/form-builder.component';
import { ModelBuilderComponent } from './views/model-builder/model-builder.component';

const routes: Routes = [
  {
    path: '',
    children: [
      { path: '', redirectTo: 'model-builder', pathMatch: 'full' },
      { path: 'model-builder', component: ModelBuilderComponent },
      { path: 'form-builder', component: FormBuilderComponent },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
