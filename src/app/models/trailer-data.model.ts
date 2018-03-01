export class TrailerDataModel {
  // description:  "Two imprisoned men bond over a number of years, finding solace and eventual redemption through acts of common decency. "
  // duration :"2:11"
  // qualities  : Array(5)
  // 0 :{quality: "480p", videoURL: "https://video-http.media-imdb.com/MV5BODlhNjU1YjQt…nMqw18ABy4nUPf0_&Key-Pair-Id=APKAILW5I44IHKUN2DYA"}
  // 1 :{quality: "SD", videoURL: "https://video-http.media-imdb.com/MV5BNmMwNDVkYzgt…3GIsnqc3bRRy4aQ_&Key-Pair-Id=APKAILW5I44IHKUN2DYA"}
  // 2 :{quality: "SD", videoURL: "https://video-http.media-imdb.com/MV5BMGQzZGEyYTQt…gWj7yU1uXxxqhrY_&Key-Pair-Id=APKAILW5I44IHKUN2DYA"}
  // 3 :{quality: "SD", videoURL: "https://video-http.media-imdb.com/MV5BYjE0YjMxOTgt…d6y2AHb8Wm4XMDQ_&Key-Pair-Id=APKAILW5I44IHKUN2DYA"}
  // 4 :{quality: "SD", videoURL: "https://video-http.media-imdb.com/MV5BZGNjZjgyMDMt…wi30wvtdjCSdfvY_&Key-Pair-Id=APKAILW5I44IHKUN2DYA"}
  //
  // title :"Official Trailer"
  // videoURL : "/videoplayer/vi3877612057"

  description: string;
  duration: string;
  qualities: Array<{quality: string, videoURL: string}>;
  title: string;
  videoURL: string;

  constructor(description: string,
              duration: string,
              qualities: Array<{quality: string, videoURL: string}>,
              title: string,
              videoURL: string) {

    this.description = description;
    this.duration = duration;
    this.qualities = qualities;
    this.title = title;
    this.videoURL = videoURL;
  }
}
