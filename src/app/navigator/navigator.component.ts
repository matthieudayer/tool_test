/**
 * Created by lesly on 31.05.17.
 */
import {Component, OnInit} from '@angular/core';
import {GeocodingService} from '../map/services/geocoding.service';
import {MapService} from '../map/services/map.service';
import {Logger} from '../shared/services/logger.service';
import {LoaderService} from '../shared/services/loader.service';
import {Map} from 'leaflet';

@Component({
  selector: 'hmt-navigator',
  template: require<any>('./navigator.component.html'),
  styles: [ require<any>('./navigator.component.scss') ],
  providers: []
})
export class NavigatorComponent implements OnInit {
  address: string;

  private map: Map;

  constructor(private geocoder: GeocodingService, private mapService: MapService,
              private logger: Logger, private loaderService: LoaderService) {
    this.address = '';
  }
  Initialize() {
  }


  ngOnInit() {
    this.mapService.disableMouseEvent('goto');
    this.mapService.disableMouseEvent('place-input');
    this.map = this.mapService.map;
  }

  goto() {
    this.logger.log('NavigatorComponent/goto()');
    if (!this.address) { return; }
    this.loaderService.display(true);
    this.logger.log('NavigatorComponent/goto()/this.address!=null' + this.address);
    this.geocoder.geocode(this.address)
      .subscribe(location => {
        this.map.fitBounds(location.viewBounds, {});
        this.address = location.address;
        this.loaderService.display(false);
      }, error => this.loaderService.display(false));
  }
}
