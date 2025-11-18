import { Injectable } from '@angular/core';
import { ToastController } from '@ionic/angular';

@Injectable({ providedIn: 'root' })
export class Favorites {
  
  private storageKey = 'favorites';
  private list: any[] = [];

  constructor(private toastController: ToastController) {
    this.carregar();
  }

  //Carrega os favoritos do localStorage
  private carregar() {
    const salvo = localStorage.getItem(this.storageKey);
    this.list = salvo ? JSON.parse(salvo) : [];
  }

  //Salva no localStorage
  private salvar() {
    localStorage.setItem(this.storageKey, JSON.stringify(this.list));
  }


  //Adiciona o filme
  add(movie: any) {
    if (!this.list.find(m => m.id === movie.id)) {
      this.list.push(movie);
      this.salvar();
      this.mensagem('Filme adicionado aos favoritos!', 'success');
      
    }
    else{
      this.mensagem('Filme já está nos favoritos!', 'danger');
    }
  }
  
  //Remove o filme 
  remove(id: number) {
    this.list = this.list.filter(m => m.id !== id);
    this.salvar();
    this.mensagem('Filme removido com sucesso!', 'success')
  }

  //Todos os filmes
  getAll() {
    return this.list;
  }

  async mensagem(message: string, color: 'success' | 'danger' ) {
    const toast = await this.toastController.create({
      message,
      duration: 1500,
      color,
    });

    toast.present();
  }
}
