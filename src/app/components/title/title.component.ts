import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PoetrydbService } from '../../services/poetrydb.service';
import { JsonPipe } from '@angular/common';

@Component({
  selector: 'app-title',
  standalone: true,
  imports: [JsonPipe],
  templateUrl: './title.component.html',
  styleUrl: './title.component.scss',
  providers: [PoetrydbService],
})
export class TitleComponent {
  titleName: string | undefined | null;
  data: string | undefined | null;

  constructor(
    private route: ActivatedRoute,
    private poetrydbService: PoetrydbService
  ) {
    this.route.paramMap.subscribe({
      next: (params) => {
        this.titleName = params.get('titleName');
        this.getTitleData();
      },
      error: (err) => {
        console.error(err);
      },
    });
  }

  getTitleData() {
    if (this.titleName) {
      this.poetrydbService.getPoemByTitle(this.titleName).subscribe({
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
