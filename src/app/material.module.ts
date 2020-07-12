import { NgModule } from '@angular/core';

import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';

@NgModule({
  imports: [MatButtonModule, MatFormFieldModule, MatInputModule],
  exports: [MatButtonModule, MatFormFieldModule, MatInputModule],
})
export class MaterialModule {}
