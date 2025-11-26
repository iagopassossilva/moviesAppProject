import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http'; // NOVO: HttpHeaders & HttpParams
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TmdbService {
  private apiUrl = 'https://api.themoviedb.org/3';
  private apiKey = '23830b6b826e50d35a96e72356ba1f35';
  //Ponte entre o app e a API do TMDB.
  //Consulta, retorna dados JSON da API e entrega para os components

  constructor(private http: HttpClient) {}

  // Pegar filmes populares
  getPopularMovies(): Observable<any> {
    return this.http.get(`${this.apiUrl}/movie/popular?api_key=${this.apiKey}&language=pt-BR`);
  }

  // Buscar um filme pelo nome
  searchMovies(query: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/search/movie?api_key=${this.apiKey}&language=pt-BR&query=${query}`);
  }

  // Buscar detalhes de um filme pelo ID
  pegaDetalheFilme(id: number): Observable<any> {
    return this.http.get(`${this.apiUrl}/movie/${id}?api_key=${this.apiKey}&language=pt-BR`);
  }

  //  Exemplo de uso de HttpParams (forma limpa de montar URL)
  getTopRatedMovies(page: number = 1): Observable<any> {
    const params = new HttpParams()
      .set('api_key', this.apiKey)
      .set('language', 'pt-BR')
      .set('page', page);

    return this.http.get(`${this.apiUrl}/movie/top_rated`, { params });
  }

  // Requisição com HttpHeaders (simulando autenticação/controle)
  getUpcomingMovies(): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${this.apiKey}` // TMDB aceita tokens -> exemplo útil para a apresentação
    });

    return this.http.get(`${this.apiUrl}/movie/upcoming?language=pt-BR&api_key=${this.apiKey}`, { headers });
  }

  // Busca por filmes com filtros adicionais no HTTP
  discoverMoviesByGenre(genreId: number, page: number = 1): Observable<any> {
    const params = new HttpParams()
      .set('api_key', this.apiKey)
      .set('language', 'pt-BR')
      .set('with_genres', genreId)
      .set('page', page);

    return this.http.get(`${this.apiUrl}/discover/movie`, { params });
  }

  // NOVO: Exemplo real de POST (mesmo que o TMDB quase só use GET). Requisições HTTP além de GET.
  marcarFilmeComoFavorito(movieId: number, sessionId: string): Observable<any> {
    const body = { media_type: 'movie', media_id: movieId, favorite: true };

    return this.http.post(
      `${this.apiUrl}/account/{account_id}/favorite?api_key=${this.apiKey}&session_id=${sessionId}`,
      body // envia JSON no body da requisição
    );
  }
}
