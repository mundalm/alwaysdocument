import { Component } from '@angular/core';
import {CustomerService} from './services/customer.service';

@Component({
  moduleId: module.id,
  selector: 'my-app',
  templateUrl: 'app.component.html',
  providers: [CustomerService]
}) 

export class AppComponent { }
