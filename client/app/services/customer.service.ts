import {Injectable} from '@angular/core';
import {Http, Headers} from '@angular/http';
import 'rxjs/add/operator/map';

@Injectable()
export class CustomerService {
	constructor(private http:Http) {
		console.log('Customer Service Initialized..');
	}

	getCustomers(){
		return this.http.get('/api/customers').map(res => res.json());
	}

	addCustomer(newCustomer) {
		var headers = new Headers();
		headers.append('Content-Type', 'application/json');
		return this.http.post('/api/customer', JSON.stringify(newCustomer), {headers: headers})
		.map(res => res.json());
	}

	deleteCustomer(id) {
		return this.http.delete('/api/customer/'+id)
		.map(res => res.json());
	}

	updateStatus(customer) {
		var headers = new Headers();
		headers.append('Content-Type', 'application/json');
		return this.http.put('/api/customer/'+customer._id, JSON.stringify(customer), {headers: headers})
		.map(res => res.json());	
	}
}