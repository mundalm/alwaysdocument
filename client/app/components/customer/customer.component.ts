import { Component } from '@angular/core';
import {CustomerService} from '../../services/customer.service';
import {Customer} from '../../../entities/Customer';
import {Location} from '../../../entities/Location';


@Component({
  moduleId: module.id,
  selector: 'customer',
  templateUrl: 'customer.component.html'
})

export class CustomerComponent { 
	customers: Customer[];
	customerName: string;
	locationName: string;
	selectedCustomer: Customer;
	showNewCustomerForm:boolean = false;
	showLocations:boolean = false;
	showCustomers:boolean = true;
	newCustBtnTxt: string = "Ny kunde";

	constructor(private customerService:CustomerService){
		this.customerService.getCustomers().subscribe(customers => {
			this.customers = customers;
		});
	};

	addCustomer(event) {
		event.preventDefault();

		var newCustomer = {
			customerName: this.customerName,
			locations: [{name: "testlokasjon"}, {name: "testlokasjon2"}]
		}

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

	updateCustomer(customer) {
		console.log(customer);
		var _customer = {
			_id: customer._id,
			customerName: customer.customerName,
			locations: customer.locations
		};

		this.customerService.updateStatus(_customer).subscribe(data => {
			
		})
	}

	toggleNewCustomer() {
		this.showNewCustomerForm = !this.showNewCustomerForm;
		if(this.showNewCustomerForm) {
			this.newCustBtnTxt = "Skjul kundeskjema";
		} else {
			this.newCustBtnTxt = "Ny kunde";
		}

		this.showLocations = false;
	}

	showCustomerLocations(customer) {
		this.selectedCustomer = customer;
		this.showLocations = true;
		this.showNewCustomerForm = false;
		this.showCustomers = false;
	}

	backToCustomerList() {
		this.showLocations = false;
		this.showNewCustomerForm = false;
		this.showCustomers = true;
	}

	addLocation() {
		var newLoc:Location = {name: this.locationName};

		if(this.selectedCustomer.locations == null) {
			this.selectedCustomer.locations = new Array() as Location[];
		}

		this.selectedCustomer.locations.push(newLoc);
		this.updateCustomer(this.selectedCustomer);
		this.locationName = "";
	}

	deleteLocation(index) {
		this.selectedCustomer.locations.splice(index, 1);
		this.updateCustomer(this.selectedCustomer);
	}
	
}
