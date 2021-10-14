import { Component, OnInit } from '@angular/core';
import { CalculatorComponent } from 'src/app/calculator/calculator.component';
import { ClienteFormularioComponent } from 'src/app/cliente-formulario/cliente-formulario.component';
import { ContactosComponent } from 'src/app/contactos/componente.component';
import { DemosComponent } from 'src/app/demos/demos.component';
import { HomeComponent } from '..';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  menu = [
    { texto: 'contactos', icono: '', componente: ContactosComponent },
    { texto: 'formulario', icono: '', componente: ClienteFormularioComponent },
    { texto: 'inicio', icono: '', componente: HomeComponent },
    { texto: 'demos', icono: '', componente: DemosComponent },
    { texto: 'calculadora', icono: '', componente: CalculatorComponent },
  ];

  actual = this.menu[0].componente;

  seleccionar(indice: number): void {
    this.actual = this.menu[indice].componente;
  }
  constructor() {}

  ngOnInit(): void {}
}
