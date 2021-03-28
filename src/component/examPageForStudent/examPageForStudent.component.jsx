import React from 'react';
import ShowDescriptiveQuestion from './showQuestions/ShowDescriptiveQuestion/ShowDescriptiveQuestion.component';

const Item ={
    'question':' گلمممم گلممممسلام به همه دوستای گلمممم سلام به همه دوستای گلمممم سلام به همه دوستای گلمممم سلام به همه دوستای گلمممم سلام به همه دوستای گلمممم سلام به همه دوستای گلمممم سلام به همه دوستای گلمممم سلام به همه دوستای گلمممم',
    'question__score':'2',
    'question__explane':'توضیحات مربوط به امتحان درس ریاضی پایه اول',
    'question__timeTosolveProblem':'20 دقیقه',
    'exam_link':'https://www.woonwinkelhome.com/products/slim-pen-gold',
    // 'question_link':'https://www.woonwinkelhome.com/products/slim-pen-gold',

}
const  ExamPageForStudent = () =>{
    return(
        <div>
            <ShowDescriptiveQuestion question={Item} number={48}/>
        </div>
    )
};


export default ExamPageForStudent;