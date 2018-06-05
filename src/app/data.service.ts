import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { Translation } from './translation';

@Injectable()
export class DataService {

  constructor(private api: ApiService) {

  }

  public translations: Translation[];
  public synonyms: Translation[];
  public antonyms: Translation[];
  public sentences: string[];
  public sentenceLanguages: any[] = [{
    id: 'en',
    language: "English"
  }, {
    id: 'es',
    language: "Spanish"
  }
  ];

/**
 * Translate a word from source language to target language, result is stored in data member
 * 
 * @param {string} word The word to be translated
 * @param {string} source Soruce language
 * @param {string} target Target language
 * @returns array of translations
 * @memberof DataService
 */
translate(word: string, source: string, target: string) {
    word = word.replace(/ /g, '_');
    const translations: Translation[] = [];
    this.api.translate(word, source, target).subscribe(res => {
      for (const result of res['results']) {
        for (const le of result['lexicalEntries']) {
          for (const e of le['entries']) {
            for (const s of e['senses']) {
              for (const t of s['translations'] || s['subsenses']) {

                if (t.hasOwnProperty('translations')) {

                  for (const u of t['translations']) {

                    translations.push(new Translation(u['text'], le['lexicalCategory'], u['registers'], u['regions']));
                  }
                } else {
                  translations.push(new Translation(t['text'], le['lexicalCategory'], t['registers'], t['regions']));
                }
              }
            }
          }
        }
      }
    }
    );

    this.translations = translations;

    return translations;
  }
/**
 * Get synonyms of a word, results stored in data member
 * 
 * @param {string} word The word to get synonyms of
 * @param {string} source Source language
 * @returns {Translation[]} Array of synonyms, using Translation object as a container
 * @memberof DataService
 */
getSynonym(word: string, source: string): Translation[] {
    word = word.replace(/ /g, '_');
    const syns: Translation[] = [];
    this.api.getSynonym(word, source).subscribe(res => {
      for (const result of res['results']) {
        for (const le of result['lexicalEntries']) {
          for (const e of le['entries']) {
            for (const s of e['senses']) {
              for (const t of s['subsenses'] || s['synonyms']) {

                if (t.hasOwnProperty('synonyms')) {

                  for (const u of t['synonyms']) {

                    syns.push(new Translation(u['text'], le['lexicalCategory'], t['registers'], t['regions']));
                  }
                } else {
                  syns.push(new Translation(t['text'], le['lexicalCategory'], s['registers'], s['regions']));
                }
              }
            }
          }
        }
      }
    }
    );

    this.synonyms = syns;

    return syns;
  }

  /**
 * Get antonyms of a word, results stored in data member
 * 
 * @param {string} word The word to get antonyms of
 * @param {string} source Source language
 * @returns {Translation[]} Array of antonyms, using Translation object as a container
 * @memberof DataService
 */
  getAntonym(word: string, source: string): Translation[] {
    word = word.replace(/ /g, '_');
    const syns: Translation[] = [];
    this.api.getAntonym(word, source).subscribe(res => {
      for (const result of res['results']) {
        for (const le of result['lexicalEntries']) {
          for (const e of le['entries']) {
            for (const s of e['senses']) {
              for (const t of s['antonyms']) {

                if (t.hasOwnProperty('antonyms')) {

                  for (const u of t['antonyms']) {

                    syns.push(new Translation(u['text'], le['lexicalCategory'], t['registers'], t['regions']));
                  }
                } else {
                  syns.push(new Translation(t['text'], le['lexicalCategory'], s['registers'], s['regions']));
                }
              }
            }
          }
        }
      }
    }
    );

    this.antonyms = syns;
    return syns;
  }

/**
 * Get available target languages for a given source language.
 * If source is not specified, get available source languages.
 * 
 * @param {string} [source] Source language
 * @param {string} [target] Target language
 * @returns {Object[]} array of available languages
 * @memberof DataService
 */
getLanguages(source?: string, target?: string): Object[] {
    const langs: Object[] = [];

    this.api.getLanguages(source, target).subscribe(res => {
      for (const r of res['results']) {
        if (!source && r['type'] === 'bilingual' && !langs.find(l => l['id'] === r.sourceLanguage.id)) {
          langs.push(r['sourceLanguage']);
        } else if (source && r.hasOwnProperty('targetLanguage')) { langs.push(r['targetLanguage']); }
      }
    }
    );

    console.log(langs);

    return langs;

  }

/**
 *Get example sentences of a given word. 
 * 
 * @param {string} word Word to get sentences with
 * @param {string} source Source language
 * @returns {string[]} array of example sentences
 * @memberof DataService
 */
getSentences(word: string, source: string): string[] {
    word = word.replace(/ /g, '_');
    const sentences: string[] = [];
    this.api.getSentences(word, source).subscribe(res => {
      for (const result of res['results']) {
        for (const le of result['lexicalEntries']) {
          for (const s of le['sentences']) {
            sentences.push(s.text);
          }
        }
      }
    }
    );

    this.sentences = sentences;
    return sentences;
  }

}
