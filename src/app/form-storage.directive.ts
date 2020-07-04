import {
  Directive,
  Input,
  Self,
  OnInit,
  OnDestroy,
  HostListener
} from '@angular/core';
import { ControlContainer, AbstractControl } from '@angular/forms';

import { StorageService } from './services/storage/storage.service';
import { Subject, merge, fromEvent } from 'rxjs';
import { debounceTime, filter, take, takeUntil } from 'rxjs/operators';

@Directive({
  selector: 'form[formGroup][name]'
})
export class FormStorageDirective implements OnInit, OnDestroy {
  @Input() name!: string;
  @Input() saveStrategy: 'change' | 'unload' = 'unload';

  private destroy = new Subject();
  private destroy$ = this.destroy.asObservable();

  constructor(
    @Self() private container: ControlContainer,
    private storage: StorageService
  ) {}

  @HostListener('submit')
  onSubmit(): void {
    this.storage.removeItem(this.key);
  }

  private get key(): string {
    return `${this.name}-form`;
  }

  private get group(): AbstractControl | null {
    return this.container.control;
  }

  async ngOnInit(): Promise<void> {
    this.saveStrategy === 'unload'
      ? this.unloadStrategy()
      : this.changeStrategy();

    const storageValue = (await this.storage.getItem(this.key)) as string;
    if (storageValue) {
      this.group?.patchValue(JSON.parse(storageValue));
    }
  }

  private unloadStrategy(): void {
    merge(fromEvent(window, 'beforeunload'), this.destroy$)
      .pipe(
        takeUntil(this.destroy$),
        filter(() => this.group?.dirty ?? false),
        take(1)
      )
      .subscribe(() => this.saveValue(this.group?.value));
  }

  private changeStrategy(): void {
    this.group?.valueChanges
      .pipe(debounceTime(400), takeUntil(this.destroy$))
      .subscribe((value) => this.saveValue(value));
  }

  private saveValue(value: any): void {
    this.storage.setItem(this.key, JSON.stringify(value));
  }

  ngOnDestroy(): void {
    this.destroy.next();
  }
}
