import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-live',
  templateUrl: './live.component.html',
  styleUrls: ['./live.component.scss']
})
export class LiveComponent implements OnInit {
  @Input() url: string
  @Input() ids: string
  constructor() { }

  ngOnInit(
  ) {
    this.initPlayer(this.ids, this.url)
  }

  initPlayer(id, url) {
      setTimeout(function () {
        (window as any).SLDP.init({
        container: id,
        stream_url: url,
        autoplay: true,
        height: 180,
        width: 320,
        muted: true,
        offset: 3,
        splash_screen: '/assets/images/live.jpg',
        latency_tolerance: 500,
        controls: true
      });
    })
  };


}
