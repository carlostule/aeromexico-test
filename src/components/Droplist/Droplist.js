import React, { Component } from 'react';
import Select from 'react-select';
import axios from 'axios';
import { Button, Modal, Image, ButtonGroup } from 'react-bootstrap';

import styles from './Droplist.module.css';

import close from '../../svg/CloseModal.svg';

let aeropuertosMX = []; // Mexico
let aeropuertosEUA = []; // USA & Canada
let aeropuertosCentro = []; // Central America
let aeropuertosSur = []; // South America
let aeropuertosEuropa = [];// Europe
let aeropuertosAsia = []; // Asia
let aeropuertosCaribe = []; // The Caribbean
let aeroDrop = [];

export default class Droplist extends Component {
    constructor(props) {
        super(props);
        this.state = {
            aeropuertos: null,
            show: false,
            droplistValue: null,
            aeropuertoDrop: [{value: 'Sin aeropuertos', label: 'Sin aeropuertos'}],
        };

        this.handleShow = this.handleShow.bind(this);
        this.handleClose = this.handleClose.bind(this);
    }

    componentWillMount() {
        axios.get('https://www.aeromexico.com/cms/api/v1/airports?language=es&status=1')
         .then((response) => this.filtrarAeropuertos(response.data));
    }

    filtrarAeropuertos = (datos) => {
        console.log(`Aeropuertos: ${JSON.stringify(datos.airports[0].airport)}`);
        const aeropuertos = datos.airports;
        aeropuertos.forEach((aeropuerto, index) => {
            if (aeropuerto.airport.region === 'Mexico') {
                aeropuertosMX.push(aeropuerto.airport);
                aeroDrop.push({ value: `${aeropuerto.airport.city}, ${aeropuerto.airport.country}  ${aeropuerto.airport.cityCode}`, label: `${aeropuerto.airport.city}, ${aeropuerto.airport.country}  ${aeropuerto.airport.cityCode}` });
            } else if (aeropuerto.airport.region === 'USA & Canada') {
                aeropuertosEUA.push(aeropuerto.airport);
                aeroDrop.push({ value: `${aeropuerto.airport.city}, ${aeropuerto.airport.country}  ${aeropuerto.airport.cityCode}`, label: `${aeropuerto.airport.city}, ${aeropuerto.airport.country}  ${aeropuerto.airport.cityCode}` });
            } else if (aeropuerto.airport.region === 'Central America') {
                aeropuertosCentro.push(aeropuerto.airport);
                aeroDrop.push({ value: `${aeropuerto.airport.city}, ${aeropuerto.airport.country}  ${aeropuerto.airport.cityCode}`, label: `${aeropuerto.airport.city}, ${aeropuerto.airport.country}  ${aeropuerto.airport.cityCode}` });
            } else if (aeropuerto.airport.region === 'South America') {
                aeropuertosSur.push(aeropuerto.airport);
                aeroDrop.push({ value: `${aeropuerto.airport.city}, ${aeropuerto.airport.country}  ${aeropuerto.airport.cityCode}`, label: `${aeropuerto.airport.city}, ${aeropuerto.airport.country}  ${aeropuerto.airport.cityCode}` });
            } else if (aeropuerto.airport.region === 'Europe') {
                aeropuertosEuropa.push(aeropuerto.airport);
                aeroDrop.push({ value: `${aeropuerto.airport.city}, ${aeropuerto.airport.country}  ${aeropuerto.airport.cityCode}`, label: `${aeropuerto.airport.city}, ${aeropuerto.airport.country}  ${aeropuerto.airport.cityCode}` });
            } else if (aeropuerto.airport.region === 'Asia') {
                aeropuertosAsia.push(aeropuerto.airport);
                aeroDrop.push({ value: `${aeropuerto.airport.city}, ${aeropuerto.airport.country}  ${aeropuerto.airport.cityCode}`, label: `${aeropuerto.airport.city}, ${aeropuerto.airport.country}  ${aeropuerto.airport.cityCode}` });
            } else {
                aeropuertosCaribe.push(aeropuerto.airport);
                aeroDrop.push({ value: `${aeropuerto.airport.city}, ${aeropuerto.airport.country}  ${aeropuerto.airport.cityCode}`, label: `${aeropuerto.airport.city}, ${aeropuerto.airport.country}  ${aeropuerto.airport.cityCode}` });
            }
        });

        this.setState({ aeropuertoDrop: aeroDrop })
        console.log(`Long Mx: ${aeropuertosMX.length} Long EUA: ${aeropuertosEUA.length} Long Centro: ${aeropuertosCentro.length} Long Sur: ${aeropuertosSur.length} Long Europa: ${aeropuertosEuropa.length} Long Asia: ${aeropuertosAsia.length} Long Caribe: ${aeropuertosCaribe.length}`);
    }

