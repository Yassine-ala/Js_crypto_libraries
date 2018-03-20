import { Component } from '@angular/core';

import * as Forge  from 'node-forge';
import * as CryptoJS from 'crypto-js';


@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  key = Forge.random.getBytesSync(32);
  iv = Forge.random.getBytesSync(12);
  text = "Un paragraphe est une section de texte en prose vouée au développement d'un point particulier souvent au moyen de plusieurs phrases, dans la continuité du précédent et du suivant. Sur le plan typographique, le début d'un paragraphe est marqué par un léger renfoncement (alinéa) ou par un saut de ligne.";
  cryptJs: any;
  cryptForge: any;

  constructor() {}

  cryptoJs(){

    console.log("Generated Key : "+this.key);

    this.cryptJs = CryptoJS.AES.encrypt(this.text, this.key.toString(), { iv: this.iv });
    console.log("Crypted Msg : "+this.cryptJs.toString());

  }

  cryptoForge(){
    console.log("Generated key : "+this.key);

    //enc
    let cipher = Forge.cipher.createCipher('AES-CFB', this.key);
    cipher.start({iv: this.iv});
    cipher.update(Forge.util.createBuffer(this.text));
    this.cryptForge = cipher.output;
    console.log(this.cryptForge.toHex());
  }

  decryptoJs(){
    let decrypt = CryptoJS.AES.decrypt(this.cryptJs.toString(), this.key.toString(), { iv: this.iv });
    let msg = decrypt.toString(CryptoJS.enc.Utf8);
    console.log(msg);
  }

  decryptoForge(){

    let decipher = Forge.cipher.createDecipher('AES-CFB', this.key);
    decipher.start({iv: this.iv});
    decipher.update(this.cryptForge);
     console.log(decipher.finish());
     console.log(decipher.output.data);
  }

  crypT(){
    console.time('cryptoJS');

    this.cryptoJs(); // run whatever needs to be timed in between the statements

    console.timeEnd('cryptoJS');
  }

  decrypT(){
    console.time('decryptoJS');

    this.decryptoJs(); // run whatever needs to be timed in between the statements

    console.timeEnd('decryptoJS');
  }

  crypF(){
    console.time('cryptoForge');

    this.cryptoForge(); // run whatever needs to be timed in between the statements

    console.timeEnd('cryptoForge');
  }

  decrypF(){
    console.time('decryptoForge');

    this.decryptoForge(); // run whatever needs to be timed in between the statements

    console.timeEnd('decryptoForge');
  }
}
