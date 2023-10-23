import { Injectable } from '@nestjs/common';

@Injectable()
export class PomodoroService {
    private isPomodoroActive: boolean = false;
    private pomodoroDuration: number = 25 * 60; // 25 minutes in seconds
    private breakDuration: number = 5 * 60; // 5 minutes in seconds
    private remainingTime: number = 0;
    private timerInterval: NodeJS.Timeout;

    startPomodoroTimer() {
        if (this.isPomodoroActive) {
          throw new Error('Pomodoro timer is already active');
        }
    
        this.isPomodoroActive = true;
        this.remainingTime = this.pomodoroDuration;
        this.timerInterval = setInterval(() => {
          if (this.remainingTime > 0) {
            this.remainingTime--;
          } else {
            this.endPomodoroTimer();
            this.startBreakTimer();
          }
        }, 1000);
      }
    
      endPomodoroTimer() {
        clearInterval(this.timerInterval);
        this.isPomodoroActive = false;
      }
    
      startBreakTimer() {
        if (this.isPomodoroActive) {
          throw new Error('Pomodoro timer is still active');
        }
    
        this.isPomodoroActive = true;
        this.remainingTime = this.breakDuration;
        this.timerInterval = setInterval(() => {
          if (this.remainingTime > 0) {
            this.remainingTime--;
          } else {
            this.endPomodoroTimer();
          }
        }, 1000);
      }
      getRemainingTime() {
        return this.remainingTime;
      }
}
