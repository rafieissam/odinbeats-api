import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getWelcome(): string {
    return `
    <div>
      <h1>Welcome to OdinBeats API!</h1>
      <p>
        To view the API\'s documentation visit <a href="./docs">/docs</a>
      </p>
    </div>
    `;
  }
}
