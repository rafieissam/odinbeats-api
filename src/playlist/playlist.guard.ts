import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { PlaylistService } from './playlist.service';

@Injectable()
export class PlaylistGuard implements CanActivate {

  constructor (private playlistService: PlaylistService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const req = context.switchToHttp().getRequest();
    const userId = req.user.sub;
    const playlistId = req.params.playlistId;
    const preCheck = await this.playlistService.getOne(userId, playlistId);
    return !!preCheck;
  }
}
