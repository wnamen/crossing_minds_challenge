import React, { Component } from 'react';
import Carousel from './components/Carousel';
import {
    Container,
    Row
} from 'react-materialize';
import {
    getItems
} from './actions/actions';
import _ from 'lodash';
import './App.css';

class App extends Component {
    constructor(props) {
        super(props);

        this.state = {
            user: '',
            items: [],
            rated: []
        }
    }
    componentWillMount = () => {
        getItems(16, null, (data) => {
            this.setState({user: data.user, items: data.items})
        });
    }

    rateItem = (id) => {
        let items = this.state.items,
            rated = this.state.rated,
            itemIndex = _.findIndex(items, (item) => item.id === id),
            item = items.splice(itemIndex, 1);

        rated.push(item[0])

        this.setState({rated: rated, items: items}, () => {
            this.getMoreItems()
        })
    }

    getMoreItems = () => {
        let items = this.state.items;

        if (items.length <= 10) {
            getItems(16 - items.length, this.state.rated, (data) => {
                this.setState({items: items.concat(data.items)})
            })
        }
    }

    render() {
        const { items } = this.state

        return (
            <Row className='App'>
                <Container l={10}>
                    <h1>Your Recommendations</h1>
                    <Carousel items={items} rateItem={this.rateItem}/>
                </Container>
            </Row>
        );
    }
}


export default App;
