import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class FunService {
  constructor() {}
  UNKOWN_TAG(): any {
    return { result: false, code: 0, message: 'UNKOWN_TAG' };
  }
  ERROR_RESPONSE(error:any): any {
    return { result: false, code: 0, message: error };
  }
  SUCCESS_WITH_DATA(data:any){
    return { result: true, data: data};
  }
}
