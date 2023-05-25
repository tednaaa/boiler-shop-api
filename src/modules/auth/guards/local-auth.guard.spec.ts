import { Test, TestingModule } from '@nestjs/testing';
import { ExecutionContext } from '@nestjs/common';
import { createMock } from '@golevelup/ts-jest';

import { LocalAuthGuard } from './local-auth.guard';
import { AuthModule } from '../auth.module';

describe('LocalAuthGuard', () => {
  let guard: LocalAuthGuard;

  beforeEach(async () => {
    const moduleRef: TestingModule = await Test.createTestingModule({
      providers: [AuthModule, LocalAuthGuard],
    })
      .useMocker(createMock)
      .compile();

    guard = moduleRef.get<LocalAuthGuard>(LocalAuthGuard);
  });

  it('should be defined', () => {
    expect(guard).toBeDefined();
  });

  describe('canActivate', () => {
    it('should call super.canActivate and super.logIn', async () => {
      const context = createMock<ExecutionContext>();
      const request = context.switchToHttp().getRequest();
      const canActivateSpy = jest.spyOn(guard, 'canActivate');
      const logInSpy = jest.spyOn(guard, 'logIn');

      const result = await guard.canActivate(context);

      expect(canActivateSpy).toHaveBeenCalledWith(context);
      expect(logInSpy).toHaveBeenCalledWith(request);
      expect(result).toBe(true);
    });
  });
});
