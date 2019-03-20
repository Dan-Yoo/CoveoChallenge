import React, { Component } from 'react';
import Item from '..';
import './ItemList.css';

interface ItemListProps {
  items: []
};

class ItemList extends Component<ItemListProps, any> {
  render() {
    return (
      <div className="item-list-container">
        {this.props.items.map((item, i) => {
          return <Item item={item} key={i} />;
        })}
      </div>
    );
  }
}

export default ItemList;
