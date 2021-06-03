import React,{useEffect, useState} from "react";
import {SequentialConatiner,SequentialResContainer,SequentialItemConatiner,SequentialInput,SequentialInputContainer,SequentialNum,
    SequentialResInputContainer,SequentialResInput,SequentialResTitleContainer,SequentialResTitle} from './ShowSequentialQuestionForArchive.styles';
// import {DescriptiveContainer,DescriptiveQuestion,DescriptiveQuestionBox,DescriptiveDiv,ImageQuestion,ImageQuestionContainer,
//     ImageWithQuestionContainer , ImageWithQuestion,ScoreTag,ImageQuestionMainContainer} from './ShowDescriptiveQuestion.styles';
// import ExplainQuestion from '../../../explainQuestionComponent/explainQuestionComponent.component';
// import MyPic from '../../../../assets/img/images.jpg';
// import MyPic2 from '../../../../assets/img/image2.jpg';
import ShowBodyQuestionsForArchive from '../showBodyQuestionForArchive.component';
/////////////



const SequentialItemsForArchive = ({number,items , SeqResponse})=>{

    // const [resSeqQuestion,setResSeqQuestion] = useState(Array(items.question_SeqItems.length).fill(0).map(row => new Array(1).fill('')));

    // const handleChange = (e) =>{
    //     setResponseQuestion(e.target.value);
    // }
    // useEffect(()=>{
    //     console.log('items',items)
    // },[items]);
    // exam_SeqResponse
    // const handleSetRes = (i , value) =>{
        
    //     var temp =[...resSeqQuestion];
    //     temp[i][0] = value;
    //     console.log('temp',temp);
    //     setResSeqQuestion(temp);
    // }

    return(
        <SequentialConatiner>
             <SequentialItemConatiner>
            {
                
                // items.question_seqItems && items.question_seqItems.length > 0 ? items.question_seqItems.map((item,index) =>(
                    items && items.length > 0 ? items.map((item,index) =>(
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
            <SequentialResTitle>شماره های موردنظر به ترتیب در کادر های پایین وارد شده اند</SequentialResTitle>
        </SequentialResTitleContainer>
        
        <SequentialResContainer>
            
                    
            {
                // items.question_seqItems && items.question_seqItems.length > 0 ? items.question_seqItems.map((item,index) =>{
                    items && items.length > 0 ? items.map((item,index) =>{
                    var res = SeqResponse[index];
                     console.log('ressssssssssssssssssssssssssss',res[1])
                    return(
                   
                    <SequentialResInputContainer key={index}>
                        
                        <SequentialResInput type="text" 
                            value={res ? res[0] : ''} 
                            readOnly
                        // onChange={(e) => handleSetRes(index ,e.target.value)} 
                        />
                    </SequentialResInputContainer>
                )}): ''
            }
            </SequentialResContainer>
        </SequentialConatiner>
       
    )
}

const ShowSequentialQuestionForArchive = ({question, number,type ,responseQuestion }) =>{
    useEffect(()=>{
        console.log('responseQuestion.response_sequentialQuestionRandom',responseQuestion.response_sequentialQuestion);
    })
    return(
        <ShowBodyQuestionsForArchive myType={type} question={question} number={number} responseScore = {responseQuestion ? responseQuestion.response_score : ''}>
            <SequentialItemsForArchive number={number} 
            // items={question} 
            items={responseQuestion && responseQuestion.response_sequentialQuestionRandom && responseQuestion.response_sequentialQuestionRandom.length > 0 ? responseQuestion.response_sequentialQuestionRandom : question.question_seqItems} 
            // items={responseQuestion ? responseQuestion.response_sequentialQuestionRandom : ''} 
            SeqResponse={responseQuestion ? responseQuestion.response_sequentialQuestion : ''}
            // SeqResponse={responseQuestion ? responseQuestion.response_sequentialQuestionRandom : ''}
             />
        </ShowBodyQuestionsForArchive>
    )
};

export default ShowSequentialQuestionForArchive;