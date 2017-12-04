
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/toPromise';
import {Logger} from '../../shared/services/logger.service';
import { LoaderService } from '../../shared/services/loader.service';
import {APIService} from '../../shared/services/api.service';
import {ToasterService} from '../../shared/services/toaster.service';
import {apiUrl, postHeatLoadAggregateMonth} from './../../shared/data.service';



@Injectable()
export class HeatLoadAggregateService extends APIService {

  public summaryResult: BehaviorSubject<any> = new BehaviorSubject<any>(null);

  constructor(http: Http, logger: Logger, loaderService: LoaderService, toasterService: ToasterService) {
    super(http, logger, loaderService, toasterService);
  }

  getHeatLoadAggregateMonthWithPayload(payload: any): Promise<any> {
    console.log('HeatLoadAggregateService/getHeatLoadAggregateMonthWithPayload = ', JSON.stringify(payload));
    return super.POST(payload, apiUrl + postHeatLoadAggregateMonth);
  }






}
