import React , {useEffect} from 'react';
import ShowDescriptiveQuestion from './showQuestions/ShowDescriptiveQuestion/ShowDescriptiveQuestion.component';
import ShowComparativeQuestion from './showQuestions/ShowComparativeQuestion/ShowComparativeQuestion.component';
import MultipleChoiceConatiner from './showQuestions/ShowMultipleChoice/ShowMultipleChoice.component';
import ShowTrueAndFalseQuestion from './showQuestions/ShowTrueAndFalse/ShowTrueAndFalse.component';
import ShowSequentialQuestion from './showQuestions/ShowSequentialQuestion/ShowSequentialQuestion.component';
import ShowVacancyQuestion from './showQuestions/ShowVacancyQuestion/ShowVacancyuestion.component';
import {connect} from 'react-redux';
import {selectIndex} from '../../redux/questionIndex/questionIndex.selector';
import {setLengthQuestions} from '../../redux/questionIndex/questionIndex.sction';
import { createStructuredSelector} from 'reselect';

const Item =[
{
    'question':' گلمممم گلممممسلام به همه دوستای گلمممم سلام به همه دوستای گلمممم سلام به همه دوستای گلمممم سلام به همه دوستای گلمممم سلام به همه دوستای گلمممم سلام به همه دوستای گلمممم سلام به همه دوستای گلمممم سلام به همه دوستای گلمممم',
    'question__score':'2',
    'question__explane':'توضیحات مربوط به امتحان درس ریاضی پایه اول',
    'question__timeTosolveProblem':'20 دقیقه',
    'exam_link':'https://www.woonwinkelhome.com/products/slim-pen-gold',
    'items':[
        ['توضیحات مربوط به امتحان درس ریاضی پایه دوم','توضیحات مربوط به امتحان درس ریاضی پایه اول'],
        ['توضیحات مربوط به امتحان درس ریاضی پایه چهارم','توضیحات مربوط به امتحان درس ریاضی پایه سوم'],
        ['توضیحات مربوط به امتحان درس ریاضی پایه ششم','توضیحات مربوط به امتحان درس ریاضی پایه پنجم'],
        ['توضیحات مربوط به امتحان درس ریاضی پایه هشتم','توضیحات مربوط به امتحان درس ریاضی پایه هفتم'],
        // [1,2],[3,4],[5,6],[7,8]
    ],
    'question__optionOne':'سلام',
    'question__optionTwo':'hello',
    'question__optionTree':'سلام',
    'question__optionFour':'hello',
    'SeqItems':[
        ['توضیحات مربوط به امتحان درس ریاضی پایه اول'],
        ['توضیحات مربوط به امتحان درس ریاضی پایه دوم'],
        ['توضیحات مربوط به امتحان درس ریاضی پایه سوم'],
        ['توضیحات مربوط به امتحان درس ریاضی پایه چهارم'],
        ['توضیحات مربوط به امتحان درس ریاضی پایه پنجم '],
        ['توضیحات مربوط به امتحان درس ریاضی پایه ششم'],
        ['توضیحات مربوط به امتحان درس ریاضی پایه هفتم'],
        ['توضیحات مربوط به امتحان درس ریاضی پایه هشتم'],
        // [1,2],[3,4],[5,6],[7,8]
    ],
    'vancyItems':'سلام بر همه دوستان $%A و محترم عید $%A بر همه $%A مبارک باد',
    'question_type':'1',
    // 'vancyItems':'سلام بر همه دوستان $%A و محترم عید $%A بر همه $%A مبارک باد سلام بر همه دوستان $%A و محترم عید $%A بر همه $%A مبارک باد سلام بر همه دوستان $%A و محترم عید $%A بر همه $%A مبارک باد سلام بر همه دوستان $%A و محترم عید $%A بر همه $%A مبارک باد',
  
    // 'question__optionTree':'hi',
    // 'question__optionFour':'آنیو',
    // 'question_link':'https://www.woonwinkelhome.com/products/slim-pen-gold',

},
{
    'question':' وستای گلمممم سلام به همه دوستای گلمممم سلام به همه دوستای گلمممم',
    'question__score':'2',
    'question__explane':'توضیحات مربوط به امتحان درس ریاضی پایه اول',
    'question__timeTosolveProblem':'20 دقیقه',
    'exam_link':'https://www.woonwinkelhome.com/products/slim-pen-gold',
    'items':[
        ['توضیحات مربوط به امتحان درس ریاضی پایه دوم','توضیحات مربوط به امتحان درس ریاضی پایه اول'],
        ['توضیحات مربوط به امتحان درس ریاضی پایه چهارم','توضیحات مربوط به امتحان درس ریاضی پایه سوم'],
        ['توضیحات مربوط به امتحان درس ریاضی پایه ششم','توضیحات مربوط به امتحان درس ریاضی پایه پنجم'],
        ['توضیحات مربوط به امتحان درس ریاضی پایه هشتم','توضیحات مربوط به امتحان درس ریاضی پایه هفتم'],
        // [1,2],[3,4],[5,6],[7,8]
    ],
    'question__optionOne':'سلام',
    'question__optionTwo':'hello',
    'question__optionTree':'سلام',
    'question__optionFour':'hello',
    'SeqItems':[
        ['توضیحات مربوط به امتحان درس ریاضی پایه اول'],
        ['توضیحات مربوط به امتحان درس ریاضی پایه دوم'],
        ['توضیحات مربوط به امتحان درس ریاضی پایه سوم'],
        ['توضیحات مربوط به امتحان درس ریاضی پایه چهارم'],
        ['توضیحات مربوط به امتحان درس ریاضی پایه پنجم '],
        ['توضیحات مربوط به امتحان درس ریاضی پایه ششم'],
        ['توضیحات مربوط به امتحان درس ریاضی پایه هفتم'],
        ['توضیحات مربوط به امتحان درس ریاضی پایه هشتم'],
        // [1,2],[3,4],[5,6],[7,8]
    ],
    'vancyItems':'سلام بر همه دوستان $%A و محترم عید $%A بر همه $%A مبارک باد',
    'question_type':'2',
    // 'vancyItems':'سلام بر همه دوستان $%A و محترم عید $%A بر همه $%A مبارک باد سلام بر همه دوستان $%A و محترم عید $%A بر همه $%A مبارک باد سلام بر همه دوستان $%A و محترم عید $%A بر همه $%A مبارک باد سلام بر همه دوستان $%A و محترم عید $%A بر همه $%A مبارک باد',
  
    // 'question__optionTree':'hi',
    // 'question__optionFour':'آنیو',
    // 'question_link':'https://www.woonwinkelhome.com/products/slim-pen-gold',

},
{
    'question':' گلمممم گلممممسلام به همه دوستای گلمممم سلام به همه دوستای گلمممم سلام به همه دوستای گلمممم سلام به همه دوستای گلمممم سلام به همه دوستای گلمممم سلام به همه دوستای گلمممم سلام به همه دوستای گلمممم سلام به همه دوستای گلمممم',
    'question__score':'2',
    'question__explane':'توضیحات مربوط به امتحان درس ریاضی پایه اول',
    'question__timeTosolveProblem':'20 دقیقه',
    'exam_link':'https://www.woonwinkelhome.com/products/slim-pen-gold',
    'items':[
        ['توضیحات مربوط به امتحان درس ریاضی پایه دوم','توضیحات مربوط به امتحان درس ریاضی پایه اول'],
        ['توضیحات مربوط به امتحان درس ریاضی پایه چهارم','توضیحات مربوط به امتحان درس ریاضی پایه سوم'],
        ['توضیحات مربوط به امتحان درس ریاضی پایه ششم','توضیحات مربوط به امتحان درس ریاضی پایه پنجم'],
        ['توضیحات مربوط به امتحان درس ریاضی پایه هشتم','توضیحات مربوط به امتحان درس ریاضی پایه هفتم'],
        // [1,2],[3,4],[5,6],[7,8]
    ],
    'question__optionOne':'سلام',
    'question__optionTwo':'hello',
    'question__optionTree':'سلام',
    'question__optionFour':'hello',
    'SeqItems':[
        ['توضیحات مربوط به امتحان درس ریاضی پایه اول'],
        ['توضیحات مربوط به امتحان درس ریاضی پایه دوم'],
        ['توضیحات مربوط به امتحان درس ریاضی پایه سوم'],
        ['توضیحات مربوط به امتحان درس ریاضی پایه چهارم'],
        ['توضیحات مربوط به امتحان درس ریاضی پایه پنجم '],
        ['توضیحات مربوط به امتحان درس ریاضی پایه ششم'],
        ['توضیحات مربوط به امتحان درس ریاضی پایه هفتم'],
        ['توضیحات مربوط به امتحان درس ریاضی پایه هشتم'],
        // [1,2],[3,4],[5,6],[7,8]
    ],
    'vancyItems':'سلام بر همه دوستان $%A و محترم عید $%A بر همه $%A مبارک باد',
    'question_type':'3',
    // 'vancyItems':'سلام بر همه دوستان $%A و محترم عید $%A بر همه $%A مبارک باد سلام بر همه دوستان $%A و محترم عید $%A بر همه $%A مبارک باد سلام بر همه دوستان $%A و محترم عید $%A بر همه $%A مبارک باد سلام بر همه دوستان $%A و محترم عید $%A بر همه $%A مبارک باد',
  
    // 'question__optionTree':'hi',
    // 'question__optionFour':'آنیو',
    // 'question_link':'https://www.woonwinkelhome.com/products/slim-pen-gold',

},
{
    'question':' گلمممم گلممممسلام به همه دوستای گلمممم سلام به همه دوستای گلمممم سلام به همه دوستای گلمممم سلام به همه دوستای گلمممم سلام به همه دوستای گلمممم سلام به همه دوستای گلمممم سلام به همه دوستای گلمممم سلام به همه دوستای گلمممم',
    'question__score':'2',
    'question__explane':'توضیحات مربوط به امتحان درس ریاضی پایه اول',
    'question__timeTosolveProblem':'20 دقیقه',
    'exam_link':'https://www.woonwinkelhome.com/products/slim-pen-gold',
    'items':[
        ['توضیحات مربوط به امتحان درس ریاضی پایه دوم','توضیحات مربوط به امتحان درس ریاضی پایه اول'],
        ['توضیحات مربوط به امتحان درس ریاضی پایه چهارم','توضیحات مربوط به امتحان درس ریاضی پایه سوم'],
        ['توضیحات مربوط به امتحان درس ریاضی پایه ششم','توضیحات مربوط به امتحان درس ریاضی پایه پنجم'],
        ['توضیحات مربوط به امتحان درس ریاضی پایه هشتم','توضیحات مربوط به امتحان درس ریاضی پایه هفتم'],
        // [1,2],[3,4],[5,6],[7,8]
    ],
    'question__optionOne':'سلام',
    'question__optionTwo':'hello',
    'SeqItems':[
        ['توضیحات مربوط به امتحان درس ریاضی پایه اول'],
        ['توضیحات مربوط به امتحان درس ریاضی پایه دوم'],
        ['توضیحات مربوط به امتحان درس ریاضی پایه سوم'],
        ['توضیحات مربوط به امتحان درس ریاضی پایه چهارم'],
        ['توضیحات مربوط به امتحان درس ریاضی پایه پنجم '],
        ['توضیحات مربوط به امتحان درس ریاضی پایه ششم'],
        ['توضیحات مربوط به امتحان درس ریاضی پایه هفتم'],
        ['توضیحات مربوط به امتحان درس ریاضی پایه هشتم'],
        // [1,2],[3,4],[5,6],[7,8]
    ],
    'vancyItems':'سلام بر همه دوستان $%A و محترم عید $%A بر همه $%A مبارک باد',
    'question_type':'4',
    // 'vancyItems':'سلام بر همه دوستان $%A و محترم عید $%A بر همه $%A مبارک باد سلام بر همه دوستان $%A و محترم عید $%A بر همه $%A مبارک باد سلام بر همه دوستان $%A و محترم عید $%A بر همه $%A مبارک باد سلام بر همه دوستان $%A و محترم عید $%A بر همه $%A مبارک باد',
  
    // 'question__optionTree':'hi',
    // 'question__optionFour':'آنیو',
    // 'question_link':'https://www.woonwinkelhome.com/products/slim-pen-gold',

},
{
    'question':' گلمممم گلممممسلام به همه دوستای گلمممم سلام به همه دوستای گلمممم سلام به همه دوستای گلمممم سلام به همه دوستای گلمممم سلام به همه دوستای گلمممم سلام به همه دوستای گلمممم سلام به همه دوستای گلمممم سلام به همه دوستای گلمممم',
    'question__score':'2',
    'question__explane':'توضیحات مربوط به امتحان درس ریاضی پایه اول',
    'question__timeTosolveProblem':'20 دقیقه',
    'exam_link':'https://www.woonwinkelhome.com/products/slim-pen-gold',
    'items':[
        ['توضیحات مربوط به امتحان درس ریاضی پایه دوم','توضیحات مربوط به امتحان درس ریاضی پایه اول'],
        ['توضیحات مربوط به امتحان درس ریاضی پایه چهارم','توضیحات مربوط به امتحان درس ریاضی پایه سوم'],
        ['توضیحات مربوط به امتحان درس ریاضی پایه ششم','توضیحات مربوط به امتحان درس ریاضی پایه پنجم'],
        ['توضیحات مربوط به امتحان درس ریاضی پایه هشتم','توضیحات مربوط به امتحان درس ریاضی پایه هفتم'],
        // [1,2],[3,4],[5,6],[7,8]
    ],
    'question__optionOne':'سلام',
    'question__optionTwo':'hello',
    'question__optionTree':'سلام',
    'question__optionFour':'hello',
    'SeqItems':[
        ['توضیحات مربوط به امتحان درس ریاضی پایه اول'],
        ['توضیحات مربوط به امتحان درس ریاضی پایه دوم'],
        ['توضیحات مربوط به امتحان درس ریاضی پایه سوم'],
        ['توضیحات مربوط به امتحان درس ریاضی پایه چهارم'],
        ['توضیحات مربوط به امتحان درس ریاضی پایه پنجم '],
        ['توضیحات مربوط به امتحان درس ریاضی پایه ششم'],
        ['توضیحات مربوط به امتحان درس ریاضی پایه هفتم'],
        ['توضیحات مربوط به امتحان درس ریاضی پایه هشتم'],
        // [1,2],[3,4],[5,6],[7,8]
    ],
    'vancyItems':'سلام بر همه دوستان $%A و محترم عید $%A بر همه $%A مبارک باد',
    'question_type':'5',
    // 'vancyItems':'سلام بر همه دوستان $%A و محترم عید $%A بر همه $%A مبارک باد سلام بر همه دوستان $%A و محترم عید $%A بر همه $%A مبارک باد سلام بر همه دوستان $%A و محترم عید $%A بر همه $%A مبارک باد سلام بر همه دوستان $%A و محترم عید $%A بر همه $%A مبارک باد',
  
    // 'question__optionTree':'hi',
    // 'question__optionFour':'آنیو',
    // 'question_link':'https://www.woonwinkelhome.com/products/slim-pen-gold',

},
{
    'question':' گلمممم گلممممسلام به همه دوستای گلمممم سلام به همه دوستای گلمممم سلام به همه دوستای گلمممم سلام به همه دوستای گلمممم سلام به همه دوستای گلمممم سلام به همه دوستای گلمممم سلام به همه دوستای گلمممم سلام به همه دوستای گلمممم',
    'question__score':'2',
    'question__explane':'توضیحات مربوط به امتحان درس ریاضی پایه اول',
    'question__timeTosolveProblem':'20 دقیقه',
    'exam_link':'https://www.woonwinkelhome.com/products/slim-pen-gold',
    'items':[
        ['توضیحات مربوط به امتحان درس ریاضی پایه دوم','توضیحات مربوط به امتحان درس ریاضی پایه اول'],
        ['توضیحات مربوط به امتحان درس ریاضی پایه چهارم','توضیحات مربوط به امتحان درس ریاضی پایه سوم'],
        ['توضیحات مربوط به امتحان درس ریاضی پایه ششم','توضیحات مربوط به امتحان درس ریاضی پایه پنجم'],
        ['توضیحات مربوط به امتحان درس ریاضی پایه هشتم','توضیحات مربوط به امتحان درس ریاضی پایه هفتم'],
        // [1,2],[3,4],[5,6],[7,8]
    ],
    'question__optionOne':'سلام',
    'question__optionTwo':'hello',
    'question__optionTree':'سلام',
    'question__optionFour':'hello',
    'SeqItems':[
        ['توضیحات مربوط به امتحان درس ریاضی پایه اول'],
        ['توضیحات مربوط به امتحان درس ریاضی پایه دوم'],
        ['توضیحات مربوط به امتحان درس ریاضی پایه سوم'],
        ['توضیحات مربوط به امتحان درس ریاضی پایه چهارم'],
        ['توضیحات مربوط به امتحان درس ریاضی پایه پنجم '],
        ['توضیحات مربوط به امتحان درس ریاضی پایه ششم'],
        ['توضیحات مربوط به امتحان درس ریاضی پایه هفتم'],
        ['توضیحات مربوط به امتحان درس ریاضی پایه هشتم'],
        // [1,2],[3,4],[5,6],[7,8]
    ],
    'vancyItems':'سلام بر همه دوستان $%A و محترم عید $%A بر همه $%A مبارک باد',
    'question_type':'6',
    // 'vancyItems':'سلام بر همه دوستان $%A و محترم عید $%A بر همه $%A مبارک باد سلام بر همه دوستان $%A و محترم عید $%A بر همه $%A مبارک باد سلام بر همه دوستان $%A و محترم عید $%A بر همه $%A مبارک باد سلام بر همه دوستان $%A و محترم عید $%A بر همه $%A مبارک باد',
  
    // 'question__optionTree':'hi',
    // 'question__optionFour':'آنیو',
    // 'question_link':'https://www.woonwinkelhome.com/products/slim-pen-gold',

},
]

