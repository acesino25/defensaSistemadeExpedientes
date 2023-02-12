import { Page, Text, Document, StyleSheet, Image } from "@react-pdf/renderer";
import escudo from '../../assets/img/escudo_de_la_provincia_de_catamarca.jpg';
import escudomini from '../../assets/img/escudo.png'

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
        marginBottom: '20px'
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
            paddingTop: '10px',
            display: 'flex',
            alignItems: 'center',
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
            textAlign: 'left',
            fontSize: '10px',
            fontFamily: 'Courier',
            color: 'black',
            marginTop: '40px',
            marginBottom: '40px'
        },
        cuerpo:{
            textAlign: 'justify',
            fontSize: '10px',
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

export const PDFTemplate = ({datos, setDatos}) =>{

    console.log(datos)
    

    const today = new Date();
    const dd = String(today.getDate()).padStart(2, 0);
    const mm = String(today.getMonth()+1).padStart(2, 0);
    const yyyy = String(today.getFullYear()).padStart(4,0);

    const meses = ["enero", "febrero", "marzo", "abril", "mayo", "junio", "julio", "agosto", "septiembre", "octubre", "noviembre", "diciembre"];
    const mes = meses[today.getMonth()]

    return(
    <Document>
        <Page size="LEGAL" style={styles.body}>
            <Text style={styles.headerUnderlinedTitle}>DIRECCIÓN PROVINCIAL DE</Text>
            <Text style={styles.headerUnderlinedTitle}>DEFENSA DEL CONSUMIDOR</Text>
            <Image src={escudo} style={styles.escudo}></Image>
            <Text style={styles.headerUnderlined}>DENUNCIANTE</Text>

            <Text style={styles.headerDatos}>{`${datos.apellido} ${datos.nombres}`}</Text>
            <Text style={styles.headerDatos}>DNI: {`${datos.dni}`}</Text>
            <Text style={styles.headerDatos}>LOCALIDAD: </Text>

            <Text style={styles.headerUnderlined}>CONTRA</Text>

            <Text style={styles.header}>BANCO SANTIAGO DEL ESTERO S.A.</Text>
            <Text style={styles.header}>S/ PRESUNTA INFRACCIÓN A LA LEY 24.240</Text>

            <Text style={styles.headerPie}>FECHA DE INICIO: {`${dd}/${mm}/${yyyy}`}</Text>
            <Text style={styles.headerPie2}>DENUNCIA Nº 0000/{`${yyyy[2]}${yyyy[3]}`}</Text>



        </Page>

        {/* NOTIFICACIÓN COMÚN */}

        <Page size="LEGAL" style={styles.page2.body}>
            <Image src={escudomini} style={{width:'70px', height: '70px'}}></Image>
            <Text style={styles.page2.cabecera}>MINISTERIO DE INDUSTRIA, COMERCIO Y EMPLEO</Text>
            <Text style={styles.page2.cabecera}>DIRECCIÓN PROVINCIAL DE DEFENSA DEL CONSUMIDOR</Text>

            <Text style={styles.page2.fecha}>SAN FERNANDO DEL VALLE DE CATAMARCA, {dd} DE {mes.toUpperCase()} DEL AÑO {yyyy}.</Text>
            <Text style={styles.page2.cuerpo}>
                Por instrucción de la Sra. Directora Provincial de Defensa del Consumidor, téngase por recibido el reclamo de la Sr/a. 
            NOMBRE CONSUMIDOR/A D.N.I. N° 00.000.000, por el que considera afectados sus derechos como consumidor.</Text>

            <Text style={styles.page2.cuerpo}>Atento lo normando por la Ley Provincial Nº 5069, Ley Nacional Nº 24.240 y normas provinciales complementarias, supletoria (Ley N° 3559 y C.P.C.C.) y Resolución M.I.C.E Nº97/21, CÓRRASE TRASLADO de la presente denuncia  a la firma FIRMA/S DENUNCIADAS , la que quedará intimada para que en el plazo de DIEZ (10) días desde la notificación de la presente providencia FORMULE PROPUESTA CONCILIATORIA respecto de la pretensión del denunciante (art. 11 de la Ley N° 5.069), a cuyos efectos deberá enviar un correo electrónico a la Mesa de Entrada Virtual del Organismo en mesadeentradadefensa@catamarca.gov.ar.</Text>

            <Text style={styles.page2.cuerpo}>Dentro del mismo plazo, los denunciados deberán presentarse en las actuaciones por si o a través de sus representantes, acreditando personería, constituyendo un domicilio electrónico y uno legal e indicando un número telefónico de contacto. A tal fin, deberá remitir un correo electrónico a la Mesa de Entrada Virtual en mesadeentradadefensa@catamarca.gov.ar.</Text>

            <Text style={styles.page2.cuerpo}>FÍJESE AUDIENCIA DE CONCILIACIÓN PARA EL DÍA 00 DE MES del Año 2023 A LAS 00:00 Hrs., la que se llevará a cabo de modo PRESENCIAL. A tal efecto, deberá concurrir a este Organismo, sito en Av. General Belgrano 1494 C.A.P.E. – Pabellón N°27 de esta Ciudad Capital, el día y la hora indicados.</Text>

            <Text style={styles.page2.cuerpo}>Hágase saber a la firma denunciada que la falta de contestación del reclamo dentro de los 10 días, como así también la omisión de participar de la Audiencia de Conciliación, con miras a poner fin al conflicto, será ponderado al momento de emitir la resolución definitiva del sumario, con arreglo a las previsiones del Artículo 49 de la Ley N° 24.240.---------------------------------------------------Para mejor recaudo, hágase conocer a las partes que el desarrollo de la instancia conciliatoria se llevará a cabo de acuerdo al “REGLAMENTO DE ACTUACIÓN PARA LA ETAPA CONCILIATORIA DEL PROCEDIMIENTO DE LA LEY N° 24.240 EN EL ÁMBITO DE LA DIRECCIÓN PROVINCIAL DE DEFENSA DEL CONSUMIDOR”, aprobado por RESOLUCIÓN MINISTERIAL I.C.E. 97/21, cuyo texto podrá ser consultado en el Boletín Oficial de la Provincia, a través del Portal de Internet del Gobierno de la Provincia.--------EN LA FECHA, ME NOTIFICO DEL PRESENTE PROVEIDO. -----------------------------------</Text>

            <Text style={styles.page2.pie.expediente}>DENUNCIA Nº 0000/{`${yyyy[2]}${yyyy[3]}`}</Text>

        </Page>
    </Document>
    )
}