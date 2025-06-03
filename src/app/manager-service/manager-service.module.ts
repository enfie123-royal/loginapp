import { NgModule } from '@angular/core'; 
import { CommonModule } from '@angular/common'; 
import { ManagerServiceComponent } from './manager-service.component'; 

@NgModule({ 
  imports: [ 
    CommonModule, 
    ManagerServiceComponent // <-- Import here, NOT in declarations
  ] 
}) 
export class ManagerServiceModule {}