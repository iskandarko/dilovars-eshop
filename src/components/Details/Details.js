import React, { Component } from 'react';
import { ProductContext } from '../../context';
import DetailsForUser from './DetailsForUser';
import DetailsForAdmin from './DetailsForAdmin';

class Details extends Component {

    render() { 
        return this.context.adminMode ? <DetailsForAdmin /> : <DetailsForUser />
    }
}

Details.contextType = ProductContext;
 
export default Details;