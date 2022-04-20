# XBeeModule
# Xbee

https://github.com/evangeline24/XBee.git
# Xbee 
## _Análisis de la documentación de XBee_


Este resumen busca una solución para el desbordamiento de datos en la red inalámbrica empleada hasta el momento por BlueSensor; tanto para la recolección de información, transmisión y recepción de datos en tiempo real, facilitando la visualización de los mismos a través de una base de datos y generando informes históricos que contribuyan a la supervisión de la producción de las piscinas camaroneras . Al momento de trabajar con los datos adquiridos, estos se actualizan constantemente ya que por lo regular tiende a perder información valiosa, por ello, es necesario consolidar la conectividad y explorar el funcionamiento de DigiMesh. Este prototipo se enfoca en censar los parámetros de blueController a través de la plataforma virtual que dan evidencia el estado de cada alimentador incorporado en las piscinas, por tanto, este diseño de red inalámbrica busca encontrar los inconvenientes que se presentan en un apartado de escasa accesibilidad a la cobertura.
> Objetivo: 
> Desarrollar por código la comunicación entre el módulo XBee y el dispositivo inteligente, o usar el modo API proporcionado por XBee.

Los módulos XBee son soluciones integradas fabricadas por DIGI Internacional que brindan un medio inalámbrico para la interconexión y comunicación entre dispositivos los cuales se utilizan para crear redes como malla. 
Los módulos XBee se comunican los unos con los otros a través del aire, recibiendo y enviando paquetes de datos inalámbricos.
El problema es que, aunque gracias al firmware los módulos pueden ejecutar pequeños programas para comunicarse entre ellos, esto es lo único que pueden hacer, enviar los paquetes. Por tanto, para gestionar los datos que se envían y reciben son necesarios otros dispositivos como microcontroladores u ordenadores. Por suerte, la comunicación entre los módulos XBee y estos otros dispositivos se puede hacer de forma sencilla a través de una interfaz serial. Por tanto, el proceso de comunicación es el siguiente:
- El dispositivo inteligente crea el paquete de datos que quiere enviar.
- El dispositivo XBee conectado por serial al dispositivo del punto anterior
envía los datos de forma inalámbrica.
- De forma inversa, los datos enviados por otros módulos llegan a aquel
conectado al dispositivo inteligente, el cual es capaz a través del serial de
reenviar estos datos al dispositivo al que está unido para ser procesados.
De esta forma los ordenadores y microcontroladores pueden enviar y administrar
los mensajes entre XBee.
Sin embargo, la comunicación entre el módulo XBee y el dispositivo inteligente debe seguir un protocolo para poder entender la información. Este protocolo puede ser creado por el desarrollador o, la opción más fácil y utilizada en este TFG, usar el modo API proporcionado por XBee.
Este modo proporciona una interfaz estructurada donde la información se comunica a través del serial en paquetes organizados y en un orden determinado, permitiendo así una comunicación compleja sin tener que definir un protocolo propio.
Como pueden haber más de un módulo XBee por red es necesario que cada uno de estos tenga un identificador. Este identificador puede ser de 64 bits, de 16 bits o de un identificador puesto por el programador para que sea más sencillo su reconocimiento.

## MÓDULO XBEE 
Cada módulo XBee cuenta con veinte pines de los cuales podemos configurar siete como entrada o salida digital y cinco como entrada o salida digital o entrada analógica. El resto de pines están reservados para funciones específicas como pueden ser los dispositivos UART (Universal Asynchronous Receiver-Transmitter) o para resetear el módulo.

