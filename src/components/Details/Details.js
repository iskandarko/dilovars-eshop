import React, { Component } from 'react';
import { ProductContext } from '../../context';
import DetailsView from './DetailsView';
import DetailsEdit from './DetailsEdit';

class Details extends Component {
    render() {
        return this.context.isAdminMode ? <DetailsEdit /> : <DetailsView />
    }
}

Details.contextType = ProductContext;

export default Details;