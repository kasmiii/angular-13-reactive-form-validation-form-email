import { Component, VERSION } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';

import { OnInit } from '@angular/core';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { ErrorStateMatcher } from '@angular/material/core';
import { NgIf } from '@angular/common';
import { MatChipsModule } from '@angular/material/chips';
import { MatButtonModule } from '@angular/material/button';

import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { inject } from '@angular/core';
//import { MatChipEdited, MatChipInputEvent } from '@angular/material/chips';
import { MatIconModule } from '@angular/material/icon';
//import { NgFor } from '@angular/common';
import { LiveAnnouncer } from '@angular/cdk/a11y';
import Validation from './utils/validation';

@Component({
  selector: 'my-app',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  // standalone: true,
  // imports: [
  //   FormsModule,
  //   MatFormFieldModule,
  //   MatInputModule,
  //   ReactiveFormsModule,
  //   MatChipsModule,
  //   MatIconModule,
  //   MatButtonModule,
  //   MatChipsModule,
  //   NgFor,
  //   NgIf,
  //   MatIconModule,
  // ],
})
export class AppComponent implements OnInit {
  ngOnInit(): void {
    throw new Error('Method not implemented.');
  }

  fruits: string[] = ['Lemon', 'Lime', 'Apple'];

  addOnBlurCC = true;
  addOnBlurBCC = true;
  readonly separatorKeysCodes = [ENTER, COMMA] as const;
  CCs: string[] = [];
  BCCs: string[] = [];
  selectedFiles: File[] = [];

  announcer = inject(LiveAnnouncer);
  emailForm: FormGroup;
  matcher = new ErrorStateMatcher();

  attachments: string[] = [];
  ccAddresses: string[] = [];
  bccAddresses: string[] = [];

  constructor(private fb: FormBuilder) {
    this.emailForm = this.fb.group({
      objectControl: ['', [Validators.required]],
      commentControl: ['', [Validators.required]],
    });
  }

  onFileSelected(event: any) {
    const files: FileList = event.target.files;
    this.selectedFiles = Array.from(files);
  }

  removeFile(file: File) {
    const index = this.selectedFiles.indexOf(file);
    if (index !== -1) {
      this.selectedFiles.splice(index, 1);
    }
  }
  /*addAttachment() {
    const attachment = this.emailForm.get('attachmentControl').trim();
    if (attachment) {
      this.attachments.push(attachment);
      this.attachmentControl.setValue('');
    }
  }

  removeAttachment(attachment: string) {
    const index = this.attachments.indexOf(attachment);
    if (index >= 0) {
      this.attachments.splice(index, 1);
    }
  }*/

  sendEmail() {
    //const emailObject = this.emailForm.get('object');
    // Logic to send the email with the specified properties (attachments, CC addresses, BCC addresses).
    console.log(
      'Sending email:',
      this.attachments,
      this.CCs,
      this.BCCs,
      this.emailForm.get('objectControl'),
      this.emailForm.get('commentControl')
    );
  }

  addAddress(addressType: string, event: MatChipInputEvent): void {
    const value = (event.value || '').trim();
    if (addressType === 'cc') {
      // Add our fruit
      if (value) {
        this.CCs.push(value);
      }
    } else {
      if (value) {
        this.BCCs.push(value);
      }
    }
    // Clear the input value
    event.chipInput!.clear();
  }

  removeAddress(addressType: string, email: string): void {
    if (addressType === 'cc') {
      const index = this.CCs.indexOf(email);
      if (index >= 0) {
        this.CCs.splice(index, 1);
        //this.announcer.announce(`Removed ${email}`);
      }
    } else {
      const index = this.BCCs.indexOf(email);
      if (index >= 0) {
        this.BCCs.splice(index, 1);
        //this.announcer.announce(`Removed ${email}`);
      }
    }
  }

  editAddress(addressType: string, email: string, event: MatChipEditedEvent) {
    const value = event.value.trim();
    if (addressType === 'cc') {
      // Remove fruit if it no longer has a name
      if (!value) {
        this.removeAddress('cc', email);
        return;
      }

      // Edit existing fruit
      const index = this.CCs.indexOf(email);
      if (index >= 0) {
        this.CCs[index] = value;
      }
    } else {
      //if the email is of type BCC address
      // Remove fruit if it no longer has a name
      if (!value) {
        this.removeAddress('bcc', email);
        return;
      }

      // Edit existing fruit
      const index = this.BCCs.indexOf(email);
      if (index >= 0) {
        this.BCCs[index] = value;
      }
    }
  }

  // removeFile(file: File) {
  //   const index = this.selectedFiles.indexOf(file);
  //   if (index !== -1) {
  //     this.selectedFiles.splice(index, 1);
  //   }
  // }

  // onFileSelected(event: any) {
  //   const files: FileList = event.target.files;
  //   // Process the selected files as needed
  //   console.log(files);
  // }

  remove(fruit: string): void {
    const index = this.fruits.indexOf(fruit);

    if (index >= 0) {
      this.fruits.splice(index, 1);

      //this.announcer.announce(`Removed ${fruit}`);
    }
  }
}
