const path = require( 'path' );
const fs = require( 'fs' );
// const _ = require( 'lodash' );

const states = require( '../states.json' );
let csvRows = 'location_level_1,location_level_2,location_level_3,location_group\n';
for ( const key in states ) {
    const state = states[ key ];
    const areasFile = path.join( __dirname, `../${key}.json` );
    let areas = {};

    if ( fs.existsSync( areasFile ) ) {
        areas = require( areasFile );
    }

    if ( Object.keys( areas ).length ) {
        for ( const i in areas ) {
            const area = areas[ i ];
            csvRows += `${state},${area},,\n`;
        }
    }
}

fs.writeFile( path.join( __dirname, `../dist/locations.csv` ), csvRows, 'utf8', function( err ) {
    if ( err ) {
        console.log( err );
    } else {
        console.log( 'DONE!' );
    }
} );

console.log( states, csvRows );