const  ExamPageForStudent = ({questionIndex ,setLengthQuestions}) =>{

    useEffect(()=>{
        setLengthQuestions(Item.length)
    },[])

    const existence = (list , item) => {
        var flag=false;
        for (let j = 0; j < list.length; j++) {
            if(list[j] === item){
                flag=true;
            }
            
        }

        if(!flag){
            // temp.push(second);
            return true;
        }else{
            return false;
        }
    }

    const createRandom = (len) =>{
        var second = Math.floor(Math.random() * len);
        return second;
    }

    const RandomArray = (list) =>{
        var newItem = Array(list.length).fill(0).map(row => new Array(2).fill(''))
        var temp =[];
       for (let index = 0; index < list.length; index++) {
           newItem[index][0]=list[index][0];
        //    console.log('element1',list[index][0]);
           var randomItem = createRandom(list.length);
           if(existence(temp,randomItem)){
                temp.push(randomItem);
                var element2 = list[randomItem][1];
                newItem[index][1]=element2;
           }else{
                index --;
           }
       }
    //    console.log('newItem',newItem);
       return newItem;
    }

    const SeqExistence = (list , item) => {
        var flag=false;
        for (let j = 0; j < list.length; j++) {
            if(list[j] === item){
                flag=true;
            }
            
        }

        if(!flag){
            // temp.push(second);
            return true;
        }else{
            return false;
        }
    }
     
    const SeqRandomArray = (list) =>{
        var newItem = [];
        var temp =[];
       for (let index = 0; index <  list.length; index++) {
           var randomItem = createRandom(list.length);
        //    console.log('randomItem',randomItem);
           if(SeqExistence(temp,randomItem)){
                temp.push(randomItem);
                // console.log('randomItem',randomItem);
                newItem.push(list[randomItem]);
                // var element2 = list[randomItem][1];
                // newItem[index][1]=element2;
           }else{
                index --;
           }
       }
       console.log('newItem',newItem);
       return newItem;
    }

    return(
        <div>
            {/* <ShowDescriptiveQuestion question={Item[questionIndex]} number={48}/> */}
            {/* <ShowComparativeQuestion question={Item[questionIndex]} number={48} items={RandomArray(Item[questionIndex].items)} /> */}
            {/* <MultipleChoiceConatiner question={Item[questionIndex]} number={48}/> */}
            {/* <ShowTrueAndFalseQuestion question={Item[questionIndex]} number={48} /> */}
            {/* <ShowSequentialQuestion question={Item[questionIndex]} number={48} SeqItems={SeqRandomArray(Item[questionIndex].SeqItems)} /> */}
            {/* <ShowVacancyQuestion question={Item[questionIndex]} number={48} Vitems={Item[questionIndex].vancyItems}/> */}

            {(() => {
                if(Item[questionIndex].question_type == '1'){
                    return <ShowDescriptiveQuestion question={Item[questionIndex]} number={questionIndex}/> 
                }else if(Item[questionIndex].question_type == '2'){
                    return <ShowComparativeQuestion question={Item[questionIndex]} number={questionIndex} items={RandomArray(Item[questionIndex].items)} /> 
                }
                else if(Item[questionIndex].question_type == '3'){
                    return <MultipleChoiceConatiner question={Item[questionIndex]} number={questionIndex}/>
                }
                else if(Item[questionIndex].question_type == '4'){
                    return <ShowTrueAndFalseQuestion question={Item[questionIndex]} number={questionIndex} />
                }
                else if(Item[questionIndex].question_type == '5'){
                    return <ShowSequentialQuestion question={Item[questionIndex]} number={questionIndex} SeqItems={SeqRandomArray(Item[questionIndex].SeqItems)} />
                }
                else if(Item[questionIndex].question_type == '6'){
                    return <ShowVacancyQuestion question={Item[questionIndex]} number={questionIndex} Vitems={Item[questionIndex].vancyItems}/>
                }
            })()}

        </div>
    )
};

const mapStateToProps = createStructuredSelector({
    questionIndex:selectIndex
});

const mapDispatchToProps = dispatch =>({
    setLengthQuestions: len => dispatch(setLengthQuestions(len)),
})

export default connect(mapStateToProps ,mapDispatchToProps)(ExamPageForStudent);