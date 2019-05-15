import { Component } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'stringr-api-test';
  reponse: any = {};
  accesstoken: string = ''; // '2eff85e1288fcbfeb3597972c83b1d4a';
  domain: string = ''; // 'https://localhost:3443';
  videos: any;
  //
  videosRequestId: string;
  videosSearch: string;
  videosfromDate: string;
  videostoDate: string;
  //
  private baseUrl = '/api/public/';
  private footageRequestUrl = 'requests';
  //      
  requestSubject: ''
  requestDescription: ''
  requestAddress: ''
  requestCategory: ''
  requestLatitude: 24.8635707
  requestLongitude: 67.0753158
  requestDeadline: ''
  requestIsLive: false
  requestStringPro: false
  requestSubCustomerId: string;
  requestSubUserId: string;
  //
  currentVideoJson: {}
  //
  // get requests
  getReqDate: string;
  getReqSubCustomerId: string;
  getReqSubUserId: string;
  footageRequests: any;

  constructor(
    private http: HttpClient) {
  }


  headers = new HttpHeaders();

  validateAuth() {
    if (!this.domain || !this.accesstoken) {
      alert('Please provide domain and accesstoken')
    }
  }

  get(request: string) {
    this.validateAuth();
    let token = '?access_token=' + this.accesstoken
    if (request.indexOf('?') > -1) {
      token = token.replace('?', '&')
    }
    // this.headers = this.headers.append('access_token',  this.accesstoken);
    const url = this.domain + this.baseUrl + request + token;
    return this.http.get(url, {
      headers: this.headers
    }).toPromise<any>();
  }

  post(request, data) {
    this.validateAuth();
    let token = '?access_token=' + this.accesstoken
    if (request.indexOf('?') > -1) {
      token = token.replace('?', '&')
    }
    const url = this.domain + this.baseUrl + request + token;
    // this.headers = this.headers.append('access_token',  this.accesstoken);
    return this.http.post(url, data, {
      headers: this.headers
    }).toPromise<any>();;
  }

  async createfootageRequest() {
    if (!this.requestSubject || !this.requestDescription || !this.requestCategory
      || !this.requestDeadline || !this.requestLatitude || !this.requestLongitude) {
      alert('Enter required feilds')
      return;
    }

    let params: any = {
      subject: this.requestSubject,
      description: this.requestDescription,
      address: this.requestAddress,
      category: this.requestCategory,
      deadline: this.requestDeadline,
      latitude: this.requestLatitude,
      longitude: this.requestLongitude,
      subCustomerId: this.requestSubCustomerId || '',
      subUserId: this.requestSubUserId || '',
      tier: 'standard'
    }

    if (this.requestIsLive) {
      params.isLive = true;
    }

    if (this.requestStringPro) {
      params.tier = 'pro';
    }

    try {
      const result = await this.post('request', params);
      if (result) {
        this.reponse = result
        alert('Your video request has been created!');
      }
    } catch (err) {
      console.log('createfootageRequest-Error->', err)
    }
  }

  async getfootageRequests() {
    const request = `requests?date=${this.getReqDate || ''}&subCustomerId=${this.getReqSubCustomerId || ''}&subUserId=${this.getReqSubUserId || ''}`;
    try {
      const result = await this.get(request);
      if (result) {
        this.footageRequests = result;
        console.log(this.footageRequests)
      }
    } catch (err) {
      console.log('getfootageRequests-Error->', err)
    }
  }

  async getVideos() {
    try {
      const request = `videos?requestId=${this.videosRequestId || ''}&search=${this.videosSearch || ''}&fromDate=${this.videosfromDate || ''}&toDate=${this.videostoDate || ''}`
      const result = await this.get(request);
      if (result) {
        this.videos = result;
        console.log(this.videos)
      }
    } catch (err) {
      console.log('getVideos-Error->', err)
    }
  }

  async getVideoDetails() {
    const videoId = '5cd550420d7529d308fac162';
    try {
      const result = await this.get(`videos/${videoId}`);
      if (result) {
        this.reponse = result;
        console.log(this.reponse)
      }
    } catch (err) {
      console.log('getVideoDetails-Error->', err)
    }
  }

  async getDownloadVideo(videoId) {
    try {
      const result = await this.get(`videos/${videoId}/download`);
      if (result) {
        window.open(result[0][0].url);
        console.log(this.reponse)
      }
    } catch (err) {
      console.log('getDownloadVideo-Error->', err)
    }
  }


  async purchaseVideo(videoId) {
    try {
      const result = await this.post(`videos/${videoId}/buy`, {});
      if (result) {
        alert(result.message)
        console.log(this.reponse)
      }
    } catch (err) {
      alert(err.error.message)
      console.log('purchaseVideo-Error->', err)
    }
  }

  async setCurrentVideoJson(data) {
    try {
      this.currentVideoJson = data
    } catch (err) {
      alert(err.error.message)
      console.log('purchaseVideo-Error->', err)
    }
  }
}
