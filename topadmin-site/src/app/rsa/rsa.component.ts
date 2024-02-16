import { Component } from '@angular/core';
import { decode } from 'punycode';

@Component({
  selector: 'app-rsa',
  standalone: true,
  imports: [],
  templateUrl: './rsa.component.html',
  styleUrl: './rsa.component.css'
})
export class RsaComponent {
  prime1 = 11
  prime2 = 3
  n: number = this.prime1 * this.prime2
  fi = (this.prime1 - 1) * (this.prime2 - 1);
  e = 3
  k = 5
  d = 7



  // Example
  getRandPrime(min: number, max: number): number {
    const getPrimes = (min: number, max: number) => {
      const result = Array(max + 1)
        .fill(0)
        .map((_, i) => i);
      for (let i = 2; i <= Math.sqrt(max + 1); i++) {
        for (let j = i ** 2; j < max + 1; j += i) delete result[j];
      }
      return Object.values(result.slice(Math.max(min, 2)));
    };
    const getRandNum = (min: number, max: number) => {
      return Math.floor(Math.random() * (max - min + 1) + min);
    };
    const primes = getPrimes(min, max);
    return primes[getRandNum(0, primes.length - 1)];
  };
  gcd(a: number, b: number): number {
    if (b === 0) {
      return a;
    }
    return this.gcd(b, a % b);
  }
  ngOnInit() {

    // while (this.e < this.fi) {
    //   /*
    //    * e must be co-prime to phi and
    //    * smaller than phi.
    //    */
    //   if (this.gcd(this.e, this.fi) == 1) break;
    //   else this.e++;
    // }
    console.log("e: " + this.e);

    // while (((this.e * this.d) % this.fi) != 1) {
    //   this.d = +1;
    // }

    // this.d = ((this.k * this.fi) + 1) / this.e



    console.log("n: " + this.n);
    console.log("fi :" + this.fi);
    console.log(this.gcd(this.fi, this.e));

    console.log("hhfd");
    console.log("d:" + this.d);
    console.log("e * d mod = 1 : " + this.d);

    console.log("public : " + this.e + "," + this.n);
    console.log("private : " + this.d + "," + this.n);
    const m: number = 8

    console.log("message : " + 8);
    var c = Math.pow(m, this.e) % this.n;
    console.log("encrypt : " + c);
    var decypt = Math.pow(c, this.d) % this.n;
    console.log("decrypt : " + decypt);

    const mess = "mustafa Esmail Mohammed Ali mahdi"
    const decode = (str: string): string => Buffer.from(str, 'base64').toString('binary');
    const array: string[] = mess.split('');
    console.log("encode " + this.convertStringToAsci(mess));

  }
  encrypt(message: number, e: number,) {
    Math.pow(message, this.e) % this.n;
  }
  convertStringToAsci(string: string) {
    var t = new TextEncoder()
    // var result: string = ''
    // for (let index = 0; index < string.length; index++) {
    //   result += string[index].charCodeAt(0).toString();
    // }

    return t.encode(string);
  }
}
