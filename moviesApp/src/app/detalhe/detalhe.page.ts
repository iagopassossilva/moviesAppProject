import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-detalhe',
  templateUrl: './detalhe.page.html',
  styleUrls: ['./detalhe.page.scss'],
})
export class DetalhePage implements OnInit {

  public movieid : string 
  constructor(private activatedRouted: ActivatedRoute) { }

  ngOnInit() {
    this.movieid = this.activatedRouted.snapshot.paramMap.get('id')!;
  }

}
