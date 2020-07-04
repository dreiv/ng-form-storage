import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { FormStorageDirective } from './form-storage.directive';
import { LargeFormComponent } from './large-form/large-form.component';
import { DelayFormComponent } from './delay-form/delay-form.component';

@NgModule({
  declarations: [
    AppComponent,
    FormStorageDirective,
    LargeFormComponent,
    DelayFormComponent
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
