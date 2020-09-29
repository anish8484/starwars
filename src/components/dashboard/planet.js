import React from 'react';
import * as util from '../../shared/util.js';

const Planet = (props) => {
    const planetName = props.data.name.toUpperCase();
    const style = {
        width: util.calculateDiameter(parseInt(props.data.population, 10)) + 'px',
        height: util.calculateDiameter(parseInt(props.data.population, 10)) + 'px'
    }
    return (
        <div className="planet">
            <div className="circle" style={style}>
                <div className="planetName click" onClick={() => { props.showPlanetInfo(planetName)}}>
                    {planetName}
                    {props.fullInfoFilter[planetName] && (
                        <p className="info">
                            {'Population: ' + props.data.population}<br />
                            {'Gravity: ' + props.data.gravity}<br />
                            {'Orbital Period: ' + props.data.orbital_period}<br />
                            {'Terrain: ' + props.data.terrain}
                        </p>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Planet;