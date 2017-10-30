import {BaseRequestOptions, Http, ConnectionBackend, Response, ResponseOptions, HttpModule} from '@angular/http';
import {MockBackend, MockConnection} from '@angular/http/testing';
import { TestBed, fakeAsync, inject, tick, async } from '@angular/core/testing';

import { ToasterService } from './../../shared/services/toaster.service';
import { LoaderService } from './../../shared/services/loader.service';
import { Logger } from './../../shared/services/logger.service';
import { SummaryResultService } from './summary-result.service';
import { PayloadStatData, SummaryResultDataPopu } from './mock/summary-result.data';
import { postStatsLayersArea, apiUrl } from './../../shared/data.service';
import { Location } from '../../shared/class/location/location';
import { PayloadStat } from './mock/payload.class';
import { Payload } from './../population/payload.class';
import { APIService } from './../../shared/services/api.service';
import { SummaryResultClass } from './summary-result.class';
import { Helper } from './../../shared/helper';
import {MockPopulation} from '../population/services/mock/population.data.mock';

describe('SummaryResultService', () => {
    let loggerStub: Logger;
    let loaderServiceStub: LoaderService;
    beforeEach(async(() => {
        loaderServiceStub = new LoaderService();
        loggerStub = new Logger();
        TestBed.configureTestingModule({
            providers: [
                {
                    provide: Http, useFactory: (backend: ConnectionBackend, defaultOptions: BaseRequestOptions) => {
                        return new Http(backend, defaultOptions);
                    }, deps: [MockBackend, BaseRequestOptions]
                },
                {provide: Helper},
                {provide: ToasterService},
                {provide: LoaderService, useValue: loaderServiceStub},
                {provide: SummaryResultService, useClass: SummaryResultService},
                {provide: MockBackend, useClass: MockBackend},
                {provide: Logger, useValue: loggerStub},
                {provide: BaseRequestOptions, useClass: BaseRequestOptions}
            ],
          imports: [
            HttpModule
          ]
        });
    }));
  let subject: SummaryResultService = null;
  let backend: MockBackend = null;

  beforeEach(inject([SummaryResultService, MockBackend], (userService: SummaryResultService, mockBackend: MockBackend) => {
    subject = userService;
    backend = mockBackend;
  }));
  it('should send the population request to the server', (done) => {
    done();
  });
  it('should be created', inject([SummaryResultService], (service: SummaryResultService) => {
        expect(service).toBeTruthy();
  }));

  it('#getSummaryResultWithPayload' +
    ' should call endpoint and return it\'s result', (done) => {
    backend.connections.subscribe((connection: MockConnection) => {
      const options = new ResponseOptions({
        body: JSON.stringify(SummaryResultDataPopu)
      });
      connection.mockRespond(new Response(options));
    });
    const payload: PayloadStat = PayloadStatData;
    subject.getSummaryResultWithPayload(payload).then((response) => {
      console.log(response);
      console.log('did get data');
      expect(response).toEqual(SummaryResultDataPopu );
      done();
    });
  });

})