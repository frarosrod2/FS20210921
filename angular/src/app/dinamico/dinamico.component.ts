import { Component, OnInit } from '@angular/core';
import { CalculatorComponent } from '../calculator/calculator.component';
import { DemosComponent } from '../demos/demos.component';
import { HomeComponent } from '../main';

@Component({
  selector: 'app-dinamico',
  templateUrl: './dinamico.component.html',
  styleUrls: ['./dinamico.component.scss']
})
export class DinamicoComponent implements OnInit {

  menu = [

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
