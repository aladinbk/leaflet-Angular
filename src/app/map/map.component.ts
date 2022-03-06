import {AfterViewInit, Component, OnInit} from '@angular/core';
import * as  L from 'leaflet';
import {ArchiveService} from '../services/archive.service';
//import 'leaflet-plugin-trackplayback';
//import 'leaflet-moving-marker';
import "leaflet.animatedmarker/src/AnimatedMarker";


@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss']
})
export class MapComponent implements OnInit, AfterViewInit {
  map: any;


  constructor(private archiveService: ArchiveService) {

  }

  ngOnInit(): void {

  }


  ngAfterViewInit(): void {
    this.createMap();
  
  }

  createMap(): void {
    const intialPoint = {lat: 10.612215679813612, lng: 10.612215679813612};
    const zoomLevel = 10;
    this.map = L.map('map', {
      center: [35.82928847769908, 10.612215679813612],
      zoom: zoomLevel
    });

    const mainLayer = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      minZoom: 1,
      maxZoom: 17,
      attribution: '&copy; <a href="#">OpenStreetMap</a> contributors'
    });
    mainLayer.addTo(this.map);
    this.tracePolyline();

  }

  tracePolyline(): void {
    let coords: any[] = [];
    this.archiveService.getArchive().subscribe(data => {
      coords = data.map(res => {
        const item: any[] = [];
        item.push(res.longitude);
        item.push(res.latitude);
        return item;
      });
      console.log(coords[0]);
      const myLines: any = [{
        type: 'LineString',
        coordinates: coords
      }];
      L.geoJSON(myLines).addTo(this.map);

      const mstart = L.marker(coords[0].reverse())
        .bindPopup('Start')
        .addTo(this.map);
      const mend = L.marker(coords[coords.length - 1].reverse())
        .bindPopup('End')
        .addTo(this.map);


      //  const animatedMarker = L.animatedMarker()

    /*   var marker = L.movingMarker([coords[0].reverse],coords[coords.length - 1],{

        destinations: [
          {
              latLng: [[coords[0].reverse], coords[coords.length - 1]],
              duration: 6000,
          
        
       }]}); 
       marker.addTo(this.map);*/
    //  const playback = new L.Playback(this.map, coords, onPlaybackTimeChange, options);
    /*  const trackplayback = L.trackplayback(coords, this.map);
      const trackplaybackContr = L.trackplaybackcontrol(trackplayback);

      trackplaybackContr.addTo(this.map);*/
      // L.playback(map, demoTracks, null, playbackOptions);
      // const trackplayback =  playback(coords, this.map);
      // const trackplayback = L.Play(coords, this.map);
      //  const playback = new L.marker(this.map, coords, 6000);

      
    }, ex => console.log(ex));


  }


}
