import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  authors = '';
  year = '';
  title = '';
  publication = '';
  citation = '';

  constructor(private http: HttpClient) {}

  hasValue() {
    return this.authors || this.year || this.title || this.publication;
  }

  search() {
    const requestBody = {
      authors: this.authors,
      year: this.year,
      title: this.title,
      publication: this.publication,
    };

    // Make the API call
    this.http.post<any>('http://localhost:3001/search', requestBody).subscribe(
      (response) => {
        // Update the 'citation' property with the API response
        //@ts-ignore
        const References = response.data.map((obj) => obj.Reference);
        let citations = References.join('\n\n');
        this.citation = citations;
      },
      (error) => {
        console.error('Error making API call:', error);
        // Handle error if needed
      }
    );
    // Implement your search logic here and update the 'citation' property
    this.citation = `Citation result for Authors: ${this.authors}, Year: ${this.year}, Title: ${this.title}, Publication: ${this.publication}`;
  }

  reset() {
    this.authors = '';
    this.year = '';
    this.title = '';
    this.publication = '';
    this.citation = '';
  }
}
