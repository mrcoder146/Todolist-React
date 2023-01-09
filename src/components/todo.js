
import React, {useState, useEffect} from 'react';
import "../style.css";


// get the local storage data
const getLocalData = () => {
    const lists = localStorage.getItem("mytodolist");

    if(lists){
        return JSON.parse(lists);
    }else{
        return [];
    }
}

const Todo = () => {

    const [inputdata, setinputdata] = useState("");
    const [items, setItems] = useState(getLocalData());
    const [isEditItem, setIsEditItem] = useState("");
    const [toggleButton, setToggleButton] = useState(false);

    // add item to list
    const addItem = () => {
        if(!inputdata){
            alert("Please add something to list !");
        }else if( inputdata && toggleButton){
            setItems(
                items.map((currEle) => {
                    if(currEle.id === isEditItem){
                        setToggleButton(false);
                        setinputdata("");
                        return{...currEle, name:inputdata};
                    }
                    return currEle;
                })
            )
            setIsEditItem(null);
        }
        else{

            const myNewInputData = {
                id: new Date().getTime().toString(),
                name: inputdata,
            };

            setItems([...items,myNewInputData]);
            setinputdata("");
        }
    } 
    // edit items

    const editItem = (index) => {

        const item_to_edit = items.find((currEle) => {
            return currEle.id === index ;
        });

        setinputdata(item_to_edit.name);
        setIsEditItem(index);
        setToggleButton(true);
    }

    // delete item to list

    const deleteItem = (index) => {
        const updatedItems = items.filter((currEle) => {
            if(currEle.id !== index){
                return currEle;
            }
        })

        setItems(updatedItems);
    }

    const removeAll = () => {
        setItems([]);
        setinputdata("");
    }


    // adding to local storage
    useEffect(() => {
        localStorage.setItem("mytodolist", JSON.stringify(items));
    }, [items]);

  return (
    <>
        <div className='main-div'>
                <div className='child-div'>
                    <figure>
                        <img src="./images/todo1.png" alt="todo logo"  style={{width:'80px'}}/>
                        <figcaption>Add Your List Here</figcaption>
                        <figure>
                            <div className='addItems'>

                                <input type="text"  placeholder='✍ Add Items...' className='form-control' 
                                 value = {inputdata} 
                                 onChange={(event) => setinputdata(event.target.value) }/>
                                
                                {
                                    toggleButton ? (
                                        <i className=" far fa-edit add-btn" onClick={addItem}></i>
                                    ) : (
                                        <i className=" fa fa-solid fa-plus" onClick={addItem}></i>
                                    ) 
                                }

                            </div>
                            {/* show out items */}
                            <div className='showItems'>
                                {
                                    items.map((currEle, index) => {
                                        return (
                                            
                                        <div className='eachItem' key={index}>
                                            <h3>{currEle.name}</h3>
                                            <div className='todo-btn'>
                                                <i className=" far fa-edit add-btn" onClick={() => editItem(currEle.id)}></i>
                                                <i className=" far fa-trash-alt add-btn" onClick={() => deleteItem(currEle.id)}></i>
                                            </div>     
                                        </div>
                                        )
                                    })
                                }
                            </div>
                                {/* remove all button  */}
                            <div className='showItems'>
                                <button className='btn effect04' data-sm-link-text="Remove All" onClick={removeAll}>
                                 <span>CHECK LIST </span> </button>
                            </div>
                        </figure>   
                    </figure>
                </div>
        </div>
    </>
  )
}

export default Todo