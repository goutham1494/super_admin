import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Title } from '@angular/platform-browser';
import { AdminService } from '../services/admin.service';
declare var $: any;

@Component({
  selector: 'app-vendor',
  templateUrl: './vendor.component.html',
  styleUrls: ['./vendor.component.css']
})
export class VendorComponent implements OnInit {

  constructor(private title: Title, private adminService: AdminService, private route: ActivatedRoute, private router: Router) { }

  vendor_id;
  vendor_name;
  vendor_email;
  vendor_mobile;
  vendor_reg_time;
  vendor_last_login;
  vendor_paused_status;
  vendor_approve_status;

  vendor_order;

  all_vendors;
  display_vendors;

  vendor_visit_count;
  user_review_count;

  vendor_order_count;

  ngOnInit() {

    //Get All vendors
    
    this.adminService.getAllVendors().subscribe(res => {
      this.all_vendors = res.msg;
      this.displayVendors(this.all_vendors);
    });


    this.route.params.subscribe(params => {
      // alert(params['id']);
      this.vendor_id = params['id'];
      // Get vendor from id
      this.adminService.getVendorById(this.vendor_id).subscribe(ven => {
        if (ven.success) {
          // Display vendor
          this.vendor_name = ven.msg[0].name;
          this.vendor_email = ven.msg[0].email;
          this.vendor_mobile = ven.msg[0].mobile;
          this.vendor_reg_time = ven.msg[0].registered_time;
          this.vendor_last_login = ven.msg[0].last_login_time;
        }else {
          // error
          alert('Something went wrong');
        }
      });
    })
    
    this.adminService.getVendorVistitCount(this.vendor_id).subscribe(vendorVisitCount => {    
      if(vendorVisitCount.success){
        console.log("Vendor visted")
        this.vendor_visit_count = vendorVisitCount.msg[0].count;
        console.log(this.vendor_visit_count)
      }
      else{
        alert("None avaliable");
      }
    })

    //User Review Count
    this.adminService.getUserReviewCount(this.vendor_id).subscribe(userReviewCount => {
      if(userReviewCount.success){
        this.user_review_count = userReviewCount.msg;
        console.log(this.user_review_count);
      }
      else{
        alert("No reviews avaliable");
      }
    })

    //Vendor Order Count

    this.adminService.getVendorOrderCount(this.vendor_id).subscribe(vendorOrderCount => {
      if(vendorOrderCount.success){
        this.vendor_order_count = vendorOrderCount.msg;
        console.log(this.vendor_order_count);
      }
      else{
        alert("Vendor Order Count");
      }
    })

  }
  cancelPauseClicked() {
    $('.db').hide();
    $('.wb').hide();
  }
  confirmPauseClicked() {
    $('.db').hide();
    $('.wb').hide();
  }
  confirmDeleteClicked() {
    $('.db').hide();
    $('.wb').hide();
  }
  sendMessageToVendorClicked() {
    $('.db').css({ 'display': 'flex' });
    $('.msg-wb').css({ 'display': 'flex' });
  }
  pauseVendorClicked() {
    $('.db').css({ 'display': 'flex' });
    $('.pause-wb').css({ 'display': 'flex' });
    this.adminService.pauseVendor(this.vendor_id).subscribe(res => {
      // res
    });
  }
  deleteVendorClicked() {
    $('.db').css({ 'display': 'flex' });
    $('.delete-wb').css({ 'display': 'flex' });
  }
  // viewVendorProfile() {
  //   // redirect to www.reatchall.com/business/:id
  //   this.router.navigateByUrl('https://localhost:4400/business' + this.business_id);
  // }

  
  displayVendors(vendors: any) {
    this.display_vendors = vendors;
  }

}
