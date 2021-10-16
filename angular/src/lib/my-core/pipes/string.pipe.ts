import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'elipsis'
})

export class ElipsisPipe implements PipeTransform {
  transform(value: any, maxlen: number): any {
  return (!maxlen || maxlen < 2 || !value || value.length<= maxlen) ? value : (value.substr(0, maxlen - 1) + '\u2026');
  }
  }


  @Pipe({
    name: 'dateString'
  })

  export class DateStringPipe implements PipeTransform {
    transform(value: any): any {
      if(value !==null){
      let split = value.split('-')
      let year = split[0];
      let month = split[1].replace('0','')
      let day = split[2]
      const monthNames = ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"];
      return (day + ' de '+monthNames[month-1]+', '+year)
      }
    }
    }

    export const PIPES_CADENAS = [ElipsisPipe, DateStringPipe]
