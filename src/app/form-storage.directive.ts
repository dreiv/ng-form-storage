import { Directive, Input, Self, OnInit, OnDestroy, HostListener } from '@angular/core';
import { ControlContainer, AbstractControl } from '@angular/forms';

import { StorageService } from './services/storage/storage.service';
import { Subject, merge, fromEvent } from 'rxjs';
import { debounceTime, filter, take, takeUntil } from 'rxjs/operators';

@Directive({
  selector: 'form[formGroup][name]'
})
export class FormStorageDirective implements OnInit, OnDestroy {
  @Input() name!: string;

  private destroy = new Subject();
  private destroy$ = this.destroy.asObservable();

  constructor(
    @Self() private container: ControlContainer,
    private storage: StorageService
  ) { }

  @HostListener('submit')
  onSubmit(): void {
    sessionStorage.removeItem(this.key);
  }

  private get key(): string {
    return `${this.name}-form`;
  }

  private get group(): AbstractControl| null {
    return this.container.control;
  }

  async ngOnInit(): Promise<void> {
    const storageValue = await this.storage.getItem(this.key);

    if (storageValue) {
      this.group?.patchValue(storageValue);
    }

    merge(
      fromEvent(window, 'beforeunload'),
      this.destroy$
    ).pipe(
      takeUntil(this.destroy$),
      filter(() => this.group?.dirty ?? false),
      take(1)
    ).subscribe(() => {
      this.storage.setItem(this.key, this.group?.value ?? false);
    });
  }

  ngOnDestroy(): void {
    this.destroy.next();
  }

}
