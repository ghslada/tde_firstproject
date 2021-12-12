import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { CProdutosDoPedidoComponent } from './c-produtos-do-pedido.component';

describe('CProdutosDoPedidoComponent', () => {
  let component: CProdutosDoPedidoComponent;
  let fixture: ComponentFixture<CProdutosDoPedidoComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ CProdutosDoPedidoComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(CProdutosDoPedidoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
