import { Directive, Input, HostListener } from '@angular/core';

@Directive({
  selector: '[pesquisaTrailer]',
})
export class TrailerDirective {
  @Input() movieTitle = '';
  @Input() idioma = 'en-US';

  @HostListener('click')
  onClick(){
    let trailer = 'trailer em inglês';
    if (this.idioma === 'pt-BR') {
      trailer = 'trailer dublado';
    }

    const pesquisa = this.movieTitle + ' ' + trailer;
    const url = 'https://www.youtube.com/results?search_query=' + encodeURIComponent(pesquisa);
    window.open(url);
  }
}
