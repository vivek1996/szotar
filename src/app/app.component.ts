import { Component, OnInit, OnChanges } from '@angular/core';
import { DataService } from './data.service';
import { Translation } from './translation';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'app';

  mode = 'trans';
  translations: Translation[];
  synonyms: Translation[];

  sources = [];
  targets = [];
  source: string;
  target: any = {};

  /**
   * Creates an instance of AppComponent.
   * @param {DataService} data 
   * @memberof AppComponent
   */
  constructor(private data: DataService) {
  }

  /**
   * Event handler for switching between translation, antonym, synonym and sentence modes.
   * 
   * @memberof AppComponent
   */
  onModeChange() {
    this.source = (this.mode === 'ant' || this.mode === 'syn') ? 'en' : this.source;
    console.log(this.source);
    if (this.mode === 'sent') this.sources = this.data.sentenceLanguages;
    if (this.mode === 'trans'){
       this.sources = this.data.getLanguages();
       this.getLanguages(this.source);
    }
  }
  /**
   * Translation is the initial mode. Initialize by getting available source languges.
   * 
   * @memberof AppComponent
   */
  ngOnInit() {
    this.sources = this.data.getLanguages();
  }

  /**
   * Event handler for search box, action peformed depends on selected mode.
   * 
   * @param {string} word Keyword of search.
   * @memberof AppComponent
   */
  search(word: string) {
    switch (this.mode) {
      case 'trans':
        this.translate(word, this.source, this.target);
        break;
      case 'syn':
        this.getSynonym(word, this.source);
        break;
      case 'ant':
        this.getAntonym(word, this.source);
        break;
      case 'sent':
        this.getSentences(word, this.source);
    }
  }
  /**
   * Translate a word, results stored in member variables.
   * 
   * @param {string} word The word to be translated
   * @param {string} source Source language
   * @param {string} target Target language
   * @memberof AppComponent
   */
  translate(word: string, source: string, target: string) {
    console.log(word, source, target);
    this.translations = this.data.translate(word, source, target);
  }
  /**
   * Get all available target languages for a given source language, results stored in a member variable
   * 
   * @param {string} source Source language
   * @memberof AppComponent
   */
  getLanguages(source: string) {
    console.log(source);
    console.log('getlanguages called');
    this.targets = this.data.getLanguages(source);
  }
  /**
   * Event handler for source language combobox, pre-select target to English whenever the source language is anything but English
   * 
   * @param {string} source 
   * @memberof AppComponent
   */
  onSourceChanged(source: string) {
    if (this.source !== 'en') { this.target = 'en'; }
    this.getLanguages(source);
  }
  /**
   * Fetch synonyms of a word into a shared service
   * 
   * @param {string} word Word to get synonyms of
   * @param {string} source Source language
   * @memberof AppComponent
   */
  getSynonym(word: string, source: string) {
    this.data.getSynonym(word, source);
  }
  /**
     * Fetch antonyms of a word into a shared service
     * 
     * @param {string} word Word to get antonyms of
     * @param {string} source Source language
     * @memberof AppComponent
     */
  getAntonym(word: string, source: string) {
    this.data.getAntonym(word, source);
  }
  /**
     * Fetch example sentences with a word into a shared service
     * 
     * @param {string} word Word to get sentences with
     * @param {string} source Source language
     * @memberof AppComponent
     */
  getSentences(word: string, source: string) {
    this.data.getSentences(word, source);
  }

}
