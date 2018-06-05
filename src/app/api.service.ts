import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { HttpClient, HttpHeaders } from '@angular/common/http';

const API_URL: string = "api/";
const APP_ID: string = "84d36e1b";
const APP_KEY: string = "0d7afee8fc1023b492f7712543b9b9aa";

const httpOptions = {
  headers: new HttpHeaders({
    'Accept': 'application/json',
    'app_id': APP_ID,
    'app_key': APP_KEY
  })
};

@Injectable()
export class ApiService {
  /**
   * Creates an instance of ApiService.
   * @param {HttpClient} http Performs HTTP requests
   * @memberof ApiService
   */
  constructor(private http: HttpClient) { }
  /**
   * Request synonyms of a given word from the Oxford Dictionaries API
   * 
   * @param {string} word Word to get synonyms of
   * @param {string} source Source language
   * @returns {Observable<Object>} 
   * @memberof ApiService
   */
  getSynonym(word: string, source: string): Observable<Object> {
    return this.http.get(API_URL + `entries/${source}/${word}/synonyms`, httpOptions);
  }
  /**
   * Request antonyms of a given word from the Oxford Dictionaries API
   * 
   * @param {string} word Word to get antonyms of
   * @param {string} source Source language
   * @returns {Observable<Object>} 
   * @memberof ApiService
   */
  getAntonym(word: string, source: string): Observable<Object> {
    return this.http.get(API_URL + `entries/${source}/${word}/antonyms`, httpOptions);
  }
  /**
   * Request translations of a given word from the Oxford Dictionaries API
   * 
   * @param {string} word  Word to translate
   * @param {string} source Source language
   * @param {string} target Target language
   * @returns {Observable<Object>} 
   * @memberof ApiService
   */
  translate(word: string, source: string, target: string): Observable<Object> {
    return this.http.get(API_URL + `entries/${source}/${word}/translations=${target}`, httpOptions);
  }
/**
 * Request languages with bilingual dictionaries from the Oxford Dictionaries API
 * 
 * @param {string} [source] Source language of bilingual dictionary
 * @param {string} [target] Target language of bilingual dictionary
 * @returns {Observable<Object>} 
 * @memberof ApiService
 */
getLanguages(source?: string, target?: string): Observable<Object> {
    console.log("req");
    const url = API_URL + 'languages' + (source ? `?sourceLanguage=${source}` : '') + (target ? `&targetLanguage=${source}` : '');

    console.log(url);

    return this.http.get(url, httpOptions);
  }
/**
 * Request example sentences with a given word from the Oxford Dictionaries API
 * 
 * @param {string} word Word to get example sentences with
 * @param {string} source Source language
 * @returns {Observable<Object>} 
 * @memberof ApiService
 */
getSentences(word: string, source: string): Observable<Object> {
    return this.http.get(API_URL + `entries/${source}/${word}/sentences`, httpOptions);
  }

}
