import { Injectable, TemplateRef } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ToastService 
{

  toasts:any[]=[]
  constructor() { }
  show(textOrTpl: string | TemplateRef<any>, options: any = {}) 
  {
    this.toasts.push({ textOrTpl, ...options })
  }
  showError(textOrTpl:string | TemplateRef<any>)
  {
    this.toasts.push({ textOrTpl , ...{delay:5000,classname:'error'} })
  }
  showSucess(textOrTpl:string)
  {
    this.toasts.push({ textOrTpl, ...{delay:5000,classname:'success'} })
  }
  remove(toast) {
    this.toasts = this.toasts.filter(t => t != toast);
  }

}
