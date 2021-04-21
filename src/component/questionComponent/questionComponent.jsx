import React ,{useState , useEffect} from "react";
import MaterialTable from 'material-table';
import CustomEditComponent from './innerQuestion.jsx';
import DescriptiveQuestion from './descriptiveQuestion/descriptiveQuestion.component';
import MultipleChoice from './multipleChoice/multipleChoice.component';
import TrueAndFalse from './trueAndFalse/trueAndFalse.component';
import Comparative from './Comparative/Comparative.component';//تطبیقی
import Vacancy from './Vacancy/Vacancy.component';//جای خالی
import Sequential from './Sequential/Sequential.component';//ترتیبی
import {QuestionImageIconContainer ,QuestionImageIcon ,QuestionImageIconText,QuestionImageIconTextV} from './questionComponent.styles';
// import DeleteIcon from '../../assets/img/iconDelete.png';
import descriptiveIcon from '../../assets/img/descriptiveQuestion.png';
import descriptiveIcon2 from '../../assets/img/descriptiveQuestion2.png';
import multiChoice from '../../assets/img/multiChoice.png';
import multiChoice2 from '../../assets/img/multiChoice2.png';
import trueFalse from '../../assets/img/trueFalse.png';
import trueFalse2 from '../../assets/img/trueFalse2.png';
import ellipsis from '../../assets/img/ellipsis.png';
import ellipsis2 from '../../assets/img/ellipsis2.png';
import compareIcon from '../../assets/img/compare.png';
import compareIcon2 from '../../assets/img/compare2.png';
import SequentialIcon from '../../assets/img/SequentialIcon.png';
import SequentialIcon2 from '../../assets/img/SequentialIcon2.png';
///////////////////////////////////////////////
import {connect} from 'react-redux';
import { createStructuredSelector} from 'reselect';
import {ToggleQuestion} from '../../redux/toggleQuesion/toggleQuestion.selector';
// import setToggle from "../../redux/toggleQuesion/toggleQuestion.action.js";

/////////////////////////query
import { gql } from 'apollo-boost';
import { useQuery ,useMutation} from 'react-apollo';
import { GET_QUESTIONS } from '../../graphql/resolver';
/////////////////////////query

export var loadVariable = {
  load:false,
  // disable:false,
};
const graphql_server_uri = '/graphql';

const SET_QUESTIONPARENT = gql`
  mutation addQuestionParent(
    $userName: String!,
    $password: String!,
    $ecId: String!,
    ){
      addQuestionParent(
          userName: $userName,
          password: $password,
          ecId: $ecId
      ){
        id
      }
  }
`;

const SET_QUESTION_CHILD = gql`
  mutation addQuestionChild(
      $userName: String!,
      $password: String!,
      $qpId: String!,
      $question: String!,
      $question_score: String!,
      $question_explain: String!,
      $question_timeToSolveProblem: String!,
      $question_correctOption: String!,
      $question_optionOne: String!,
      $question_optionTwo: String!,
      $question_optionThree: String!,
      $question_optionFour: String!,
      $question_link: String!,
      $exam_link: String!,
      $question_type: String!,
      $question_seqItems: [String]!,
      $question_vancyItems: String!,
      $question_compItems: [String]!,
      ){
      addQuestionChild(
        userName: $userName,
        password: $password,
        qpId: $qpId,
        question: $question,
        question_score: $question_score,
        question_explain: $question_explain,
        question_timeToSolveProblem: $question_timeToSolveProblem,
        question_correctOption: $question_correctOption,
        question_optionOne: $question_optionOne,
        question_optionTwo: $question_optionTwo,
        question_optionThree: $question_optionThree,
        question_optionFour: $question_optionFour,
        question_link: $question_link,
        exam_link: $exam_link,
        question_type: $question_type,
        question_seqItems: $question_seqItems,
        question_vancyItems: $question_vancyItems,
        question_compItems: $question_compItems,
      ){
        id
      }
  }
`;