    handleShow() {
        console.log('se abre modal');
        this.setState({ show: true });
    }

    handleClose() {
        console.log('se cierra modal');
        this.setState({ show: false });
    }

    handleChange = (droplistValue) => {
        const { tipo } = this.props
        this.setState({ droplistValue });
        console.log(`Option selected:`, droplistValue);
        if (tipo === 'Origen') {
            this.props.data.actualizarValorOrigen(droplistValue);
        } else {
            console.log('hola')
            this.props.data.actualizarValorDestino(droplistValue);
        }
    }

    render() {
        const { aeropuertos, aeropuertoDrop, droplistValue } = this.state
        const { tipo, data } = this.props
        return(
            <div className={styles.droplistContainer}>
                <Button bsStyle="link" className={styles.btnModal} onClick={this.handleShow}> {tipo} | Ver todos </Button>
                <Select value={droplistValue} options={aeropuertoDrop} onChange={this.handleChange} placeholder={`Introduce ${tipo}`}/>
                <Modal show={this.state.show} onHide={this.handleClose} animation={false} bsSize="large">
                    <div className={styles.modalHeader}>
                      <div className={styles.rowsHeader}>
                        <div className={styles.modalTitle}>
                            <h4 className={styles.title}>Selecciona una ciudad</h4>
                        </div>
                        <div className={styles.modalCloseButton} onClick={this.handleClose}>
                            <Image src={close} className={styles.closeModal} />
                        </div>
                      </div>
                      <div className={styles.rowsHeaderBtn}>
                        <ButtonGroup>
                            <Button onClick={() => this.setState({ aeropuertos: aeropuertosMX })}>México</Button>
                            <Button onClick={() => this.setState({ aeropuertos: aeropuertosEUA })}>EUA {'&'} Canadá</Button>
                            <Button onClick={() => this.setState({ aeropuertos: aeropuertosCentro })}>Centroamérica</Button>
                            <Button onClick={() => this.setState({ aeropuertos: aeropuertosSur })}>Sudamérica</Button>
                            <Button onClick={() => this.setState({ aeropuertos: aeropuertosEuropa })}>Europa</Button>
                            <Button onClick={() => this.setState({ aeropuertos: aeropuertosAsia })}>Asia</Button>
                            <Button onClick={() => this.setState({ aeropuertos: aeropuertosCaribe })}>Caribe</Button>
                        </ButtonGroup>
                      </div>
                    </div>
                    <div className={styles.modalBody}>
                        {
                            (aeropuertos !== null) ? (
                                aeropuertos.map((aeropuerto) => {
                                 return (
                                    <div className={styles.rowAeropuerto}>  
                                        <Button onClick={() => { this.handleChange({value: `${aeropuerto.city}, ${aeropuerto.country}  ${aeropuerto.cityCode}`, label: `${aeropuerto.city}, ${aeropuerto.country}  ${aeropuerto.cityCode}`}); this.handleClose()  }}>
                                            {`${aeropuerto.city}, ${aeropuerto.country}  ${aeropuerto.cityCode}`}
                                        </Button>
                                    </div>
                                 );
                                })
                            ) : <p>no hay nada</p>
                        }
                    </div>
                </Modal>
            </div>
        );
    }
}
