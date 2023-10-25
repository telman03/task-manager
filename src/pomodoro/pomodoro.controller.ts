// pomodoro-timer.controller.ts

import { Controller, Get, Post, Delete } from '@nestjs/common';
import { PomodoroService } from './pomodoro.service';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('pomodoro')
@Controller('pomodoro')
export class PomodoroController {
    constructor(private readonly pomodoroTimerService: PomodoroService) { }

    @Post('start')
    startPomodoroTimer() {
        this.pomodoroTimerService.startPomodoroTimer();
        return { message: 'Pomodoro timer started' };
    }

    @Get('end')
    endPomodoroTimer() {
        this.pomodoroTimerService.endPomodoroTimer();
        return { message: 'Pomodoro timer ended' };
    }

    @Post('break/start')
    startBreakTimer() {
        this.pomodoroTimerService.startBreakTimer();
        return { message: 'Break timer started' };
    }

    @Get('break/end')
    endBreakTimer() {
        this.pomodoroTimerService.endPomodoroTimer();
        return { message: 'Break timer ended' };
    }
    @Get('remaining-time')
    getRemainingTime() {
        const remainingTime = this.pomodoroTimerService.getRemainingTime();
        return { remainingTime };
    }

}
