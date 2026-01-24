import { CanDeactivateFn } from '@angular/router';
import { CanComponentDeactivate } from '../interfaces/can-component-deactivate';

export const unsavedChangesGuard: CanDeactivateFn<CanComponentDeactivate> = (component, currentRoute, currentState, nextState) => {
 
  if(component.canExit){
    return component.canExit();
  }
 
  return true;
};
