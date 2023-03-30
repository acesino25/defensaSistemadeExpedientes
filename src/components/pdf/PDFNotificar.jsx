import { Page, Text, Document, StyleSheet, Image } from "@react-pdf/renderer";
import escudo from '../../assets/img/escudo_de_la_provincia_de_catamarca.jpg';
import escudomini from '../../assets/img/escudo.png'
import { insertSeparatorBeforeLastElement } from "../../utils/agregarY";

const colors = {
    lightgray: '#99A2AD'
}

const styles = StyleSheet.create({
    body:{
        paddingTop: '10px',
        display: 'flex',
        alignItems: 'center',
        flexDirection: 'column',
        padding: '50px'
    },
    bold: {
        fontWeight: 'bold'
    },
    header:{
        textAlign: 'center',
        fontSize: '24px',
        fontFamily: 'Times-Bold'
    },
    escudo:{
        width: '150px',
        height: '150px',
        marginTop: '50px',
        marginBottom: '50px'
    },
    headerUnderlined:{
        textAlign: 'center',
        fontSize: '24px',
        fontFamily: 'Times-Bold',
        textDecoration: 'underline',
        marginTop: '20px',
        marginBottom: '30px'
    },
    headerUnderlinedTitle:{
        textAlign: 'center',
        fontSize: '24px',
        fontFamily: 'Times-Bold',
        textDecoration: 'underline'
    },
    headerDatos:{
        textAlign: 'center',
        fontSize: '24px',
        fontFamily: 'Times-Bold',
        marginBottom: '20px',
    },
    headerPie:{
        textAlign: 'center',
        fontSize: '24px',
        fontFamily: 'Times-Bold',
        marginTop: '40px'
    },
    headerPie2:{
        textAlign: 'center',
        fontSize: '24px',
        fontFamily: 'Times-Bold',
        marginBottom: '10px'
    },
    page2:{
        body:{
            paddingTop: '0px',
            display: 'flex',
            flexDirection: 'column',
            paddingLeft: '50px',
            padding: '50px'
        },
        cabecera:{
            textAlign: 'center',
            fontSize: '11px',
            fontFamily: 'Courier',
            color: colors.lightgray
        },
        fecha:{
            display: 'flex',
            textAlign: 'right',
            fontSize: '10px',
            fontFamily: 'Courier',
            color: 'black',
            marginTop: '40px',
            marginBottom: '40px'
        },
        cuerpo:{
            textAlign: 'justify',
            fontSize: '12px',
            fontFamily: 'Courier',
            color: 'black',
            marginBottom: '20px'
        },
        pie:{
            expediente:{
                paddingTop: '10px',
                textAlign: 'center',
                fontWeight: 'bold',
                fontFamily: 'Courier',
                fontSize: '10px'
            }
        }
    }
})

