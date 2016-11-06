"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var core_1 = require('@angular/core');
var customer_service_1 = require('../../services/customer.service');
var CustomerComponent = (function () {
    function CustomerComponent(customerService) {
        var _this = this;
        this.customerService = customerService;
        this.showNewCustomerForm = false;
        this.showNewLocationForm = false;
        this.showLocations = false;
        this.showCustomers = true;
        this.newCustBtnTxt = "Ny kunde";
        this.newLocBtnTxt = "Ny lokasjon";
        this.customerService.getCustomers().subscribe(function (customers) {
            _this.customers = customers;
        });
    }
    ;
    CustomerComponent.prototype.addCustomer = function (event) {
        var _this = this;
        event.preventDefault();
        var newCustomer = {
            customerName: this.customerName,
            locations: [{ name: "testlokasjon" }, { name: "testlokasjon2" }]
        };
        this.customerService.addCustomer(newCustomer).subscribe(function (customer) {
            _this.customers.push(customer);
            _this.customerName = '';
        });
    };
    CustomerComponent.prototype.deleteCustomer = function (id) {
        var customers = this.customers;
        this.customerService.deleteCustomer(id).subscribe(function (data) {
            if (data.n == 1) {
                for (var i = 0; i < customers.length; i++) {
                    if (customers[i]._id == id) {
                        customers.splice(i, 1);
                    }
                }
            }
        });
    };
    CustomerComponent.prototype.updateCustomer = function (customer) {
        console.log(customer);
        var _customer = {
            _id: customer._id,
            customerName: customer.customerName,
            locations: customer.locations
        };
        this.customerService.updateStatus(_customer).subscribe(function (data) {
        });
    };
    CustomerComponent.prototype.toggleNewCustomer = function () {
        this.showNewCustomerForm = !this.showNewCustomerForm;
        if (this.showNewCustomerForm) {
            this.newCustBtnTxt = "Skjul kundeskjema";
        }
        else {
            this.newCustBtnTxt = "Ny kunde";
        }
        this.showLocations = false;
    };
    CustomerComponent.prototype.toggleNewLocation = function () {
        this.showNewLocationForm = !this.showNewLocationForm;
        if (this.showNewLocationForm) {
            this.newLocBtnTxt = "Skjul lokasjonsskjema";
        }
        else {
            this.newLocBtnTxt = "Ny lokasjon";
        }
    };
    CustomerComponent.prototype.showCustomerLocations = function (customer) {
        this.selectedCustomer = customer;
        this.showLocations = true;
        this.showNewCustomerForm = false;
        this.showCustomers = false;
    };
    CustomerComponent.prototype.backToCustomerList = function () {
        this.showLocations = false;
        this.showNewCustomerForm = false;
        this.showCustomers = true;
    };
    CustomerComponent.prototype.addLocation = function () {
        var newLoc = { name: this.locationName };
        if (this.selectedCustomer.locations == null) {
            this.selectedCustomer.locations = new Array();
        }
        this.selectedCustomer.locations.push(newLoc);
        this.updateCustomer(this.selectedCustomer);
        this.locationName = "";
    };
    CustomerComponent.prototype.deleteLocation = function (index) {
        this.selectedCustomer.locations.splice(index, 1);
        this.updateCustomer(this.selectedCustomer);
    };
    CustomerComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'customer',
            templateUrl: 'customer.component.html'
        }), 
        __metadata('design:paramtypes', [customer_service_1.CustomerService])
    ], CustomerComponent);
    return CustomerComponent;
}());
exports.CustomerComponent = CustomerComponent;
//# sourceMappingURL=customer.component.js.map