const Questions = ({toggle ,selectedCourseName}) =>{
  // const [innerData, setInnerData] = useState([]);
  // const tableRef = React.useRef(null);
  const [setQuestionParent ,{ QuestionParentData }] = useMutation(SET_QUESTIONPARENT);
  const { loading, error, data ,refetch  } = useQuery(GET_QUESTIONS , {
    variables: {  userName: "211",
    password: "211",
    id: "607fd8fb3fb30a08d7ce1e53" },
  });
  //   variables: {   
  //       userName: "211",
  //       password: "211",
  //       ecId: "607fd8fb3fb30a08d7ce1e53"
  //   }
  //   // notifyOnNetworkStatusChange: true,
  // });
  // const [getQuestions] = useQuery(GET_QUESTIONS);
  
  // const [setQuestionChild ,{ QuestionChildData }] = useMutation(SET_QUESTION_CHILD);
  const [typeQuestion,setTypeQuestion] =useState('');

  useEffect(()=>{
    // fetchData();
    console.log('loading' , loading);
    console.log('error' , error);
    console.log('getQuestions' , data);
    setData(data ? data.examParents[0].examChild[0].questionParent : []);
    
  } , [data])
  ///////////////////////////////////
  async function fetchData(){
    // getQuestions({ variables: { 
    //   userName: "211",
    //   password: "211",
    //   ecId: "607d4cdc5eb775051823bd58"
    //   } 
    // }).then(res=>{
    //   if(res.data && res.data.getQuestions){
    //     setData(res.data.getQuestions)
    //     // console.log('data',data);
    //     // setMessage('امتحان ثبت شد');
    //     // setStatus('1');
    //     // setShowMessage(!showMessage);
    //   }else{
    //     // console.log('data',data);
    //     // setStatus('0')
    //     // setMessage('امتحان ثبت نشد')
    //     // setShowMessage(!showMessage);
    //   }
    // })
    ///////////////////////////////////
  }
  ///////////////////////////////////////////////
  const handleFetchData = ()=>{
    refetch()
      // fetchData();
  }
  ///////////////////////////////////////////////
  const [QuestionsData, setData] = useState([
  //   {
  //     'question':' گلمممم گلممممسلام به همه دوستای گلمممم سلام به همه دوستای گلمممم سلام به همه دوستای گلمممم سلام به همه دوستای گلمممم سلام به همه دوستای گلمممم سلام به همه دوستای گلمممم سلام به همه دوستای گلمممم سلام به همه دوستای گلمممم',
  //     'question_score':'2',
  //     'question_explane':'توضیحات مربوط به امتحان درس ریاضی پایه اول',
  //     'question_timeToSolveProblem':'20 دقیقه',
  //     'exam_link':'https://www.woonwinkelhome.com/products/slim-pen-gold',//with question
  //     // 'question_link':'https://www.woonwinkelhome.com/products/slim-pen-gold',//replace question
  //     'question_compItems':[
  //         ['توضیحات مربوط به امتحان درس ریاضی پایه دوم','توضیحات مربوط به امتحان درس ریاضی پایه اول'],
  //         ['توضیحات مربوط به امتحان درس ریاضی پایه چهارم','توضیحات مربوط به امتحان درس ریاضی پایه سوم'],
  //         ['توضیحات مربوط به امتحان درس ریاضی پایه ششم','توضیحات مربوط به امتحان درس ریاضی پایه پنجم'],
  //         ['توضیحات مربوط به امتحان درس ریاضی پایه هشتم','توضیحات مربوط به امتحان درس ریاضی پایه هفتم'],
  //         // [1,2],[3,4],[5,6],[7,8]
  //     ],
  //     // 'StudentItem':'2',
  //     'question_correctOption':'1',
  //     'question_optionOne':'سلام',
  //     'question_optionTwo':'hello',
  //     'question_optionThree':'سلام',
  //     'question_optionFour':'hello',
  //     'question_SeqItems':[
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
  //     // 'exam_SeqResponse':[[0,2],[1,1],[2,4],[3,3]],
  //     'question_vancyItems':'سلام بر همه دوستان $%A و محترم عید $%A بر همه $%A مبارک باد',
  //     // 'exam_vancyRes':[[0,'گلم'],[1,'نوروز'],[2,'مردم']],
  //     'question_type':'1',
  //     //////////////////////////////////////////
  //     'response_descriptionImageLink':'https://www.woonwinkelhome.com/products/slim-pen-gold',
  //     'response_sequentialQuestion':[[0,2],[1,1],[2,4],[3,3]],
  //     'response_studentItem':'2',//true
  //     'response_comparativeQuestion':[[0,1],[1,1],[2,1],[3,1]],//comparative
  //     'response_descriptionQuestion':'گلمممم گلممممسلام به همه دوستای گلمممم سلام به همه دوستای گلمممم سلام به همه دوستای گلمممم سلام به همه دوستای گلمممم سلام به همه دوستای گلمممم سلام به همه دوستای گلمممم سلام ',
  //     'response_vancyQuestion':[[0,'گلم'],[1,'نوروز'],[2,'مردم']],//vancy
  //     'response_score':'2'
  //     ////////////////////////////////////////
  //     // 'resItems':[[0,1],[1,1],[2,1],[3,1]],
  //     // 'exam_descriptionResImageLink':'https://www.woonwinkelhome.com/products/slim-pen-gold',
  //     // 'question_link':'https://www.woonwinkelhome.com/products/slim-pen-gold',
  
  // },
  // {
  //     'question':' گلمممم گلممممسلام به همه دوستای گلمممم سلام به همه دوستای گلمممم سلام به همه دوستای گلمممم سلام به همه دوستای گلمممم سلام به همه دوستای گلمممم سلام به همه دوستای گلمممم سلام به همه دوستای گلمممم سلام به همه دوستای گلمممم',
  //     'question_score':'2',
  //     'question_explane':'توضیحات مربوط به امتحان درس ریاضی پایه اول',
  //     'question_timeToSolveProblem':'20 دقیقه',
  //     'exam_link':'https://www.woonwinkelhome.com/products/slim-pen-gold',
  //     'question_compItems':[
  //         ['توضیحات مربوط به امتحان درس ریاضی پایه دوم','توضیحات مربوط به امتحان درس ریاضی پایه اول'],
  //         ['توضیحات مربوط به امتحان درس ریاضی پایه چهارم','توضیحات مربوط به امتحان درس ریاضی پایه سوم'],
  //         ['توضیحات مربوط به امتحان درس ریاضی پایه ششم','توضیحات مربوط به امتحان درس ریاضی پایه پنجم'],
  //         ['توضیحات مربوط به امتحان درس ریاضی پایه هشتم','توضیحات مربوط به امتحان درس ریاضی پایه هفتم'],
  //         // [1,2],[3,4],[5,6],[7,8]
  //     ],
  //     // 'StudentItem':'2',
  //     'question_correctOption':'1',
  //     'question_optionOne':'سلام',
  //     'question_optionTwo':'hello',
  //     'question_optionThree':'سلام',
  //     'question_optionFour':'hello',
  //     'question_SeqItems':[
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
  //     // 'exam_SeqResponse':[[0,2],[1,1],[2,4],[3,3]],
  //     'question_vancyItems':'سلام بر همه دوستان $%A و محترم عید $%A بر همه $%A مبارک باد',
  //     // 'exam_vancyRes':[[0,'گلم'],[1,'نوروز'],[2,'مردم']],
  //     'question_type':'2',
  //     //////////////////////////////////////////
  //     'response_descriptionImageLink':'https://www.woonwinkelhome.com/products/slim-pen-gold',
  //     'response_sequentialQuestion':[[0,2],[1,1],[2,4],[3,3]],
  //     'response_studentItem':'2',//true
  //     'response_comparativeQuestion':[[0,1],[1,1],[2,1],[3,1]],//comparative
  //     'response_descriptionQuestion':'گلمممم گلممممسلام به همه دوستای گلمممم سلام به همه دوستای گلمممم سلام به همه دوستای گلمممم سلام به همه دوستای گلمممم سلام به همه دوستای گلمممم سلام به همه دوستای گلمممم سلام ',
  //     'response_vancyQuestion':[[0,'گلم'],[1,'نوروز'],[2,'مردم']],//vancy
  //     'response_score':'2'
  //     ////////////////////////////////////////
  //     // 'resItems':[[0,1],[1,1],[2,1],[3,1]],
  //     // 'exam_descriptionResImageLink':'https://www.woonwinkelhome.com/products/slim-pen-gold',
  //     // 'exam_descriptionRes':'گلمممم گلممممسلام به همه دوستای گلمممم سلام به همه دوستای گلمممم سلام به همه دوستای گلمممم سلام به همه دوستای گلمممم سلام به همه دوستای گلمممم سلام به همه دوستای گلمممم سلام ',
  //     // 'vancyItems':'سلام بر همه دوستان $%A و محترم عید $%A بر همه $%A مبارک باد سلام بر همه دوستان $%A و محترم عید $%A بر همه $%A مبارک باد سلام بر همه دوستان $%A و محترم عید $%A بر همه $%A مبارک باد سلام بر همه دوستان $%A و محترم عید $%A بر همه $%A مبارک باد',
    
  //     // 'question_optionThree':'hi',
  //     // 'question_optionFour':'آنیو',
  //     // 'question_link':'https://www.woonwinkelhome.com/products/slim-pen-gold',
  
  // },
  // {
  //     'question':' گلمممم گلممممسلام به همه دوستای گلمممم سلام به همه دوستای گلمممم سلام به همه دوستای گلمممم سلام به همه دوستای گلمممم سلام به همه دوستای گلمممم سلام به همه دوستای گلمممم سلام به همه دوستای گلمممم سلام به همه دوستای گلمممم',
  //     'question_score':'2',
  //     'question_explane':'توضیحات مربوط به امتحان درس ریاضی پایه اول',
  //     'question_timeToSolveProblem':'20 دقیقه',
  //     'exam_link':'https://www.woonwinkelhome.com/products/slim-pen-gold',
  //     'question_compItems':[
  //         ['توضیحات مربوط به امتحان درس ریاضی پایه دوم','توضیحات مربوط به امتحان درس ریاضی پایه اول'],
  //         ['توضیحات مربوط به امتحان درس ریاضی پایه چهارم','توضیحات مربوط به امتحان درس ریاضی پایه سوم'],
  //         ['توضیحات مربوط به امتحان درس ریاضی پایه ششم','توضیحات مربوط به امتحان درس ریاضی پایه پنجم'],
  //         ['توضیحات مربوط به امتحان درس ریاضی پایه هشتم','توضیحات مربوط به امتحان درس ریاضی پایه هفتم'],
  //         // [1,2],[3,4],[5,6],[7,8]
  //     ],
  //     // 'StudentItem':'2',
  //     'question_correctOption':'1',
  //     'question_optionOne':'سلام',
  //     'question_optionTwo':'hello',
  //     'question_optionThree':'سلام',
  //     'question_optionFour':'hello',
  //     'question_SeqItems':[
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
  //     // 'exam_SeqResponse':[[0,2],[1,1],[2,4],[3,3]],
  //     'question_vancyItems':'سلام بر همه دوستان $%A و محترم عید $%A بر همه $%A مبارک باد',
  //     // 'exam_vancyRes':[[0,'گلم'],[1,'نوروز'],[2,'مردم']],
  //     'question_type':'3',
  //     //////////////////////////////////////////
  //     'response_descriptionImageLink':'https://www.woonwinkelhome.com/products/slim-pen-gold',
  //     'response_sequentialQuestion':[[0,2],[1,1],[2,4],[3,3]],
  //     'response_studentItem':'2',//true
  //     'response_comparativeQuestion':[[0,1],[1,1],[2,1],[3,1]],//comparative
  //     'response_descriptionQuestion':'گلمممم گلممممسلام به همه دوستای گلمممم سلام به همه دوستای گلمممم سلام به همه دوستای گلمممم سلام به همه دوستای گلمممم سلام به همه دوستای گلمممم سلام به همه دوستای گلمممم سلام ',
  //     'response_vancyQuestion':[[0,'گلم'],[1,'نوروز'],[2,'مردم']],//vancy
  //     'response_score':'2'
  //     ////////////////////////////////////////
  //     // 'resItems':[[0,1],[1,1],[2,1],[3,1]],
  //     // 'exam_descriptionResImageLink':'https://www.woonwinkelhome.com/products/slim-pen-gold',
  //     // 'exam_descriptionRes':'گلمممم گلممممسلام به همه دوستای گلمممم سلام به همه دوستای گلمممم سلام به همه دوستای گلمممم سلام به همه دوستای گلمممم سلام به همه دوستای گلمممم سلام به همه دوستای گلمممم سلام ',
  //     // 'vancyItems':'سلام بر همه دوستان $%A و محترم عید $%A بر همه $%A مبارک باد سلام بر همه دوستان $%A و محترم عید $%A بر همه $%A مبارک باد سلام بر همه دوستان $%A و محترم عید $%A بر همه $%A مبارک باد سلام بر همه دوستان $%A و محترم عید $%A بر همه $%A مبارک باد',
    
  //     // 'question_optionThree':'hi',
  //     // 'question_optionFour':'آنیو',
  //     // 'question_link':'https://www.woonwinkelhome.com/products/slim-pen-gold',
  
  // },
  // {
  //     'question':' گلمممم گلممممسلام به همه دوستای گلمممم سلام به همه دوستای گلمممم سلام به همه دوستای گلمممم سلام به همه دوستای گلمممم سلام به همه دوستای گلمممم سلام به همه دوستای گلمممم سلام به همه دوستای گلمممم سلام به همه دوستای گلمممم',
  //     'question_score':'2',
  //     'question_explane':'توضیحات مربوط به امتحان درس ریاضی پایه اول',
  //     'question_timeToSolveProblem':'20 دقیقه',
  //     'exam_link':'https://www.woonwinkelhome.com/products/slim-pen-gold',
  //     'question_compItems':[
  //         ['توضیحات مربوط به امتحان درس ریاضی پایه دوم','توضیحات مربوط به امتحان درس ریاضی پایه اول'],
  //         ['توضیحات مربوط به امتحان درس ریاضی پایه چهارم','توضیحات مربوط به امتحان درس ریاضی پایه سوم'],
  //         ['توضیحات مربوط به امتحان درس ریاضی پایه ششم','توضیحات مربوط به امتحان درس ریاضی پایه پنجم'],
  //         ['توضیحات مربوط به امتحان درس ریاضی پایه هشتم','توضیحات مربوط به امتحان درس ریاضی پایه هفتم'],
  //         // [1,2],[3,4],[5,6],[7,8]
  //     ],
  //     // 'StudentItem':'2',
  //     'question_correctOption':'1',
  //     'question_optionOne':'سلام',
  //     'question_optionTwo':'hello',
  //     'question_optionThree':'سلام',
  //     'question_optionFour':'hello',
  //     'question_SeqItems':[
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
  //     // 'exam_SeqResponse':[[0,2],[1,1],[2,4],[3,3]],
  //     'question_vancyItems':'سلام بر همه دوستان $%A و محترم عید $%A بر همه $%A مبارک باد',
  //     // 'exam_vancyRes':[[0,'گلم'],[1,'نوروز'],[2,'مردم']],
  //     'question_type':'4',
  //     //////////////////////////////////////////
  //     'response_descriptionImageLink':'https://www.woonwinkelhome.com/products/slim-pen-gold',
  //     'response_sequentialQuestion':[[0,2],[1,1],[2,4],[3,3]],
  //     'response_studentItem':'2',//true
  //     'response_comparativeQuestion':[[0,1],[1,1],[2,1],[3,1]],//comparative
  //     'response_descriptionQuestion':'گلمممم گلممممسلام به همه دوستای گلمممم سلام به همه دوستای گلمممم سلام به همه دوستای گلمممم سلام به همه دوستای گلمممم سلام به همه دوستای گلمممم سلام به همه دوستای گلمممم سلام ',
  //     'response_vancyQuestion':[[0,'گلم'],[1,'نوروز'],[2,'مردم']],//vancy
  //     'response_score':'2'
  //     ////////////////////////////////////////
  //     // 'resItems':[[0,1],[1,1],[2,1],[3,1]],
  //     // 'exam_descriptionResImageLink':'https://www.woonwinkelhome.com/products/slim-pen-gold',
  //     // 'exam_descriptionRes':'گلمممم گلممممسلام به همه دوستای گلمممم سلام به همه دوستای گلمممم سلام به همه دوستای گلمممم سلام به همه دوستای گلمممم سلام به همه دوستای گلمممم سلام به همه دوستای گلمممم سلام ',
  //     // 'vancyItems':'سلام بر همه دوستان $%A و محترم عید $%A بر همه $%A مبارک باد سلام بر همه دوستان $%A و محترم عید $%A بر همه $%A مبارک باد سلام بر همه دوستان $%A و محترم عید $%A بر همه $%A مبارک باد سلام بر همه دوستان $%A و محترم عید $%A بر همه $%A مبارک باد',
    
  //     // 'question_optionThree':'hi',
  //     // 'question_optionFour':'آنیو',
  //     // 'question_link':'https://www.woonwinkelhome.com/products/slim-pen-gold',
  
  // },
  // {
  //     'question':' گلمممم گلممممسلام به همه دوستای گلمممم سلام به همه دوستای گلمممم سلام به همه دوستای گلمممم سلام به همه دوستای گلمممم سلام به همه دوستای گلمممم سلام به همه دوستای گلمممم سلام به همه دوستای گلمممم سلام به همه دوستای گلمممم',
  //     'question_score':'2',
  //     'question_explane':'توضیحات مربوط به امتحان درس ریاضی پایه اول',
  //     'question_timeToSolveProblem':'20 دقیقه',
  //     'exam_link':'https://www.woonwinkelhome.com/products/slim-pen-gold',
  //     'question_compItems':[
  //         ['توضیحات مربوط به امتحان درس ریاضی پایه دوم','توضیحات مربوط به امتحان درس ریاضی پایه اول'],
  //         ['توضیحات مربوط به امتحان درس ریاضی پایه چهارم','توضیحات مربوط به امتحان درس ریاضی پایه سوم'],
  //         ['توضیحات مربوط به امتحان درس ریاضی پایه ششم','توضیحات مربوط به امتحان درس ریاضی پایه پنجم'],
  //         ['توضیحات مربوط به امتحان درس ریاضی پایه هشتم','توضیحات مربوط به امتحان درس ریاضی پایه هفتم'],
  //         // [1,2],[3,4],[5,6],[7,8]
  //     ],
  //     // 'StudentItem':'2',
  //     'question_correctOption':'1',
  //     'question_optionOne':'سلام',
  //     'question_optionTwo':'hello',
  //     'question_optionThree':'سلام',
  //     'question_optionFour':'hello',
  //     'question_SeqItems':[
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
  //     // 'exam_SeqResponse':[[0,2],[1,1],[2,4],[3,3]],
  //     'question_vancyItems':'سلام بر همه دوستان $%A و محترم عید $%A بر همه $%A مبارک باد',
  //     // 'exam_vancyRes':[[0,'گلم'],[1,'نوروز'],[2,'مردم']],
  //     'question_type':'5',
  //     //////////////////////////////////////////
  //     'response_descriptionImageLink':'https://www.woonwinkelhome.com/products/slim-pen-gold',
  //     'response_sequentialQuestion':[[0,2],[1,1],[2,4],[3,3]],
  //     'response_studentItem':'2',//true
  //     'response_comparativeQuestion':[[0,1],[1,1],[2,1],[3,1]],//comparative
  //     'response_descriptionQuestion':'گلمممم گلممممسلام به همه دوستای گلمممم سلام به همه دوستای گلمممم سلام به همه دوستای گلمممم سلام به همه دوستای گلمممم سلام به همه دوستای گلمممم سلام به همه دوستای گلمممم سلام ',
  //     'response_vancyQuestion':[[0,'گلم'],[1,'نوروز'],[2,'مردم']],//vancy
  //     'response_score':'2'
  //     ////////////////////////////////////////
  //     // 'resItems':[[0,1],[1,1],[2,1],[3,1]],
  //     // 'exam_descriptionResImageLink':'https://www.woonwinkelhome.com/products/slim-pen-gold',
  //     // 'exam_descriptionRes':'گلمممم گلممممسلام به همه دوستای گلمممم سلام به همه دوستای گلمممم سلام به همه دوستای گلمممم سلام به همه دوستای گلمممم سلام به همه دوستای گلمممم سلام به همه دوستای گلمممم سلام ',
  //     // 'vancyItems':'سلام بر همه دوستان $%A و محترم عید $%A بر همه $%A مبارک باد سلام بر همه دوستان $%A و محترم عید $%A بر همه $%A مبارک باد سلام بر همه دوستان $%A و محترم عید $%A بر همه $%A مبارک باد سلام بر همه دوستان $%A و محترم عید $%A بر همه $%A مبارک باد',
    
  //     // 'question_optionThree':'hi',
  //     // 'question_optionFour':'آنیو',
  //     // 'question_link':'https://www.woonwinkelhome.com/products/slim-pen-gold',
  
  // },
  // {
  //     'question':' گلمممم گلممممسلام به همه دوستای گلمممم سلام به همه دوستای گلمممم سلام به همه دوستای گلمممم سلام به همه دوستای گلمممم سلام به همه دوستای گلمممم سلام به همه دوستای گلمممم سلام به همه دوستای گلمممم سلام به همه دوستای گلمممم',
  //     'question_score':'2',
  //     'question_explane':'توضیحات مربوط به امتحان درس ریاضی پایه اول',
  //     'question_timeToSolveProblem':'20 دقیقه',
  //     'exam_link':'https://www.woonwinkelhome.com/products/slim-pen-gold',
  //     'question_compItems':[
  //         ['توضیحات مربوط به امتحان درس ریاضی پایه دوم','توضیحات مربوط به امتحان درس ریاضی پایه اول'],
  //         ['توضیحات مربوط به امتحان درس ریاضی پایه چهارم','توضیحات مربوط به امتحان درس ریاضی پایه سوم'],
  //         ['توضیحات مربوط به امتحان درس ریاضی پایه ششم','توضیحات مربوط به امتحان درس ریاضی پایه پنجم'],
  //         ['توضیحات مربوط به امتحان درس ریاضی پایه هشتم','توضیحات مربوط به امتحان درس ریاضی پایه هفتم'],
  //         // [1,2],[3,4],[5,6],[7,8]
  //     ],
  //     // 'StudentItem':'2',
  //     'question_correctOption':'1',
  //     'question_optionOne':'سلام',
  //     'question_optionTwo':'hello',
  //     'question_optionThree':'سلام',
  //     'question_optionFour':'hello',
  //     'question_SeqItems':[
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
  //     // 'exam_SeqResponse':[[0,2],[1,1],[2,4],[3,3]],
  //     'question_vancyItems':'سلام بر همه دوستان $%A و محترم عید $%A بر همه $%A مبارک باد',
  //     // 'exam_vancyRes':[[0,'گلم'],[1,'نوروز'],[2,'مردم']],
  //     'question_type':'6',
  //     //////////////////////////////////////////
  //     'response_descriptionImageLink':'https://www.woonwinkelhome.com/products/slim-pen-gold',
  //     'response_sequentialQuestion':[[0,2],[1,1],[2,4],[3,3]],
  //     'response_studentItem':'2',//true
  //     'response_comparativeQuestion':[[0,1],[1,1],[2,1],[3,1]],//comparative
  //     'response_descriptionQuestion':'گلمممم گلممممسلام به همه دوستای گلمممم سلام به همه دوستای گلمممم سلام به همه دوستای گلمممم سلام به همه دوستای گلمممم سلام به همه دوستای گلمممم سلام به همه دوستای گلمممم سلام ',
  //     'response_vancyQuestion':[[0,'گلم'],[1,'نوروز'],[2,'مردم']],//vancy
  //     'response_score':'2'
  //     ////////////////////////////////////////
  //     // 'resItems':[[0,1],[1,1],[2,1],[3,1]],
  //     // 'exam_descriptionResImageLink':'https://www.woonwinkelhome.com/products/slim-pen-gold',
  //     // 'exam_descriptionRes':'گلمممم گلممممسلام به همه دوستای گلمممم سلام به همه دوستای گلمممم سلام به همه دوستای گلمممم سلام به همه دوستای گلمممم سلام به همه دوستای گلمممم سلام به همه دوستای گلمممم سلام ',
  //     // 'vancyItems':'سلام بر همه دوستان $%A و محترم عید $%A بر همه $%A مبارک باد سلام بر همه دوستان $%A و محترم عید $%A بر همه $%A مبارک باد سلام بر همه دوستان $%A و محترم عید $%A بر همه $%A مبارک باد سلام بر همه دوستان $%A و محترم عید $%A بر همه $%A مبارک باد',
    
  //     // 'question_optionThree':'hi',
  //     // 'question_optionFour':'آنیو',
  //     // 'question_link':'https://www.woonwinkelhome.com/products/slim-pen-gold',
  
  // },
  ]);
  /////////////////////////////////////////

  function createArray(item){
    var tempAray=[];
    tempAray.push(item);
    return tempAray;
  }
  const [selectedRow, setSelectedRow] = useState(null);

  // useEffect(()=>{
  //     console.log('toggle',toggle);
  // },[toggle])
    
  return (
    <MaterialTable
     style={{direction:'rtl'}}
    // dir="rtl"
      title="سوالات"
      // tableRef={tableRef}
      // onRowClick={((evt, selectedRow) => setSelectedRow(selectedRow.tableData.id))}
      options={{
        // actionsColumnIndex: -1,
        search: false,
        // paging: false,
            // search: false,
            // toolbar:false,
        actionsColumnIndex: -1,
        // tableLayout: "auto", 
        actionsCellStyle:{
          padding:'0 40px',
        },
        toolbarButtonAlignment:"right", // here is the option to change toolbar buttons' alignment
        cellStyle: {
          textAlign:'center',
        },
        headerStyle: {
          textAlign:'center',
        },
        // toolbarStyle:{
        //   backgroundColor:'#000',
        // }
        
        // rowStyle: rowData => ({
        //   border: (selectedRow === rowData.tableData.id) ? '1px solid #ff6542' : '1px solid inherit'
        // })
        // rowStyle: rowData => ({
        //   backgroundColor: this.state.selected && rowData.tableData.id === this.state.selectedRowId 
        //   ?   '#000'
        //       : "#fff" 
        //   })
      }}

      // localization={{
      //   body: {
      //     AddRow: {
      //       saveTooltip: "Salvar",
      //       cancelTooltip: "Cancelar",
      //       AddText: "Tem certeza que deseja deletar este registro?"
      //     },
      //     // addTooltip: "Adicionar",
      //     // deleteTooltip: "Deletar",
      //     // editTooltip: "Editar"
      //   },
      //   // header: {
      //   //   actions: 'Acciones',
      //   // }
      // }}
      
      columns={[
        { title: 'آیدی سوال', field: 'questionID', 
        // editComponent: props => (
        //   <TextField
        //     style={{ minWidth: '500px', textAlign:'right',direction:'rtl' }}
        //     value={props.value}
        //     // defaultValue=""
        //     fullWidth={true}
        //     // multiline={true}
        //   //   var newQuestion = newData.question
        //   //             ? newData.question.split('\r\n').join('%0A')
        //   //             : '';
        //   //           var newQuestion2 = newQuestion
        //   //             ? newQuestion.split('\n').join('%0A')
        //   //             : '';
        //     // onChange={e => {props.onChange(e.target.value)}}
        //   />
        // ),
        // render: data => {
        //   // return moment(data.group_start_time).format('HH:mm:00');
        //   return (
        //     <pre
        //       style={{
        //         fontSize: '20px',
        //         wordBreak: 'break-word',
        //         overflowWrap: 'break-word',
        //         whiteSpace: 'pre-wrap',
        //         textAlign: 'center',
        //         width: '500px',
        //         fontFamily: 'BNazanin',
        //         fontSize: 16,
        //         float:'right',
        //       }}
        //     >
        //       {/* {data.question} */}
        //     </pre>
        //   );
        // }, 
      },
      ]}

      data={QuestionsData}
      detailPanel={[
        (rowData)=>({
          disabled:toggle,
          // disabled:rowData.question_type == '1' ? false :true,
          icon: () => rowData.question_type != '1' ? (<QuestionImageIconContainer><QuestionImageIcon src={descriptiveIcon}/>
          {/* <QuestionImageIconText>تشریحی</QuestionImageIconText> */}
          </QuestionImageIconContainer>) : (<QuestionImageIconContainer><QuestionImageIcon src={descriptiveIcon2}/>
            {/* <QuestionImageIconTextV>تشریحی</QuestionImageIconTextV> */}
            </QuestionImageIconContainer>),
          openIcon: () => (<QuestionImageIconContainer><QuestionImageIcon src={descriptiveIcon2}/>
            {/* <QuestionImageIconTextV>تشریحی</QuestionImageIconTextV> */}
            </QuestionImageIconContainer>),
          // tooltip: 'سوال تشریحی',
          // tooltip: toggle ? 'سوال تشریحی' : null,
          render: rowData => {
            return (
              <div
                style={{
                  // fontSize: 100,
                  textAlign: 'center',
                  // color: 'white',
                  // backgroundColor: '#E53935',
                }}
              >
                {/* {rowData.question} */}
                {(() => {
                    setTypeQuestion(1);
                    // setSelectedRow(rowData.tableData.id);
                    return <DescriptiveQuestion selectedCourseName={selectedCourseName} handleFetchData={handleFetchData} rowData={createArray(rowData)} typeQuestion={typeQuestion} />
                })()}
              </div>
            )
          },
        }),
        (rowData)=>({
          disabled:toggle,
          // disabled:rowData.question_type == '2' ? false :true,
          // disabled: typeQuestion == 2 ? false : toggle,
          // icon: () => (<QuestionImageIconContainer src={multiChoice}/>),
          icon: () =>rowData.question_type != '3' ? (<QuestionImageIconContainer><QuestionImageIcon src={multiChoice}/>
          {/* <QuestionImageIconText>چهار گزینه ای</QuestionImageIconText> */}
          </QuestionImageIconContainer>) 
          :
          (<QuestionImageIconContainer><QuestionImageIcon src={multiChoice2}/>
            {/* <QuestionImageIconTextV>چهار گزینه ای</QuestionImageIconTextV> */}
            </QuestionImageIconContainer>),
          // tooltip: 'سوال چهار گزینه ای',
          // tooltip: toggle ? 'سوال چهار گزینه ای' : null,
          openIcon: () => (<QuestionImageIconContainer><QuestionImageIcon src={multiChoice2}/>
            {/* <QuestionImageIconTextV>چهار گزینه ای</QuestionImageIconTextV> */}
            </QuestionImageIconContainer>),
          render: rowData => {
            return (
              <div
                style={{
                  // fontSize: 100,
                  textAlign: 'center',
                  // color: 'white',
                  // backgroundColor: '#43A047',
                }}
              >
                {(() => {
                  setTypeQuestion(2);
                  // setSelectedRow(rowData.tableData.id);
                    return <MultipleChoice selectedCourseName={selectedCourseName} handleFetchData={handleFetchData} rowData={createArray(rowData)} typeQuestion={typeQuestion}/>
                })()}

              </div>
            )
          },
        }),
        (rowData)=>({
          disabled:toggle,
          // disabled:rowData.question_type == '3' ? false :true,
          // disabled: typeQuestion == 3 ? false : toggle,
          // icon: () => (<QuestionImageIconContainer src={trueFalse}/>),
          icon: () => rowData.question_type != '4' ? (<QuestionImageIconContainer><QuestionImageIcon src={trueFalse}/>
          {/* <QuestionImageIconText>دو گزینه ای</QuestionImageIconText> */}
          </QuestionImageIconContainer>)
          :
          (<QuestionImageIconContainer><QuestionImageIcon src={trueFalse2}/>
            {/* <QuestionImageIconTextV>دو گزینه ای</QuestionImageIconTextV> */}
            </QuestionImageIconContainer>),
          openIcon: () => (<QuestionImageIconContainer><QuestionImageIcon src={trueFalse2}/>
            {/* <QuestionImageIconTextV>دو گزینه ای</QuestionImageIconTextV> */}
            </QuestionImageIconContainer>),
          // tooltip: 'سوال دو گزینه ای',
          // tooltip: toggle ? 'سوال دو گزینه ای' : null,
          render: rowData => {
            return (
              <div
                style={{
                  // fontSize: 100,
                  textAlign: 'center',
                  // color: 'white',
                  // backgroundColor: '#FDD835',
                }}
              >
                {/* {rowData.question} {rowData.axamQuestions_id} */}
                
                {(() => {
                  setTypeQuestion(3);
                  // setSelectedRow(rowData.tableData.id);
                    return <TrueAndFalse selectedCourseName={selectedCourseName} handleFetchData={handleFetchData} rowData={createArray(rowData)} typeQuestion={typeQuestion}/>
                })()}
              </div>
            )
          },
        }),
        (rowData)=>({
          disabled:toggle,
          // disabled:rowData.question_type == '4' ? false :true,
          // disabled: typeQuestion == 4 ? false : toggle,
          // icon: () => (<QuestionImageIconContainer src={ellipsis}/>),
          icon: () => rowData.question_type != '6' ? (<QuestionImageIconContainer><QuestionImageIcon src={ellipsis}/>
          {/* <QuestionImageIconText>جای خالی</QuestionImageIconText> */}
          </QuestionImageIconContainer>) :
          (<QuestionImageIconContainer><QuestionImageIcon src={ellipsis2}/>
            {/* <QuestionImageIconTextV>جای خالی</QuestionImageIconTextV> */}
            </QuestionImageIconContainer>),
          openIcon: () => (<QuestionImageIconContainer><QuestionImageIcon src={ellipsis2}/>
            {/* <QuestionImageIconTextV>جای خالی</QuestionImageIconTextV> */}
            </QuestionImageIconContainer>),
          // tooltip: toggle ? 'سوال جای خالی' : null,
          render: rowData => {
            return (
              <div
                style={{
                  // fontSize: 100,
                  textAlign: 'center',
                  // color: 'white',
                  // backgroundColor: '#FDD835',
                }}
              >
                {/* {rowData.question} {rowData.axamQuestions_id} */}
                
                {(() => {
                  setTypeQuestion(4);
                  // setSelectedRow(rowData.tableData.id);
                    return <Vacancy selectedCourseName={selectedCourseName} handleFetchData={handleFetchData} rowData={createArray(rowData)} typeQuestion={typeQuestion}/>
                })()}
              </div>
            )
          },
        }),
        (rowData)=>({
          disabled:toggle,
          // disabled:rowData.question_type == '5' ? false :true,
          // disabled: typeQuestion == 5 ? false : toggle,
          // icon: () => (<QuestionImageIconContainer src={compareIcon}/>),
          icon: () => rowData.question_type != '2' ? (<QuestionImageIconContainer><QuestionImageIcon src={compareIcon}/>
          {/* <QuestionImageIconText>تطبیقی</QuestionImageIconText> */}
          </QuestionImageIconContainer>)
          :
          (<QuestionImageIconContainer><QuestionImageIcon src={compareIcon2}/>
            {/* <QuestionImageIconTextV>تطبیقی</QuestionImageIconTextV> */}
            </QuestionImageIconContainer>),
          openIcon: () => (<QuestionImageIconContainer><QuestionImageIcon src={compareIcon2}/>
            {/* <QuestionImageIconTextV>تطبیقی</QuestionImageIconTextV> */}
            </QuestionImageIconContainer>),
          // tooltip: 'سوال تطبیقی',
          // tooltip: toggle ? 'سوال تطبیقی' : null,
          render: rowData => {
            return (
              <div
                style={{
                  // fontSize: 100,
                  textAlign: 'center',
                  // color: 'white',
                  // backgroundColor: '#FDD835',
                }}
              >
                {/* {rowData.question} {rowData.axamQuestions_id} */}
                
                {(() => {
                  setTypeQuestion(5);
                  // setSelectedRow(rowData.tableData.id);
                    return <Comparative selectedCourseName={selectedCourseName} handleFetchData={handleFetchData} rowData={createArray(rowData)} typeQuestion={typeQuestion}/>
                })()}
              </div>
            )
          },
        }),
        (rowData)=>({
          // disabled:rowData.question_type == '6' ? false :true,
          disabled:toggle,
          // disabled: typeQuestion == 6 ? false : toggle,
          // icon: () => (<QuestionImageIcon src={SequentialIcon}/>),
          icon: () => rowData.question_type != '5' ? (<QuestionImageIconContainer><QuestionImageIcon src={SequentialIcon}/>
          {/* <QuestionImageIconText>ترتیبی</QuestionImageIconText> */}
          </QuestionImageIconContainer>)
          :
          (<QuestionImageIconContainer><QuestionImageIcon src={SequentialIcon2}/>
            {/* <QuestionImageIconTextV>ترتیبی</QuestionImageIconTextV> */}
            </QuestionImageIconContainer>),
          openIcon: () => (<QuestionImageIconContainer><QuestionImageIcon src={SequentialIcon2}/>
            {/* <QuestionImageIconTextV>ترتیبی</QuestionImageIconTextV> */}
            </QuestionImageIconContainer>),
          // tooltip: 'سوال ترتیبی',
          // tooltip: toggle ? 'سوال ترتیبی' : null,
          render: rowData => {
            return (
              <div
                style={{
                  // fontSize: 100,
                  textAlign: 'center',
                  // color: 'white',
                  // backgroundColor: '#FDD835',
                }}
              >
                {/* {rowData.question} {rowData.axamQuestions_id} */}
                
                {(() => {
                  setTypeQuestion(6);
                  // setSelectedRow(rowData.tableData.id);
                    return <Sequential selectedCourseName={selectedCourseName} handleFetchData={handleFetchData} rowData={createArray(rowData)} typeQuestion={typeQuestion}/>
                })()}
              </div>
            )
          },
        }),
        
      ]}

      // onToggleDetailPanel={() => console.log('test11111111')}
      // onTreeExpandChange={() => console.log('test22222222')}
      editable={{
            onRowAdd: newData =>
              new Promise((resolve, reject) => {
                console.log('ddddddddddd');
                setTimeout(() => {
                  setData([...QuestionsData, newData]);
                  setQuestionParent({ variables: { 
                    userName: "211",
                    password: "211",
                    ecId: selectedCourseName
                    } 
                  }).then(res=>{
                    if(res.data && res.data.addQuestionParent){
                      // console.log('data',data);
                      // setMessage('امتحان ثبت شد');
                      // setStatus('1');
                      // setShowMessage(!showMessage);
                    }else{
                      // console.log('data',data);
                      // setStatus('0')
                      // setMessage('امتحان ثبت نشد')
                      // setShowMessage(!showMessage);
                    }
                  })
                  resolve();
                }, 1000)
              }),
            // onRowUpdate: (newData, oldData) =>
            //   new Promise((resolve, reject) => {
            //     setTimeout(() => {
            //       const dataUpdate = [...data];
            //       const index = oldData.tableData.id;
            //       dataUpdate[index] = newData;
            //       setData([...dataUpdate]);
    
            //       resolve();
            //     }, 1000)
            //   }),
            onRowDelete: oldData =>
              new Promise((resolve, reject) => {
                setTimeout(() => {
                  const dataDelete = [...QuestionsData];
                  const index = oldData.tableData.id;
                  dataDelete.splice(index, 1);
                  setData([...dataDelete]);
    
                  resolve();
                }, 1000)
              }),
      }}
    />
  )
}

// const mapStateToProps = state =>({
//     toggle : state.toggle.toggle,
// })

// const mapDispatchToProps = dispatch =>({
//   setToggle: tog => dispatch(setToggle(tog)),
// })

const mapStateToProps = createStructuredSelector({
  toggle:ToggleQuestion
});


export default connect(mapStateToProps)(Questions);