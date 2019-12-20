import React, { Component } from 'react';
import { Button } from 'react-bootstrap';

import styles from './Boton.module.css';

export default class Boton extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        const { nombreBoton, imagenBoton, esImagen, click } = this.props
        const boton = (esImagen) ? (
            <Button bsSize="large">
                {imagenBoton}
            </Button>
        ) : (
            <Button bsSize="large" className={styles.estiloBoton} onClick={click}>
                {nombreBoton}
            </Button>
        );
        return(
            boton
        );
    }
}