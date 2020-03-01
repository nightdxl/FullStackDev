import React from 'react';
import './Card.css';


// functional component
function GetCard(props) {
  
    return <div className="Card">

        <div className="Pic">
            <div className="Title">
                <h4>{props.title}</h4>
            </div>
            
            <img src={props.img} alt="" title={props.title} width="100%" />
            
            <div className="Subtitle">
                <h5>{props.subTitle}</h5>
                <h6 style={{color:'gray'}}>For Valentine's Day</h6>
            </div>
        </div>
    </div>
  }


// functional component
// assemble welcome component
function Card() {
    return (
        <GetCard img='https://www.dhresource.com/600x600/f2/albu/g10/M00/AC/B9/rBVaWV4OvKWAGN_zAAtwgaI-kMI676.jpg' title="Editor's Picks" subTitle="Gifts for Him" />
    );
}

 export default Card;

 