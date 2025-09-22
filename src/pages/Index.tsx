import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Slider } from '@/components/ui/slider';
import { Button } from '@/components/ui/button';
import Icon from '@/components/ui/icon';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';

const Index = () => {
  const [amount, setAmount] = useState([15000]);
  const [term, setTerm] = useState([6]);
  const [monthlyPayment, setMonthlyPayment] = useState(0);
  const [totalPayment, setTotalPayment] = useState(0);
  const [overpayment, setOverpayment] = useState(0);

  const interestRate = 0.0004; // 0.04% daily rate
  
  useEffect(() => {
    const principal = amount[0];
    const months = term[0];
    const dailyRate = interestRate;
    const days = months * 30; // Approximate days per month
    
    // Calculate total amount with compound interest
    const totalAmount = principal * Math.pow(1 + dailyRate, days);
    const monthly = totalAmount / months;
    const overpay = totalAmount - principal;
    
    setMonthlyPayment(monthly);
    setTotalPayment(totalAmount);
    setOverpayment(overpay);
  }, [amount, term]);

  const formatMoney = (value: number) => {
    return new Intl.NumberFormat('ru-RU', {
      style: 'currency',
      currency: 'RUB',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(value);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-green-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center">
              <Icon name="Calculator" size={24} className="text-white" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-gray-900">МФО Калькулятор</h1>
              <p className="text-gray-600 text-sm">Быстрый расчёт займа онлайн</p>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8 max-w-4xl">
        <div className="grid lg:grid-cols-2 gap-8">
          {/* Calculator */}
          <Card className="shadow-xl border-0">
            <CardHeader className="bg-gradient-to-r from-primary to-secondary text-white">
              <CardTitle className="flex items-center gap-2 text-xl">
                <Icon name="Calculator" size={24} />
                Калькулятор займа
              </CardTitle>
            </CardHeader>
            <CardContent className="p-8">
              <div className="space-y-8">
                {/* Amount Slider */}
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <label className="text-lg font-semibold text-gray-900">Сумма займа</label>
                    <span className="text-2xl font-bold text-primary">{formatMoney(amount[0])}</span>
                  </div>
                  <Slider
                    value={amount}
                    onValueChange={setAmount}
                    max={45000}
                    min={1000}
                    step={1000}
                    className="w-full"
                  />
                  <div className="flex justify-between text-sm text-gray-500">
                    <span>1 000 ₽</span>
                    <span>45 000 ₽</span>
                  </div>
                </div>

                {/* Term Slider */}
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <label className="text-lg font-semibold text-gray-900">Срок займа</label>
                    <span className="text-2xl font-bold text-secondary">
                      {term[0]} {term[0] === 1 ? 'месяц' : term[0] < 5 ? 'месяца' : 'месяцев'}
                    </span>
                  </div>
                  <Slider
                    value={term}
                    onValueChange={setTerm}
                    max={12}
                    min={1}
                    step={1}
                    className="w-full"
                  />
                  <div className="flex justify-between text-sm text-gray-500">
                    <span>1 месяц</span>
                    <span>12 месяцев</span>
                  </div>
                </div>

                {/* Results */}
                <div className="bg-gradient-to-r from-blue-50 to-green-50 rounded-xl p-6 space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="text-center">
                      <p className="text-sm text-gray-600 mb-1">Ежемесячный платёж</p>
                      <p className="text-xl font-bold text-gray-900">{formatMoney(monthlyPayment)}</p>
                    </div>
                    <div className="text-center">
                      <p className="text-sm text-gray-600 mb-1">Переплата</p>
                      <p className="text-xl font-bold text-orange-600">{formatMoney(overpayment)}</p>
                    </div>
                  </div>
                  <div className="text-center pt-2 border-t">
                    <p className="text-sm text-gray-600 mb-1">Общая сумма к возврату</p>
                    <p className="text-2xl font-bold text-primary">{formatMoney(totalPayment)}</p>
                  </div>
                </div>

                {/* Apply Button */}
                <Button 
                  className="w-full py-6 text-lg font-semibold bg-gradient-to-r from-primary to-secondary hover:opacity-90 transition-opacity"
                  size="lg"
                >
                  <Icon name="CreditCard" size={20} className="mr-2" />
                  Оформить займ
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Conditions */}
          <div className="space-y-6">
            <Card className="shadow-xl border-0">
              <CardHeader className="bg-gradient-to-r from-secondary to-primary text-white">
                <CardTitle className="flex items-center gap-2 text-xl">
                  <Icon name="FileText" size={24} />
                  Условия займа
                </CardTitle>
              </CardHeader>
              <CardContent className="p-8">
                <div className="space-y-6">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="bg-blue-50 rounded-lg p-4 text-center">
                      <Icon name="Percent" size={32} className="mx-auto mb-2 text-primary" />
                      <p className="text-sm text-gray-600">Ставка</p>
                      <p className="text-xl font-bold text-gray-900">0,04%</p>
                      <p className="text-xs text-gray-500">в день</p>
                    </div>
                    <div className="bg-green-50 rounded-lg p-4 text-center">
                      <Icon name="Clock" size={32} className="mx-auto mb-2 text-secondary" />
                      <p className="text-sm text-gray-600">Решение</p>
                      <p className="text-xl font-bold text-gray-900">5 минут</p>
                      <p className="text-xs text-gray-500">онлайн</p>
                    </div>
                  </div>

                  <Accordion type="single" collapsible className="w-full">
                    <AccordionItem value="requirements">
                      <AccordionTrigger className="text-left">
                        <div className="flex items-center gap-2">
                          <Icon name="User" size={20} />
                          Требования к заёмщику
                        </div>
                      </AccordionTrigger>
                      <AccordionContent className="space-y-3 pt-2">
                        <div className="flex items-center gap-3">
                          <Icon name="Check" size={16} className="text-green-600" />
                          <span>Возраст от 18 до 70 лет</span>
                        </div>
                        <div className="flex items-center gap-3">
                          <Icon name="Check" size={16} className="text-green-600" />
                          <span>Гражданство РФ</span>
                        </div>
                        <div className="flex items-center gap-3">
                          <Icon name="Check" size={16} className="text-green-600" />
                          <span>Паспорт РФ</span>
                        </div>
                        <div className="flex items-center gap-3">
                          <Icon name="Check" size={16} className="text-green-600" />
                          <span>Мобильный телефон</span>
                        </div>
                      </AccordionContent>
                    </AccordionItem>

                    <AccordionItem value="documents">
                      <AccordionTrigger className="text-left">
                        <div className="flex items-center gap-2">
                          <Icon name="FileCheck" size={20} />
                          Необходимые документы
                        </div>
                      </AccordionTrigger>
                      <AccordionContent className="space-y-3 pt-2">
                        <div className="flex items-center gap-3">
                          <Icon name="Check" size={16} className="text-green-600" />
                          <span>Паспорт РФ</span>
                        </div>
                        <div className="flex items-center gap-3">
                          <Icon name="Check" size={16} className="text-green-600" />
                          <span>СНИЛС (при наличии)</span>
                        </div>
                        <div className="flex items-center gap-3">
                          <Icon name="Check" size={16} className="text-green-600" />
                          <span>Справка о доходах (не обязательно)</span>
                        </div>
                      </AccordionContent>
                    </AccordionItem>

                    <AccordionItem value="process">
                      <AccordionTrigger className="text-left">
                        <div className="flex items-center gap-2">
                          <Icon name="Zap" size={20} />
                          Как получить займ
                        </div>
                      </AccordionTrigger>
                      <AccordionContent className="space-y-3 pt-2">
                        <div className="flex items-start gap-3">
                          <div className="bg-primary text-white rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold flex-shrink-0">1</div>
                          <span>Заполните заявку онлайн</span>
                        </div>
                        <div className="flex items-start gap-3">
                          <div className="bg-primary text-white rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold flex-shrink-0">2</div>
                          <span>Получите решение за 5 минут</span>
                        </div>
                        <div className="flex items-start gap-3">
                          <div className="bg-primary text-white rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold flex-shrink-0">3</div>
                          <span>Деньги на карту в течение 15 минут</span>
                        </div>
                      </AccordionContent>
                    </AccordionItem>
                  </Accordion>
                </div>
              </CardContent>
            </Card>

            {/* Security Notice */}
            <Card className="bg-gradient-to-r from-green-50 to-blue-50 border-green-200">
              <CardContent className="p-6">
                <div className="flex items-start gap-3">
                  <Icon name="Shield" size={24} className="text-green-600 flex-shrink-0 mt-1" />
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-2">Безопасность и надёжность</h3>
                    <p className="text-sm text-gray-600 leading-relaxed">
                      Ваши данные защищены SSL-шифрованием. Мы не передаём персональную информацию третьим лицам. 
                      Лицензия ЦБ РФ №1234567890.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-8 mt-16">
        <div className="container mx-auto px-4 text-center">
          <p className="text-gray-400">© 2024 МФО Калькулятор. Все права защищены.</p>
          <p className="text-sm text-gray-500 mt-2">
            Займы предоставляются на основании договора займа. Возрастные ограничения 18+
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Index;