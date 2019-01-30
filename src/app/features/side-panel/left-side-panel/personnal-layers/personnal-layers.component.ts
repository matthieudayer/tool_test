import { Component, OnInit } from '@angular/core';
import { UploadService, UploadedFile } from 'app/shared/services/upload.service';


interface UploadedLayer extends UploadedFile {
  checked?: boolean;
}

@Component({
  selector: 'htm-personnal-layers',
  templateUrl: './personnal-layers.component.html',
  styleUrls: ['./personnal-layers.component.css']
})
export class PersonnalLayersComponent implements OnInit {

  constructor(private uploadService: UploadService) { }
  layers: UploadedLayer[] = [];

  ngOnInit() {
    this.uploadService.getUploadedFiles().subscribe(files => {
      this.layers = files.filter(file => file.name.split('.').reverse()[0] != 'csv');
    });
  }

  actionLayer(layer: UploadedLayer) {
    if (layer.checked) {
      this.uploadService.remove(layer);
      layer.checked = false;
    } else {
      this.uploadService.show(layer);
      layer.checked = true;
    }
  }
}