import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { MockBackend } from '@angular/http/testing';
import { DebugElement } from '@angular/core';
import { Http, HttpModule, ConnectionBackend, BaseRequestOptions } from '@angular/http';
import {DecimalPipe, Location} from '@angular/common';

import { SelectionToolComponent } from './selection-tool.component';
import { SelectionScaleService } from '../../selection-scale/selection-scale.service';
import { SelectionToolService } from '../../selection-tools/selection-tool.service';
import { Logger } from './../../../shared/services/logger.service';
import { LoaderService } from './../../../shared/services/loader.service';
import { ToasterService } from './../../../shared/services/toaster.service';
import {BusinessInterfaceRenderService} from '../../../shared/business/business.service';
import { InteractionService } from 'app/shared/services/interaction.service';
import { NavigationBarService } from 'app/pages/nav/service/navigation-bar.service';
import { SummaryResultService } from 'app/features/summary-result';
import { LayersService } from 'app/features/layers';
import { SidePanelService } from '../../side-panel/side-panel.service';
import { MapService } from '../../../pages/map/map.service';
import { Helper } from './../../../shared/helper';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {SummaryResultComponent} from '../../summary-result/summary-result.component';
import {UppercaseFirstLetterPipe} from '../../../shared/pipes/uppercase-first-letter.pipe';
import {NumberFormatPipe} from '../../../shared/pipes/number-format.pipe';
import {LayerNamePipe} from '../../../shared/pipes/layer-name.pipe';
import {BusinessNamePipe} from '../../../shared/pipes/business-name.pipe';
import {SelectionToolButtonStateService} from '../../selection-tools/selection-tool-button-state.service';
import {MailService} from '../../feedback/mail.service';
import {PopulationService} from '../../population/services/population.service';
import {GeocodingService} from '../../../shared/services/geocoding.service';
import {DataInteractionService} from '../../data-interaction/data-interaction.service';
import {BrowserAnimationsModule, NoopAnimationsModule} from '@angular/platform-browser/animations';
import {TopSideComponent} from '../../side-panel/top-side-panel/top-side-panel.component';
import {FeedbackComponent} from '../../feedback/component/feedback.component';
import {RecaptchaFormsModule} from 'ng-recaptcha/forms';
import {RecaptchaModule} from 'ng-recaptcha';
import { MouseEvent, Map, LayersControlEvent } from 'leaflet';
import {HeatLoadAggregateService} from '../../heat-load/heat-load.service';

describe('SelectionToolComponent', () => {
  let component: SelectionToolComponent;
  let fixture: ComponentFixture<SelectionToolComponent>;
  let debugEl: DebugElement;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ HttpModule],
      declarations: [ SelectionToolComponent ],
      providers: [ {provide: HeatLoadAggregateService, useClass: HeatLoadAggregateService}, SelectionScaleService, Logger, LoaderService, ToasterService, SelectionToolService, Helper, DecimalPipe,
                BusinessInterfaceRenderService, InteractionService, NavigationBarService, SummaryResultService, SidePanelService, LayersService,
                MapService, SelectionToolButtonStateService, MailService, PopulationService, GeocodingService, DataInteractionService]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SelectionToolComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('selection tool component should be created', () => {
    expect(component).toBeTruthy();
    expect(fixture).toBeTruthy();


  });

  it('nbNutsSelected should be 0 at start', () => {
        expect(component.nbNutsSelected).toBe(0);
  });

});
