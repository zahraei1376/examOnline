import React , {useState,useEffect} from 'react';
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
/////////////////////query
import { GET_QUESTIONS } from '../../graphql/resolver';
import { useQuery ,useMutation} from 'react-apollo';
/////////////////////////message
import MySnackbar from '../../messageBox/messageBox.component';

// const Item =[
// {
//     'question':' گلمممم گلممممسلام به همه دوستای گلمممم سلام به همه دوستای گلمممم سلام به همه دوستای گلمممم سلام به همه دوستای گلمممم سلام به همه دوستای گلمممم سلام به همه دوستای گلمممم سلام به همه دوستای گلمممم سلام به همه دوستای گلمممم',
//     'question_score':'2',
//     'question_explane':'توضیحات مربوط به امتحان درس ریاضی پایه اول',
//     'question_timeTosolveProblem':'20 دقیقه',
//     'exam_link':'https://www.woonwinkelhome.com/products/slim-pen-gold',
//     'items':[
//         ['توضیحات مربوط به امتحان درس ریاضی پایه دوم','توضیحات مربوط به امتحان درس ریاضی پایه اول'],
//         ['توضیحات مربوط به امتحان درس ریاضی پایه چهارم','توضیحات مربوط به امتحان درس ریاضی پایه سوم'],
//         ['توضیحات مربوط به امتحان درس ریاضی پایه ششم','توضیحات مربوط به امتحان درس ریاضی پایه پنجم'],
//         ['توضیحات مربوط به امتحان درس ریاضی پایه هشتم','توضیحات مربوط به امتحان درس ریاضی پایه هفتم'],
//         // [1,2],[3,4],[5,6],[7,8]
//     ],
//     'question_optionOne':'سلام',
//     'question_optionTwo':'hello',
//     'question_optionThree':'سلام',
//     'question_optionFour':'hello',
//     'SeqItems':[
//         ['توضیحات مربوط به امتحان درس ریاضی پایه اول'],
//         ['توضیحات مربوط به امتحان درس ریاضی پایه دوم'],
//         ['توضیحات مربوط به امتحان درس ریاضی پایه سوم'],
//         ['توضیحات مربوط به امتحان درس ریاضی پایه چهارم'],
//         ['توضیحات مربوط به امتحان درس ریاضی پایه پنجم '],
//         ['توضیحات مربوط به امتحان درس ریاضی پایه ششم'],
//         ['توضیحات مربوط به امتحان درس ریاضی پایه هفتم'],
//         ['توضیحات مربوط به امتحان درس ریاضی پایه هشتم'],
//         // [1,2],[3,4],[5,6],[7,8]
//     ],
//     'vancyItems':'سلام بر همه دوستان $%A و محترم عید $%A بر همه $%A مبارک باد',
//     'question_type':'1',
//     // 'vancyItems':'سلام بر همه دوستان $%A و محترم عید $%A بر همه $%A مبارک باد سلام بر همه دوستان $%A و محترم عید $%A بر همه $%A مبارک باد سلام بر همه دوستان $%A و محترم عید $%A بر همه $%A مبارک باد سلام بر همه دوستان $%A و محترم عید $%A بر همه $%A مبارک باد',
  
//     // 'question_optionThree':'hi',
//     // 'question_optionFour':'آنیو',
//     // 'question_link':'https://www.woonwinkelhome.com/products/slim-pen-gold',

