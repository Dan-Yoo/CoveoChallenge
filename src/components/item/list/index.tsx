import React, { Component, Ref } from 'react';
import Item from '..';
import './ItemList.css';

interface ItemListProps {
  items: [];
  intersectionCallback?: any;
};

class ItemList extends Component<ItemListProps, any> {
  observer: IntersectionObserver;
  observerOptions: object;
  refArray: any[];

  constructor(props: ItemListProps) {
    super(props);
    this.observerOptions = {
      root: document.querySelector(".item-list-container"),
      rootMargin: "0px",
      threshold: 1.0,
    };

    this.refArray = [];

    this.observer = new IntersectionObserver((entry: any, observer: any) => {
      if (entry[0].intersectionRatio == 1) {
        if (this.props.intersectionCallback) {
          this.props.intersectionCallback();
          this.observer.disconnect();
        }
      }
    }, this.observerOptions);
  }

  updateObserver() {
    setTimeout(() => {
      if (this.refArray.length > 1) {
        let beforeLastIndex = this.refArray.length - 2;
        this.observer.observe(this.refArray[beforeLastIndex].current as Element);
      } else {
        this.updateObserver();
      }
    }, 1000)
  }

  render() {
    this.refArray = [];
    
    return (
      <div className="item-list-container">
        {this.props.items.map((item, i) => {
          let ref = React.createRef();
          this.refArray.push(ref);
          return (
            <div className="item-container-ref" key={i} ref={this.refArray[i]}>
              <Item item={item} />
            </div>
          );
        })}
      {this.updateObserver()}
      </div>
    );
  }
}

export default ItemList;
