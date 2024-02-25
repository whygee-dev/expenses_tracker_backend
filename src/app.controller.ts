import {
  Body,
  Controller,
  Delete,
  Patch,
  Put,
  UseGuards,
} from '@nestjs/common';
import { AppService } from './app.service';
import { DeleteDTO, PatchDTO, PutDTO } from './app.dto';
import { AuthGuard } from './auth/auth.guard';

@UseGuards(AuthGuard)
@Controller('data')
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Put()
  put(@Body() body: PutDTO) {
    return this.appService.put(body);
  }

  @Delete()
  delete(@Body() body: DeleteDTO) {
    return this.appService.delete(body);
  }

  @Patch()
  patch(@Body() body: PatchDTO) {
    return this.appService.patch(body);
  }
}
