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

    const [resSeqQuestion,setResSeqQuestion] = useState(Array(items.length).fill(0).map(row => new Array(1).fill('')));

    // const handleChange = (e) =>{
    //     setResponseQuestion(e.target.value);
    // }
    useEffect(()=>{
        console.log('items',items)//فرستادن رندوم شده
    },[items]);

    useEffect(()=>{
        console.log('ResItem' ,ResItem);
        setResForRedux(ResItem);
    },[]);

    const handleSetRes = (i , value) =>{
        
        var temp =[...resSeqQuestion];
        temp[i][0] = value;
        console.log('temp',temp);
        setResForRedux(temp);
        setResSeqQuestion(temp);
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
                    var tempRes = ResItem[index];
                    console.log('tempRes', tempRes);
                    return(
                    // console.log('item',item)
                    <SequentialResInputContainer key={index}>
                        
                         <SequentialResInput type="number" 
                        // value={ tempRes? tempRes[0] : ''}
                        defaultValue={ tempRes ? tempRes[0] : ''}  
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
    return(
        <ShowBodyQuestions question={question} number={number}>
            <SequentialItems number={number} items={items} ResItem={ResItem ? ResItem : getResponseStudentWithIndex} />
        </ShowBodyQuestions>
    )
};

const mapStateToProps = createStructuredSelector({
    getResponseStudentWithIndex : (state, ownProps) => getResponseStudentWithIndex(ownProps.question.id)(state, ownProps),
  });

export default connect(mapStateToProps)(ShowSequentialQuestion);