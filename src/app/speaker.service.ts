// speaker.service.ts
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class SpeakerService {
  private speakerSource = new BehaviorSubject<string>('');

  currentSpeaker = this.speakerSource.asObservable();

  changeSpeaker(speaker) {
    this.speakerSource.next(speaker);
  }
}
