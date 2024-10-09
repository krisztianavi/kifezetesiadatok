import { Controller, Get, Render, Post, Res } from '@nestjs/common';
import { AppService } from './app.service';
import { paymentDto } from './payment.dto';
import { Response } from 'express';
import { error } from 'console';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  @Render('index')
  getHello() {
    return {
      message: this.appService.getHello()
    };
  }

  @Get('payment')
  @Render('payment')
  payment(){
    return;
  }

  @Post('payment')
  postPayment(@Body() paymentDto: paymentDto, @Res()response: Response){
  
    const errors = this.validatePaymentDto(paymentDto);
    if (errors.length > 0) {
      response.render('payment')
    }

    console.log(paymentDto);
    return { message: 'Sikeres!', data: paymentDto };
  }

  private validatePaymentDto(paymentDto: paymentDto): string[] {
    const errors: string[] = [];

    if (!paymentDto.name || paymentDto.name.trim().length === 0) {
      errors.push('Név mező nem lehet üres.');
    }

    const accountNumberPattern = /^\d{8}-\d{8}$|^\d{8}-\d{8}-\d{8}$/;
    if (!paymentDto.accountNumber || !accountNumberPattern.test(paymentDto.accountNumber)) {
      errors.push('Érvénytelen bankszámlaszám formátum. Használja a következő formátumokat: 12345678-12345678 vagy 12345678-12345678-12345678.');
    }

    if (paymentDto.acceptTerms !== 'true') {
      errors.push('A szerződési feltételeket el kell fogadni.');
    }

    return errors;
  }

  @Get('success')
  @Render('success')
  success(){
    return;
  }
}
