import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { TableModule } from 'primeng/table';
const test = [
  {
    id: '1000',
    code: 'f230fh0g3',
    name: 'Test 1',
    description: 'Product Description',
    price: 65,
    category: 'Accessories',
    quantity: 24,
    inventoryStatus: 'INSTOCK',
    rating: 5
},
{
  id: '1001',
  code: 'f230fh0g3',
  name: 'Test 2',
  description: 'Product Description',
  price: 65,
  category: 'Accessories',
  quantity: 24,
  inventoryStatus: 'INSTOCK',
  rating: 5
},
]
@Component({
  selector: 'app-tasks-page',
  standalone: true,
  imports: [TableModule, CommonModule],
  templateUrl: './tasks-page.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class TasksPageComponent {
  products!: any[];

  constructor() {}

  ngOnInit() {
      this.products = test
  }
}
