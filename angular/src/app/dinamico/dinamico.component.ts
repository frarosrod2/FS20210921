import { Component, OnInit } from '@angular/core';
import { CalculatorComponent } from '../calculator/calculator.component';
import { ClienteFormularioComponent } from '../cliente-formulario/cliente-formulario.component';
import { ContactosComponent, CONTACTOS_COMPONENTES } from '../contactos/componente.component';
import { DemosComponent } from '../demos/demos.component';
import { FormularioComponent } from '../formulario/formulario.component';
import { HomeComponent } from '../main';

@Component({
  selector: 'app-dinamico',
  templateUrl: './dinamico.component.html',
  styleUrls: ['./dinamico.component.scss']
})
export class DinamicoComponent implements OnInit {

  menu = [
    {texto: 'contactos', icono: '', componente: ContactosComponent},
    {texto: 'formulario', icono: '', componente: ClienteFormularioComponent},
    {texto: 'inicio', icono: '', componente: HomeComponent},
    {texto: 'demos', icono: '', componente: DemosComponent},
    {texto: 'calculadora', icono: '', componente: CalculatorComponent},
  ];

  actual = this.menu[0].componente;

  constructor() { }

  seleccionar(indice: number): void {
    this.actual = this.menu[indice].componente;
  }

  ngOnInit(): void {
  }

}
