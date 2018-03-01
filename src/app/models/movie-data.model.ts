import {TrailerDataModel} from './trailer-data.model';

export class MovieDataModel {
  countries: Array<string>;
  directors: Array<{name: string, id: string, sanitizeDirectorUrl: string}>;
  genres: Array<string>;
  idIMDB: string;
  languages: Array<string>;
  metascore: string;
  originalTitle: string;
  plot: string;
  ranking: number;
  rated: string;
  rating: string;
  releaseDate: string;
  runtime: string;
  simplePlot: string;
  title: string;
  type: string;
  urlIMDB: string;
  urlPoster: string;
  votes: string;
  writers: Array<{name: string, id: string}>;
  year: string;
  trailer: TrailerDataModel;

  constructor(countries: Array<string>,
              directors: Array<{name: string, id: string, sanitizeDirectorUrl: string}>,
              genres: Array<string>,
              idIMDB: string,
              languages: Array<string>,
              metascore: string,
              originalTitle: string,
              plot: string,
              ranking: number,
              rated: string,
              rating: string,
              releaseDate: string,
              runtime: string,
              simplePlot: string,
              title: string,
              type: string,
              urlIMDB: string,
              urlPoster: string,
              votes: string,
              writers: Array<{name: string, id: string}>,
              year: string,
              trailer: TrailerDataModel) {

    this.countries = countries;
    this.directors = directors;
    this.genres = genres;
    this.idIMDB = idIMDB;
    this.languages = languages;
    this.metascore = metascore;
    this.originalTitle = originalTitle;
    this.plot = plot;
    this.ranking = ranking;
    this.rated = rated;
    this.rating = rating;
    this.releaseDate = releaseDate;
    this.runtime = runtime;
    this.simplePlot = simplePlot;
    this.title = title;
    this.type = type;
    this.urlIMDB = urlIMDB;
    this.urlPoster = urlPoster;
    this.votes = votes;
    this.writers = writers;
    this.year = year;
    this.trailer = trailer;
  }
}
