import { Component, OnInit } from '@angular/core';
import { CalculatorComponent } from '../calculator/calculator.component';
import { DemosComponent } from '../demos/demos.component';
import { HomeComponent } from '../home/home.component';

@Component({
  selector: 'app-dinamico',
  templateUrl: './dinamico.component.html',
  styleUrls: ['./dinamico.component.scss']
})
export class DinamicoComponent implements OnInit {

  menu = [
    {texto: 'calculadora', icono: '', componente: CalculatorComponent},
    {texto: 'inicio', icono: '', componente: HomeComponent},
    {texto: 'demos', icono: '', componente: DemosComponent},
  ];

  actual = this.menu[0].componente;

  constructor() { }

  seleccionar(indice: number): void {
    this.actual = this.menu[indice].componente;
  }

  ngOnInit(): void {
  }

}