[![md.png](https://i.postimg.cc/mkVb6Cjm/md.png)](https://postimg.cc/CnBTRZW8)
[![placa.png](https://i.postimg.cc/85hB2PqF/placa.png)](https://postimg.cc/62pvRw6w)

Es a estos pines a los que debemos conectar las distintas electrónicas que queremos utilizar en nuestra red de sensores. De esta forma, conociendo el identificador del módulo y el pin al que está conectado un elemento en concreto podemos enviar órdenes al mismo a través de XBee.
Cabe destacar que el XBee es capaz de funcionar como transmisor RF, únicamente con la conexión de 4 pines (Din(Rx), Dout (Tx), GND, VCC).

[![mdxb.png](https://i.postimg.cc/vByBLZPX/mdxb.png)](https://postimg.cc/nsdpnpfQ)

## Estandar 802.15.4 Y RED MALLA DIGIMESH
IEEE 802.15.4 es un estandar que define el nivel físico y el control de acceso al medio de redes inalambricas de area personal con tasas bajas de transmision de datos. DigiMesh permite que todo los nodos se suspendan, lo cual aumenta la duración de la batería. La suspencion es posible mediante la sincronización del tiempo, DigiMesh usa un método de direccionamiento simplificado, lo cual facilita la configuracion de la red y la resolución de problemas.
IEEE 802.15.4 utiliza la banda de frecuencias ISM (Industrial, Scientific and Medicine), que son de rango abierto y no requieren licencia para su uso.

- En el rango de frecuencias de 868MHz-868.8 Mhz (Europa) sólo hay un canal de comunicación y la velocidad de transmisión puede alcanzar los 20 Kbps.
- En el rango de 902-928 MHz (EE.UU.) hay 10 canales (separación de 2 MHz) y la velocidad de transmisión puede alcanzar los 40 Kbps.
- En el rango de 2,400-2,4835 Ghz (el más utilizado), donde hay 16 canales de 5MHz, el rendimiento puede alcanzar 250kbps.

Una característica del IEEE 802.15.4 es la posibilidad de que en la capa física sea posible evaluar el nivel de interferencias en un determinado instante y así ajustar el canal de comunicación. Esta norma permite además el uso de direcciones de red de 16 bits o 64 bits, siendo que el uso de 64 bits es útil cuando tenemos redes de gran tamaño. 

#### Método de transmisión
Un módulo XBee puede comunicarse con varios dispositivos o con un solo dispositivo: El método que esta en producción son las transmisiones de difusión que se envían a muchos o a todos los módulos de la red.Difusión significa transmitir los mismos datos a todos los nodos de una red. Estas transmisiones se propagan por toda la red para que todos los nodos posibles reciban la transmisión.Para lograr esto, el coordinador y todos los enrutadores que reciben una transmisión de difusión retransmiten los datos tres veces. Cuando un enrutador o coordinador entrega una transmisión de difusión a un dispositivo secundario secundario, envía la transmisión solo una vez, inmediatamente después de que el dispositivo final se activa y sondea al principal en busca de nuevos datos.
Puede abordar las transmisiones de difusión utilizando la dirección de difusión de 64 bits o la dirección de difusión de 16 bits: Usaremos la dirección de difusión de 64 bits: 
Si se utiliza la dirección de difusión de 64 bits (000000000000FFFF), configure la dirección de 16 bits como dirección desconocida (FFFE). 


[![malla.png](https://i.postimg.cc/x1YJ0qRY/malla.png)](https://postimg.cc/dLHt6spS)

>Nota: Las transmisiones de difusión no utilizan ACK, por lo que no hay garantía de que cada nodo escuche una transmisión en particular. Dado que los dispositivos XBee retransmiten las transmisiones de todos los dispositivos de la red, utilice los mensajes de difusión con moderación.

- Suspende todos los nodos
- frecuencia de 9oo MHz 
- alcance hasta 64 km, para cada salto mayores cargas de tramas
- Menor espacio de código

## COMPONENTES DE LA RED
Hay tres componentes básicos en una red de sensores:
- Un conjunto de dispositivos, llamados nodos, equipados con sensores, módulos de
procesamiento y módulos de comunicación, normalmente inalámbrica, distribuidos en
un área específica.
- Uno o más puntos centrales de agrupamiento de información, normalmente conocido como gateway.
- Una estación base o APP/Servidor compuesto por un conjunto de recursos informáticos en el punto central, o más allá, para controlar estados de los dispositivos, manejar correlación de datos, tendencias de eventos, consulta de estados, minería de datos, etc.
### NODO 
El nodo tendrá la función de servir como recolector de información, para este caso en específico, será un dispositivo capaz de medir niveles de oxigeno, temperatura y saturación, adicionalmente tendrá la capacidad de establecer un enlace a través de comunicación inalámbrica DigiMesh con un gateway para enviar toda la información obtenida.
#### NODOS 
Se encargan de medir variables físicas en un entorno determinado con gran detalle, además, realizan procesamiento de datos, ejecutan alguna acción mediante actuadores y se comunican, normalmente de manera inalámbrica, con el Gateway a través de un transceptor. En su arquitectura más básica, se componen de un microcontrolador, una fuente de alimentación, una memoria interna o externa, un módulo de comunicación o transceptor y una variedad de sensores y actuadores.

El nodo bluesensor contará con los siguientes componentes:

- Procesador: 
- Memoria: 
- Comunicación: 
- Transceptor: 
- Sensores: 
- Actuadores:
- Carcasa: 
- Batería: 

El nodo blueController contará con los siguientes componentes:

- Procesador: 
- Memoria: 
- Comunicación: 
- Transceptor: 
- Sensores: 
- Actuadores:
- Carcasa: 
- Batería: 

### GATEWAY
Para poder visualizar los datos obtenidos por los nodos sensores a través de un aplicativo, primero se debe centralizar toda la información y establecer un medio de comunicación entre los nodos sensores y el aplicativo. Para esto sirve el gateway o nodo central.
El gateway periódicamente realiza consultas para comprobar el estado de la red y recoge la información recolectada por los sensores, para posteriormente enviarlas hacia un servidor a través de protocolos como TCP/IP.
Este gateway tendrá las siguientes características:
Procesador: 
- Sistema Operativo: 
- Transceptor: 
- Alimentación eléctrica: 
- Comunicación WAN: 
- Carcasa: 

[![gateway.png](https://i.postimg.cc/mkr5Z5Hs/gateway.png)](https://postimg.cc/G8ZQqzK7)


### SERVIDOR 
Para el servidor se usa una máquina virtual en la nube con sistema operativo Ubuntu Server. En este servidor se configuran los mismos servicios que en el gateway para así establecer una comunicación bidireccional usando los mismos protocolos de comunicación.

## ACOPLAMIENTO DE LOS COMPONENTES DE LA RED
Los nodos se comunicarán con el gateway usando el protocolo DigiMesh. Cada transceptor tiene un código único, similar a una MAC, llamado EUI. El EUI del nodo y las llaves de encriptación son registradas en el gateway de manera automática o manual dentro de la base de datos del gateway antes de realizar la comunicación. Dentro del nodo también se configura el EUI del transceptor del gateway junto con las llaves de red y de aplicación. Al encender el nodo, este intentará establecer comunicación con el gateway enviando su EUI y las llaves registradas, con estas credenciales el gateway verifica si puede permitir la comunicación con el nodo, de esta manera se mantiene la red privada, permitiendo la comunicación de datos únicamente con dispositivos autorizados. Posteriormente a la autenticación de los nodos en la red se logran observar todos los datos recolectados por los sensores en el gateway, por lo cual se procede a establecer el enrutamiento de los datos centralizados hacia el servidor a través del protocolo TCP/IP por medio del sistema de publicaciones y suscripciones de MQTT. Finalmente, en el servidor se configura un panel de control a través de una página web para permitir la visualización en tiempo real de los datos obtenidos por el nodo.
En el panel de control adicionalmente se configuran dos interruptores ON/OFF que permitirán probar la comunicación downlink encendiendo o apagando los LEDs integrados en el nodo.


## TECNOLOGÍA DE COMUNICACIÓN USADA: LPWAN 
 Es un tipo de red de telecomunicaciones inalámbricas, diseñada para permitir comunicaciones de hasta más de 10 kilómetros de distancia con línea de vista y con una tasa de transferencia de datos baja, entre los 100 bps y los 200 kbps
- Protocolo de transporte inalambrico de datos usado en BlueSensor 
- La tecnología LPWAN cubre casi que en exclusiva las necesidades de aquellas aplicaciones que requieren transferir de forma inalambrica pequeñas cantidades de datos , pocas veces al día y a travéz de largas distancias. 
- IEl alcance geográfico: LPWAN está diseñado para el transporte inalámbrico de datos entre dispositivos separados por distancias en el rango de kilómetros y no de metros. 
- La cantidad de data transmitida: la idea de LPWAN es regular el transporte no constante de pequeñas cantidades de datos.
- El bajo consumo eléctrico: el protocolo se fundamenta en el uso de dispositivos cuyas baterías permiten una duración de años en lugar de semanas o meses.

La “desventaja” que podría señalar, es que al estar diseñadas para un
bajo consumo de corriente y trabajar con frecuencias de bajo nivel, no
soportan grandes volúmenes de datos, pues la tasa de datos LPWAN
varía de 0,3 kbit/s a 50 kbit/s por canal, lo que equivale a 0.05 Mbps,
es decir, muy poco. .

[![comparativa-de-tecnolog-as-inal-mbricas.png](https://i.postimg.cc/L5wHfjT7/comparativa-de-tecnolog-as-inal-mbricas.png)](https://postimg.cc/BP59fLRc) 


## TABLAS DESCRIPTIVAS
### TIPOS DE REDES COMPATIBLES CON LA IoT CONSIDERADAS EN BLUESENSOR

| Protocolos inalambrios para la IoT | Frecuencia | Gama | Velocidad |Topologia |
| ------ | ------ | ---------------- |---------------- |---------------- |
| DigiMesh (En producción)| 900MHz, 868 MHz| 20 millas| 250 Kbps, 40 Kbps, 20 Kbps| Malla| 
| LoRa (A prueba)| 150MHz-1GHz| Hasta 20 millas| 50Kbps| Estrella| 


### Digi XBee-PRO Módulo RF 900HP
| DATO | VALOR |
| ------ | ------ |
|GENERAL |
| Frecuencia inalámbrica | 900MHz |
| Factor de forma | Agujero pasante|
| Sensibilidad de recepción | -110 dBm |
| Alcance (LoS) con antena de alta ganancia | Hasta 9 millas |
| Potencia de transmisión | 250 mW (24 dBm) |
| Corriente de transmisión| 215 mA a 24 dBm|
| Recibir la corriente | 29 mA  |
| Corriente de sueño |  	2,5 uA |
| Codificación | AES de 128 bits  |
| Regiones certificadas | US, CA, AU, MX, SG  |
| Protocolo de red | DigiMesh, Punto a Multipunto  |
| Espectro ensanchado | FHSS (canales seleccionables por software)  |
| HARDWARE |
| Procesador | Transceptor ADF7023, Cortex-M3 EFM32G230 a 28 MHz
Programable incluye: Freescale MC9S08QE32 |
| Banda de frecuencias | 902 a 928 MHz, máscara de canal seleccionable por software para la inmunidad a las interferencias |
|  Opciones de antena | Alambre, U.FL y RPSMA |
| RENDIMIENTO |  
| Velocidad de datos RF | 10 Kbps o 200 Kbps |
| Gama interior/urbana* | 10 Kbps: hasta 610 m (2000 pies); 200 Kbps: hasta 305 m (1000 pies) |
| Alcance en el exterior/línea de visión* | 10 Kbps: hasta 9 millas (14 km); 200 Kbps: hasta 4 millas (6,5 km) ( con antenas dipolo de 2,1 dB) |
| Potencia de transmisión | Hasta 24 dBm (250 mW) seleccionable por software |
| Sensibilidad del receptor | -101 dBm a 200 Kbps, -110 dBm a 10 Kbps |
| CARACTERÍSTICAS |  
| Interfaz de datos | UART (3V), SPI |
| GPIO | Hasta 15 E/S digitales, 4 entradas ADC de 10 bits, 2 salidas PWM |
| Topologías de red | DigiMesh, Repetidor, Punto a Punto, Punto a Multipunto, Peer-to-Peer |
| Espectro ensanchado | FHSS (canales seleccionables por software) |
| PROGRAMABILIDAD | 
| Memoria | 32 KB de Flash / 2 KB de RAM |
| Velocidad de la CPU/del reloj | HCS08 / Hasta 50,33 MHz |
| POTENCIA |
|Tensión de alimentación	| De 2,1 a 3,6 VDC	2,4 a 3,6 VDC | 
|Corriente de transmisión	| 215 mA	229 mA |
|Recibir la corriente |	29 mA	44 mA |
|Corriente de sueño	| 2,5 uA	3 uA | 

### MÓDULOS XBEE EN CONDICIONES OPTIMAS
El rango alcance mostrado en esta tabla es en condiciones de linea vista, sin ningun obstaculo de por medio y en condiciones ambientales optimas.
| XBee | Velocidad de transferencia | Frecuencia de banda | Potencia de Transmisor | Antena | Pines digitales | Entradas analógicas | Rango en exterior |
| ------ | ------ | ------ | ------ | ------ | ------ | ------ | ------ | 
|XBee PRO 900 HP| 10Kbps | 900Mhz | 250mW | U.FL | 15 | (4) 10-bit | 15.5Km |


### CONFIGURACIÓN DE PARÁMETROS EN LOS MÓDULOS XBEE-PRO
| Parámetro | Descripción |
| ------ | ------ |
| CH | canal |
| ID | identificador PAN |
| DH | dirección de destino |
| DL | dirección de destino |
| MY | dirección de origen(bits) |
| RN | tiempo antes de transmitir |  
| CE | función(coordinador/dispositivo final) |
| SC | lista de canales para examinar |
| SD | tiempo para examinar el canal |
| A1 | Asociación dispositivo final |
| A2 | Asociación coordinador |
| PL | Nivel de Potencia |
| CA | Umbral de decisión para transmitir |
| BD | velocidad de transmisión |
| AP | Modo de operación  |
| SM | Modo de sueño |

## COMMAND MODE
Los módulos XBee disponen de diferentes modos de trabajo: modo reemplazo de puerto serie, modo comando y modo API (Application Programming Interface), lo que les permite adaptarse fácilmente a un gran número de aplicaciones. Estos modos se seleccionan por medio de los parámetros de configuración. Por defecto viene configurado para funcionar como reemplazo de una comunicación serie. En este modo simplemente lo que recibe por su UART lo transmite por RF hasta otro XBee. Este módulo al recibirlo lo transmitirá por su UART hasta el dispositivo que tenga conectado a su interface. El modo comando será el usado para programar los parámetros de configuración del XBee y el modo API es una combinación de los anteriores modos, permitiendo mediante una serie de tramas que se enviarán o recibirán por la UART, realizar envíos y recepciones de datos entre módulos vía radiofrecuencia, así como el envío de comandos de configuración, que pueden ir destinados al módulo directamente conectado a la UART o a otro módulo en el alcance de su radio, además de ser el modo necesario para poder transmitir la información recogida por las entradas analógicas y digitales.
Modo comando, utilizado para la configuración del módulo. En este modo se pueden leer y escribir los parámetros de configuración del módulo. En este estado los caracteres recibidos son interpretados como comandos. Los módulos soportan dos tipos de modo comando diferente, el modo AT y el modo API.
El modo operativo solo está determinado por la configuración de AP, que le permite configurar el modo para que sea AT (AP=0), API (AP=1) o escape de API (AP=2).
### MODO AT: 
En el modo de funcionamiento AT (aplicación transparente) o transparente, todos los datos en serie recibidos por el módulo de radio se ponen en cola para la transmisión de RF. Cuando el módulo recibe datos de RF, los datos se envían a través de la interfaz serial. Para configurar un módulo XBee que funcione en AT, debe ponerlo en modo comando para enviar los comandos de configuración.
En este modo es posible configurar el módulo XBee mediante un terminal conectado por el puerto serie a la UART del XBee, enviando caracteres ASCII, es decir por XCTU.

Para que dos módulos XBee se comuniquen, el módulo de envío necesita la dirección del destinatario.
Si desea que los módulos A y B se comuniquen, configure la dirección de destino (DH + DL) de XBee A
como la dirección MAC (SH + SL) de XBee B, y viceversa.

[![apcomunicacion.png](https://i.postimg.cc/Rh2ZzFC5/apcomunicacion.png)](https://postimg.cc/m1NsYTF8)

#### COMANDOS AT

Los comandos AT, son instrucciones codificadas que conforman un lenguaje de comunicación entre el terminal moden y el hombre:

##### COMANDOS DE DIRECCIONAMIENTO

| Comandos AT | Nombre | Descripción |
| ------ | ------ | ---------------- |
| DH | Destination Address High|  Establece u obtiene los 32 bits
superiores de la dirección de destino de 64 bits. |
| DL | Destination Address Low |Establece u obtiene los 32 bits
inferiores de la dirección de destino de 64 bits. |
| MY | D16-bit Network Address |Obtiene la dirección de red de 16 bits
del módulo. |
| MP | 16-bit Parent Network Address |Obtiene la dirección de red
principal de 16 bits del módulo. |
| NC | Number of Children |Lee la cantidad de dispositivos finales hijo
que se han unido al dispositivo. |
| SH | Serial Number High |Lee los 32 bits superiores de la dirección IEEE única de 64 bits de los módulos. |
| SL | Serial Number Low |Lee los 32 bits inferiores de la dirección
IEEE única de 64 bits de los módulos|
| NI | Node Identifier |Almacena un identificador en un string.|
| DD | Device Type Identifier|Almacena el tipo de dispositivo XBee.|
| ZA | ZigBee Application Layer Addressing |Establece o lee el atributo de direccionamiento de la capa de aplicación ZigBee.|
| SE | Source Endpoint |Establece o lee el valor del endpoint de la capa
de aplicación ZigBee.|
| DE | Destination Endpoint |Establece o lee el valor ID de destino de la capa de aplicación Zigbee.|
| CI | Cluster Identifier. |Establece o lee el valor ID de clúster de la
capa de aplicación Zigbee.|
| BI | Binding Table Index |Establece o lee el valor del índice de la
tabla de enlace.|

##### COMANDOS DE RED Y SEGURIDAD 

| Comandos AT | Nombre | Descripción |
| ------ | ------ | ---------------- |
| CH | Operating Channel|  Lee el número del canal utilizado para
transmitir y recibir datos entre los módulos.  |
| ID | PAN ID | El coordinador establece el PAN ID; un enrutador o
dispositivo final establece el PAN ID deseado.  |
| BH |Broadcast Hops  | Establece o lee el número máximo de saltos
para cada transmisión broadcast.  |
| OP |Operating PAN ID|  Lee el PAN ID. |



### Modo API (API = 2) 


El modo de funcionamiento de la API requiere que la comunicación con el módulo se realice a través de una interfaz estructurada. En otras palabras, los datos se comunican a través de tramas API.

La API especifica cómo se envían y reciben los comandos, las respuestas a los comandos y los mensajes de estado del módulo desde el módulo mediante la interfaz serial. Con el modo operativo API, puede:

- Configure el propio módulo XBee.
- Configurar módulos remotos en la red.
- Administre la transmisión de datos a múltiples destinos.
- Reciba el estado de éxito/fallo de cada paquete de RF transmitido.
- Identifique la dirección de origen de cada paquete recibido.

Según el valor del parámetro AP, el módulo de radio puede operar en uno de dos modos: API (AP=1) o modo de funcionamiento API escapado (AP=2).La API basada en tramas extiende el nivel al de una aplicación host, de modo que puede interactuar con las capacidades de red del módulo.
Cuando está en modo API, todos los datos que entran y salen del módulo están contenidos en las tramas que definen las operaciones o eventos dentro del módulo 
Sirve para leer o escribir comandos en el módulo, además de ser el medio en que se envían las lecturas y escrituras de los pines de entrada/salida del módulo.
Este modo tiene la peculiaridad que permite la configuración remota del módulo, y es el utilizado para el uso de los módulos desde aplicaciones informáticas, dado que permite el envió y recepción de paquetes dirigidos a un destinatario concreto y diferente sin tener que cambiar el parámetros de destino en el módulo, simplemente añadiendo al paquete a enviar la dirección del destinatario (DL, DH – Destination Address Low, High).

El modo API (Application program interface), permite leer y escribir las configuraciones de los XBee, así como tener acceso a las tramas de datos de entradas/salidas. Esta comunicación se lleva a cabo a través de su UART conectada localmente a un PC o microcontrolador, ó inalámbricamente a través de otro módulo. Para ello se han de seguir las estructuras que este API especifica.
En este modo se trabaja sobre un módulo XBee conectado localmente al puerto serie de un PC, al que se le escribirán y leerán parámetros de su configuración usando el API.


### FRAMES 

| API ID | Frame name | Descripción |
| ------ | ------ | ---------------- |
| 0x10  | Transmit Request | Transmits wireless data to the specified destination  |

[![tramageneral.png](https://i.postimg.cc/V6sXv0Dn/tramageneral.png)](https://postimg.cc/ns5Xwr8h)

El estándar IEEE 802.15.4 permite el uso opcional de una estructura de superframe, esta estructura define la organización de tiempos y tramas para entablar una comunicación.
El formato del superframe está definido por el coordinador. El superframe esta acotado por los
beacons de la red enviados por el coordinador y está divida en 16 trozos de igual tamaño. En el superframe es posible encontrar una región activa y otra inactiva que los coordinadores usan para ahorrar energía pasando a modo suspendido. El beacon es transmitido siempre en la primera ranura de tiempo del superframe, y es usado para proporcionar sincronización, identificar la red, y describir la estructura de los superframes. Cualquier dispositivo que quiera comunicarse durante el periodo de CAP debe hacerlo usando el mecanismo CSMA-CA.

Los módulos XBee se comunican entre ellos a través de paquetes; estos paquetes de datos estructurados en modo API se denominan frames. Se envían y reciben a través de la interfaz serial del dispositivo y contienen el mensaje inalámbrico en sí, así como información adicional, como el destino u origen de los datos o la calidad de la señal..

[![api-frame.png](https://i.postimg.cc/PrNTKpG5/api-frame.png)](https://postimg.cc/qzfPv7MP)

Cuando un dispositivo está en modo API, todos los datos que entran y salen del módulo a través del serial están contenidos en frames que definen operaciones o eventos dentro del dispositivo.

- Start delimiter: Secuencia especial de bits que indican que empieza un frame.
- Length: Tamaño total del frame.
- Frame data: Contiene la información recibida o que va a ser transmitida.
    ○ Frame type: Indica el tipo de frame y cómo está organizada la información del campo Data
    ○ Data: Contiene los datos del frame en sí.
- Checksum: Para verificar la integridad del frame


Para parsear estos frames utilizamos la librería xbee-api 

```sh
//FUNCION BUILDFRAME: Crea un API frame a partir de un objeto JS
var Xbee_api = require('xbee-api');
var C = Xbee_api.constants;
var XBeeAPI = new XBee_api.XBeeAPI();

var frame_obj = {
    type: C.FRAME_TYPE.AT_COMMAND,
    command: "NI", 
    //Node Identifier. Almacena un identificador en un string
    commandParameter:[],
};
console.log(xbeeAPI.buildFrame(frame_obj));
```

For production environments...

```sh
//FUNCIÓN PARSEFRAME: analiza y devuelve un objeto JS desde un buffer pasado
var raw_frame = new Buffer([
    0x10, 0x11, 0x89, 0x90));

console.log(xbeeAPI.parseFrame(raw_frame);
```

## UART 

#### EL PUERTO SERIE

En el puerto serie tenemos dos lineas , Tx y RX.Estas líneas se deben cruzar para comunicar dos dispositivos, es decir, el Tx del dispositivo 1 debe conectarse al Rx del dispositivo 2. El Tx del dispositivo 2 debe conectarse al Rx del dispositivo 1. Además ambos dispositivos deben compartir una masa común.En ocasiones podemos encontrar dispositivos en los que solo exite el Tx. Esto puede ser debido a que solo envía datos, no necesita recibir. 
LA UART 
Para enviar los datos a las líneas debemos usar un hardware que este diseñado para llevar a cabo esa tarea y en este caso lo llamamos UART se encarga de hacer todo el trabajo por nosotros. 
Si usamos un microcontrolador, es muy posible que no necesitemos hacer nada especial ya que la UART estará integrada en el propio microcontrolador.

#### DIAGRAMA DE COMPONENTES UART

[![uart.png](https://i.postimg.cc/wBgs7d3N/uart.png)](https://postimg.cc/JsYh2vN7)

#### PREPARANDO LOS DATOS Y LA TRAMA

Si quiero enviar un dato por el puerto serial. ¿CÓMO LO HAGO?
La realidad es que muchas veces usamos librerías que nos permiten subir de nivel y no tener que bajar tan abajo al usar microcontroladores. Sin embargo es posible que en otras ocasiones si toque. Imagina que queremos enviar el caracter 'a' a través del puerto serie. Lo primero será buscar en la tabla ASCII cual es el número asociado al caracter, en este caso es el 97.
Si convertimos el número 97 a binario obtendremos que la letra 'a' se representa con 01100001. 
Esto es lo realmente tenemos que enviar al puerto serie, esta combinación de ceros y unos, pero lo debemos hacer de una manera un tanto especial. Debemos incluirlos dentro de una trama.
Lo primero que debemos hacer es invertir el orden de los bits, es decir, el primero pasa a ser el último y el último pasa a ser el primero. Esto es debido a que en este protocolo primero se envía el bit menos significativo.
La línea de transmisión siempre que está en reposo estará a un nivel alto. 
Para iniciar la comunicación debemos enviar un bit de star, que siempre será un 0 y lo mantendremos durante un tiempo que llamamos tiempo de bit.
Pasando el tiempo de bit empezaremos a enviar los datos. Un 1 , luego cuatro 0, dos 1 y por último un 0.
Cada bit lo mantendremos en la línea de datos durante el tiempo de bit.
Ya hemos enviado los datos, ahora tenemos que liberar la línea e indicar que ya hemos terminado y esto lo hacemos enviando un bit de stop.  Que no es otra cosa que enviar un 1 durante el tiempo de bit. Tras enviarlo la línea se quedará en espera y por tanto se quedará en nivel alto.

## XCTU

#### Comunicación entre dos módulos Xbee y sus configuraciones respectivas

Para poder configurar nuestros módulos XBee se debe primero descargar la aplicación XCTU , conectamos los módulos por puerto USB 2.0 pc. Y iniciamos XCTU.
Luego de haber iniciado la aplicación damos clic en el botón de agregar dispositivo en el icono ubicado en la esquina superior izquierda. Nos muestra una lista con dispositivos, debemos seleccionar los XBee conectados a la pc. La aplicación analiza todos los puertos USB del ordenador para verificar si existe algún módulo XBee conectado en alguno de ellos.

[![xctu2-1.png](https://i.postimg.cc/xdSHGPbH/xctu2-1.png)](https://postimg.cc/BjMX4HpQ)

 Al ser detectado el dispositivo nos refleja disponible en el menú principal en la lista de Radio Modules, y seleccionamos el módulo XBee que vamos a actualizar.Al hacer doble clic en el módulo seleccionado la aplicación abre las configuraciones en donde podemos luego configurar los parámetros necesarios para nuestra red.
 
 [![xctu2-3.png](https://i.postimg.cc/0jHDpRp2/xctu2-3.png)](https://postimg.cc/9wZDhk8v)

La opción de actualización de firmware (Update) la encontramos en la parte superior de la pantalla en el menú Radio Configuration. Al hacer clic se desplegarán opciones de actualización. Se nos abre una ventana en donde debemos elegir el protocolo con el que queremos que trabaje nuestro módulo XBee, en nuestro caso XBee SX, y también nos refleja las versiones disponibles de firmware donde escogeremos la más reciente, y luego clic en update.
##### Identificación de firmware
Identifique el firmware de un módulo XBee utilizando tres elementos:

- Familia de productos
indica el tipo de XBee. La familia de productos del módulo XBee está impresa en la parte posterior del módulo.
- Conjunto de funciones
determina la funcionalidad disponible. Para algunos módulos, esto puede incluir elegir el modo transparente o API; o si el dispositivo es un dispositivo final, enrutador o coordinador. También hay selecciones de funciones que le permiten elegir el firmware para varios sensores especiales y módulos adaptadores de Digi.
- Versión
es un número único que se utiliza para identificar la versión del firmware. La versión de firmware de un módulo XBee se informa mediante el parámetro Versión de firmware (VR).

[![xctu1.png](https://i.postimg.cc/nL5ywCpv/xctu1.png)](https://postimg.cc/FfyCYFfR)

Para transmitir datos de forma inalámbrica entre sus XBees, configure los parámetros DH y DL en cada módulo para que coincidan con SH y SL (SH + SL = dirección MAC) del otro módulo. Por ejemplo, si el MAC de XBee A es 0013A20012345678, entonces el DH de XBee B debería ser 0013A200 y el DL 12345678.
Restaure la configuración predeterminada de todos los módulos XBee con el botón Cargar configuración de firmware predeterminada en la parte superior de la sección Configuración de radio en XCTU.
Utilice XCTU para configurar los siguientes parámetros:

[![parametros.png](https://i.postimg.cc/Y9WbWknp/parametros.png)](https://postimg.cc/MMz7kkJ4)



#### TIEMPO DE BIT 

EL tiempo de bit no es otra cosa que el tiempo que mantenemos un bit en la línea de transmisión.
Su calculo es bastante sencillo, ya que esta relacionado con el baudrate. Este último es el que nos indica el número de bits que podemos enviar en un segundo.
Ṕor ejemplo, una comunicación serie puede ser a 9600 baudios, es decir que se puede transmitir 9600 bits en un segundo.
El tiempo de bit es el inverso del baudrate.
Tb = 1/baudrate= 1/9600 = 104.2ms
Es clave que ambos dispositivos que se encuentran conectados por medio de un puerto serie,usen el mismo baudrate, en caso contrario no se entenderán y no se podrá llevara a cabo la comunicación. 

#### CAPA FÍSICA EN TTL

La trama del puerto serie puede ser enviada mediante muchos standares, entre ellos RS232 o RS485 o RS422. Sin embargo, a la salida de un microcontrolador casi siempre tendremos los conocidos como niveles TTL.
Un nivel TTL significa que los 0 lógicos se representan con 0 voltios y los 1 lógicos se representan con 5V o 3.3V.
Pasar de TTL a RS232 o RS485 es un proceso sencillo para el cual se suelen usar distintos tipos de transductores como el MAX485 o el MAX232.
Un TTL es la relativa facilidad para conectar diferentes circuitos y la capacidad de producir  DRIVERS.
Las frecuencias usadas por la capa física del estándar IEEE 802.15.4 y
sus regiones de uso permitido son las siguientes:
- 868.0 - 868.6 MHz ( Europa )
- 902 - 928 MHz ( North América )
- 2400 – 2483.5 MHz ( Internacional )
Driver o controlador de dispositivos es un pequeño software que conecta el sistema operativo directamente con los componentes del hardware de la pc.ES un puente entre ambos. El drive le da instrucciones al sistema operativo sobre cómo debe funcionardeterminado hardware y de que formael sistema debe trabajar en conjunto .


## SOLUCIONES

[![osi.png](https://i.postimg.cc/9fPgLdHv/osi.png)](https://postimg.cc/kV4y4t4c)

#### PROPUESTAS DE SOLUCIONES PARA CONTROLAR PERDIDA DE INFORMACIÓN ENTRE NODOS


1. Enviando mensajes más pequeños que el tamaño del buffer de DI. 
2. Haciendo que la velocidad de recepción de datos de la interfaz serie sea menor
que la tasa de envío de datos a través de RF.
3. Activando el control de flujo











