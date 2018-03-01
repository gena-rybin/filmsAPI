export class TrailerDataModel {
  embed: string;
  imdb: string;
  link: number;
  pubDate: number;
  title: string;
  trailer_id: string;

  constructor(embed: string,
              imdb: string,
              link: number,
              pubDate: number,
              title: string,
              trailer_id: string) {

    this.embed = embed;
    this.imdb = imdb;
    this.link = link;
    this.pubDate = pubDate;
    this.title = title;
    this.trailer_id = trailer_id;
  }
}
