import React, { Component } from 'react';
import { Grid, Row, Col, Image } from 'react-bootstrap';

import aeromexicoLogo from '../../svg/logo.svg';
import carta from '../../svg/Carta.svg';
import bandera from '../../svg/BanderaCircular.svg';
import aeromexicoLogo2 from '../../svg/CabezaAero.svg';
import menu from '../../svg/Menu.svg';
import sesion from '../../svg/Sesion.svg';
import styles from './Header.module.css';

export default class Header extends Component {
    constructor(props) {
        super(props);
        this.state = {
            width: 0,
            height: 0,
        };
        this.updateWindowDimensions = this.updateWindowDimensions.bind(this);
    }

    componentDidMount() {
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

    render() {
        const { width } = this.state
        return(
            <Grid className={styles.container}>
                <Row className={styles.contenedorHeader}>
                    <Col className={styles.columnaLogo}>
                        <Image src={(width < 1200) ? aeromexicoLogo2 : aeromexicoLogo} responsive className={(width < 1200) ? styles.logo2 : styles.logo}/>
                    </Col>
                    <Col className={(width < 680) ? styles.columnaOpcionMasNull : styles.columnaOpcion}>
                        <p className={styles.opcionHeader}>Reserva</p>
                    </Col>
                    <Col className={(width < 680) ? styles.columnaOpcionMasNull : styles.columnaOpcion}>
                        <p className={styles.opcionHeader}>Tu viaje</p>
                    </Col>
                    <Col className={(width < 680) ? styles.columnaOpcionMasNull : styles.columnaOpcion}>
                        <p className={styles.opcionHeader}>Check-In</p>
                    </Col>
                    <Col className={(width < 680) ? styles.columnaOpcionMasNull : styles.columnaOpcion}>
                        <p className={styles.opcionHeader}>Upgrade</p>
                    </Col>
                    <Col className={(width < 680) ? styles.columnaOpcionMasNull : styles.columnaOpcion}>
                        <p className={styles.opcionHeader}>Club Premiere</p>
                    </Col>
                    <Col className={(width < 1200 ) ? ((width < 960 ) ? styles.columnaEspacio960 : styles.columnaEspacio1200) : styles.columnaEspacio}/>
                    <Col className={(width < 1200 ) ? styles.columnaOpcionMasNull : styles.columnaOpcionMas}>
                        <p className={styles.opcionHeader}>Promociones</p>
                    </Col>
                    <Col className={(width < 1200 ) ? styles.columnaOpcionMasNull : styles.columnaOpcionMas}>
                        <p className={styles.opcionHeader}>Rastrea tu vuelo</p>
                    </Col>
                    <Col className={(width < 1200 ) ? styles.columnaOpcionMasNull : styles.columnaOpcionMas}>
                        <p className={styles.opcionHeader}>Destinos</p>
                    </Col>
                    <Col className={(width < 1200 ) ? styles.columnaOpcionMasNull : styles.columnaOpcionHover}>
                        <button className={styles.dropbtn}>Más  ▼</button>
                        <div className={styles.dropdownContent}>
                            <a href="#">Información del viaje</a>
                            <a href="#">Vuela con nosotros</a>
                            <a href="#">Rutas</a>
                            <a href="#">Guías del viaje</a>
                            <a href="#">Private Jets</a>
                            <a href="#">Nuestras tarjetas</a>
                        </div>
                    </Col>
                    <Col className={(width < 960 ) ? styles.columnaOpcionMasNull : styles.columnaCarta}>
                        <Image src={carta} className={styles.carta}/>
                    </Col>
                    <Col className={(width < 960 ) ? styles.columnaOpcionMasNull : styles.columnaCarta}>
                        <Image src={bandera} className={styles.bandera}/>
                    </Col>
                    <Col className={(width < 960 ) ? styles.columnaOpcionMasNull : styles.columnaOpcionSesion}>
                        <p className={styles.opcionHeader}>Iniciar sesión</p>
                    </Col>
                    {
                        (width < 680) ? (
                            <Col className={styles.columnaOpcion}>
                                <p className={styles.opcionHeader}>RESERVA</p>
                            </Col>
                        ) : null
                    }
                    {
                        (width < 960) ? (
                            <Col className={styles.columnaMenu}>
                                <Image src={sesion} className={styles.menu} />
                            </Col>
                        ) : null
                    }
                    {
                        (width < 1200) ? (
                            <Col className={styles.columnaMenu}>
                                <Image src={menu} className={styles.menu} />
                            </Col>
                        ) : null
                    }
                </Row>
            </Grid>
        );
    }
}