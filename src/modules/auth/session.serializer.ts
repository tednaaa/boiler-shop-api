import { Injectable } from '@nestjs/common';
import { PassportSerializer } from '@nestjs/passport';

import { User } from '../users [draft]/users.model';

@Injectable()
export class SessionSerializer extends PassportSerializer {
  serializeUser(
    user: User,
    done: (error: Error | null, user?: User) => void,
  ): void {
    done(null, user);
  }

  deserializeUser(
    payload: unknown,
    done: (error: Error | null, payload?: unknown) => void,
  ): void {
    done(null, payload);
  }
}
