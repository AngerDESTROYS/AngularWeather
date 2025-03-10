import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Observable, startWith, debounceTime, distinctUntilChanged, switchMap, catchError, of } from 'rxjs';
import { GetService } from '../../../models/getService.model';

@Component({
  selector: 'shared-autocomplete',
  templateUrl: './autocomplete.component.html',
  styleUrl: './autocomplete.component.scss',
  standalone: false,
})
export class AutocompleteComponent<T> {
  @Input() service!: GetService<T>;
  @Input() control!: FormControl;
  @Input() placeholder: string = '';
  @Output() selected: EventEmitter<T> = new EventEmitter<T>();

  filteredData!: Observable<T[]>;
  errorMessage: string = '';

  ngOnInit() {
    this.filteredData = this.control.valueChanges.pipe(
      startWith(''),
      debounceTime(300),
      distinctUntilChanged(),
      switchMap(value => this.service.getData(value || '') as Observable<T[]>),
      catchError(error => {
        this.errorMessage = 'Failed to fetch data';
        console.error('Error:', error);
        return of([] as T[]);
      })
    );
  }

  onSelect(item: T): void {
    this.selected.emit(item);
  }
}
