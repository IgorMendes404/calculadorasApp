import { Component } from '@angular/core';
import { evaluate } from 'mathjs';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page {

  public calculo = ' '; // vazia
  public resultado: string; // null

  private ponto = false; //falsa

  private operacoes = ['+', '-', '*', '/']; //operacoes logicas

  constructor(public alertController: AlertController) { }

  public adicionarNumero(valor: string) {
    if (this.resultado) {
      this.apagarTudo();
    }
    this.calculo = this.calculo + valor;
  } //Aqui podemos adicionar um numero que esta declarado no botão onde se encontra a função

  public adicionarPonto() {
    if (this.ponto) {
      return;
    } 

    this.calculo += ".";
    this.ponto = true; //Declara como verdadeiro

  } //Aqui faz com que conseguimos adicionar o ponto(.) em nossa operções e que ele nao se repita seguidamente

  public adicionarOperacao(operador: string) {

    if (this.resultado) {
      this.calculo = this.resultado.toString();
      this.resultado = null; //Declara como nulo
    }
    const ultimo = this.calculo.slice(-1); //Cria uma constante para o ultimo caracter

    if (this.operacoes.indexOf(ultimo) > -1) {
      return;
    }   //Ira verificar o ultimo caracter para nao repetir operacao

    this.calculo += operador; 
    this.ponto = false; //Declara como falso

  } //Com isso conseguimos colocar os operadores('+', '-', '*', '/') sem que se repitam seguidamente

  public apagarTudo() {
    this.calculo = ''; //Atribui "vazio" a variavel
    this.resultado = null; //Atribui "null" a variavel
    this.ponto = false; //Atribui "false" a variavel
  }

  public apagarUltimo() {
    const ultimo = this.calculo.slice(-1); //Cria uma constante para o ultimo caracter
    if (ultimo == ".") {
      this.ponto = false; //Declara como falso
    } //Verifica se o ultimo caracter é um "." se for ele atribui "false" a variavel "ponto"

    this.calculo = this.calculo.slice(0, -1); // Apaga o ultimo caracter 
  }

  public calcularResultado() {
    try {
      this.resultado = evaluate(this.calculo);
    }
    catch (e) {
      this.resultado = ''; //Declara como vazio
      this.presentAlert('Erro!!!!', 'Cálculo inválido, verifique!') //Atribui valores as variaveis do aviso(Alert)
    }
  } //aqui onde se efetua todas as operações que estiverem na tela, sendo efetuadas atraves da biblioteca("mathjs")

  async presentAlert(titulo: string, mensagem: string) {
    const alert = await this.alertController.create({
      header: titulo, //Apelido para o header
      message: mensagem, //Apelido para a message
      buttons: ['OK']
    });

    await alert.present();
  } //Essa função faz com que caso haja um erro nas operações em tela ele avise o usuario do erro
}
