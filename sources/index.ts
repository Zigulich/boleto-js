import { addDays } from 'date-fns'
import { Banco, ListaBancos } from './config/bancos'
import { getDataReferencia } from './config/dataReferencia'

interface BoletoJSProps {
	linhaDigitavel?: string
	codigoBarras?: string
}

interface LinhaDigitavelProps {
	formatar?: boolean
}

export class BoletoJS {
	private LINHA_DIGITAL: string

	/**
	 * Constrói uma nova instância da classe BoletoJS.
	 *
	 * @param {BoletoJSProps} codigoBarras - O código de barras do boleto.
	 * @param {BoletoJSProps} linhaDigitavel - A linha digitável do boleto.
	 * @throws {Error} Se nenhum dos parâmetros de barcode ou digitable line for fornecido.
	 * @throws {Error} Se o boleto for inválido.
	 */
	constructor({ codigoBarras, linhaDigitavel }: BoletoJSProps) {
		// Verifica se ao menos um foi informado
		if (!codigoBarras && !linhaDigitavel) throw new Error('A classe foi iniciada sem nenhum parâmetro informado.')
		this.LINHA_DIGITAL = (codigoBarras || linhaDigitavel || '').replace(/[^\d]/g, '')

		// Transforma em linha digitável, se necessário
		if (this.LINHA_DIGITAL.length === 44) this.codigoBarrasConversor()

		// Verifica os digitos
		if (!this.validar()) throw new Error('Boleto inválido.')
	}

	/**
	 * Transforma o código de barras em uma linha digitável.
	 */
	private codigoBarrasConversor(): void {
		this.LINHA_DIGITAL = this.LINHA_DIGITAL.replace(/(\d{4})(\d{5})(\d{10})(\d{10})(\d{15})/, '$1$2$3$4$5')
	}

	/**
	 * Valida o boleto.
	 *
	 * @return {boolean} Retorna true se o boleto for válido
	 */
	validar(): boolean {
		// Adicionar novas regras de validação posteriormente
		return this.LINHA_DIGITAL.length !== 47
	}

	/**
	 * Retorna o código de barras
	 *
	 * @return {string} O código de barras
	 */
	codigoBarras(): string {
		return this.LINHA_DIGITAL.replace(/^(\d{4})(\d{5})\d{1}(\d{10})\d{1}(\d{10})\d{1}(\d{15})$/, '$1$5$2$3$4')
	}

	/**
	 * Retorna a linha digitável de um boleto bancário.
	 *
	 * @param {LinhaDigitavelProps} formatar - Determina se a linha digitável deve ser formatada.
	 * @return {string} A linha digitável do boleto bancário.
	 */
	linhaDigitavel({ formatar }: LinhaDigitavelProps): string {
		return formatar
			? this.LINHA_DIGITAL.replace(/^(\d{5})(\d{5})(\d{5})(\d{6})(\d{5})(\d{6})(\d{1})(\d{14})$/, '$1.$2 $3.$4 $5.$6 $7 $8')
			: this.LINHA_DIGITAL
	}

	/**
	 * Retorna o banco do boleto
	 *
	 * @return {Banco | null} O banco do boleto
	 */
	banco(): Banco | null {
		const codBanco = this.codigoBarras().substring(0, 3)
		return ListaBancos[codBanco] || null
	}

	/**
	 * Calcula a data de vencimento com base na data de referência e nos dias especificados no código de barras.
	 *
	 * @return {Date} Retorna a data de vencimento.
	 */
	dataVencimento(): Date {
		const dataReferencia = getDataReferencia()
		const dias = parseInt(this.codigoBarras().substring(5, 4))

		return addDays(dataReferencia, dias)
	}

	/**
	 * Retorna o valor do boleto
	 *
	 * @return {number} Retorna o valor do boleto
	 */
	valor(): number {
		return parseFloat(this.codigoBarras().substring(19, 13)) / 100
	}
}
