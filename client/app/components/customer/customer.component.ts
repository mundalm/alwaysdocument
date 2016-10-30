import { Component } from '@angular/core';
import {CustomerService} from '../../services/customer.service'
import {Customer} from '../../../Customer';

@Component({
  moduleId: module.id,
  selector: 'customer',
  templateUrl: 'customer.component.html'
})

export class CustomerComponent { 
	customers: Customer[];
	customerName: string;

	constructor(private customerService:CustomerService){
		this.customerService.getCustomers().subscribe(customers => {this.customers = customers});
	};

	addCustomer(event) {
		console.log(event); 
		event.preventDefault();
		var newCustomer = {
			customerName: this.customerName,
			isDone: false
		}
		console.log(newCustomer); 
		this.customerService.addCustomer(newCustomer).subscribe(customer => {
			this.customers.push(customer);
			this.customerName = ''; 
		})
	}

	deleteCustomer(id) {
		var customers = this.customers;

		this.customerService.deleteCustomer(id).subscribe(data => {
			if(data.n == 1) {
				for(var i = 0; i < customers.length;i++) {
					if(customers[i]._id == id) {
						customers.splice(i, 1);
					}
				}
			}
		})
	}

	updateStatus(customer) {
		var _customer = {
			_id: customer._id,
			customerName: customer.customerName,
			isDone: !customer.isDone,
		};
		console.log(_customer);

		this.customerService.updateStatus(_customer).subscribe(data => {
			customer.isDone = !customer.isDone;
		})
	}
}
