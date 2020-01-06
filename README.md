# Examen Aeroméxico

Este exámen fue realizado con:
  - **React JS** en su versión 15.6.2
  - **Axios** para realizar las peticiones GET
  - CSS para los estilos

Para optimizar un poco los estilos en vez de utilizar la forma tradicional, ejemplo:

  - *En los archivos CSS*: nombre.css
  - *En los componentes*: className="nombreestilo"
  
 Decidí hacer modulos CSS:
  
  - *En los archivos CSS*: nombre.module.css
  - *En los componentes*: className={styles.nombreestilo}, haciendo un import de estilos de esta manera: ```import styles from ./nombre.module.css```
  
Para poder visualizar el proyecto, se debe clonar este repositorio. Después ejecutar ```npm install --save``` para instalar las librerías que ocupa. Por último, correr el comando ```npm start``` parar ejecutar y poder visualizar la interfaz de usuario.

**NOTA**: En el dropdown de fecha por alguna razón no se actualiza el valor de la fecha que esta por defecto, se tiene que hacer click al dropdown y seleccionar cualquiera de las tres fechas para que se actualice el valor de fecha.
