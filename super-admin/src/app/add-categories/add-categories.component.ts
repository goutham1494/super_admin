import { Component, OnInit } from '@angular/core';
import { AdminService } from '../services/admin.service';
import { Http } from '@angular/http';
const moment = require('moment');

@Component({
  selector: 'app-add-categories',
  templateUrl: './add-categories.component.html',
  styleUrls: ['./add-categories.component.css']
})
export class AddCategoriesComponent implements OnInit {

  constructor(private adminService: AdminService,private http: Http) { }

  catName;
  all_cats;
  section;
  fileToUpload : File = null;
  ngOnInit() {
    this.displayCats();
  }

  displayCats() {
    this.adminService.getCategories().subscribe(res => {
      console.log(res)
      this.all_cats = res.msg;
    });
  }


  handleFileInput(e){
    console.log(e)
    this.fileToUpload = e.target.files[0]
    console.log(this.fileToUpload)
  }


  addCategoryClicked() {
    // alert('clicked');
    const cur_time = moment().format('MMMM Do YYYY, h:mm:ss a');
    const fd = new FormData();
    fd.append('image',this.fileToUpload,this.fileToUpload.name)
    fd.append('section',this.section)
    fd.append('name',this.catName)
    fd.append('time',cur_time)
    
    if (this.catName !== undefined && this.catName !== null && this.catName !== '') {
      console.log(fd);
      this.adminService.AddCategory(fd).subscribe(res => {
        if (res.success) {
          this.displayCats();
          this.catName = '';
        }
        else{
          alert(res.msg)
        }
      });
    }else {
      alert('Empty Category name');
    }
  }

  catDeleteClicked(cat) {
    const obj = {id: cat};
    this.adminService.DeleteCategory(obj).subscribe(res => {
      console.log(res);
      if (res.success) {
        alert('deleted');
        this.displayCats();
      }else {
        alert('Not deleted');
      }
    });
  }

}
