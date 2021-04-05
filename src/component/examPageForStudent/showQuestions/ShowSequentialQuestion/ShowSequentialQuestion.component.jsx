import React,{useEffect, useState} from "react";
import {SequentialConatiner,SequentialResContainer,SequentialItemConatiner,SequentialInput,SequentialInputContainer,SequentialNum,
    SequentialResInputContainer,SequentialResInput,SequentialResTitleContainer,SequentialResTitle} from './ShowSequentialQuestion.styles';
// import {DescriptiveContainer,DescriptiveQuestion,DescriptiveQuestionBox,DescriptiveDiv,ImageQuestion,ImageQuestionContainer,
//     ImageWithQuestionContainer , ImageWithQuestion,ScoreTag,ImageQuestionMainContainer} from './ShowDescriptiveQuestion.styles';
// import ExplainQuestion from '../../../explainQuestionComponent/explainQuestionComponent.component';
// import MyPic from '../../../../assets/img/images.jpg';
// import MyPic2 from '../../../../assets/img/image2.jpg';
import ShowBodyQuestions from '../showBodyQuestion.component';
/////////////



const SequentialItems = ({number,SeqItems})=>{

    const [resSeqQuestion,setResSeqQuestion] = useState(Array(SeqItems.length).fill(0).map(row => new Array(1).fill('')));

    // const handleChange = (e) =>{
    //     setResponseQuestion(e.target.value);
    // }
    useEffect(()=>{
        console.log('SeqItems',SeqItems)//فرستادن رندوم شده
    },[SeqItems]);

    const handleSetRes = (i , value) =>{
        
        var temp =[...resSeqQuestion];
        temp[i][0] = value;
        console.log('temp',temp);
        setResSeqQuestion(temp);
    }

    return(
        <SequentialConatiner>
             <SequentialItemConatiner>
            {
                SeqItems.length > 0 ? SeqItems.map((item,index) =>(
                    // console.log('item',item)
                    <SequentialInputContainer key={index}>
                        
                         <SequentialInput 
                        //  type="text" 
                        // value={item} 
                        // readOnly
                        // onChange={(e) => handleIndexSet(myIndex ,e.target.value)} 
                        ><SequentialNum>{index+ 1} )</SequentialNum> {item}</SequentialInput>
                    </SequentialInputContainer>
                )): ''
            }
            

            
        </SequentialItemConatiner>
        <SequentialResTitleContainer>
            <SequentialResTitle>شماره های موردنظر خود را به ترتیب در کادر های پایین وارد کنید</SequentialResTitle>
        </SequentialResTitleContainer>
        
        <SequentialResContainer>
            
                    
            {
                SeqItems.length > 0 ? SeqItems.map((item,index) =>(
                    // console.log('item',item)
                    <SequentialResInputContainer key={index}>
                        
                         <SequentialResInput type="number" 
                        value={resSeqQuestion[index] ? resSeqQuestion[index] : ''} 
                        // readOnly
                        onChange={(e) => handleSetRes(index ,e.target.value)} 
                        />
                    </SequentialResInputContainer>
                )): ''
            }
            </SequentialResContainer>
        </SequentialConatiner>
       
    )
}

const ShowSequentialQuestion = ({question, number , SeqItems}) =>{
    return(
        <ShowBodyQuestions question={question} number={number}><SequentialItems number={number} SeqItems={SeqItems} /></ShowBodyQuestions>
    )
};

export default ShowSequentialQuestion;