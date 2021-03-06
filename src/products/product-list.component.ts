import  {Component, OnInit} from '@angular/core';
import {IProducts} from './products';
import { ProductService } from './product.service';

@Component({
    selector: 'pm-products',
    templateUrl: './product-list.component.html',
    styleUrls:['./product-list.component.css']
   
})

export class ProductListComponent implements OnInit{
    pageTitle: string ='Product List';
    imageWidth: number=50;
    imageMargin: number=2;
    showImage: boolean=false;
    imageFilter: string='cart';
    errorMessage: string;
    _listFilter: string;
    get listFilter(): string{
        return this._listFilter;
    }
    set listFilter(value: string){
        this._listFilter=value;
        this.filteredProducts=this.listFilter?this.performFilter(this.listFilter):this.products;
    }
    filteredProducts: IProducts[];
    products: IProducts[]=[];
        
            toggleImage(): void{

            this.showImage=!this.showImage;
        }
        ngOnInit():void{
            this.productservice.getProducts().subscribe(
                products=>
                {this.products=products;
                 this.filteredProducts=this.products;
                },
                error=>this.errorMessage=<any>error
                
            );
        
        }
        
        constructor(private productservice:ProductService){
        
        }
        performFilter(filterBy:string):IProducts[]{
            filterBy=filterBy.toLocaleLowerCase();
            return this.products.filter((product:IProducts)=> product.productName.toLocaleLowerCase().indexOf(filterBy)!==-1);
        }
        onRatingClicked(message:string):void{
            this.pageTitle="Product List "+ message;
        }
              
}


