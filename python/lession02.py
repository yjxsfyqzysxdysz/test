import random
count = 3
answer = random.randint(1, 10)

while count > 0:
    temp = input("猜数字")
    guess = int(temp)
    if guess == answer:
        print('is right')
        break
    else:
        if guess < 8:
            print('is small')
        else:
            print('is big')
    count = count - 1
print('in the end')

import decimal
a = decimal.Decimal('0.1')
b = decimal.Decimal('0.2')
print(a + b)
c = decimal.Decimal('0.3')
print(a + b == c)
