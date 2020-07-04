import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { FormStorageDirective } from './form-storage.directive';
import { LargeFormComponent } from './large-form/large-form.component';

@NgModule({
  declarations: [
    AppComponent,
    FormStorageDirective,
    LargeFormComponent
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
