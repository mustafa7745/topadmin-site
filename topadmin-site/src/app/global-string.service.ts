import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class GlobalStringService {

  constructor() { }
  getSuccessAdd(){
    return "Success Added"
  }
  getSuccessUpdate(){
    return "Success Updated"
  }
  getConfirmDeleteQuestion(length:number){
    return 'Are You Sure to Delete (' + length + ') Items ?';
  }
  getDeleting(){
    return "Deleteing..."
  }
  getSuccessDelete(){
    return "Deleted"
  }
}