export const PDFNotificar = ({datos, setDatos, electronico, empresa, empresas, fojas}) =>{

    console.log(datos)
    console.log(empresa)
    console.log(electronico)

    const today = new Date();
    const dd = String(today.getDate()).padStart(2, 0);
    const mm = String(today.getMonth()+1).padStart(2, 0);
    const yyyy = String(today.getFullYear()).padStart(4,0);

    const meses = ["enero", "febrero", "marzo", "abril", "mayo", "junio", "julio", "agosto", "septiembre", "octubre", "noviembre", "diciembre"];
    const mes = meses[today.getMonth()]

    /* FORMATEO FECHA DE AUDIENCIA */
    const audiencia = new Date(datos.fechaAudiencia)
    const audienciaYYYY = String(audiencia.getFullYear()).padStart(4,0);
    const audienciaDD = String(audiencia.getDate()).padStart(2, 0);
    const audienciaMes = meses[audiencia.getMonth()]

    const audienciaHH = audiencia.getHours();
    const audienciaMinutes = audiencia.getMinutes().toString().padStart(2, '0');
    const ampm = audienciaHH >= 12 ? 'PM' : 'AM';

    const audienciaHora = `${(audienciaHH % 12 || 12)}:${audienciaMinutes} ${ampm}`;

    var domicilio

    empresas.map((element)=>{
        if(element.name == empresa)
            domicilio = element.mail
    })

    var empresasElectronicas
    var mailElectronicas
    /*var empresasElectronicas
    var mailElectronicas
    if(electronico){
        const arrElectronico = empresas.filter((element) => element.mail != '')
        
        console.log(empresas)

        empresasElectronicas = arrElectronico.map((element)=>{
            return element.name
        })
        console.log(empresasElectronicas)
        mailElectronicas = arrElectronico.map((element)=>{
            return element.mail
        })
        console.log(mailElectronicas)
        const arrSobre  = empresas.filter((element) => element.mail == '')
    }*/

    const newEmpresas = datos.empresas
    var newArrayEmpresas = newEmpresas.split(', ')
    if(newArrayEmpresas.length >1){
        
        
        const lastIndex = newArrayEmpresas.length -1

        const concatenatedString = newArrayEmpresas.filter((element, index) => index !== lastIndex).join(", ");
        var empresasConY = `${concatenatedString} Y ${newArrayEmpresas[lastIndex]}`

        
    }else{
        var empresasConY = datos.empresas
    }
    

    

    
    if(!datos.hipervulnerable){
        if(!electronico){
            return(
                <Document>
                    <Page size="LEGAL" style={styles.page2.body}>
                        <Text style={{textAlign: 'center'}}><Image src={escudomini} style={{width:'70px', height: '70px', textAlign: 'center', justifyContet: 'center'}}></Image></Text>
                        <Text style={styles.page2.cabecera}>MINISTERIO DE INDUSTRIA, COMERCIO Y EMPLEO</Text>
                        <Text style={styles.page2.cabecera}>SECRETARÍA DE COMERCIO INTERIOR</Text>
                        <Text style={styles.page2.cabecera}>DIRECCIÓN PROVINCIAL DE DEFENSA DEL CONSUMIDOR</Text>

                        <Text style={{textAlign: 'center', fontWeight: 'bold', fontSize: '20px', fontFamily: 'Courier'}}>CÉDULA DE NOTIFICACIÓN</Text>
        
                        <Text style={styles.page2.fecha}>SAN FERNANDO DEL VALLE DE CATAMARCA, {dd} DE {mes.toUpperCase()} DEL AÑO {yyyy}.</Text>
                        <Text style={styles.page2.cuerpo}>Señor/a. <Text style={{ color: 'red', fontFamily: 'Courier-Bold'}}>{`${empresa}`}</Text></Text>
                        <Text style={styles.page2.cuerpo}>Domicilio <Text style={{ color: 'red', fontFamily: 'Courier-Bold'}}>{`${domicilio}`}</Text></Text>
        
                        <Text style={styles.page2.cuerpo}>Se le hace saber a Ud. que en el trámite Nº <Text style={{ color: 'red', fontFamily: 'Courier-Bold'}}>{datos.idEspecial} {`${datos.apellido} ${datos.nombres}`} C/ {empresasConY}</Text> S/ PRESUNTA INFRACCIÒN A LA LEY Nº 24.240 se ha dictado el siguiente proveído:</Text>
        
                        <Text style={styles.page2.cuerpo}>Por instrucción de la Sra. Directora Provincial de Defensa del Consumidor, téngase por recibido el reclamo de la Sr/a. <Text style={{ color: 'red', fontFamily: 'Courier-Bold'}}>{`${datos.apellido} ${datos.nombres}`}</Text> D.N.I. Nº  <Text style={{ color: 'red', fontFamily: 'Courier-Bold'}}>{`${datos.dni}`}</Text> , por el que considera afectados sus derechos como consumidor.-------</Text>
                        <Text style={styles.page2.cuerpo}>Atento lo normando por la Ley Provincial Nº 5069, Ley Nacional Nº 24.240 y normas provinciales complementarias, supletoria (Ley N° 3559 y C.P.C.C.) y Resolución M.I.C.E Nº 97, CÓRRASE TRASLADO de la presente denuncia  a la firma <Text style={{ color: 'red', fontFamily: 'Courier-Bold'}}>{empresa}</Text>, la que quedará intimada para que en el plazo de DIEZ (10) días desde la notificación de la presente providencia FORMULE PROPUESTA CONCILIATORIA respecto de la pretensión del denunciante (art. 11 de la Ley N° 5.069), a cuyos efectos deberá enviar un correo electrónico a la Mesa de Entrada Virtual del Organismo en mesadeentradadefensa@catamarca.gov.ar.------- </Text>
                        <Text style={styles.page2.cuerpo}>Dentro del mismo plazo, los denunciados deberán presentarse en las actuaciones por si o a través de sus representantes, acreditando personería, constituyendo un domicilio electrónico y uno legal e indicando un número telefónico de contacto. A tal fin, deberá remitir un correo electrónico a la Mesa de Entrada Virtual en mesadeentradadefensa@catamarca.gov.ar.-------------------------------------------</Text>


                        <Text style={styles.page2.cuerpo}>FÍJESE AUDIENCIA DE CONCILIACIÓN PARA EL DÍA <Text style={{ color: 'red', fontFamily: 'Courier-Bold'}}>{audienciaDD}</Text> DE <Text style={{ color: 'red', fontFamily: 'Courier-Bold'}}>{`${audienciaMes} del Año ${audienciaYYYY}`}</Text> A LAS <Text style={{ color: 'red', fontFamily: 'Courier-Bold'}}>{audienciaHora}</Text> Hrs., la que se llevará a cabo de modo PRESENCIAL. <Text style={{ color: 'red', fontFamily: 'Courier-Bold'}}>A tal efecto, deberá concurrir a este Organismo, sito en Av. General Belgrano 1494 C.A.P.E. – Pabellón N°27 de esta Ciudad Capital, el día y la hora indicados.</Text></Text>
        
                        <Text style={styles.page2.cuerpo}>Hágase saber a la firma denunciada que la falta de contestación del reclamo dentro de los 10 días, como así también la omisión de participar de la Audiencia de Conciliación, con miras a poner fin al conflicto, será ponderado al momento de emitir la resolución definitiva del sumario, con arreglo a las previsiones del Artículo 49 de la Ley N° 24.240.-------------------------------------------------</Text>
                        <Text style={styles.page2.cuerpo}>Para mejor recaudo, hágase conocer a las partes que el desarrollo de la instancia conciliatoria se llevará a cabo de acuerdo al “REGLAMENTO DE ACTUACIÓN PARA LA ETAPA CONCILIATORIA DEL PROCEDIMIENTO DE LA LEY N° 24.240 EN EL ÁMBITO DE LA DIRECCIÓN PROVINCIAL DE DEFENSA DEL CONSUMIDOR”, aprobado por RESOLUCIÓN MINISTERIAL I.C.E. 97/21, cuyo texto podrá ser consultado en el Boletín Oficial de la Provincia, a través del Portal de Internet del Gobierno de la Provincia.---</Text>
                        

                        <Text style={styles.page2.cuerpo}>A efectos de la tramitación de las presentes actuaciones, líbrense los oficios pertinentes, dispóngase las diligencias necesarias para su prosecución y fíjense las fechas de las audiencias a que hubiese lugar. -------------------------------</Text>
        
                        <Text style={styles.page2.cuerpo}>EN LA FECHA, ME NOTIFICO DEL PRESENTE PROVEIDO. -----------------------------------</Text>

                        
                        <Text style={styles.page2.cuerpo}>Dejo constancia de que el día <Text style={{ color: 'red', fontFamily: 'Courier-Bold'}}>{`${dd}/${mm}/${yyyy}`}</Text> se cierra un sobre que contiene copia del presente instrumento, con <Text style={{ color: 'red', fontFamily: 'Courier-Bold'}}>{fojas}</Text> copias para traslado para ser remitido a <Text style={{ color: 'red', fontFamily: 'Courier-Bold'}}>{empresa}</Text>. Doy fe.---------------------------------------------------------</Text>
                    </Page>

                    <Page size="LEGAL" style={styles.page2.body}>
                        <Text style={{textAlign: 'center'}}><Image src={escudomini} style={{width:'70px', height: '70px', textAlign: 'center', justifyContet: 'center'}}></Image></Text>
                        <Text style={styles.page2.cabecera}>MINISTERIO DE INDUSTRIA, COMERCIO Y EMPLEO</Text>
                        <Text style={styles.page2.cabecera}>SECRETARÍA DE COMERCIO INTERIOR</Text>
                        <Text style={styles.page2.cabecera}>DIRECCIÓN PROVINCIAL DE DEFENSA DEL CONSUMIDOR</Text>

                        <Text style={{textAlign: 'center', fontWeight: 'bold', fontSize: '20px', fontFamily: 'Courier'}}>CÉDULA DE NOTIFICACIÓN</Text>
        
                        <Text style={styles.page2.fecha}>SAN FERNANDO DEL VALLE DE CATAMARCA, {dd} DE {mes.toUpperCase()} DEL AÑO {yyyy}.</Text>
                        <Text style={styles.page2.cuerpo}>Señor/a. <Text style={{ color: 'red', fontFamily: 'Courier-Bold'}}>{`${empresa}`}</Text></Text>
                        <Text style={styles.page2.cuerpo}>Domicilio <Text style={{ color: 'red', fontFamily: 'Courier-Bold'}}>{`${domicilio}`}</Text></Text>
        
                        <Text style={styles.page2.cuerpo}>Se le hace saber a Ud. que en el trámite Nº <Text style={{ color: 'red', fontFamily: 'Courier-Bold'}}>{datos.idEspecial} {`${datos.apellido} ${datos.nombres}`} C/ {empresasConY}</Text> S/ PRESUNTA INFRACCIÒN A LA LEY Nº 24.240 se ha dictado el siguiente proveído:</Text>
        
                        <Text style={styles.page2.cuerpo}>Por instrucción de la Sra. Directora Provincial de Defensa del Consumidor, téngase por recibido el reclamo de la Sr/a. <Text style={{ color: 'red', fontFamily: 'Courier-Bold'}}>{`${datos.apellido} ${datos.nombres}`}</Text> D.N.I. Nº  <Text style={{ color: 'red', fontFamily: 'Courier-Bold'}}>{`${datos.dni}`}</Text> , por el que considera afectados sus derechos como consumidor.-------</Text>
                        <Text style={styles.page2.cuerpo}>Atento lo normando por la Ley Provincial Nº 5069, Ley Nacional Nº 24.240 y normas provinciales complementarias, supletoria (Ley N° 3559 y C.P.C.C.) y Resolución M.I.C.E Nº 97, CÓRRASE TRASLADO de la presente denuncia  a la firma <Text style={{ color: 'red', fontFamily: 'Courier-Bold'}}>{empresa}</Text>, la que quedará intimada para que en el plazo de DIEZ (10) días desde la notificación de la presente providencia FORMULE PROPUESTA CONCILIATORIA respecto de la pretensión del denunciante (art. 11 de la Ley N° 5.069), a cuyos efectos deberá enviar un correo electrónico a la Mesa de Entrada Virtual del Organismo en mesadeentradadefensa@catamarca.gov.ar.------- </Text>
                        <Text style={styles.page2.cuerpo}>Dentro del mismo plazo, los denunciados deberán presentarse en las actuaciones por si o a través de sus representantes, acreditando personería, constituyendo un domicilio electrónico y uno legal e indicando un número telefónico de contacto. A tal fin, deberá remitir un correo electrónico a la Mesa de Entrada Virtual en mesadeentradadefensa@catamarca.gov.ar.-------------------------------------------</Text>


                        <Text style={styles.page2.cuerpo}>FÍJESE AUDIENCIA DE CONCILIACIÓN PARA EL DÍA <Text style={{ color: 'red', fontFamily: 'Courier-Bold'}}>{audienciaDD}</Text> DE <Text style={{ color: 'red', fontFamily: 'Courier-Bold'}}>{`${audienciaMes} del Año ${audienciaYYYY}`}</Text> A LAS <Text style={{ color: 'red', fontFamily: 'Courier-Bold'}}>{audienciaHora}</Text> Hrs., la que se llevará a cabo de modo PRESENCIAL. <Text style={{ color: 'red', fontFamily: 'Courier-Bold'}}>A tal efecto, deberá concurrir a este Organismo, sito en Av. General Belgrano 1494 C.A.P.E. – Pabellón N°27 de esta Ciudad Capital, el día y la hora indicados.</Text></Text>
        
                        <Text style={styles.page2.cuerpo}>Hágase saber a la firma denunciada que la falta de contestación del reclamo dentro de los 10 días, como así también la omisión de participar de la Audiencia de Conciliación, con miras a poner fin al conflicto, será ponderado al momento de emitir la resolución definitiva del sumario, con arreglo a las previsiones del Artículo 49 de la Ley N° 24.240.-------------------------------------------------</Text>
                        <Text style={styles.page2.cuerpo}>Para mejor recaudo, hágase conocer a las partes que el desarrollo de la instancia conciliatoria se llevará a cabo de acuerdo al “REGLAMENTO DE ACTUACIÓN PARA LA ETAPA CONCILIATORIA DEL PROCEDIMIENTO DE LA LEY N° 24.240 EN EL ÁMBITO DE LA DIRECCIÓN PROVINCIAL DE DEFENSA DEL CONSUMIDOR”, aprobado por RESOLUCIÓN MINISTERIAL I.C.E. 97/21, cuyo texto podrá ser consultado en el Boletín Oficial de la Provincia, a través del Portal de Internet del Gobierno de la Provincia.---</Text>
                        

                        <Text style={styles.page2.cuerpo}>A efectos de la tramitación de las presentes actuaciones, líbrense los oficios pertinentes, dispóngase las diligencias necesarias para su prosecución y fíjense las fechas de las audiencias a que hubiese lugar. -------------------------------</Text>
        
                        <Text style={{display: 'flex', flexDirection: 'column', gap:'10px', textAlign: 'left', fontSize: '10px', fontFamily: 'Courier', color: 'black', marginRight: '300px', marginTop: '20px', width: '200px'}}>
                            Con: ____ copias para traslado
                        </Text>
                        <Text style={{display: 'flex', flexDirection: 'column', gap:'10px', textAlign: 'left', fontSize: '10px', fontFamily: 'Courier', color: 'black', marginRight: '300px', marginTop: '5px', width: '200px'}}>
                            Fecha: ____/_______/_____ Hora: _________
                        </Text>
        
                        <Text style={{display: 'flex', flexDirection: 'column', gap:'10px', textAlign: 'left', fontSize: '10px', fontFamily: 'Courier', color: 'black', marginRight: '300px', marginTop: '10px', width: '200px'}}>
                            Notificado: ___________________________
                        </Text>
                        <Text style={{display: 'flex', flexDirection: 'column', gap:'10px', textAlign: 'left', fontSize: '10px', fontFamily: 'Courier', color: 'black', marginRight: '300px', marginTop: '5px', width: '200px'}}>
                            ACLARACIÓN: ____________________________
                        </Text>
        
                        <Text style={{textAlign: 'right', fontSize: '10px', fontFamily: 'Courier', color: 'black'}}>Inspector: ____________________________</Text>

                    </Page>

                    
                </Document>
            )
        }else{  /* Es electronico */
        return(
            <Document>
                <Page size="LEGAL" style={styles.page2.body}>
                    <Text style={{textAlign: 'center'}}><Image src={escudomini} style={{width:'70px', height: '70px', textAlign: 'center', justifyContet: 'center'}}></Image></Text>
                    <Text style={styles.page2.cabecera}>MINISTERIO DE INDUSTRIA, COMERCIO Y EMPLEO</Text>
                    <Text style={styles.page2.cabecera}>SECRETARÍA DE COMERCIO INTERIOR</Text>
                    <Text style={styles.page2.cabecera}>DIRECCIÓN PROVINCIAL DE DEFENSA DEL CONSUMIDOR</Text>

                    <Text style={{textAlign: 'center', fontWeight: 'bold', fontSize: '20px', fontFamily: 'Courier'}}>CÉDULA DE NOTIFICACIÓN</Text>
    
                    <Text style={styles.page2.fecha}>SAN FERNANDO DEL VALLE DE CATAMARCA, {dd} DE {mes.toUpperCase()} DEL AÑO {yyyy}.</Text>
                    <Text style={styles.page2.cuerpo}>Señor/a. <Text style={{ color: 'red', fontFamily: 'Courier-Bold'}}>{`${empresa}`}</Text></Text>
                    <Text style={styles.page2.cuerpo}>Domicilio <Text style={{ color: 'red', fontFamily: 'Courier-Bold'}}>{`${domicilio}`}</Text></Text>
    
                    <Text style={styles.page2.cuerpo}>Se le hace saber a Ud. que en el trámite Nº <Text style={{ color: 'red', fontFamily: 'Courier-Bold'}}>{datos.idEspecial} {`${datos.apellido} ${datos.nombres}`} C/ {empresasConY}</Text> S/ PRESUNTA INFRACCIÒN A LA LEY Nº 24.240 se ha dictado el siguiente proveído:</Text>
    
                    <Text style={styles.page2.cuerpo}>Por instrucción de la Sra. Directora Provincial de Defensa del Consumidor, téngase por recibido el reclamo de la Sr/a. <Text style={{ color: 'red', fontFamily: 'Courier-Bold'}}>{`${datos.apellido} ${datos.nombres}`}</Text> D.N.I. Nº  <Text style={{ color: 'red', fontFamily: 'Courier-Bold'}}>{`${datos.dni}`}</Text> , por el que considera afectados sus derechos como consumidor.-------</Text>
                    <Text style={styles.page2.cuerpo}>Atento lo normando por la Ley Provincial Nº 5069, Ley Nacional Nº 24.240 y normas provinciales complementarias, supletoria (Ley N° 3559 y C.P.C.C.) y Resolución M.I.C.E Nº 97, CÓRRASE TRASLADO de la presente denuncia  a la firma <Text style={{ color: 'red', fontFamily: 'Courier-Bold'}}>{empresa}</Text>, la que quedará intimada para que en el plazo de DIEZ (10) días desde la notificación de la presente providencia FORMULE PROPUESTA CONCILIATORIA respecto de la pretensión del denunciante (art. 11 de la Ley N° 5.069), a cuyos efectos deberá enviar un correo electrónico a la Mesa de Entrada Virtual del Organismo en mesadeentradadefensa@catamarca.gov.ar.------- </Text>
                    <Text style={styles.page2.cuerpo}>Dentro del mismo plazo, los denunciados deberán presentarse en las actuaciones por si o a través de sus representantes, acreditando personería, constituyendo un domicilio electrónico y uno legal e indicando un número telefónico de contacto. A tal fin, deberá remitir un correo electrónico a la Mesa de Entrada Virtual en mesadeentradadefensa@catamarca.gov.ar.-------------------------------------------</Text>


                    <Text style={styles.page2.cuerpo}>FÍJESE AUDIENCIA DE CONCILIACIÓN PARA EL DÍA <Text style={{ color: 'red', fontFamily: 'Courier-Bold'}}>{audienciaDD}</Text> DE <Text style={{ color: 'red', fontFamily: 'Courier-Bold'}}>{`${audienciaMes} del Año ${audienciaYYYY}`}</Text> A LAS <Text style={{ color: 'red', fontFamily: 'Courier-Bold'}}>{audienciaHora}</Text> Hrs., la que se llevará a cabo de modo PRESENCIAL. <Text style={{ color: 'red', fontFamily: 'Courier-Bold'}}>A tal efecto, deberá concurrir a este Organismo, sito en Av. General Belgrano 1494 C.A.P.E. – Pabellón N°27 de esta Ciudad Capital, el día y la hora indicados.</Text></Text>
    
                    <Text style={styles.page2.cuerpo}>Hágase saber a la firma denunciada que la falta de contestación del reclamo dentro de los 10 días, como así también la omisión de participar de la Audiencia de Conciliación, con miras a poner fin al conflicto, será ponderado al momento de emitir la resolución definitiva del sumario, con arreglo a las previsiones del Artículo 49 de la Ley N° 24.240.-------------------------------------------------</Text>
                    <Text style={styles.page2.cuerpo}>Para mejor recaudo, hágase conocer a las partes que el desarrollo de la instancia conciliatoria se llevará a cabo de acuerdo al “REGLAMENTO DE ACTUACIÓN PARA LA ETAPA CONCILIATORIA DEL PROCEDIMIENTO DE LA LEY N° 24.240 EN EL ÁMBITO DE LA DIRECCIÓN PROVINCIAL DE DEFENSA DEL CONSUMIDOR”, aprobado por RESOLUCIÓN MINISTERIAL I.C.E. 97/21, cuyo texto podrá ser consultado en el Boletín Oficial de la Provincia, a través del Portal de Internet del Gobierno de la Provincia.---</Text>
                    

                    <Text style={styles.page2.cuerpo}>De conformidad con las previsiones de la Resolución Ministerial I.C.E. Nº 33/2021, que adhiere la Provincia a los términos de Resolución 274/2021 de la Secretaría de Comercio Interior, dependiente del Ministerio de Desarrollo Productivo de la Nación, dictada con fecha 26/03/2021 y publicada con fecha 30/03/2021, notifíquese a la <Text style={{ color: 'red', fontFamily: 'Courier-Bold'}}>{empresa}</Text>   en sus domicilios electrónicos correo <Text style={{ color: 'red', fontFamily: 'Courier-Bold'}}>{domicilio}</Text>  de o las denunciadas registrados con arreglo a los arts. 2, 4 y 5 de la mencionada Resolución 274/2021.</Text>
    
                    <Text style={styles.page2.cuerpo}>EN LA FECHA, ME NOTIFICO DEL PRESENTE PROVEIDO. -----------------------------------</Text>

                    
                    <Text style={styles.page2.cuerpo}> SE ADJUNTA FJS. <Text style={{ color: 'red', fontFamily: 'Courier-Bold'}}>{fojas}</Text> PARA SER REMITIDAS A <Text style={{ color: 'red', fontFamily: 'Courier-Bold'}}>{empresa}</Text>. DOY FE.---------------------------------------------------------</Text>
                </Page>

                {/* OFICINA */}
                <Page size="LEGAL" style={styles.page2.body}>
                    <Text style={{textAlign: 'center'}}><Image src={escudomini} style={{width:'70px', height: '70px', textAlign: 'center', justifyContet: 'center'}}></Image></Text>
                    <Text style={styles.page2.cabecera}>MINISTERIO DE INDUSTRIA, COMERCIO Y EMPLEO</Text>
                    <Text style={styles.page2.cabecera}>SECRETARÍA DE COMERCIO INTERIOR</Text>
                    <Text style={styles.page2.cabecera}>DIRECCIÓN PROVINCIAL DE DEFENSA DEL CONSUMIDOR</Text>

                    <Text style={{textAlign: 'center', fontWeight: 'bold', fontSize: '20px', fontFamily: 'Courier'}}>CÉDULA DE NOTIFICACIÓN</Text>
    
                    <Text style={styles.page2.fecha}>SAN FERNANDO DEL VALLE DE CATAMARCA, {dd} DE {mes.toUpperCase()} DEL AÑO {yyyy}.</Text>
                    <Text style={styles.page2.cuerpo}>Señor/a. <Text style={{ color: 'red', fontFamily: 'Courier-Bold'}}>{`${empresa}`}</Text></Text>
                    <Text style={styles.page2.cuerpo}>Domicilio <Text style={{ color: 'red', fontFamily: 'Courier-Bold'}}>{`${domicilio}`}</Text></Text>
    
                    <Text style={styles.page2.cuerpo}>Se le hace saber a Ud. que en el trámite Nº <Text style={{ color: 'red', fontFamily: 'Courier-Bold'}}>{datos.idEspecial} {`${datos.apellido} ${datos.nombres}`} C/ {empresasConY}</Text> S/ PRESUNTA INFRACCIÒN A LA LEY Nº 24.240 se ha dictado el siguiente proveído:</Text>
    
                    <Text style={styles.page2.cuerpo}>Por instrucción de la Sra. Directora Provincial de Defensa del Consumidor, téngase por recibido el reclamo de la Sr/a. <Text style={{ color: 'red', fontFamily: 'Courier-Bold'}}>{`${datos.apellido} ${datos.nombres}`}</Text> D.N.I. Nº  <Text style={{ color: 'red', fontFamily: 'Courier-Bold'}}>{`${datos.dni}`}</Text> , por el que considera afectados sus derechos como consumidor.-------</Text>
                    <Text style={styles.page2.cuerpo}>Atento lo normando por la Ley Provincial Nº 5069, Ley Nacional Nº 24.240 y normas provinciales complementarias, supletoria (Ley N° 3559 y C.P.C.C.) y Resolución M.I.C.E Nº 97, CÓRRASE TRASLADO de la presente denuncia  a la firma <Text style={{ color: 'red', fontFamily: 'Courier-Bold'}}>{empresa}</Text>, la que quedará intimada para que en el plazo de DIEZ (10) días desde la notificación de la presente providencia FORMULE PROPUESTA CONCILIATORIA respecto de la pretensión del denunciante (art. 11 de la Ley N° 5.069), a cuyos efectos deberá enviar un correo electrónico a la Mesa de Entrada Virtual del Organismo en mesadeentradadefensa@catamarca.gov.ar.------- </Text>
                    <Text style={styles.page2.cuerpo}>Dentro del mismo plazo, los denunciados deberán presentarse en las actuaciones por si o a través de sus representantes, acreditando personería, constituyendo un domicilio electrónico y uno legal e indicando un número telefónico de contacto. A tal fin, deberá remitir un correo electrónico a la Mesa de Entrada Virtual en mesadeentradadefensa@catamarca.gov.ar.-------------------------------------------</Text>


                    <Text style={styles.page2.cuerpo}>FÍJESE AUDIENCIA DE CONCILIACIÓN PARA EL DÍA <Text style={{ color: 'red', fontFamily: 'Courier-Bold'}}>{audienciaDD}</Text> DE <Text style={{ color: 'red', fontFamily: 'Courier-Bold'}}>{`${audienciaMes} del Año ${audienciaYYYY}`}</Text> A LAS <Text style={{ color: 'red', fontFamily: 'Courier-Bold'}}>{audienciaHora}</Text> Hrs., la que se llevará a cabo de modo PRESENCIAL. <Text style={{ color: 'red', fontFamily: 'Courier-Bold'}}>A tal efecto, deberá concurrir a este Organismo, sito en Av. General Belgrano 1494 C.A.P.E. – Pabellón N°27 de esta Ciudad Capital, el día y la hora indicados.</Text></Text>
    
                    <Text style={styles.page2.cuerpo}>Hágase saber a la firma denunciada que la falta de contestación del reclamo dentro de los 10 días, como así también la omisión de participar de la Audiencia de Conciliación, con miras a poner fin al conflicto, será ponderado al momento de emitir la resolución definitiva del sumario, con arreglo a las previsiones del Artículo 49 de la Ley N° 24.240.-------------------------------------------------</Text>
                    <Text style={styles.page2.cuerpo}>Para mejor recaudo, hágase conocer a las partes que el desarrollo de la instancia conciliatoria se llevará a cabo de acuerdo al “REGLAMENTO DE ACTUACIÓN PARA LA ETAPA CONCILIATORIA DEL PROCEDIMIENTO DE LA LEY N° 24.240 EN EL ÁMBITO DE LA DIRECCIÓN PROVINCIAL DE DEFENSA DEL CONSUMIDOR”, aprobado por RESOLUCIÓN MINISTERIAL I.C.E. 97/21, cuyo texto podrá ser consultado en el Boletín Oficial de la Provincia, a través del Portal de Internet del Gobierno de la Provincia.---</Text>
                    

                    <Text style={styles.page2.cuerpo}>A efectos de la tramitación de las presentes actuaciones, líbrense los oficios pertinentes, dispóngase las diligencias necesarias para su prosecución y fíjense las fechas de las audiencias a que hubiese lugar.</Text>
    
                    <Text style={styles.page2.cuerpo}>EN LA FECHA, ME NOTIFICO DEL PRESENTE PROVEIDO. -----------------------------------</Text>

                    
                    <Text style={styles.page2.cuerpo}> SE ADJUNTA FJS. <Text style={{ color: 'red', fontFamily: 'Courier-Bold'}}>{fojas}</Text> PARA SER REMITIDAS A LA DENUNCIADA, <Text style={{ color: 'red', fontFamily: 'Courier-Bold'}}>{empresa}</Text>. DOY FE.---------------------------------------------------------</Text>
                </Page>

                
            </Document>
        )
        }
    }else{ /* HIPER */
    if(!electronico){
        return(
            <Document>
                <Page size="LEGAL" style={styles.page2.body}>
                        <Text style={{textAlign: 'center'}}><Image src={escudomini} style={{width:'70px', height: '70px', textAlign: 'center', justifyContet: 'center'}}></Image></Text>
                        <Text style={styles.page2.cabecera}>MINISTERIO DE INDUSTRIA, COMERCIO Y EMPLEO</Text>
                        <Text style={styles.page2.cabecera}>SECRETARÍA DE COMERCIO INTERIOR</Text>
                        <Text style={styles.page2.cabecera}>DIRECCIÓN PROVINCIAL DE DEFENSA DEL CONSUMIDOR</Text>

                        <Text style={{textAlign: 'center', fontWeight: 'bold', fontSize: '20px', fontFamily: 'Courier'}}>CÉDULA DE NOTIFICACIÓN</Text>
        
                        <Text style={styles.page2.fecha}>SAN FERNANDO DEL VALLE DE CATAMARCA, {dd} DE {mes.toUpperCase()} DEL AÑO {yyyy}.</Text>
                        <Text style={styles.page2.cuerpo}>Señor/a. <Text style={{ color: 'red', fontFamily: 'Courier-Bold'}}>{`${empresa}`}</Text></Text>
                        <Text style={styles.page2.cuerpo}>Domicilio <Text style={{ color: 'red', fontFamily: 'Courier-Bold'}}>{`${domicilio}`}</Text></Text>
        
                        <Text style={styles.page2.cuerpo}>Se le hace saber a Ud. que en el trámite Nº <Text style={{ color: 'red', fontFamily: 'Courier-Bold'}}>{datos.idEspecial} {`${datos.apellido} ${datos.nombres}`} C/ {empresasConY}</Text> S/ PRESUNTA INFRACCIÒN A LA LEY Nº 24.240 se ha dictado el siguiente proveído:</Text>
        
                        <Text style={styles.page2.cuerpo}>Por instrucción de la Sra. Directora Provincial de Defensa del Consumidor, téngase por recibido el reclamo de la Sr/a. <Text style={{ color: 'red', fontFamily: 'Courier-Bold'}}>{`${datos.apellido} ${datos.nombres}`}</Text> D.N.I. Nº  <Text style={{ color: 'red', fontFamily: 'Courier-Bold'}}>{`${datos.dni}`}</Text> , por el que considera afectados sus derechos como consumidor.-------</Text>
                        <Text style={styles.page2.cuerpo}>Atento lo normando por la Ley Provincial Nº 5069, Ley Nacional Nº 24.240 y normas provinciales complementarias, supletoria (Ley N° 3559 y C.P.C.C.) y Resolución M.I.C.E Nº 97, CÓRRASE TRASLADO de la presente denuncia  a la firma <Text style={{ color: 'red', fontFamily: 'Courier-Bold'}}>{empresa}</Text>, la que quedará intimada para que en el plazo de DIEZ (10) días desde la notificación de la presente providencia FORMULE PROPUESTA CONCILIATORIA respecto de la pretensión del denunciante (art. 11 de la Ley N° 5.069), a cuyos efectos deberá enviar un correo electrónico a la Mesa de Entrada Virtual del Organismo en mesadeentradadefensa@catamarca.gov.ar.------- </Text>
                        <Text style={styles.page2.cuerpo}>Dentro del mismo plazo, los denunciados deberán presentarse en las actuaciones por si o a través de sus representantes, acreditando personería, constituyendo un domicilio electrónico y uno legal e indicando un número telefónico de contacto. A tal fin, deberá remitir un correo electrónico a la Mesa de Entrada Virtual en mesadeentradadefensa@catamarca.gov.ar.-------------------------------------------</Text>


                        <Text style={styles.page2.cuerpo}>FÍJESE AUDIENCIA DE CONCILIACIÓN PARA EL DÍA <Text style={{ color: 'red', fontFamily: 'Courier-Bold'}}>{audienciaDD}</Text> DE <Text style={{ color: 'red', fontFamily: 'Courier-Bold'}}>{`${audienciaMes} del Año ${audienciaYYYY}`}</Text> A LAS <Text style={{ color: 'red', fontFamily: 'Courier-Bold'}}>{audienciaHora}</Text> Hrs., la que se llevará a cabo de modo PRESENCIAL. <Text style={{ color: 'red', fontFamily: 'Courier-Bold'}}>A tal efecto, deberá concurrir a este Organismo, sito en Av. General Belgrano 1494 C.A.P.E. – Pabellón N°27 de esta Ciudad Capital, el día y la hora indicados.</Text></Text>
        
                        <Text style={styles.page2.cuerpo}>Hágase saber a la firma denunciada que la falta de contestación del reclamo dentro de los 10 días, como así también la omisión de participar de la Audiencia de Conciliación, con miras a poner fin al conflicto, será ponderado al momento de emitir la resolución definitiva del sumario, con arreglo a las previsiones del Artículo 49 de la Ley N° 24.240.-------------------------------------------------</Text>
                        <Text style={styles.page2.cuerpo}>Para mejor recaudo, hágase conocer a las partes que el desarrollo de la instancia conciliatoria se llevará a cabo de acuerdo al “REGLAMENTO DE ACTUACIÓN PARA LA ETAPA CONCILIATORIA DEL PROCEDIMIENTO DE LA LEY N° 24.240 EN EL ÁMBITO DE LA DIRECCIÓN PROVINCIAL DE DEFENSA DEL CONSUMIDOR”, aprobado por RESOLUCIÓN MINISTERIAL I.C.E. 97/21, cuyo texto podrá ser consultado en el Boletín Oficial de la Provincia, a través del Portal de Internet del Gobierno de la Provincia.---</Text>
                        

                        <Text style={styles.page2.cuerpo}>A efectos de la tramitación de las presentes actuaciones, líbrense los oficios pertinentes, dispóngase las diligencias necesarias para su prosecución y fíjense las fechas de las audiencias a que hubiese lugar. -------------------------------</Text>
        
                        <Text style={styles.page2.cuerpo}>En virtud de las condiciones personales del consumidor, y los normado por el inc. “INCISO” del art. 2 de la Resolución 139/2020 de la Secretaría de Comercio Interior, en el presente proceso administrativo deberán observarse los principios procedimentales de a) “lenguaje accesible”: toda la comunicación deberá utilizar lenguaje claro, coloquial, expresado en sentido llano, conciso, entendible y adecuado a las condiciones de las y los consumidores hipervulnerables, y b) “deber reforzado de colaboración”: los proveedores deberán desplegar un comportamiento tendiente a garantizar la adecuada y rápida composición del conflicto prestando para ello toda su colaboración posible. En consecuencia, la empresa deberá incorporar al proceso EN EL MOMENTO DE LA AUDIENCIA todo el legajo correspondiente al consumidor, incluido el contrato de tarjeta de crédito. Art. 4 ley 5069.</Text>
        
                        
                        <Text style={styles.page2.cuerpo}>EN LA FECHA, ME NOTIFICO DEL PRESENTE PROVEIDO. -----------------------------------</Text>

                        
                        <Text style={styles.page2.cuerpo}>Dejo constancia de que el día <Text style={{ color: 'red', fontFamily: 'Courier-Bold'}}>{`${dd}/${mm}/${yyyy}`}</Text> se cierra un sobre que contiene copia del presente instrumento, con <Text style={{ color: 'red', fontFamily: 'Courier-Bold'}}>{fojas}</Text> copias para traslado para ser remitido a <Text style={{ color: 'red', fontFamily: 'Courier-Bold'}}>{empresa}</Text>. Doy fe.---------------------------------------------------------</Text>
                    </Page>

                    <Page size="LEGAL" style={styles.page2.body}>
                        <Text style={{textAlign: 'center'}}><Image src={escudomini} style={{width:'70px', height: '70px', textAlign: 'center', justifyContet: 'center'}}></Image></Text>
                        <Text style={styles.page2.cabecera}>MINISTERIO DE INDUSTRIA, COMERCIO Y EMPLEO</Text>
                        <Text style={styles.page2.cabecera}>SECRETARÍA DE COMERCIO INTERIOR</Text>
                        <Text style={styles.page2.cabecera}>DIRECCIÓN PROVINCIAL DE DEFENSA DEL CONSUMIDOR</Text>

                        <Text style={{textAlign: 'center', fontWeight: 'bold', fontSize: '20px', fontFamily: 'Courier'}}>CÉDULA DE NOTIFICACIÓN</Text>
        
                        <Text style={styles.page2.fecha}>SAN FERNANDO DEL VALLE DE CATAMARCA, {dd} DE {mes.toUpperCase()} DEL AÑO {yyyy}.</Text>
                        <Text style={styles.page2.cuerpo}>Señor/a. <Text style={{ color: 'red', fontFamily: 'Courier-Bold'}}>{`${empresa}`}</Text></Text>
                        <Text style={styles.page2.cuerpo}>Domicilio <Text style={{ color: 'red', fontFamily: 'Courier-Bold'}}>{`${domicilio}`}</Text></Text>
        
                        <Text style={styles.page2.cuerpo}>Se le hace saber a Ud. que en el trámite Nº <Text style={{ color: 'red', fontFamily: 'Courier-Bold'}}>{datos.idEspecial} {`${datos.apellido} ${datos.nombres}`} C/ {empresasConY}</Text> S/ PRESUNTA INFRACCIÒN A LA LEY Nº 24.240 se ha dictado el siguiente proveído:</Text>
        
                        <Text style={styles.page2.cuerpo}>Por instrucción de la Sra. Directora Provincial de Defensa del Consumidor, téngase por recibido el reclamo de la Sr/a. <Text style={{ color: 'red', fontFamily: 'Courier-Bold'}}>{`${datos.apellido} ${datos.nombres}`}</Text> D.N.I. Nº  <Text style={{ color: 'red', fontFamily: 'Courier-Bold'}}>{`${datos.dni}`}</Text> , por el que considera afectados sus derechos como consumidor.-------</Text>
                        <Text style={styles.page2.cuerpo}>Atento lo normando por la Ley Provincial Nº 5069, Ley Nacional Nº 24.240 y normas provinciales complementarias, supletoria (Ley N° 3559 y C.P.C.C.) y Resolución M.I.C.E Nº 97, CÓRRASE TRASLADO de la presente denuncia  a la firma <Text style={{ color: 'red', fontFamily: 'Courier-Bold'}}>{empresa}</Text>, la que quedará intimada para que en el plazo de DIEZ (10) días desde la notificación de la presente providencia FORMULE PROPUESTA CONCILIATORIA respecto de la pretensión del denunciante (art. 11 de la Ley N° 5.069), a cuyos efectos deberá enviar un correo electrónico a la Mesa de Entrada Virtual del Organismo en mesadeentradadefensa@catamarca.gov.ar.------- </Text>
                        <Text style={styles.page2.cuerpo}>Dentro del mismo plazo, los denunciados deberán presentarse en las actuaciones por si o a través de sus representantes, acreditando personería, constituyendo un domicilio electrónico y uno legal e indicando un número telefónico de contacto. A tal fin, deberá remitir un correo electrónico a la Mesa de Entrada Virtual en mesadeentradadefensa@catamarca.gov.ar.-------------------------------------------</Text>


                        <Text style={styles.page2.cuerpo}>FÍJESE AUDIENCIA DE CONCILIACIÓN PARA EL DÍA <Text style={{ color: 'red', fontFamily: 'Courier-Bold'}}>{audienciaDD}</Text> DE <Text style={{ color: 'red', fontFamily: 'Courier-Bold'}}>{`${audienciaMes} del Año ${audienciaYYYY}`}</Text> A LAS <Text style={{ color: 'red', fontFamily: 'Courier-Bold'}}>{audienciaHora}</Text> Hrs., la que se llevará a cabo de modo PRESENCIAL. <Text style={{ color: 'red', fontFamily: 'Courier-Bold'}}>A tal efecto, deberá concurrir a este Organismo, sito en Av. General Belgrano 1494 C.A.P.E. – Pabellón N°27 de esta Ciudad Capital, el día y la hora indicados.</Text></Text>
        
                        <Text style={styles.page2.cuerpo}>Hágase saber a la firma denunciada que la falta de contestación del reclamo dentro de los 10 días, como así también la omisión de participar de la Audiencia de Conciliación, con miras a poner fin al conflicto, será ponderado al momento de emitir la resolución definitiva del sumario, con arreglo a las previsiones del Artículo 49 de la Ley N° 24.240.-------------------------------------------------</Text>
                        <Text style={styles.page2.cuerpo}>Para mejor recaudo, hágase conocer a las partes que el desarrollo de la instancia conciliatoria se llevará a cabo de acuerdo al “REGLAMENTO DE ACTUACIÓN PARA LA ETAPA CONCILIATORIA DEL PROCEDIMIENTO DE LA LEY N° 24.240 EN EL ÁMBITO DE LA DIRECCIÓN PROVINCIAL DE DEFENSA DEL CONSUMIDOR”, aprobado por RESOLUCIÓN MINISTERIAL I.C.E. 97/21, cuyo texto podrá ser consultado en el Boletín Oficial de la Provincia, a través del Portal de Internet del Gobierno de la Provincia.---</Text>
                        

                        <Text style={styles.page2.cuerpo}>A efectos de la tramitación de las presentes actuaciones, líbrense los oficios pertinentes, dispóngase las diligencias necesarias para su prosecución y fíjense las fechas de las audiencias a que hubiese lugar. -------------------------------</Text>
        
                        <Text style={{...styles.page2.cuerpo, fontFamily: 'Courier-Bold'}}>En virtud de las condiciones personales del consumidor, y los normado por el inc. “INCISO” del art. 2 de la Resolución 139/2020 de la Secretaría de Comercio Interior, en el presente proceso administrativo deberán observarse los principios procedimentales de a) “lenguaje accesible”: toda la comunicación deberá utilizar lenguaje claro, coloquial, expresado en sentido llano, conciso, entendible y adecuado a las condiciones de las y los consumidores hipervulnerables, y b) “deber reforzado de colaboración”: los proveedores deberán desplegar un comportamiento tendiente a garantizar la adecuada y rápida composición del conflicto prestando para ello toda su colaboración posible. En consecuencia, la empresa deberá incorporar al proceso EN EL MOMENTO DE LA AUDIENCIA todo el legajo correspondiente al consumidor, incluido el contrato de tarjeta de crédito. Art. 4 ley 5069.------</Text>

                        <Text style={{display: 'flex', flexDirection: 'column', gap:'10px', textAlign: 'left', fontSize: '10px', fontFamily: 'Courier', color: 'black', marginRight: '300px', marginTop: '20px', width: '200px'}}>
                            Con: ____ copias para traslado
                        </Text>
                        <Text style={{display: 'flex', flexDirection: 'column', gap:'10px', textAlign: 'left', fontSize: '10px', fontFamily: 'Courier', color: 'black', marginRight: '300px', marginTop: '5px', width: '200px'}}>
                            Fecha: ____/_______/_____ Hora: _________
                        </Text>
        
                        <Text style={{display: 'flex', flexDirection: 'column', gap:'10px', textAlign: 'left', fontSize: '10px', fontFamily: 'Courier', color: 'black', marginRight: '300px', marginTop: '10px', width: '200px'}}>
                            Notificado: ___________________________
                        </Text>
                        <Text style={{display: 'flex', flexDirection: 'column', gap:'10px', textAlign: 'left', fontSize: '10px', fontFamily: 'Courier', color: 'black', marginRight: '300px', marginTop: '5px', width: '200px'}}>
                            ACLARACIÓN: ____________________________
                        </Text>
        
                        <Text style={{textAlign: 'right', fontSize: '10px', fontFamily: 'Courier', color: 'black'}}>Inspector: ____________________________</Text>

                    </Page>

                
            </Document>
        )
    }else{  /* Es electronico */
    return(
        <Document>
            <Page size="LEGAL" style={styles.page2.body}>
                <Text style={{textAlign: 'center'}}><Image src={escudomini} style={{width:'70px', height: '70px', textAlign: 'center', justifyContet: 'center'}}></Image></Text>
                <Text style={styles.page2.cabecera}>MINISTERIO DE INDUSTRIA, COMERCIO Y EMPLEO</Text>
                <Text style={styles.page2.cabecera}>SECRETARÍA DE COMERCIO INTERIOR</Text>
                <Text style={styles.page2.cabecera}>DIRECCIÓN PROVINCIAL DE DEFENSA DEL CONSUMIDOR</Text>

                <Text style={{textAlign: 'center', fontWeight: 'bold', fontSize: '20px', fontFamily: 'Courier'}}>CÉDULA DE NOTIFICACIÓN</Text>

                <Text style={styles.page2.fecha}>SAN FERNANDO DEL VALLE DE CATAMARCA, {dd} DE {mes.toUpperCase()} DEL AÑO {yyyy}.</Text>
                <Text style={styles.page2.cuerpo}>Señor/a. <Text style={{ color: 'red', fontFamily: 'Courier-Bold'}}>{`${empresa}`}</Text></Text>
                <Text style={styles.page2.cuerpo}>Domicilio <Text style={{ color: 'red', fontFamily: 'Courier-Bold'}}>{`${domicilio}`}</Text></Text>

                <Text style={styles.page2.cuerpo}>Se le hace saber a Ud. que en el trámite Nº <Text style={{ color: 'red', fontFamily: 'Courier-Bold'}}>{datos.idEspecial} {`${datos.apellido} ${datos.nombres}`} C/ {empresasConY}</Text> S/ PRESUNTA INFRACCIÒN A LA LEY Nº 24.240 se ha dictado el siguiente proveído:</Text>

                <Text style={styles.page2.cuerpo}>Por instrucción de la Sra. Directora Provincial de Defensa del Consumidor, téngase por recibido el reclamo de la Sr/a. <Text style={{ color: 'red', fontFamily: 'Courier-Bold'}}>{`${datos.apellido} ${datos.nombres}`}</Text> D.N.I. Nº  <Text style={{ color: 'red', fontFamily: 'Courier-Bold'}}>{`${datos.dni}`}</Text> , por el que considera afectados sus derechos como consumidor.-------</Text>
                <Text style={styles.page2.cuerpo}>Atento lo normando por la Ley Provincial Nº 5069, Ley Nacional Nº 24.240 y normas provinciales complementarias, supletoria (Ley N° 3559 y C.P.C.C.) y Resolución M.I.C.E Nº 97, CÓRRASE TRASLADO de la presente denuncia  a la firma <Text style={{ color: 'red', fontFamily: 'Courier-Bold'}}>{empresa}</Text>, la que quedará intimada para que en el plazo de DIEZ (10) días desde la notificación de la presente providencia FORMULE PROPUESTA CONCILIATORIA respecto de la pretensión del denunciante (art. 11 de la Ley N° 5.069), a cuyos efectos deberá enviar un correo electrónico a la Mesa de Entrada Virtual del Organismo en mesadeentradadefensa@catamarca.gov.ar.------- </Text>
                <Text style={styles.page2.cuerpo}>Dentro del mismo plazo, los denunciados deberán presentarse en las actuaciones por si o a través de sus representantes, acreditando personería, constituyendo un domicilio electrónico y uno legal e indicando un número telefónico de contacto. A tal fin, deberá remitir un correo electrónico a la Mesa de Entrada Virtual en mesadeentradadefensa@catamarca.gov.ar.-------------------------------------------</Text>


                <Text style={styles.page2.cuerpo}>FÍJESE AUDIENCIA DE CONCILIACIÓN PARA EL DÍA <Text style={{ color: 'red', fontFamily: 'Courier-Bold'}}>{audienciaDD}</Text> DE <Text style={{ color: 'red', fontFamily: 'Courier-Bold'}}>{`${audienciaMes} del Año ${audienciaYYYY}`}</Text> A LAS <Text style={{ color: 'red', fontFamily: 'Courier-Bold'}}>{audienciaHora}</Text> Hrs., la que se llevará a cabo de modo PRESENCIAL. <Text style={{ color: 'red', fontFamily: 'Courier-Bold'}}>A tal efecto, deberá concurrir a este Organismo, sito en Av. General Belgrano 1494 C.A.P.E. – Pabellón N°27 de esta Ciudad Capital, el día y la hora indicados.</Text></Text>

                <Text style={styles.page2.cuerpo}>Hágase saber a la firma denunciada que la falta de contestación del reclamo dentro de los 10 días, como así también la omisión de participar de la Audiencia de Conciliación, con miras a poner fin al conflicto, será ponderado al momento de emitir la resolución definitiva del sumario, con arreglo a las previsiones del Artículo 49 de la Ley N° 24.240.-------------------------------------------------</Text>
                <Text style={styles.page2.cuerpo}>Para mejor recaudo, hágase conocer a las partes que el desarrollo de la instancia conciliatoria se llevará a cabo de acuerdo al “REGLAMENTO DE ACTUACIÓN PARA LA ETAPA CONCILIATORIA DEL PROCEDIMIENTO DE LA LEY N° 24.240 EN EL ÁMBITO DE LA DIRECCIÓN PROVINCIAL DE DEFENSA DEL CONSUMIDOR”, aprobado por RESOLUCIÓN MINISTERIAL I.C.E. 97/21, cuyo texto podrá ser consultado en el Boletín Oficial de la Provincia, a través del Portal de Internet del Gobierno de la Provincia.---</Text>

                <Text style={styles.page2.cuerpo}>De conformidad con las previsiones de la Resolución Ministerial I.C.E. Nº 33/2021, que adhiere la Provincia a los términos de Resolución 274/2021 de la Secretaría de Comercio Interior, dependiente del Ministerio de Desarrollo Productivo de la Nación, dictada con fecha 26/03/2021 y publicada con fecha 30/03/2021, notifíquese a la <Text style={{ color: 'red', fontFamily: 'Courier-Bold'}}>{empresa}</Text>   en sus domicilios electrónicos correo <Text style={{ color: 'red', fontFamily: 'Courier-Bold'}}>{domicilio}</Text>  de o las denunciadas registrados con arreglo a los arts. 2, 4 y 5 de la mencionada Resolución 274/2021.</Text>

                <Text style={{...styles.page2.cuerpo, fontFamily: 'Courier-Bold'}}>En virtud de las condiciones personales del consumidor, y los normado por el inc. “INCISO” del art. 2 de la Resolución 139/2020 de la Secretaría de Comercio Interior, en el presente proceso administrativo deberán observarse los principios procedimentales de a) “lenguaje accesible”: toda la comunicación deberá utilizar lenguaje claro, coloquial, expresado en sentido llano, conciso, entendible y adecuado a las condiciones de las y los consumidores hipervulnerables, y b) “deber reforzado de colaboración”: los proveedores deberán desplegar un comportamiento tendiente a garantizar la adecuada y rápida composición del conflicto prestando para ello toda su colaboración posible. En consecuencia, la empresa deberá incorporar al proceso EN EL MOMENTO DE LA AUDIENCIA todo el legajo correspondiente al consumidor, incluido el contrato de tarjeta de crédito. Art. 4 ley 5069.------</Text>

                <Text style={styles.page2.cuerpo}>EN LA FECHA, ME NOTIFICO DEL PRESENTE PROVEIDO. -----------------------------------</Text>

                
                <Text style={styles.page2.cuerpo}> SE ADJUNTA FJS. <Text style={{ color: 'red', fontFamily: 'Courier-Bold'}}>{fojas}</Text> PARA SER REMITIDAS A <Text style={{ color: 'red', fontFamily: 'Courier-Bold'}}>{empresa}</Text>. DOY FE.---------------------------------------------------------</Text>
            </Page>
            {/* OFICINA */}
            <Page size="LEGAL" style={styles.page2.body}>
                    <Text style={{textAlign: 'center'}}><Image src={escudomini} style={{width:'70px', height: '70px', textAlign: 'center', justifyContet: 'center'}}></Image></Text>
                    <Text style={styles.page2.cabecera}>MINISTERIO DE INDUSTRIA, COMERCIO Y EMPLEO</Text>
                    <Text style={styles.page2.cabecera}>SECRETARÍA DE COMERCIO INTERIOR</Text>
                    <Text style={styles.page2.cabecera}>DIRECCIÓN PROVINCIAL DE DEFENSA DEL CONSUMIDOR</Text>

                    <Text style={{textAlign: 'center', fontWeight: 'bold', fontSize: '20px', fontFamily: 'Courier'}}>CÉDULA DE NOTIFICACIÓN</Text>
    
                    <Text style={styles.page2.fecha}>SAN FERNANDO DEL VALLE DE CATAMARCA, {dd} DE {mes.toUpperCase()} DEL AÑO {yyyy}.</Text>
                    <Text style={styles.page2.cuerpo}>Señor/a. <Text style={{ color: 'red', fontFamily: 'Courier-Bold'}}>{`${empresa}`}</Text></Text>
                    <Text style={styles.page2.cuerpo}>Domicilio <Text style={{ color: 'red', fontFamily: 'Courier-Bold'}}>{`${domicilio}`}</Text></Text>
    
                    <Text style={styles.page2.cuerpo}>Se le hace saber a Ud. que en el trámite Nº <Text style={{ color: 'red', fontFamily: 'Courier-Bold'}}>{datos.idEspecial} {`${datos.apellido} ${datos.nombres}`} C/ {empresasConY}</Text> S/ PRESUNTA INFRACCIÒN A LA LEY Nº 24.240 se ha dictado el siguiente proveído:</Text>
    
                    <Text style={styles.page2.cuerpo}>Por instrucción de la Sra. Directora Provincial de Defensa del Consumidor, téngase por recibido el reclamo de la Sr/a. <Text style={{ color: 'red', fontFamily: 'Courier-Bold'}}>{`${datos.apellido} ${datos.nombres}`}</Text> D.N.I. Nº  <Text style={{ color: 'red', fontFamily: 'Courier-Bold'}}>{`${datos.dni}`}</Text> , por el que considera afectados sus derechos como consumidor.-------</Text>
                    <Text style={styles.page2.cuerpo}>Atento lo normando por la Ley Provincial Nº 5069, Ley Nacional Nº 24.240 y normas provinciales complementarias, supletoria (Ley N° 3559 y C.P.C.C.) y Resolución M.I.C.E Nº 97, CÓRRASE TRASLADO de la presente denuncia  a la firma <Text style={{ color: 'red', fontFamily: 'Courier-Bold'}}>{empresa}</Text>, la que quedará intimada para que en el plazo de DIEZ (10) días desde la notificación de la presente providencia FORMULE PROPUESTA CONCILIATORIA respecto de la pretensión del denunciante (art. 11 de la Ley N° 5.069), a cuyos efectos deberá enviar un correo electrónico a la Mesa de Entrada Virtual del Organismo en mesadeentradadefensa@catamarca.gov.ar.------- </Text>
                    <Text style={styles.page2.cuerpo}>Dentro del mismo plazo, los denunciados deberán presentarse en las actuaciones por si o a través de sus representantes, acreditando personería, constituyendo un domicilio electrónico y uno legal e indicando un número telefónico de contacto. A tal fin, deberá remitir un correo electrónico a la Mesa de Entrada Virtual en mesadeentradadefensa@catamarca.gov.ar.-------------------------------------------</Text>


                    <Text style={styles.page2.cuerpo}>FÍJESE AUDIENCIA DE CONCILIACIÓN PARA EL DÍA <Text style={{ color: 'red', fontFamily: 'Courier-Bold'}}>{audienciaDD}</Text> DE <Text style={{ color: 'red', fontFamily: 'Courier-Bold'}}>{`${audienciaMes} del Año ${audienciaYYYY}`}</Text> A LAS <Text style={{ color: 'red', fontFamily: 'Courier-Bold'}}>{audienciaHora}</Text> Hrs., la que se llevará a cabo de modo PRESENCIAL. <Text style={{ color: 'red', fontFamily: 'Courier-Bold'}}>A tal efecto, deberá concurrir a este Organismo, sito en Av. General Belgrano 1494 C.A.P.E. – Pabellón N°27 de esta Ciudad Capital, el día y la hora indicados.</Text></Text>
    
                    <Text style={styles.page2.cuerpo}>Hágase saber a la firma denunciada que la falta de contestación del reclamo dentro de los 10 días, como así también la omisión de participar de la Audiencia de Conciliación, con miras a poner fin al conflicto, será ponderado al momento de emitir la resolución definitiva del sumario, con arreglo a las previsiones del Artículo 49 de la Ley N° 24.240.-------------------------------------------------</Text>
                    <Text style={styles.page2.cuerpo}>Para mejor recaudo, hágase conocer a las partes que el desarrollo de la instancia conciliatoria se llevará a cabo de acuerdo al “REGLAMENTO DE ACTUACIÓN PARA LA ETAPA CONCILIATORIA DEL PROCEDIMIENTO DE LA LEY N° 24.240 EN EL ÁMBITO DE LA DIRECCIÓN PROVINCIAL DE DEFENSA DEL CONSUMIDOR”, aprobado por RESOLUCIÓN MINISTERIAL I.C.E. 97/21, cuyo texto podrá ser consultado en el Boletín Oficial de la Provincia, a través del Portal de Internet del Gobierno de la Provincia.---</Text>
                    

                    <Text style={styles.page2.cuerpo}>A efectos de la tramitación de las presentes actuaciones, líbrense los oficios pertinentes, dispóngase las diligencias necesarias para su prosecución y fíjense las fechas de las audiencias a que hubiese lugar.</Text>
    
                    <Text style={{...styles.page2.cuerpo, fontFamily: 'Courier-Bold'}}>En virtud de las condiciones personales del consumidor, y los normado por el inc. “INCISO” del art. 2 de la Resolución 139/2020 de la Secretaría de Comercio Interior, en el presente proceso administrativo deberán observarse los principios procedimentales de a) “lenguaje accesible”: toda la comunicación deberá utilizar lenguaje claro, coloquial, expresado en sentido llano, conciso, entendible y adecuado a las condiciones de las y los consumidores hipervulnerables, y b) “deber reforzado de colaboración”: los proveedores deberán desplegar un comportamiento tendiente a garantizar la adecuada y rápida composición del conflicto prestando para ello toda su colaboración posible. En consecuencia, la empresa deberá incorporar al proceso EN EL MOMENTO DE LA AUDIENCIA todo el legajo correspondiente al consumidor, incluido el contrato de tarjeta de crédito. Art. 4 ley 5069.------</Text>

                    <Text style={styles.page2.cuerpo}>EN LA FECHA, ME NOTIFICO DEL PRESENTE PROVEIDO. -----------------------------------</Text>

                    
                    <Text style={styles.page2.cuerpo}> SE ADJUNTA FJS. <Text style={{ color: 'red', fontFamily: 'Courier-Bold'}}>{fojas}</Text> PARA SER REMITIDAS A LA DENUNCIADA, <Text style={{ color: 'red', fontFamily: 'Courier-Bold'}}>{empresa}</Text>. DOY FE.---------------------------------------------------------</Text>
                </Page>
            

            
        </Document>
    )
    }
    }}