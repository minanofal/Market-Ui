import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Observable } from 'rxjs';
import { ConfirmationDialogComponent } from 'src/app/components/ui/confirmation-dialog/confirmation-dialog.component';
import {ConfirmDialogData} from '../../Models/UImodels/ConfirmDialog.model'
@Injectable({
  providedIn: 'root'
})
export class ConfirmationDialogService {

  constructor(private dialog: MatDialog) { }

  confirmDialog(data: ConfirmDialogData): Observable<boolean>{
    return this.dialog
    .open(ConfirmationDialogComponent, {
      data,
      disableClose: true,
    })
    .afterClosed();
  }
}
