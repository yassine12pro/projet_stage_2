import { Component, OnInit } from '@angular/core';
import { LoadingService } from 'src/app/services/loading.service';

@Component({
  selector: 'app-loading',
  templateUrl: './loading.component.html',
  styleUrls: ['./loading.component.css']
})
export class LoadingComponent implements OnInit {

  isLoading!:boolean
  constructor( loadingServive:LoadingService) {
    loadingServive.isLoading.subscribe((isloading)=>{
      this.isLoading=isloading;
    })

   }

  
  ngOnInit(): void {
  }
  

}
