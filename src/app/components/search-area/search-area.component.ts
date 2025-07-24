import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MaterialModule } from '../../modules/material/material.module';
import { PoetrydbService } from '../../services/poetrydb.service';
import { forkJoin } from 'rxjs';
import { AsyncPipe } from '@angular/common';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { AuthorTitle } from '../../interfaces/author-title';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { Router } from '@angular/router';

@Component({
  selector: 'app-search-area',
  standalone: true,
  imports: [MaterialModule, AsyncPipe],
  templateUrl: './search-area.component.html',
  styleUrl: './search-area.component.scss',
  providers: [PoetrydbService],
})
export class SearchAreaComponent implements OnInit {
  myControl = new FormControl<string | AuthorTitle>('');
  options: AuthorTitle[] = [];
  filteredOptions!: Observable<AuthorTitle[]>;

  constructor(
    private poetrydbService: PoetrydbService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.getData();
  }

  getData() {
    var authorsObservable = this.poetrydbService.getAuthors();
    var titlesObservable = this.poetrydbService.getTitles();

    forkJoin([authorsObservable, titlesObservable]).subscribe({
      next: (data) => {
        if (data[0].authors) {
          var translatedAuthorsObject = data[0].authors.map(
            (author: string) => {
              return {
                type: 'author',
                value: author,
              };
            }
          );
          this.options.push(...translatedAuthorsObject);
        }

        if (data[1].titles) {
          var translatedTitlesObject = data[1].titles.map((title: string) => {
            return {
              type: 'title',
              value: title,
            };
          });
          if (this.options.length > 1) {
            this.options.push(...translatedTitlesObject);
          }
        }
      },
      error: (err) => {
        console.error(err);
      },
      complete: () => {
        this.filteredOptions = this.myControl.valueChanges.pipe(
          startWith(''),
          map((value) => {
            const inputValue = typeof value === 'string' ? value : value?.value;
            return this.filter(inputValue || '');
          })
        );
      },
    });
  }

  onOptionSelected(event: MatAutocompleteSelectedEvent): void {
    this.router.navigate([
      `/${event.option.value.type}/${event.option.value.value}`,
    ]);
  }

  filter(value: string): AuthorTitle[] {
    const filterValue = value.toLowerCase();
    return this.options.filter((option) =>
      option.value.toLowerCase().startsWith(filterValue)
    );
  }

  displayFn(authorTitle: AuthorTitle): string {
    return authorTitle && authorTitle.value ? authorTitle.value : '';
  }
}