// },
// {
//     'question':' وستای گلمممم سلام به همه دوستای گلمممم سلام به همه دوستای گلمممم',
//     'question_score':'2',
//     'question_explane':'توضیحات مربوط به امتحان درس ریاضی پایه اول',
//     'question_timeTosolveProblem':'20 دقیقه',
//     'exam_link':'https://www.woonwinkelhome.com/products/slim-pen-gold',
//     'items':[
//         ['توضیحات مربوط به امتحان درس ریاضی پایه دوم','توضیحات مربوط به امتحان درس ریاضی پایه اول'],
//         ['توضیحات مربوط به امتحان درس ریاضی پایه چهارم','توضیحات مربوط به امتحان درس ریاضی پایه سوم'],
//         ['توضیحات مربوط به امتحان درس ریاضی پایه ششم','توضیحات مربوط به امتحان درس ریاضی پایه پنجم'],
//         ['توضیحات مربوط به امتحان درس ریاضی پایه هشتم','توضیحات مربوط به امتحان درس ریاضی پایه هفتم'],
//         // [1,2],[3,4],[5,6],[7,8]
//     ],
//     'question_optionOne':'سلام',
//     'question_optionTwo':'hello',
//     'question_optionThree':'سلام',
//     'question_optionFour':'hello',
//     'SeqItems':[
//         ['توضیحات مربوط به امتحان درس ریاضی پایه اول'],
//         ['توضیحات مربوط به امتحان درس ریاضی پایه دوم'],
//         ['توضیحات مربوط به امتحان درس ریاضی پایه سوم'],
//         ['توضیحات مربوط به امتحان درس ریاضی پایه چهارم'],
//         ['توضیحات مربوط به امتحان درس ریاضی پایه پنجم '],
//         ['توضیحات مربوط به امتحان درس ریاضی پایه ششم'],
//         ['توضیحات مربوط به امتحان درس ریاضی پایه هفتم'],
//         ['توضیحات مربوط به امتحان درس ریاضی پایه هشتم'],
//         // [1,2],[3,4],[5,6],[7,8]
//     ],
//     'vancyItems':'سلام بر همه دوستان $%A و محترم عید $%A بر همه $%A مبارک باد',
//     'question_type':'2',
//     // 'vancyItems':'سلام بر همه دوستان $%A و محترم عید $%A بر همه $%A مبارک باد سلام بر همه دوستان $%A و محترم عید $%A بر همه $%A مبارک باد سلام بر همه دوستان $%A و محترم عید $%A بر همه $%A مبارک باد سلام بر همه دوستان $%A و محترم عید $%A بر همه $%A مبارک باد',
  
//     // 'question_optionThree':'hi',
//     // 'question_optionFour':'آنیو',
//     // 'question_link':'https://www.woonwinkelhome.com/products/slim-pen-gold',

// },
// {
//     'question':' گلمممم گلممممسلام به همه دوستای گلمممم سلام به همه دوستای گلمممم سلام به همه دوستای گلمممم سلام به همه دوستای گلمممم سلام به همه دوستای گلمممم سلام به همه دوستای گلمممم سلام به همه دوستای گلمممم سلام به همه دوستای گلمممم',
//     'question_score':'2',
//     'question_explane':'توضیحات مربوط به امتحان درس ریاضی پایه اول',
//     'question_timeTosolveProblem':'20 دقیقه',
//     'exam_link':'https://www.woonwinkelhome.com/products/slim-pen-gold',
//     'items':[
//         ['توضیحات مربوط به امتحان درس ریاضی پایه دوم','توضیحات مربوط به امتحان درس ریاضی پایه اول'],
//         ['توضیحات مربوط به امتحان درس ریاضی پایه چهارم','توضیحات مربوط به امتحان درس ریاضی پایه سوم'],
//         ['توضیحات مربوط به امتحان درس ریاضی پایه ششم','توضیحات مربوط به امتحان درس ریاضی پایه پنجم'],
//         ['توضیحات مربوط به امتحان درس ریاضی پایه هشتم','توضیحات مربوط به امتحان درس ریاضی پایه هفتم'],
//         // [1,2],[3,4],[5,6],[7,8]
//     ],
//     'question_optionOne':'سلام',
//     'question_optionTwo':'hello',
//     'question_optionThree':'سلام',
//     'question_optionFour':'hello',
//     'SeqItems':[
//         ['توضیحات مربوط به امتحان درس ریاضی پایه اول'],
//         ['توضیحات مربوط به امتحان درس ریاضی پایه دوم'],
//         ['توضیحات مربوط به امتحان درس ریاضی پایه سوم'],
//         ['توضیحات مربوط به امتحان درس ریاضی پایه چهارم'],
//         ['توضیحات مربوط به امتحان درس ریاضی پایه پنجم '],
//         ['توضیحات مربوط به امتحان درس ریاضی پایه ششم'],
//         ['توضیحات مربوط به امتحان درس ریاضی پایه هفتم'],
//         ['توضیحات مربوط به امتحان درس ریاضی پایه هشتم'],
//         // [1,2],[3,4],[5,6],[7,8]
//     ],
//     'vancyItems':'سلام بر همه دوستان $%A و محترم عید $%A بر همه $%A مبارک باد',
//     'question_type':'3',
//     // 'vancyItems':'سلام بر همه دوستان $%A و محترم عید $%A بر همه $%A مبارک باد سلام بر همه دوستان $%A و محترم عید $%A بر همه $%A مبارک باد سلام بر همه دوستان $%A و محترم عید $%A بر همه $%A مبارک باد سلام بر همه دوستان $%A و محترم عید $%A بر همه $%A مبارک باد',
  
//     // 'question_optionThree':'hi',
//     // 'question_optionFour':'آنیو',
//     // 'question_link':'https://www.woonwinkelhome.com/products/slim-pen-gold',

