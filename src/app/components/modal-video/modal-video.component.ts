import {Component, Input, OnInit} from '@angular/core';
import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';
import {TrailerDataModel} from '../../models/trailer-data.model';

@Component({
  selector: 'f-modal-video',
  templateUrl: './modal-video.component.html',
  styleUrls: ['./modal-video.component.css']
})
export class ModalVideoComponent implements OnInit {
  closeResult: string;
  _trailer: TrailerDataModel;
  videoURL: string;
  @Input() filmName: string;
  @Input() set trailer(data: TrailerDataModel) {
    this._trailer = data;
    // console.log(this._trailer);
  }

  constructor(private modalService: NgbModal) {}

  ngOnInit() {
  }

  open(content) {

    this.modalService.open(content).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }

  setVideoUrl(i: number) {
    this.videoURL = this._trailer.qualities[i].videoURL;
    // console.log(i);
  }

  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return  `with: ${reason}`;
    }
  }

}
