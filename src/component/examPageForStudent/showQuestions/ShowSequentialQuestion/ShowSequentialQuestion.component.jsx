import React,{useEffect, useState} from "react";
import {SequentialConatiner,SequentialResContainer,SequentialItemConatiner,SequentialInput,SequentialInputContainer,SequentialNum,
    SequentialResInputContainer,SequentialResInput,SequentialResTitleContainer,SequentialResTitle} from './ShowSequentialQuestion.styles';
// import {DescriptiveContainer,DescriptiveQuestion,DescriptiveQuestionBox,DescriptiveDiv,ImageQuestion,ImageQuestionContainer,
//     ImageWithQuestionContainer , ImageWithQuestion,ScoreTag,ImageQuestionMainContainer} from './ShowDescriptiveQuestion.styles';
// import ExplainQuestion from '../../../explainQuestionComponent/explainQuestionComponent.component';
// import MyPic from '../../../../assets/img/images.jpg';
// import MyPic2 from '../../../../assets/img/image2.jpg';
import ShowBodyQuestions from '../showBodyQuestion.component';
/////////////////////////////////////////////////
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { getResponseStudentWithIndex } from '../../../../redux/responsesStudent/responsesStudent.selector';
/////////////////////////////////////////////////



const SequentialItems = ({number,items ,ResItem ,setResForRedux})=>{

    // const [resSeqQuestion,setResSeqQuestion] = useState(Array(items.length).fill(0).map(row => new Array(1).fill('')));
    const [resSeqQuestion,setResSeqQuestion] = useState(null);
    const [myRes , setMyRes] = useState('');

    // useEffect(()=>{
    //     console.log('items',items)//فرستادن رندوم شده
    // },[items]);

    useEffect(()=>{
        // console.log('ResItem' ,ResItem);
        // setResSeqQuestion();
        // setResForRedux(ResItem);
        // for (let index = 0; index < items.length; index++) {
        //     var temp = [...resSeqQuestion];
        //     var tempRes = ResItem && ResItem.length > 0 ? ResItem[index] : '';
        //     if(tempRes){
        //         temp[index][0] = tempRes[0];
        //         console.log('temp',temp);
        //         setResForRedux(temp);
        //         setResSeqQuestion(temp);
        //         setMyRes(temp);
        //     }else{
        //         setResForRedux('');
        //         setResSeqQuestion(Array(items.length).fill(0).map(row => new Array(1).fill('')));
        //         setMyRes('');
        //     }
            
            
        // }
        ///////////////////////////////////////
        var temp = Array(items.length).fill(0).map(row => new Array(1).fill(''));
        for (let index = 0; index < items.length; index++) {  
            var tempRes = ResItem && ResItem.length > 0 ? ResItem[index] : '';
            if(tempRes){
                temp[index][0] = tempRes[0];
            }
            else{
                temp[index][0] = '';
            }
        }
        setResForRedux(temp);
        setResSeqQuestion(temp);
        setMyRes(temp);
    },[ResItem]);


    const handleSetRes = (i , value) =>{
        var temp = [...resSeqQuestion];
        temp[i][0] = value;
        // console.log('temp',temp);
        setResForRedux(temp);
        setResSeqQuestion(temp);
        setMyRes(temp);
    }

    return(
        <SequentialConatiner>
             <SequentialItemConatiner>
            {
                items.length > 0 ? items.map((item,index) =>(
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
                items.length > 0 ? items.map((item,index) =>{
                    var tempRes = myRes[index];
                    // console.log('tempRes', tempRes);
                    return(
                    // console.log('item',item)
                    <SequentialResInputContainer key={index}>
                        
                         <SequentialResInput type="number" 
                        // value={ tempRes? tempRes[0] : ''}
                        value={ tempRes ? tempRes[0] : ''}  
                        // readOnly
                        onChange={(e) => handleSetRes(index ,e.target.value)} 
                        />
                    </SequentialResInputContainer>
                )}): ''
            }
            </SequentialResContainer>
        </SequentialConatiner>
       
    )
}

const ShowSequentialQuestion = ({question, number , items , ResItem , getResponseStudentWithIndex}) =>{
    // useEffect(()=>{
    //     console.log('seqResItem',ResItem);
    //     console.log('getResponseStudentWithIndex',getResponseStudentWithIndex);
    // })
    return(
        <ShowBodyQuestions question={question} number={number}>

            {/* {setResForRedux => (
               <SequentialItems number={number} setResForRedux={setResForRedux} items={items} ResItem={ResItem ? ResItem : getResponseStudentWithIndex} />
            )} */}

            <SequentialItems number={number} items={items} 
            ResItem={getResponseStudentWithIndex  ? getResponseStudentWithIndex : ResItem}
            // ResItem={ResItem && ResItem.length > 0  ? ResItem : getResponseStudentWithIndex}
             />
            
        </ShowBodyQuestions>
    )
};

const mapStateToProps = createStructuredSelector({
    getResponseStudentWithIndex : (state, ownProps) => getResponseStudentWithIndex(ownProps.question.id)(state, ownProps),
});

export default connect(mapStateToProps)(ShowSequentialQuestion);