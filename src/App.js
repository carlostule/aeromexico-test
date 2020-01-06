import React, { Component } from 'react';
import { Button, Table, Image } from 'react-bootstrap';
import Select from 'react-select';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';

import Header from './components/Header/Header';
import Boton from './components/Boton/Boton';
import Droplist from './components/Droplist/Droplist';

import aTiempo from './svg/OnTime.svg';
import llego from './svg/Arrive.svg';
import vueloImagen from './svg/Flight.svg';
import reloj from './svg/Reloj.svg';

import styles from './css/App.module.css';


const fechas = [];

export default class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            valorDrop1: 'nada1',
            valorDrop2: 'nada2',
            valorFecha: [{ value: this.fechaActual('reducida'), label: this.fechaActual() }],
            fechas: [],
            datosVuelos: null,
            selectedOption: 'option1',
            inputValue: '',
            width: 0,
            height: 0,
        }
        this.updateWindowDimensions = this.updateWindowDimensions.bind(this);
    }

    componentWillMount() {
        fechas.push({ value: this.fechaAyer('reducida'), label: this.fechaAyer() });
        fechas.push({ value: this.fechaActual('reducida'), label: this.fechaActual() });
        fechas.push({ value: this.fechaMañana('reducida'), label: this.fechaMañana() });
        this.setState({ fechas });
        this.setState({ valorFecha: [{ value: this.fechaActual('reducida'), label: this.fechaActual() }] });

        this.updateWindowDimensions();
        window.addEventListener('resize', this.updateWindowDimensions);
    }

    componentWillUnmount() {
        window.removeEventListener('resize', this.updateWindowDimensions);
    }
      
    updateWindowDimensions() {
        this.setState({ width: window.innerWidth, height: window.innerHeight });
        const { width, height } = this.state
        console.log(width, height);
    }

    actualizarValorOrigen = (valor) => {
        this.setState({ valorDrop1: valor });
    }

    actualizarValorDestino = (valor) => {
        this.setState({ valorDrop2: valor });
    }

    nombreMes = (mes) => {
        switch (mes) {
            case 1:
                return 'Enero'; // 31
            case 2:
                return 'Febrero'; // 29
            case 3:
                return 'Marzo'; // 31
            case 4:
                return 'Abril'; // 30
            case 5:
                return 'Mayo'; // 31
            case 6:
                return 'Junio'; // 30
            case 7:
                return 'Julio'; // 31
            case 8:
                return 'Agosto'; // 31
            case 9:
                return 'Septiembre'; // 30
            case 10:
                return 'Octubre'; // 31
            case 11:
                return 'Noviembre'; // 30
            default:
                return 'Diciembre'; // 31
        }
    }

    fechaAyer = (tipoFecha) => {
        let dia = new Date().getDate() - 1;
        let month = new Date().getMonth() + 1;
        let anio = new Date().getFullYear();
        let fecha = '';
        if (dia < 1 ) {
            month = month - 1;
            if (month === 0) {
                month = 12;
                anio = anio - 1;
            } else if (month === 1 || month === 3 || month === 5 || month === 7 || month === 8 || month === 10 || month === 12) {
                dia = 31;
            } else if (month === 4 || month === 6 || month === 9 || month === 11) {
                dia = 30;
            } else {
                dia = 29;
            }
        }
        if (tipoFecha === 'reducida') {
            if (month < 10 && dia < 10) {
                fecha = `${anio}-0${month}-0${dia}`;
            } else if (dia < 10) {
                fecha = `${anio}-${month}-0${dia}`;
            } else if (month < 10) {
                fecha = `${anio}-0${month}-${dia}`;
            }
        } else {
            fecha = `${dia} de ${this.nombreMes(month)}`;
        }

        return fecha;
    }

    fechaActual = (tipoFecha) => {
        const dia = new Date().getDate();
        const month = new Date().getMonth() + 1;
        const anio = new Date().getFullYear();
        let fecha = '';

        if (tipoFecha === 'reducida') {
            if (month < 10 && dia < 10) {
                fecha = `${anio}-0${month}-0${dia}`;
            } else if (dia < 10) {
                fecha = `${anio}-${month}-0${dia}`;
            } else if (month < 10) {
                fecha = `${anio}-0${month}-${dia}`;
            }
        } else {
            fecha = `${dia} de ${this.nombreMes(month)}`;
        }
        
        return fecha;
    }

    fechaMañana = (tipoFecha) => {
        let dia = new Date().getDate() + 1;
        let month = new Date().getMonth() + 1;
        let anio = new Date().getFullYear();
        let fecha = '';

        if ((month === 13) || (month === 12 && dia === 32) ) { // Año nuevo
            anio = anio + 1;
            month = 1;
            dia = 1;
        } else if (month === 2 && dia === 30) { // febrero
                month = month + 1; // Marzo
                dia = 1;
        } else if ((month === 1 || month === 3 || month === 5 || month === 7 || month === 8 || month === 10) && dia === 32) {
                month = month + 1;
                dia = 1;
        } else if ((month === 4 || month === 6 || month === 9 || month === 11) && dia === 31) {
                month = month + 1;
                dia = 1;
        }

        if (tipoFecha === 'reducida') {
            if (month < 10 && dia < 10) {
                fecha = `${anio}-0${month}-0${dia}`;
            } else if (dia < 10) {
                fecha = `${anio}-${month}-0${dia}`;
            } else if (month < 10) {
                fecha = `${anio}-0${month}-${dia}`;
            }
        } else {
            fecha = `${dia} de ${this.nombreMes(month)}`;
        }

        return fecha;
    }

    handleChange = (valorFecha) => {
        this.setState({ valorFecha });
        console.log(`Option selected:`, valorFecha);
    }

    handleOptionChange = (event) => {
        this.setState({
          selectedOption: event.target.value
        });
    }

    handleInputChange = (event) => {
        this.setState({ inputValue: event.target.value });
    }

    buscarVuelos = () => {
        const { valorDrop1, valorDrop2, valorFecha } = this.state
        const origen = valorDrop1.value.substr(valorDrop1.value.length - 3);
        const destino = valorDrop2.value.substr(valorDrop2.value.length - 3);
        const fecha = valorFecha.value;

        axios.get(`https://mad.amlab7.com/api/v1/checkin/flight-status?store=mx&pos=WEB&flight=&date=${fecha}&origin=${origen}&destination=${destino}`)
            .then((response) => this.setState({ datosVuelos: response.data }));
    }

    buscarVuelosNumero = () => {
        const { inputValue, valorFecha } = this.state;
        const fecha = valorFecha.value;

        axios.get(`https://mad.amlab7.com/api/v1/checkin/flight-status?store=mx&pos=WEB&flight=${inputValue}&date=${fecha}&origin=&destination=`)
            .then((response) => this.setState({ datosVuelos: response.data }));
    }

    putTable = (datos) => {
        if (datos._collection.length === 0) {
            return (
                <div className={styles.viewNoDisponible}>
                    <h1 style={{ fontSize: '62px' }}>No hay vuelos disponibles<br /><p style={{ fontSize: '24px', fontWeight: 'lighter' }}>Por favor intenta de nuevo</p></h1>
                </div>
            );
        }
        return (
            <Table condensed responsive>
                                <thead>
                                    <tr>
                                        <th style={{ color: '#0b2343' }}>Número de vuelo</th>
                                        <th style={{ color: '#0b2343' }}>Estado</th>
                                        <th style={{ color: '#0b2343' }}>Origen</th>
                                        <th style={{ color: '#0b2343' }}>Hora de salida</th>
                                        <th style={{ color: '#0b2343' }}></th>
                                        <th style={{ color: '#0b2343' }}>Hora de llegada</th>
                                        <th style={{ color: '#0b2343' }}>Destino</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        datos._collection.map((dato) => {
                                            const vuelo = dato._collection;
                                            return vuelo.map((fly, index) => {
                                                return(
                                                    <tr>
                                                        <td>
                                                            <div className={styles.columnaCellNoVuelo}>
                                                                <div className={styles.rowTituloVuelo}><h4>{`${fly.segment.marketingCarrier} ${fly.segment.marketingFlightCode}`}</h4></div>
                                                                <div className={styles.rowTituloVuelo}><p style={{ fontSize: '12px' }}>Operado por Aerolitoral DBA<br />Aeromexico Connect</p></div>
                                                            </div>
                                                        </td>
                                                        <td>
                                                            <div className={styles.columnaCellNoVuelo}>
                                                                <h4 className={(fly.status === 'ON_TIME' || fly.status === 'ARRIVED' || fly.status === 'FLOWN') ? styles.statusColorNorma : ((fly.status === 'CANCELLED') ? styles.statusColorCancelado : styles.statusColorDemora)}>{(fly.status !== 'ON_TIME') ? (fly.status !== 'ARRIVED') ? (fly.status !== 'CANCELLED')  ?  (fly.status !== 'FLOWN') ? 'Retrasado' : 'En vuelo' : 'Cancelado' : 'Llegó' : 'A tiempo'}</h4>
                                                            </div>
                                                        </td>
                                                        <td>
                                                            <div className={styles.columnaCellNoVuelo}>
                                                                <div className={styles.rowTituloVuelo}><h4>{`${fly.segment.departureAirport}`}</h4></div>
                                                                <div className={styles.rowTituloVuelo}><p style={{ fontSize: '12px' }}>{`Terminal ${fly.boardingTerminal}`}<br />{`Sala ${fly.boardingGate}`}</p></div>
                                                            </div>
                                                        </td>
                                                        <td>
                                                            <div className={styles.columnaCellHora1}>
                                                                <h4>{`${fly.boardingTime}`}</h4>
                                                            </div>
                                                        </td>
                                                        <td>
                                                            <div className={styles.columnaCellNoVuelo}>
                                                                <Image src={(fly.status !== 'ON_TIME') ? ((fly.status !== 'ARRIVED') ? ((fly.status !== 'CANCELLED')  ?  ((fly.status !== 'FLOWN') ? aTiempo : vueloImagen) : aTiempo) : llego) : aTiempo} className={styles.atiempo}/>
                                                            </div>
                                                        </td>
                                                        <td>
                                                            <div className={styles.columnaCellHora2}>
                                                                <h4>{`${(fly.segment.arrivalDateTime.substr(fly.segment.arrivalDateTime.length - 8)).substring(0, 5)}`}</h4>
                                                            </div>
                                                        </td>
                                                        <td>
                                                            <div className={styles.columnaCellNoVuelo}>
                                                                <div className={styles.rowTituloVuelo}><h4>{`${fly.segment.arrivalAirport}`}</h4></div>
                                                                <div className={styles.rowTituloVuelo}><p style={{ fontSize: '12px' }}>{`Terminal ${fly.arrivalTerminal}`}<br />{` Sala ${fly.arrivalGate}`}</p></div>
                                                            </div>
                                                        </td>
                                                    </tr>
                                                );
                                            });
                                        })
                                    }
                                </tbody>
                            </Table>
        );
    }

    render() {
        const { valorFecha, fechas, datosVuelos, selectedOption, inputValue, width } = this.state
        return(
            <div className={styles.container}>
                <Header />
                {
                    (width < 1200) ? null : (
                        <div className={styles.titulo}>
                            <div className={styles.columnaTituloImagen}>
                                <Image src={reloj} className={styles.relojImagen} />
                            </div>
                            <div className={styles.columnaTitulo}>
                                <h1 style={{ color: '#fff', fontSize: '40px' }}>Rastrea tu vuelo</h1>
                            </div>
                            <div />
                        </div>
                    )
                }
                {
                    (width < 1000) ? (
                        <div className={styles.body}>
                            <div className={styles.columnaEspacioRadioButton}/>
                            <div className={styles.columnaRadioButtons}>
                                <form className={styles.containerForm} onSubmit={this.handleFormSubmit}>
                                    <div className={styles.radio}>
                                        <label className={styles.inputDestino}>
                                            <div className={styles.columnRadioDestino}>
                                                <input type="radio" value="option1" checked={selectedOption === 'option1'} onChange={this.handleOptionChange} />
                                            </div>
                                            <div className={styles.columnaEspacioRadio}/>
                                            <div className={styles.columnRadioDestino}>
                                                Destino
                                            </div>
                                        </label>
                                    </div>
                                    <div className={styles.radio}>
                                        <label className={styles.inputDestino}>
                                            <div className={styles.columnRadioDestino}>
                                                <input type="radio" value="option2" checked={selectedOption === 'option2'} onChange={this.handleOptionChange} />
                                            </div>
                                            <div className={styles.columnaEspacioRadio}/>
                                            <div className={styles.columnRadioDestino}>
                                                Número de vuelo
                                            </div>
                                        </label>
                                    </div>
                                </form>
                            </div>
                            <div className={styles.columnaEspacio}/>
                            {
                                (selectedOption === 'option1') ? (
                                    <div className={styles.formContainer}>
                                        <div className={styles.columnaDroplist}>
                                            <Droplist tipo="Origen" data={{ value: this.state.valorDrop1, actualizarValorOrigen: this.actualizarValorOrigen.bind(this) }}/>
                                        </div>
                                        <div className={styles.columnaEspacio}/>
                                        <div className={styles.columnaDroplist}>
                                            <Droplist tipo="Destino" data={{ value: this.state.valorDrop2, actualizarValorDestino: this.actualizarValorDestino.bind(this) }}/>
                                        </div>
                                        <div className={styles.columnaEspacio}/>
                                        <div className={styles.columnaDate}>
                                            <Button bsStyle="link" className={styles.labelDate}>Fecha de salida</Button>
                                            <Select value={valorFecha} options={fechas} onChange={this.handleChange} className={styles.inputFecha}/>
                                        </div>
                                    </div>
                                ) : (
                                    <div className={styles.formContainer}>
                                        <div className={styles.columnaDroplist}>
                                            <Button bsStyle="link" className={styles.labelDate}>Número de vuelo</Button>
                                            <input type="text" className={styles.inputNumero} value={inputValue} onChange={this.handleInputChange}/>
                                        </div>
                                        <div className={styles.columnaEspacio}/>
                                        <div className={styles.columnaDate}>
                                            <Button bsStyle="link" className={styles.labelDate}>Fecha de salida</Button>
                                            <Select value={valorFecha} options={fechas} onChange={this.handleChange}/>
                                        </div>
                                    </div>
                                )
                            }
                            <div className={styles.columnaEspacioBoton}/>
                            <div className={styles.columnaBoton}>
                                <Boton nombreBoton="BUSCAR" esImagen={false} click={(selectedOption === 'option1') ? this.buscarVuelos : this.buscarVuelosNumero} />
                            </div>
                        </div>
                    ) : (
                        <div className={styles.body}>
                            <div className={styles.columnaEspacioRadioButton}/>
                            <div className={styles.columnaRadioButtons}>
                            <div className="container">
                                <div className="row">
                                <div className="col-sm-12">
                                    <form onSubmit={this.handleFormSubmit}>
                                        <div className="radio">
                                            <label className={styles.inputDestino}>
                                                <div className={styles.columnRadioDestino}>
                                                    <input type="radio" value="option1" checked={selectedOption === 'option1'} onChange={this.handleOptionChange} />
                                                </div>
                                                <div className={styles.columnaEspacioRadio}/>
                                                <div className={styles.columnRadioDestino}>
                                                    Destino
                                                </div>
                                            </label>
                                        </div>
                                        <div className="radio">
                                            <label className={styles.inputDestino}>
                                                <div className={styles.columnRadioDestino}>
                                                    <input type="radio" value="option2" checked={selectedOption === 'option2'} onChange={this.handleOptionChange} />
                                                </div>
                                                <div className={styles.columnaEspacioRadio}/>
                                                <div className={styles.columnRadioDestino}>
                                                    Número de vuelo
                                                </div>
                                            </label>
                                        </div>
                                    </form>
                                </div>
                                </div>
                            </div>
                            </div>
                            <div className={styles.columnaEspacio}/>
                            {
                                (selectedOption === 'option1') ? (
                                    <div className={styles.formContainer}>
                                        <div className={styles.columnaDroplist}>
                                            <Droplist tipo="Origen" data={{ value: this.state.valorDrop1, actualizarValorOrigen: this.actualizarValorOrigen.bind(this) }}/>
                                        </div>
                                        <div className={styles.columnaEspacio}/>
                                        <div className={styles.columnaDroplist}>
                                            <Droplist tipo="Destino" data={{ value: this.state.valorDrop2, actualizarValorDestino: this.actualizarValorDestino.bind(this) }}/>
                                        </div>
                                        <div className={styles.columnaEspacio}/>
                                        <div className={styles.columnaDate}>
                                            <Button bsStyle="link" className={styles.labelDate}>Fecha de salida</Button>
                                            <Select value={valorFecha} options={fechas} onChange={this.handleChange} className={styles.inputFecha}/>
                                        </div>
                                    </div>
                                ) : (
                                    <div className={styles.formContainer}>
                                        <div className={styles.columnaDroplist}>
                                            <Button bsStyle="link" className={styles.labelDate}>Número de vuelo</Button>
                                            <input type="text" className={styles.inputNumero} value={inputValue} onChange={this.handleInputChange}/>
                                        </div>
                                        <div className={styles.columnaEspacio}/>
                                        <div className={styles.columnaDate}>
                                            <Button bsStyle="link" className={styles.labelDate}>Fecha de salida</Button>
                                            <Select value={valorFecha} options={fechas} onChange={this.handleChange}/>
                                        </div>
                                    </div>
                                )
                            }
                            <div className={styles.columnaEspacioBoton}/>
                            <div className={styles.columnaBoton}>
                                <Boton nombreBoton="BUSCAR" esImagen={false} click={(selectedOption === 'option1') ? this.buscarVuelos : this.buscarVuelosNumero} />
                            </div>
                        </div>
                    )
                }
                <div className={styles.resultsContainer}>
                    {
                        (datosVuelos === null) ? (
                           <div className={styles.viewNoDisponible}>
                               <h1 style={{ fontSize: '62px' }}>Busca tu vuelo<br /><p style={{ fontSize: '24px', fontWeight: 'lighter' }}>Podrás ver su información</p></h1>
                           </div>
                        ) : this.putTable(datosVuelos)  
                    }
                </div>
            </div>
        );
    } 
}