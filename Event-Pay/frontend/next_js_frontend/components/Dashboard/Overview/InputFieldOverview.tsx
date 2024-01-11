"use client";
import React, { FormEvent, useEffect, useState } from "react";
//import datalistFetch from "@/functions/fetchDatalistFunction";
import {
  participantOrEventInfoFetch,
  DBcontains,
  getNeededDatafromAdmin,
  payAnEvent,
  datalistFetch,
  Choose,
} from "@/functions/otherFetchFunction";
import { ReturnObject } from "@/ts_classes/ts_export_classes";

//type Choose = "participant" | "event" | "both";

const InputFieldOverview = () => {
  //todo useEffect should render only at the beginning
  let [input, setInput] = useState<string>(""); //*let is needen -> with setInput the Hyperlink action do not work because handleClick()
  //*is going to execute before setInput is completed and therefore it uses the old value of the input

  const [datalist_data, setDatalistData] = useState<string[]>([]);
  let datalist_length:number = 0
  let searchData_length:number = 0
  //const [search_data, setSearchData] = useState<object[] | string | any>("");
  const [error, setError] = useState<string>("");
  const [buttonInfo, setButtonInfo] = useState<ReturnObject>(new ReturnObject(false,``,null));
  const [search_data_event, setSearchDataEvent] = useState<any[]>([]);
  const [search_data_participant, setSearchDataParticipant] = useState<any[]>([]);
 // sort options
  const isPayedExpressionASC  = (a:any,b:any) => {return (a.is_payed === b.is_payed)? 0 : (a.is_payed)? -1 : 1}
  const isPayedExpressionDESC  = (a:any,b:any) => {return (a.is_payed === b.is_payed)? 0 : (a.is_payed)? 1 : -1}
  const priceExpression  = (a:any,b:any) => a.price.localeCompare(b.price)
  const screenNameExpression  = (a:any,b:any) => a.screen_name.localeCompare(b.screen_name)
  const nameExpression  = (a:any,b:any) => a.name.localeCompare(b.name)
    
  

  useEffect(() => {

    //get user for fetch
    const evp_u = localStorage.getItem("evp_u");
    if (evp_u === null) {
        setError(`Something went wrong. Please try it later again!`)
        return;
    }
    datalistFetch("both", JSON.parse(evp_u))
      .then((data) => {
        if(data.error){
          console.log('datalist could not be loaded!')
          //setError(`Datalist could not be loaded - ${data.message}`)
          return
        }
        datalist_length = data.data.length;
        setDatalistData(data.data.sort((a:any, b:any) => a.localeCompare(b)));
    });
    
  }, []);

  const handleClick = async (): Promise<void> => {
    console.log(input);
    setSearchDataEvent([]);
    setSearchDataParticipant([]);
    setError("");
    // get user for fetch requests
    const evp_u = localStorage.getItem("evp_u");
    const response = await getNeededDatafromAdmin(
      evp_u === null ? `` : JSON.parse(evp_u)
    );
    console.log(response);
    if (response.error) {
      setError(response.message);
      return;
    }
    const user  = JSON.parse(response.data)
    //const user = "e790fa88-46cc-4519-a866-773b7932c639";
    //console.log(user)

    //contain start
    const contain = await DBcontains(user, input.trim());
    if (contain.hasOwnProperty("error")) {
      setError(contain.message);
      return; //???
    }
    const state = contain;
    console.log(state);
    //contain end

    if (state === "event" || state === "both") {
      const data = await participantOrEventInfoFetch(user, input, false);
      if (data.hasOwnProperty("error")) {
        setError(data.message);
      } 
      else {
        setSearchDataEvent(data);
        searchData_length = data.length;
        if (state !== "both") {
          return;
        }
      }
    }
    if (state === "participant" || state === "both") {
      const data = await participantOrEventInfoFetch(user, input, true);
      if (data.hasOwnProperty("error")) {
        setError(data.message);
      } 
      else {
        setSearchDataParticipant(data);
        searchData_length += data.length;
      }
    }
    console.log(" get search info");
  };
  function handlePayButton(pItemToPay: string, eItemToPay: string) {
    //setButtonInfo(new ReturnObject(false,``,null))
    console.log("handlePayButton", pItemToPay, eItemToPay);
    const evp_u = localStorage.getItem("evp_u");
    if (evp_u === null) {
      setButtonInfo(new ReturnObject(true,`Something went wrong. Please try it later again!`,null))
      return;
    }
    payAnEvent(JSON.parse(evp_u), pItemToPay, eItemToPay)
      .then(response =>{
        console.log("button info",response)
        if(response.error){
          setError((response.message === null) ? "Something went wrong. Please try it later again!" : response.message)
        }
        setButtonInfo(response)
      })
      .catch(error => setButtonInfo(new ReturnObject(true,`Something went wrong. Please try it later again!`,null)));
  }

  function hyperlink(itemToJumpTo: string): void {
    setInput(itemToJumpTo); // there that the value of the input-field changes
    input = itemToJumpTo; // assign itemToJump to input from the useSate hook
    handleClick();
  }
  function sortSearchedData(sortOption:any):void{
    
    const e = search_data_event.sort(sortOption)
    const p = search_data_participant.sort(sortOption)


    console.log(e)
    console.log(p)
    setSearchDataEvent(e)
    setSearchDataParticipant(p)
  }

  console.log("datalist", datalist_data);
  return (
    <>
      <div className="overview-container">
        <input className="overview-input" autoComplete="off" onChange={(event) => setInput(event.target.value)} type="text" name="overview-input" id="overview-input" list="overview-datalist" value={input} />
        <datalist id="overview-datalist">
          {
            datalist_data.map((d) => {
              datalist_length = datalist_length - 1
              return <option key={`${d}${datalist_length}`}>{d}</option>
            })
          }
        </datalist>
        <button type="button" className="overview-button" onClick={(event) => {event.preventDefault(); handleClick(); }}>Search</button>
      </div>

      <div> 
        {/*//! only test-stuff */}
        <button type="button" onClick={() => {sortSearchedData(isPayedExpressionASC)}} className="bg-green-600 m-2">sort <button></button></button>
      </div>

      <div className="mt-4">
        {error && (
          <div className='error-message'>
            <p className='font-medium'>You've got an error</p>
            {error}
          </div>
        )}

        {search_data_event && (search_data_event.length > 0 ? (
            <div className="overview-data-container">
              <div className="overview-data-header grid-cols-4">
                {/* email, p.screen_name, ep.is_payed, e.name, e.date, e.start_time, e.price, e.currency */}
                <div className="font-bold">{search_data_event[0].name}</div>
                <div>{new Date(Date.parse(search_data_event[0].date)).toLocaleDateString("de-AT")}</div>
                <div>{search_data_event[0].start_time.substring(0, search_data_event[0].start_time.lastIndexOf(":"))}</div>
                <div>{`${search_data_event[0].currency} ${search_data_event[0].price}`}</div>
              </div>
              <div className="overview-data-row-container">
                {search_data_event.map((data) => (
                  //todo css
                  <div key={searchData_length--} className="overview-data-row grid-cols-3">
                    <div className="overview-data-col overview-hyperlink" onClick={(event) => {event.preventDefault();hyperlink(data.screen_name);}}>{data.screen_name}</div>
                    <div className="overview-data-col">{data.is_payed ? `payed` : `not payed`}</div>
                    {!data.is_payed ? (<button onClick={(event) => {event.preventDefault(); handlePayButton(data.screen_name, search_data_event[0].name);}} className="overview-data-col overview-pay-button">pay</button>) : (``)}
                  </div>
                ))}
              </div>
            </div>
        ) : (""))}

        {search_data_participant && (search_data_participant.length > 0 ? (
            <div className="overview-data-container">
              <div className="overview-data-header grid-cols-2">
                {/* email, p.screen_name, ep.is_payed, e.name, e.date, e.start_time, e.price, e.currency */}
                <div className="font-bold">{search_data_participant[0].screen_name}</div>
                <div>{search_data_participant[0].email}</div>
              </div>
              <div className="overview-data-row-container">
                {search_data_participant.map((data) => (
                  //todo css
                  <div key={searchData_length--} className="overview-data-row grid-cols-4" >
                    <div className="overview-data-col overview-hyperlink" onClick={(event) => {event.preventDefault();hyperlink(data.name);}}>{data.name}</div>
                    <div className="overview-data-col">{`${search_data_participant[0].currency} ${search_data_participant[0].price}`}</div>
                    <div className="overview-data-col">{data.is_payed ? `payed` : `not payed`}</div>
                    {!data.is_payed ? (<button onClick={(event) => { event.preventDefault(); handlePayButton(search_data_participant[0].screen_name, data.name);}} className="overview-data-col overview-pay-button">pay</button>) : (``)}
                  </div>
                ))}
              </div>
            </div>)
            : (""))}
        </div>
    </>
  );
};

export default InputFieldOverview;
