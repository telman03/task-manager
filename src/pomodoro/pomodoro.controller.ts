// pomodoro-timer.controller.ts

import { Controller, Get, Post, Delete, UseGuards } from '@nestjs/common';
import { PomodoroService } from './pomodoro.service';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { AtGuard } from 'src/common/guards';

@ApiTags('pomodoro')
@Controller('pomodoro')
export class PomodoroController {
    constructor(private readonly pomodoroTimerService: PomodoroService) { }

    @Post('start')
    @UseGuards(AtGuard)
    @ApiBearerAuth()
    startPomodoroTimer() {
        this.pomodoroTimerService.startPomodoroTimer();
        return { message: 'Pomodoro timer started' };
    }

    @Get('end')
    @UseGuards(AtGuard)
    @ApiBearerAuth()
    endPomodoroTimer() {
        this.pomodoroTimerService.endPomodoroTimer();
        return { message: 'Pomodoro timer ended' };
    }

    @ApiBearerAuth()
    @UseGuards(AtGuard)
    @Post('break/start')
    startBreakTimer() {
        this.pomodoroTimerService.startBreakTimer();
        return { message: 'Break timer started' };
    }

    @Get('break/end')
    @UseGuards(AtGuard)
    @ApiBearerAuth()
    endBreakTimer() {
        this.pomodoroTimerService.endPomodoroTimer();
        return { message: 'Break timer ended' };
    }
    @Get('remaining-time')
    @ApiBearerAuth()
    @UseGuards(AtGuard)
    getRemainingTime() {
        const remainingTime = this.pomodoroTimerService.getRemainingTime();
        return { remainingTime };
    }

}
