import { ExecutionContext } from '@nestjs/common';
import { createMock } from '@golevelup/ts-jest';

import { AuthenticatedGuard } from './authenticated.guard';

describe('AuthenticatedGuard', () => {
  let authenticatedGuard: AuthenticatedGuard;

  beforeEach(() => {
    authenticatedGuard = new AuthenticatedGuard();
  });

  it('should be defined', () => {
    expect(authenticatedGuard).toBeDefined();
  });

  describe('canActivate', () => {
    it('should return true when user is authenticated', () => {
      const mockContext = createMock<ExecutionContext>();
      mockContext.switchToHttp().getRequest.mockReturnValue({
        isAuthenticated: () => true,
      });

      const canActivate = authenticatedGuard.canActivate(mockContext);

      expect(canActivate).toBe(true);
    });

    it('should return false when user is not authenticated', () => {
      const mockContext = createMock<ExecutionContext>();
      mockContext.switchToHttp().getRequest.mockReturnValue({
        isAuthenticated: () => false,
      });

      const canActivate = authenticatedGuard.canActivate(mockContext);

      expect(canActivate).toBe(false);
    });
  });
});