// },
// {
//     'question':' گلمممم گلممممسلام به همه دوستای گلمممم سلام به همه دوستای گلمممم سلام به همه دوستای گلمممم سلام به همه دوستای گلمممم سلام به همه دوستای گلمممم سلام به همه دوستای گلمممم سلام به همه دوستای گلمممم سلام به همه دوستای گلمممم',
//     'question_score':'2',
//     'question_explane':'توضیحات مربوط به امتحان درس ریاضی پایه اول',
//     'question_timeTosolveProblem':'20 دقیقه',
//     'exam_link':'https://www.woonwinkelhome.com/products/slim-pen-gold',
//     'items':[
//         ['توضیحات مربوط به امتحان درس ریاضی پایه دوم','توضیحات مربوط به امتحان درس ریاضی پایه اول'],
//         ['توضیحات مربوط به امتحان درس ریاضی پایه چهارم','توضیحات مربوط به امتحان درس ریاضی پایه سوم'],
//         ['توضیحات مربوط به امتحان درس ریاضی پایه ششم','توضیحات مربوط به امتحان درس ریاضی پایه پنجم'],
//         ['توضیحات مربوط به امتحان درس ریاضی پایه هشتم','توضیحات مربوط به امتحان درس ریاضی پایه هفتم'],
//         // [1,2],[3,4],[5,6],[7,8]
//     ],
//     'question_optionOne':'سلام',
//     'question_optionTwo':'hello',
//     'SeqItems':[
//         ['توضیحات مربوط به امتحان درس ریاضی پایه اول'],
//         ['توضیحات مربوط به امتحان درس ریاضی پایه دوم'],
//         ['توضیحات مربوط به امتحان درس ریاضی پایه سوم'],
//         ['توضیحات مربوط به امتحان درس ریاضی پایه چهارم'],
//         ['توضیحات مربوط به امتحان درس ریاضی پایه پنجم '],
//         ['توضیحات مربوط به امتحان درس ریاضی پایه ششم'],
//         ['توضیحات مربوط به امتحان درس ریاضی پایه هفتم'],
//         ['توضیحات مربوط به امتحان درس ریاضی پایه هشتم'],
//         // [1,2],[3,4],[5,6],[7,8]
//     ],
//     'vancyItems':'سلام بر همه دوستان $%A و محترم عید $%A بر همه $%A مبارک باد',
//     'question_type':'4',
//     // 'vancyItems':'سلام بر همه دوستان $%A و محترم عید $%A بر همه $%A مبارک باد سلام بر همه دوستان $%A و محترم عید $%A بر همه $%A مبارک باد سلام بر همه دوستان $%A و محترم عید $%A بر همه $%A مبارک باد سلام بر همه دوستان $%A و محترم عید $%A بر همه $%A مبارک باد',
  
//     // 'question_optionThree':'hi',
//     // 'question_optionFour':'آنیو',
//     // 'question_link':'https://www.woonwinkelhome.com/products/slim-pen-gold',

// },
// {
//     'question':' گلمممم گلممممسلام به همه دوستای گلمممم سلام به همه دوستای گلمممم سلام به همه دوستای گلمممم سلام به همه دوستای گلمممم سلام به همه دوستای گلمممم سلام به همه دوستای گلمممم سلام به همه دوستای گلمممم سلام به همه دوستای گلمممم',
//     'question_score':'2',
//     'question_explane':'توضیحات مربوط به امتحان درس ریاضی پایه اول',
//     'question_timeTosolveProblem':'20 دقیقه',
//     'exam_link':'https://www.woonwinkelhome.com/products/slim-pen-gold',
//     'items':[
//         ['توضیحات مربوط به امتحان درس ریاضی پایه دوم','توضیحات مربوط به امتحان درس ریاضی پایه اول'],
//         ['توضیحات مربوط به امتحان درس ریاضی پایه چهارم','توضیحات مربوط به امتحان درس ریاضی پایه سوم'],
//         ['توضیحات مربوط به امتحان درس ریاضی پایه ششم','توضیحات مربوط به امتحان درس ریاضی پایه پنجم'],
//         ['توضیحات مربوط به امتحان درس ریاضی پایه هشتم','توضیحات مربوط به امتحان درس ریاضی پایه هفتم'],
//         // [1,2],[3,4],[5,6],[7,8]
//     ],
//     'question_optionOne':'سلام',
//     'question_optionTwo':'hello',
//     'question_optionThree':'سلام',
//     'question_optionFour':'hello',
//     'SeqItems':[
//         ['توضیحات مربوط به امتحان درس ریاضی پایه اول'],
//         ['توضیحات مربوط به امتحان درس ریاضی پایه دوم'],
//         ['توضیحات مربوط به امتحان درس ریاضی پایه سوم'],
//         ['توضیحات مربوط به امتحان درس ریاضی پایه چهارم'],
//         ['توضیحات مربوط به امتحان درس ریاضی پایه پنجم '],
//         ['توضیحات مربوط به امتحان درس ریاضی پایه ششم'],
//         ['توضیحات مربوط به امتحان درس ریاضی پایه هفتم'],
//         ['توضیحات مربوط به امتحان درس ریاضی پایه هشتم'],
//         // [1,2],[3,4],[5,6],[7,8]
//     ],
//     'vancyItems':'سلام بر همه دوستان $%A و محترم عید $%A بر همه $%A مبارک باد',
//     'question_type':'5',
//     // 'vancyItems':'سلام بر همه دوستان $%A و محترم عید $%A بر همه $%A مبارک باد سلام بر همه دوستان $%A و محترم عید $%A بر همه $%A مبارک باد سلام بر همه دوستان $%A و محترم عید $%A بر همه $%A مبارک باد سلام بر همه دوستان $%A و محترم عید $%A بر همه $%A مبارک باد',
  
