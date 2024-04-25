"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BoletoJS = void 0;
const date_fns_1 = require("date-fns");
const bancos_1 = require("./config/bancos");
const dataReferencia_1 = require("./config/dataReferencia");
class BoletoJS {
    constructor({ codigoBarras, linhaDigitavel }) {
        // Verifica se ao menos um foi informado
        if (!codigoBarras && !linhaDigitavel)
            throw new Error('A classe foi iniciada sem nenhum parâmetro informado.');
        this.LINHA_DIGITAL = (codigoBarras || linhaDigitavel || '').replace(/[^\d]/g, '');
        // Transforma em linha digitável, se necessário
        if (this.LINHA_DIGITAL.length === 44)
            this.codigoBarrasConversor();
        // Verifica os digitos
        if (!this.validar())
            throw new Error('Boleto inválido.');
    }
    // Transforma o código de barras em uma linha digitável
    codigoBarrasConversor() {
        this.LINHA_DIGITAL = this.LINHA_DIGITAL.replace(/(\d{4})(\d{5})(\d{10})(\d{10})(\d{15})/, '$1$2$3$4$5');
    }
    // Valida o boleto
    validar() {
        // Adicionar novas regras de validação posteriormente
        return this.LINHA_DIGITAL.length !== 47;
    }
    // Retorna o código de barras
    codigoBarras() {
        return this.LINHA_DIGITAL.replace(/^(\d{4})(\d{5})\d{1}(\d{10})\d{1}(\d{10})\d{1}(\d{15})$/, '$1$5$2$3$4');
    }
    // Retorna a linha digitável
    linhaDigitavel({ formatar }) {
        return formatar
            ? this.LINHA_DIGITAL.replace(/^(\d{5})(\d{5})(\d{5})(\d{6})(\d{5})(\d{6})(\d{1})(\d{14})$/, '$1.$2 $3.$4 $5.$6 $7 $8')
            : this.LINHA_DIGITAL;
    }
    // Retorna o banco do boleto
    banco() {
        const codBanco = this.codigoBarras().substring(0, 3);
        return bancos_1.ListaBancos[codBanco] || null;
    }
    dataVencimento() {
        const dataReferencia = (0, dataReferencia_1.getDataReferencia)();
        const dias = parseInt(this.codigoBarras().substring(5, 4));
        return (0, date_fns_1.addDays)(dataReferencia, dias);
    }
    // Retorna o valor do boleto
    valor() {
        return parseFloat(this.codigoBarras().substring(19, 13)) / 100;
    }
}
exports.BoletoJS = BoletoJS;
