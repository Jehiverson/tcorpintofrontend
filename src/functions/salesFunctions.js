import axios from 'axios'

const url = process.env.REACT_APP_URL_BASE;

export const salesShow = () => {

    let config = {
        headers: {
            token: localStorage.getItem('token'),
        }
      }
    return axios
    .get(url + '/binnacles/sales_show',config)
    .then((response) => {
        return response.data.sales;
    })
    .catch((error) => {
        console.log(error);
    })

}

export const confirmdataVendors = (vendors, vendorDescount, sale) => {
    var totalVendors = 0;
    var totalDesconuntVendors = 0;
    var totalFinanVendors = 0
    var message = ""
    var status =""
    //Venta de vendedores
    vendors.map(res => totalVendors += parseFloat(res.venta) == ' ' ? 0 : parseFloat(res.venta))
    //Descuento que se le hace a los vendedores encaso un cliente devuelva el producto que compro
    vendorDescount.map(resp => totalDesconuntVendors += parseFloat(resp.venta) == ' ' ? 0 : parseFloat(resp.venta))

    totalFinanVendors = totalVendors - totalDesconuntVendors

    if (parseFloat(totalFinanVendors) === parseFloat(sale)) {
        message = ""
        status = true
    } else {
        message = "Los datos ingresados no cuadran, datos de vendedores es: " + parseFloat(totalFinanVendors) + " y la venta ingresada es: " + sale
        status = false
    }
    return {message:message, status:status}
}

export const confirmdataInvoice = (sale) => {
    var totalInvoice_sis_total = 0
    var totalInvoice_man_total = 0
    var totalInvoice_cod_total = 0
    var totalInvoice_nota_total = 0
    var total = 0
    var message = ""
    var status =""
   
    totalInvoice_sis_total += parseFloat(sale.facturas_sis_total) == ' ' ? 0 : parseFloat(sale.facturas_sis_total)
    totalInvoice_man_total += parseFloat(sale.facturas_man_total) == ' ' ? 0 : parseFloat(sale.facturas_man_total)
    totalInvoice_cod_total += parseFloat(sale.facturas_cod_total) == ' ' ? 0 : parseFloat(sale.facturas_cod_total)
    totalInvoice_nota_total += parseFloat(sale.facturas_nota_total) == ' ' ? 0 : parseFloat(sale.facturas_nota_total)


    total = (parseFloat(totalInvoice_sis_total) + parseFloat(totalInvoice_man_total) + parseFloat(totalInvoice_cod_total)) - parseFloat(totalInvoice_nota_total)
    if(parseFloat(total) === parseFloat(sale.venta_diaria)){
        message =""
        status =true
    }else{
        message = "Los datos ingresados no cuadran, datos de facturación son: " + total + " y la venta ingresada es: " + sale.venta_diaria
        status =false
    }
    
    return {message:message, status:status}

}

export const confirmdataMethodPayment = (sale) => {
    console.log(sale)
var message =""
var status = false
var saleTotalDay = 0
var saleTotalDayDescounst = 0
var totalDay = 0

                    //efectivo
    saleTotalDay += parseFloat(sale.efectivoQuetzales) + 
                    parseFloat(sale.efectivoQuetzalesDolares) +
                    //Tarjetas
                    parseFloat(sale.credomatic) +
                    parseFloat(sale.visa) +
                    parseFloat(sale.visaOnline) +
                    parseFloat(sale.visaDolares) +
                    parseFloat(sale.masterCard) +
                    //Cuotas
                    parseFloat(sale.crediCuotas) +
                    parseFloat(sale.visaCuotas) +
                    //Envios
                    parseFloat(sale.valorEnvioEfectivo) +
                    //Especiales
                    parseFloat(sale.lifeMilesValor) +
                    parseFloat(sale.exencionIva) +
                    parseFloat(sale.loyalty) +
                    parseFloat(sale.gastosAutorizados) +
                    parseFloat(sale.retirosMercaderia) +
                    parseFloat(sale.ventaEnLinea) +
                    parseFloat(sale.cuadreDeCaja) +
                    //Certificados
                    parseFloat(sale.cashback) +
                    parseFloat(sale.giftcard);
    console.log(saleTotalDay)
    // Son los campos negativos que se tienen dentro de la venta del dia para cuadrar el total
    
    saleTotalDayDescounst +=
                    parseFloat(sale.faltante) +
                    parseFloat(sale.diferencia) +
                    parseFloat(sale.notaDeCredito) 
    console.log(saleTotalDayDescounst)
    totalDay = saleTotalDay -saleTotalDayDescounst

    if(parseFloat(totalDay) === parseFloat(sale.venta_diaria)){
        message =""
        status =true
    }else{
        message = "Los datos ingresados no cuadran, metodos de pago ingresados da: " + totalDay + " y la venta ingresada es: " + sale.venta_diaria
        status =false
    }
    
    return {message:message, status:status}

 
}