//     // 'question_optionThree':'hi',
//     // 'question_optionFour':'آنیو',
//     // 'question_link':'https://www.woonwinkelhome.com/products/slim-pen-gold',

// },
// {
//     'question':' گلمممم گلممممسلام به همه دوستای گلمممم سلام به همه دوستای گلمممم سلام به همه دوستای گلمممم سلام به همه دوستای گلمممم سلام به همه دوستای گلمممم سلام به همه دوستای گلمممم سلام به همه دوستای گلمممم سلام به همه دوستای گلمممم',
//     'question_score':'2',
//     'question_explane':'توضیحات مربوط به امتحان درس ریاضی پایه اول',
//     'question_timeTosolveProblem':'20 دقیقه',
//     'exam_link':'https://www.woonwinkelhome.com/products/slim-pen-gold',
//     'items':[
//         ['توضیحات مربوط به امتحان درس ریاضی پایه دوم','توضیحات مربوط به امتحان درس ریاضی پایه اول'],
//         ['توضیحات مربوط به امتحان درس ریاضی پایه چهارم','توضیحات مربوط به امتحان درس ریاضی پایه سوم'],
//         ['توضیحات مربوط به امتحان درس ریاضی پایه ششم','توضیحات مربوط به امتحان درس ریاضی پایه پنجم'],
//         ['توضیحات مربوط به امتحان درس ریاضی پایه هشتم','توضیحات مربوط به امتحان درس ریاضی پایه هفتم'],
//         // [1,2],[3,4],[5,6],[7,8]
//     ],
//     'question_optionOne':'سلام',
//     'question_optionTwo':'hello',
//     'question_optionThree':'سلام',
//     'question_optionFour':'hello',
//     'SeqItems':[
//         ['توضیحات مربوط به امتحان درس ریاضی پایه اول'],
//         ['توضیحات مربوط به امتحان درس ریاضی پایه دوم'],
//         ['توضیحات مربوط به امتحان درس ریاضی پایه سوم'],
//         ['توضیحات مربوط به امتحان درس ریاضی پایه چهارم'],
//         ['توضیحات مربوط به امتحان درس ریاضی پایه پنجم '],
//         ['توضیحات مربوط به امتحان درس ریاضی پایه ششم'],
//         ['توضیحات مربوط به امتحان درس ریاضی پایه هفتم'],
//         ['توضیحات مربوط به امتحان درس ریاضی پایه هشتم'],
//         // [1,2],[3,4],[5,6],[7,8]
//     ],
//     'vancyItems':'سلام بر همه دوستان $%A و محترم عید $%A بر همه $%A مبارک باد',
//     'question_type':'6',
//     // 'vancyItems':'سلام بر همه دوستان $%A و محترم عید $%A بر همه $%A مبارک باد سلام بر همه دوستان $%A و محترم عید $%A بر همه $%A مبارک باد سلام بر همه دوستان $%A و محترم عید $%A بر همه $%A مبارک باد سلام بر همه دوستان $%A و محترم عید $%A بر همه $%A مبارک باد',
  
//     // 'question_optionThree':'hi',
//     // 'question_optionFour':'آنیو',
//     // 'question_link':'https://www.woonwinkelhome.com/products/slim-pen-gold',

