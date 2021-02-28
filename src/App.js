import React, {useState, useEffect} from 'react'
import { Alignment, Button, ButtonGroup } from "@blueprintjs/core";
import "@blueprintjs/table/lib/css/table.css";
import './App.css';
import random from 'random-key-generator'
import "@blueprintjs/core/lib/css/blueprint.css";
import Form from './Form.js'
import Tables from './Tables.js'
function App() {
  const [bookedSeat,setBookedseat]=useState({})
  const [bookedSeats,setBookedseats]=useState([])
  const [selectTab,setSelectTab]=useState(true)
  const [totalSeats,setSeats]=useState([])
  useEffect(() => {
    let listItems = []
    listItems[0]="select a seat"
    for(let i=1;i<16;i++)
    listItems.push(random(2))
    setSeats(listItems)
  }, [])
  useEffect(()=>{
    if(bookedSeat.name)
    setBookedseats([...bookedSeats,bookedSeat])
  },[bookedSeat])

  const changeSeats=(seat,seats)=>{
    setBookedseat(seat)
    setSeats(seats)
  }

  return (
    <div className="App">
    <div className="buttons" style={{margin:80}}>
    <ButtonGroup minimal={true} style={{ marginTop: 5 }}>
                <Button active={selectTab} text="Book Ticket" onClick={()=>{setSelectTab(true)}} />
                <Button active={selectTab} text="PNR chart" onClick={()=>{setSelectTab(false)}} />
            </ButtonGroup>
    </div>
    <div className="tab">
            {selectTab
      ?<Form totalSeats={totalSeats} changeBookedSeat={changeSeats}/>
      :<Tables bookedSeats={bookedSeats}/>
    }
    </div>
    </div>
  );
}

export default App;
