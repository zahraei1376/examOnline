import React from 'react';
import Test from './mytest';
const item = [
    {
        number:0,
        ResItem: '1',
    },
    {
        number:1,
        ResItem: '3',
    }
]
const MyParentTest = () =>{
    return (
        <div>
                {
                    item.map(ii =>(
                        <Test  number={ii.number} ResItem={ii.ResItem} />
                    ))
                }
        </div>
    )
};

export default MyParentTest;