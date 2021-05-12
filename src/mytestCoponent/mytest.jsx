import React,{useEffect, useState} from "react";
/////////////////////////////////////////////////
const Test = ({number,question,ResItem})=>{
    const [checked , setChecked] = useState(ResItem);
    useEffect(()=>{
      console.log('MyResItem' , ResItem);
      console.log('number' , number);
    },[number]);

    const setOneAnswer = (e) =>{
      console.log('e.target.value',e.target.value);
    }

    return(
        <div>
                <input
                  type="radio"
                  id={`optionOne${number}`}
                  name={number}
                  value={'1'}
                  onChange={e => setOneAnswer(e)}
                  // defaultChecked={ResItem == '1'}
                  // defaultChecked={ResItem != null && ResItem == '1' ? true : false}
                  // defaultChecked={checked == '1' ? true : false}
                  // checked={checked == '1' ? true : false}
                  defaultChecked={ResItem === '1' ? true : false}
                />
                <input
                  type="radio"
                  id={`optionTwo${number}`}
                  name={number}
                  // value={number < 9 ? `0${number + 1},2` : `${number + 1},2`}
                  value={'2'}
                  onChange={e => setOneAnswer(e)}
                  // checked={checked == '2' ? true : false}
                  // defaultChecked={ResItem == '2'}
                  defaultChecked={ResItem === '2' ? true : false}
                  // defaultChecked={checked == '2' ? true : false}
                />
                <input
                  type="radio"
                  id={`optionTree${number}`}
                  name={number}
                  // value={number < 9 ? `0${number + 1},3` : `${number + 1},3`}
                  value={'3'}
                  onChange={e => setOneAnswer(e)}
                  // checked={checked == '3' ? true : false}
                  defaultChecked={ResItem === '3' ? true : false}
                  // defaultChecked={checked == '3' ? true : false}
                  // defaultChecked={ResItem == '3'}
                  // defaultChecked={ResItem != null && ResItem == '3' ? true : false}
                  // defaultChecked={checked == '3' ? true : false}
                />
                <input
                  type="radio"
                  id={`optionFour${number}`}
                  name={number}
                  // value={number < 9 ? `0${number + 1},4` : `${number + 1},4`}
                  value={'4'}
                  onChange={e => setOneAnswer(e)}
                  // defaultChecked={ResItem == '4'}
                  // checked={checked == '4' ? true : false}
                  defaultChecked={ResItem === '4' ? true : false}
                  // defaultChecked={checked == '4' ? true : false}
                  // defaultChecked={ResItem != null && ResItem == '4' ? true : false}

                />
                
        </div>
    )
}

export default Test;