import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpModule} from '@angular/http';
import { FormsModule} from '@angular/forms';

import {AppComponent} from './app.component';
import {CustomerComponent} from './components/customer/customer.component';

@NgModule({
  imports:      [ BrowserModule, HttpModule, FormsModule ],
  declarations:	[AppComponent, CustomerComponent],
  bootstrap:	[AppComponent],
})
export class AppModule { }
