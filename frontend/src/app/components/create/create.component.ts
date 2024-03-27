import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { BackendService } from '../../shared/backend.service';
import { FridgeItem } from '../../shared/fridge-item';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css']
})
export class CreateComponent implements OnInit {
  form: FormGroup;

  constructor(
    private bs: BackendService,
    private fb: FormBuilder,
    private router: Router
  ) {
    this.form = this.fb.group({
      nameControl: ['', Validators.required],
      quantityControl: ['', Validators.required],
      dateControl: ['', Validators.required],
    });
  }

  ngOnInit(): void {
    
  }

  create(): void {
    const values = this.form.value;
    const newFridgeItem: FridgeItem = {
        _id: '', 
        name: values.nameControl,
        quantity: values.quantityControl,
        date: values.dateControl
    };
    this.bs.addOne(newFridgeItem).subscribe(
        response => {
            console.log('Eintrag erstellt:', response);
          
            this.router.navigateByUrl('/table');
        },
        error => {
            console.log('Fehler beim Erstellen des Eintrags:', error);
          
        }
    );
}


  cancel(): void {
    this.router.navigateByUrl('/table');
  }
}
