import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PoetrydbService } from '../../services/poetrydb.service';
import { JsonPipe } from '@angular/common';

@Component({
  selector: 'app-author',
  standalone: true,
  imports: [JsonPipe],
  templateUrl: './author.component.html',
  styleUrl: './author.component.scss',
  providers: [PoetrydbService],
})
export class AuthorComponent {
  authorName: string | undefined | null;
  data: string | undefined | null;

  constructor(
    private route: ActivatedRoute,
    private poetrydbService: PoetrydbService
  ) {
    this.route.paramMap.subscribe({
      next: (params) => {
        this.authorName = params.get('authorName');
        this.getAuthorData();
      },
      error: (err) => {
        console.error(err);
      },
    });
  }

  getAuthorData() {
    if (this.authorName) {
      this.poetrydbService.getPoemsByAuthor(this.authorName).subscribe({
        next: (data) => {
          this.data = data;
        },
        error: (err) => {
          console.error(err);
        },
      });
    }
  }
}
