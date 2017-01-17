import {Component, forwardRef} from '@angular/core';
import {NG_VALUE_ACCESSOR, ControlValueAccessor, FormControl} from '@angular/forms';

import {AbstractControlValueAccessor, getRef} from '../abstract-control-value-accesor';
import {IDynamicElementConfig, DynamicFormsService} from '../../services/dynamic-forms.service';

import {FileUploader, FileUploadModule} from 'ng2-file-upload';

const URL = 'http://localhost:4040/api/files';

@Component({
  providers: [getRef(DynamicFileComponent)],
  selector: 'td-dynamic-file',
  templateUrl: './file.component.html'
})
export class DynamicFileComponent extends AbstractControlValueAccessor implements ControlValueAccessor {
  control : FormControl;

  /*
  * config { savePath, loadPath, default }
  */
  public uploader : FileUploader;

  change(e){
    this.control.setValue(this.config.meta.loadPath+ this.uploader.queue[this.uploader.queue.length-1].file.name);
  }

  getFilePath(f) {  
    if(this.uploader&&this.uploader.queue[this.uploader.queue.length-1])
    return this.config.meta.loadPath+ this.uploader.queue[this.uploader.queue.length-1].file.name;
    return this.config.meta.loadPath+f||'';
  }
  ngOnInit() {
    this.uploader = new FileUploader({url: this.config.meta.savePath, autoUpload: true });
  }
}
