import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-async-demo',
  imports: [CommonModule, MatButtonModule],
  templateUrl: './async-demo.html',
  styleUrl: './async-demo.scss'
})
export class AsyncDemo {
async delay(ms: number) {
    return await new Promise((resolve) => setTimeout(resolve, ms));
  }

  async btnClick() {
    this.normalFunction('1' + new Date());
    this.normalFunction('2' + new Date());

    await this.delay(2000);
    console.log('3 ' + new Date());
    await this.delay(2000);
    console.log('4 ' + new Date());
  }
  normalFunction(text: string) {
    console.log(text);
  }
}
