import React, { Component, JSXElementConstructor } from 'react';
import './Item.css';

interface ItemProps {
  item: any
};

class Item extends Component<ItemProps, any> {
  constructor(props: ItemProps) {
    super(props);
    this.state = {
      toggle: false
    };

    this.toggleItem = this.toggleItem.bind(this);
    this.stopPropagation = this.stopPropagation.bind(this);
  }

  toggleItem() {
    this.setState({toggle: !this.state.toggle});
  }

  stopPropagation(e: any) {
    e.stopPropagation();
  }

  render() {
    const item = this.props.item;

    return (
      <div className="item-container">
        {(this.state.toggle) ? 
          <div onClick={this.toggleItem} className="item-modal">
            <div className="item-box" onClick={this.stopPropagation}>
              <div className="close-button-container">
                <div onClick={this.toggleItem} className="close-button">X</div>
              </div>
              <div className="item-modal-content">
              
                <div className="item-modal-image">
                  <img src={item.raw.tpthumbnailuri} />
                </div>
                <div className="item-modal-description">
                  <h3>{item.title}</h3>
                  <h5>Price: ${item.raw.tpprixnum.toFixed(2)}</h5>
                
                  <div>Country: {item.raw.tppays}</div>
                  <div>Category: {item.raw.tpcategorie}</div>
                  <div>Format: {item.raw.tpformat}</div>
                  <div>Source: {item.raw.syssource}</div>

                  <a target="_blank" href={item.clickUri}>See more</a>
                </div>
              </div>
            </div>
          </div> : null}
        <div className="item-subcontainer" onClick={this.toggleItem}>
          <div className="item-image">
            <img src={item.raw.tpthumbnailuri} />
          </div>
          <div className="item-description">
            <div className="item-title">${item.raw.tpprixnum.toFixed(2)} - {item.title}</div>
          </div>
        </div>
      </div>
    );
  }
}

export default Item;
