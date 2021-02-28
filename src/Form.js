import React, {useState, useEffect} from 'react'
import { FocusStyleManager,FormGroup,InputGroup, Card, Button, Elevation,MenuItem, Position, Toaster, Intent } from "@blueprintjs/core";
import { Select } from "@blueprintjs/select";
import random from 'random-key-generator'
const AppToaster = Toaster.create({
   className: "recipe-toaster",
   position: Position.TOP,
});

export default function Form({changeBookedSeat,totalSeats}) {
  const [phNumber, setPhnumber]= useState('');
  const [name,setName]= useState('')
  const [reservedSeat, setReservedSeat]=useState('')



  FocusStyleManager.onlyShowFocusOnTabs();

  const onSubmit=(object1)=>{
    if(reservedSeat.length!==2){
    if(totalSeats.length==1)
    AppToaster.show({ message: "no empty seat available" });
    else
    AppToaster.show({ message: "select a seat" });
  }
    else if(object1.name===''||object1.phoneNumber==='')
    AppToaster.show({ message: "please fill all the fields" });
    else if(object1.name.length<2)
     AppToaster.show({ message: "please enter a valid name" });
    else  if(!(+object1.phoneNumber) || !(object1.phoneNumber.length===10))
     AppToaster.show({ message: "please enter a valid phone number" });
     else{
       const seats=totalSeats
       delete seats[seats.indexOf(object1.seatId)]
     changeBookedSeat({...object1,pnrNumber:random(10),timeOfBooking: new Date().toLocaleString()},seats)
   }
  }

  return(
    <div>
          <Card interactive={true} elevation={Elevation.TWO}>
          <FormGroup
          label="Seat ID"
          labelFor="select"
          labelInfo="(required)">
          <select
            value={reservedSeat}
            onChange={(event)=>{setReservedSeat(event.target.value)}}
            >
            {totalSeats.map((item, index) => <option value={item} >{item}</option>)}
            </select>
          </FormGroup>


          <FormGroup
          label="Name"
          labelFor="text-input"
          labelInfo="(required)">
            <InputGroup id="text-input" placeholder="Name" onChange={(event)=>{setName(event.target.value)}}/>
          </FormGroup>
          <FormGroup
          label="Phone Number"
          labelFor="text-input"
          labelInfo="(required)">
            <InputGroup id="text-input" placeholder="Phone Number" onChange={(event)=>{setPhnumber(event.target.value)}}/>
          </FormGroup>
          <Button className="bp3-intent-primary" onClick={()=>onSubmit({name:name,phoneNumber:phNumber,seatId:reservedSeat})}>Book</Button>
          </Card>
    </div>
  )
}
