import React, {useState, useEffect} from 'react'
import { Cell, Column, Table } from "@blueprintjs/table";
import { InputGroup,AnchorButton , Overlay ,Classes ,Button} from "@blueprintjs/core";
import Popup from 'reactjs-popup';
import 'reactjs-popup/dist/index.css';

export default function Tables({bookedSeats}) {
  const [overlayState,setOverlayState]=useState(false)
  const [querryResult,setQuerryResult]=useState(bookedSeats)
  const [queryText,setQuerryText]=useState('')
  if(querryResult.length!==0){
    const renderPnr = (i: number) => {
      console.log(querryResult[i])
        return (<Cell>{querryResult[i].pnrNumber}</Cell>);
      };
      const renderBookingDate =(i: number) => {
          return (<Cell>{querryResult[i].timeOfBooking}</Cell>);
      };
      const renderOverlayButton =(i: number) => {
          return (<Cell> <Popup trigger={<a>view</a>} position="top left">
    {close => (
      <div className="modal">
      Name:{querryResult[i].name}<br/><br/>
      phoneNumber:{querryResult[i].phoneNumber}<br/><br/>
      pnr Number:{querryResult[i].pnrNumber}<br/><br/>
      Seat Id:{querryResult[i].seatId}<br/><br/>
      time of booking:{querryResult[i].timeOfBooking}<br/><br/>
      </div>
    )}
  </Popup>

          </Cell>);
      };
      const queryPnr=(text)=>{
        if(text==='')
        {
          setQuerryResult(bookedSeats)
        }
        else{
          let query=[]
        for(let i=0;i<bookedSeats.length;i++)
        {
          if(bookedSeats[i].pnrNumber.slice(0,text.length)===text)
          {
          query.push(bookedSeats[i])
        }
        }
        setQuerryResult(query)
      }
      }
  return(
    <div>
    <div>
      <InputGroup id="text-input" placeholder="pnr search" onChange={(e)=>{setQuerryText(e.target.value)}}/>
        <Button className="bp3-intent-primary" onClick={()=>{queryPnr(queryText)}}>search</Button></div>
    <Table numRows={querryResult.length}>
    <Column name="PNR number" cellRenderer={renderPnr}/>
    <Column name="Booking Date" cellRenderer={renderBookingDate}/>
    <Column name="Booking Date" cellRenderer={renderOverlayButton}/>
    </Table>
    </div>
  )
}
  else
  return(
  <h3>No records found</h3>
)
}
