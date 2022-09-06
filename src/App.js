import React, {useState} from 'react';
import {data} from './data'

function App() {
  const fullList = data.attractions;
  const [filterList, setFilterList] = useState(fullList)
  const [userList, setUserList] = useState([])
  const [time, setTime] = useState(0)
  let filterByTime;
  let filterByPrice;
  

  //Handle changes to the form
  const handleTime = (e) => {
     setTime(e.target.value);
     if (filterByPrice) {
       filterByTime = filterByPrice.filter( (item) => {
        return item.time <= e.target.value;
      })
     } else {
       filterByTime = fullList.filter( (item) => {
        return item.time <= e.target.value;
      })
     }
     setFilterList(filterByTime);

  }

  const handlePrice =(e) => { 
    if (filterByTime) {
      filterByPrice = filterByTime.filter( (item) => {
        return item.price <= e.target.value
      })
    } else {
        filterByPrice = fullList.filter( (item) => {
        return item.price <= e.target.value
      })
    }
    console.log(filterByPrice)
    setFilterList(filterByPrice);
  }
      
  //Add a location to user's itinerary
  const handleAdd= (place) => { 
    let newList = (userList.length > 0  ? [...userList,place] : [place])
    setUserList(newList);
    const newTime = time - place.time
    setTime(newTime);
    
    // remove user's pick from the available list 
    let removeAddedItem = filterList.filter(item => item.name !== place.name)
    setFilterList(removeAddedItem);
   
  }

  //remove a location from user's itinerary
  const handleRemove = (place) => {
    let filteredList = userList.filter(item =>  item.name !== place.name )
    setUserList(filteredList);

    const newTime = time + place.time;
    setTime(newTime);
 }
 
  //change $ symbol display
  function changeSymbol(num) {
    if (num === 0)  return "Free";
    return "$".repeat(num);
  }

 

  return (
    <div className="container">
      <header>
        <h2>Welcome to Paris!</h2>
        <div className="form-list"> 
          <form>
            <label className="form-time" htmlFor="time">
            Total amount of time:  </label>
            <select onChange={handleTime} name="time" id="time">
                <option selected disabled>Select time</option> 
                <option value="1">1 hour</option>
                <option value="2">2 hours</option>
                <option value="3">3 hours</option>
                <option value="4">4 hours</option>
                <option value="5">5 hours</option>
                <option value="6">6 hours</option>
                <option value="7">7 hours</option>
                <option value="8">8 hours</option>
            </select>  
          </form>
          
            <label name="price">Price:
            <span className="checkbox"><input onChange={handlePrice} value="0" name ="price" id="0" type="checkbox" className="checkbox"/>
            <label for="0" className="price-label">Free</label></span>
            <span className="checkbox"><input onChange={handlePrice} value="1" name ="price" id="1" type="checkbox" className="checkbox"/> 
            <label for="1">$ </label></span>
            <span className="checkbox"><input onChange={handlePrice} value="2" name ="price" id="2" type="checkbox" className="checkbox"/>
            <label for="2" className="price-label">$$</label></span>
            <span className="checkbox"><input onChange={handlePrice} value="3" name ="price" id="3" type="checkbox" className="checkbox"/>
            <label for="3" className="price-label">$$$ </label></span>
            </label>
          
        </div>
   
        <div>
          <p> {time > 0 ? `You have ${time} hour(s) left to allocate.` : 
                `You went over by ${Math.abs(time)} hour(s) . Please remove an item from your itinerary` }</p>
        </div>
      </header>

      
      <div className="flex card-container">
         <div className="available-attractions">
          <h3>Available attractions</h3>
         {filterList.map( place => {
            return <div className="card" key={place.name}>
                    <div className="top-bar"> 
                      <p className="bold">Name: {place.name}</p> 
                      <button onClick= { () => handleAdd(place)}>Add+</button> 
                    </div>
                    
                    <span>Price: {changeSymbol(place.price)}</span>  
                    <span>Time: {place.time} {place.time <= 1 ? "hour" : "hours"}</span>
                    <p>Description: {place.description}</p> 
                   
                </div>} )}
         </div>

         <div className="current-itinerary">
          <h3>Current itinerary</h3>
          {userList.map( place => {
            return <div className="card" key={place.name}>
                    <div className="top-bar"> 
                      <p className="bold">Name: {place.name}</p> 
                      <button onClick= { () => handleRemove(place)}>Remove-</button> 
                    </div>
                    
                    <span>Price: {changeSymbol(place.price)}</span>  
                    <span>Time: {place.time}</span>
                    <p>Description: {place.description}</p> 
                   
                </div>} )}
         </div>
      </div>
      
    </div>
  );
}

export default App;