// },
// ]

const  ExamPageForStudent = ({questionIndex ,setLengthQuestions}) =>{
    ///////////////////////////////////////////////////
    const { loading, error, data ,refetch  } = useQuery(GET_QUESTIONS , {
        variables: {  userName: "211",
        password: "211",
        id: "607fd8fb3fb30a08d7ce1e53" },
        notifyOnNetworkStatusChange: true
    });
    ///////////////////////////////////////////////////
    const [items,setItems] = useState([]);
    const [showMessage,setShowMessage] = useState(false);
    const [message,setMessage] =useState('');
    const [status,setStatus] =useState(0);
    ///////////////////////////////////////////////////
    useEffect(()=>{
        console.log('data',data);
        if(data){
            setItems(MergeQuestions(data.examParents[0]));
        }
        else{
            setMessage('خطایی رخ داده مجددا تلاش کنید');
            setStatus('0');
            setShowMessage(!showMessage);
        }
       
    },[data]);
    ///////////////////////////////////////////////////
    const MergeQuestions = (examP) => {
        console.log('examP', examP );
        var mergeQ = [];
        var allQuestons = examP.examChild;
        for (let index = 0; index < allQuestons.length; index++) {
           var counterQuestionsParent = allQuestons[index].questionParent;
            if(counterQuestionsParent && counterQuestionsParent.length > 0){
              for (let j = 0; j < counterQuestionsParent.length; j++) {
                  console.log('allQuestons[index].questionParent[j]', allQuestons[index].questionParent[j] );
                  if(allQuestons[index].questionParent[j].questionChild && allQuestons[index].questionParent[j].questionChild.length > 0){
                    mergeQ.push(allQuestons[index].questionParent[j].questionChild[0]);
                  }
              }
                // console.log('allQuestons[index].questionParent', allQuestons[index].questionParent );
                // mergeQ.push(allQuestons[index].questionParent[0])
            }
        }
        console.log('mergeQ',mergeQ);
        setLengthQuestions(mergeQ.length);
        return mergeQ;
    }
    ///////////////////////////////////////////////////
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
    ///////////////////////////////////////////////////
    const createRandom = (len) =>{
        var second = Math.floor(Math.random() * len);
        return second;
    }
    ///////////////////////////////////////////////////
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
    ///////////////////////////////////////////////////
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
     ///////////////////////////////////////////////////
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
    ///////////////////////////////////////////////////
    return(
        <div style={{direction: 'rtl'}}>
            {/* <ShowDescriptiveQuestion question={Item[questionIndex]} number={48}/> */}
            {/* <ShowComparativeQuestion question={Item[questionIndex]} number={48} items={RandomArray(Item[questionIndex].items)} /> */}
            {/* <MultipleChoiceConatiner question={Item[questionIndex]} number={48}/> */}
            {/* <ShowTrueAndFalseQuestion question={Item[questionIndex]} number={48} /> */}
            {/* <ShowSequentialQuestion question={Item[questionIndex]} number={48} SeqItems={SeqRandomArray(Item[questionIndex].SeqItems)} /> */}
            {/* <ShowVacancyQuestion question={Item[questionIndex]} number={48} Vitems={Item[questionIndex].vancyItems}/> */}

            {(() => {
                if(items.length > 0){
                    if(items[questionIndex].question_type == '1'){
                        return <ShowDescriptiveQuestion question={items[questionIndex]} number={questionIndex}/> 
                    }else if(items[questionIndex].question_type == '5'){
                        return <ShowComparativeQuestion question={items[questionIndex]} number={questionIndex} items={RandomArray(items[questionIndex].question_compItems)} /> 
                    }
                    else if(items[questionIndex].question_type == '2'){
                        return <MultipleChoiceConatiner question={items[questionIndex]} number={questionIndex}/>
                    }
                    else if(items[questionIndex].question_type == '3'){
                        return <ShowTrueAndFalseQuestion question={items[questionIndex]} number={questionIndex} />
                    }
                    else if(items[questionIndex].question_type == '6'){
                        return <ShowSequentialQuestion question={items[questionIndex]} number={questionIndex} SeqItems={SeqRandomArray(items[questionIndex].question_seqItems)} />
                    }
                    else if(items[questionIndex].question_type == '4'){
                        return <ShowVacancyQuestion question={items[questionIndex]} number={questionIndex} Vitems={items[questionIndex].question_vancyItems}/>
                    }
                }
               
            })()}

            {
                showMessage ? <MySnackbar message={message} status={status} showMessage={showMessage} setShowMessage={setShowMessage} /> : ''
            }

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