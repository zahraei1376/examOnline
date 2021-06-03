import React ,{ useState , useEffect } from 'react';
import {ShowExamContainer} from './examPageForTeacher.styles';
import  ShowComparativeQuestionForArchive from './showQuestionsForArchive/showQuestionsForArchive/ShowComparativeQuestionForArchive/ShowComparativeQuestionForArchive.component';
import ShowDescriptiveQuestionForArchive from './showQuestionsForArchive/showQuestionsForArchive/ShowDescriptiveQuestionForArchive/ShowDescriptiveQuestionForArchive.component';
import ShowMultipleChoiceQuestionForArchive from './showQuestionsForArchive/showQuestionsForArchive/ShowMultipleChoiceQuestionForArchive/ShowMultipleChoiceForArchive.component';
import ShowTrueAndFalseQuestionForArchive from './showQuestionsForArchive/showQuestionsForArchive/ShowTrueAndFalseQuestionForArchive/ShowTrueAndFalseQuestionForArchive.component';
import ShowSequentialQuestionForArchive from './showQuestionsForArchive/showQuestionsForArchive/ShowSequentialQuestionForArchive/ShowSequentialQuestionForArchive.component';
import ShowVacancyQuestionForArchive from './showQuestionsForArchive/showQuestionsForArchive/ShowVacancyQuestionForArchive/ShowVacancyuestionForArchive.component';
//////////////////query
// import {GET_EXAMQUESTIONS_FOR_STUDENT_AND_TEACHER} from '../../graphql/resolver';
// import {useQuery} from 'react-apollo';
/////////////////
// const Item =[
//     {
//         'question':' گلمممم گلممممسلام به همه دوستای گلمممم سلام به همه دوستای گلمممم سلام به همه دوستای گلمممم سلام به همه دوستای گلمممم سلام به همه دوستای گلمممم سلام به همه دوستای گلمممم سلام به همه دوستای گلمممم سلام به همه دوستای گلمممم',
//         'question_score':'2',
//         'question_explane':'توضیحات مربوط به امتحان درس ریاضی پایه اول',
//         'question_timeToSolveProblem':'20 دقیقه',
//         'exam_link':'https://www.woonwinkelhome.com/products/slim-pen-gold',//with question
//         // 'question_link':'https://www.woonwinkelhome.com/products/slim-pen-gold',//replace question
//         'question_compItems':[
//             ['توضیحات مربوط به امتحان درس ریاضی پایه دوم','توضیحات مربوط به امتحان درس ریاضی پایه اول'],
//             ['توضیحات مربوط به امتحان درس ریاضی پایه چهارم','توضیحات مربوط به امتحان درس ریاضی پایه سوم'],
//             ['توضیحات مربوط به امتحان درس ریاضی پایه ششم','توضیحات مربوط به امتحان درس ریاضی پایه پنجم'],
//             ['توضیحات مربوط به امتحان درس ریاضی پایه هشتم','توضیحات مربوط به امتحان درس ریاضی پایه هفتم'],
//             // [1,2],[3,4],[5,6],[7,8]
//         ],
//         // 'StudentItem':'2',
//         'question_correctOption':'1',
//         'question_optionOne':'سلام',
//         'question_optionTwo':'hello',
//         'question_optionThree':'سلام',
//         'question_optionFour':'hello',
//         'question_SeqItems':[
//             ['توضیحات مربوط به امتحان درس ریاضی پایه اول'],
//             ['توضیحات مربوط به امتحان درس ریاضی پایه دوم'],
//             ['توضیحات مربوط به امتحان درس ریاضی پایه سوم'],
//             ['توضیحات مربوط به امتحان درس ریاضی پایه چهارم'],
//             ['توضیحات مربوط به امتحان درس ریاضی پایه پنجم '],
//             ['توضیحات مربوط به امتحان درس ریاضی پایه ششم'],
//             ['توضیحات مربوط به امتحان درس ریاضی پایه هفتم'],
//             ['توضیحات مربوط به امتحان درس ریاضی پایه هشتم'],
//             // [1,2],[3,4],[5,6],[7,8]
//         ],
//         // 'exam_SeqResponse':[[0,2],[1,1],[2,4],[3,3]],
//         'question_vancyItems':'سلام بر همه دوستان $%A و محترم عید $%A بر همه $%A مبارک باد',
//         // 'exam_vancyRes':[[0,'گلم'],[1,'نوروز'],[2,'مردم']],
//         'question_type':'1',
//         //////////////////////////////////////////
//         'response_descriptionImageLink':'https://www.woonwinkelhome.com/products/slim-pen-gold',
//         'response_sequentialQuestion':[[0,2],[1,1],[2,4],[3,3]],
//         'response_studentItem':'2',//true
//         'response_comparativeQuestion':[[0,1],[1,1],[2,1],[3,1]],//comparative
//         'response_descriptionQuestion':'گلمممم گلممممسلام به همه دوستای گلمممم سلام به همه دوستای گلمممم سلام به همه دوستای گلمممم سلام به همه دوستای گلمممم سلام به همه دوستای گلمممم سلام به همه دوستای گلمممم سلام ',
//         'response_vancyQuestion':[[0,'گلم'],[1,'نوروز'],[2,'مردم']],//vancy
//         'response_score':'2'
//         ////////////////////////////////////////
//         // 'resItems':[[0,1],[1,1],[2,1],[3,1]],
//         // 'exam_descriptionResImageLink':'https://www.woonwinkelhome.com/products/slim-pen-gold',
//         // 'question_link':'https://www.woonwinkelhome.com/products/slim-pen-gold',
    
//     },
//     {
//         'question':' گلمممم گلممممسلام به همه دوستای گلمممم سلام به همه دوستای گلمممم سلام به همه دوستای گلمممم سلام به همه دوستای گلمممم سلام به همه دوستای گلمممم سلام به همه دوستای گلمممم سلام به همه دوستای گلمممم سلام به همه دوستای گلمممم',
//         'question_score':'2',
//         'question_explane':'توضیحات مربوط به امتحان درس ریاضی پایه اول',
//         'question_timeToSolveProblem':'20 دقیقه',
//         'exam_link':'https://www.woonwinkelhome.com/products/slim-pen-gold',
//         'question_compItems':[
//             ['توضیحات مربوط به امتحان درس ریاضی پایه دوم','توضیحات مربوط به امتحان درس ریاضی پایه اول'],
//             ['توضیحات مربوط به امتحان درس ریاضی پایه چهارم','توضیحات مربوط به امتحان درس ریاضی پایه سوم'],
//             ['توضیحات مربوط به امتحان درس ریاضی پایه ششم','توضیحات مربوط به امتحان درس ریاضی پایه پنجم'],
//             ['توضیحات مربوط به امتحان درس ریاضی پایه هشتم','توضیحات مربوط به امتحان درس ریاضی پایه هفتم'],
//             // [1,2],[3,4],[5,6],[7,8]
//         ],
//         // 'StudentItem':'2',
//         'question_correctOption':'1',
//         'question_optionOne':'سلام',
//         'question_optionTwo':'hello',
//         'question_optionThree':'سلام',
//         'question_optionFour':'hello',
//         'question_SeqItems':[
//             ['توضیحات مربوط به امتحان درس ریاضی پایه اول'],
//             ['توضیحات مربوط به امتحان درس ریاضی پایه دوم'],
//             ['توضیحات مربوط به امتحان درس ریاضی پایه سوم'],
//             ['توضیحات مربوط به امتحان درس ریاضی پایه چهارم'],
//             ['توضیحات مربوط به امتحان درس ریاضی پایه پنجم '],
//             ['توضیحات مربوط به امتحان درس ریاضی پایه ششم'],
//             ['توضیحات مربوط به امتحان درس ریاضی پایه هفتم'],
//             ['توضیحات مربوط به امتحان درس ریاضی پایه هشتم'],
//             // [1,2],[3,4],[5,6],[7,8]
//         ],
//         // 'exam_SeqResponse':[[0,2],[1,1],[2,4],[3,3]],
//         'question_vancyItems':'سلام بر همه دوستان $%A و محترم عید $%A بر همه $%A مبارک باد',
//         // 'exam_vancyRes':[[0,'گلم'],[1,'نوروز'],[2,'مردم']],
//         'question_type':'2',
//         //////////////////////////////////////////
//         'response_descriptionImageLink':'https://www.woonwinkelhome.com/products/slim-pen-gold',
//         'response_sequentialQuestion':[[0,2],[1,1],[2,4],[3,3]],
//         'response_studentItem':'2',//true
//         'response_comparativeQuestion':[[0,1],[1,1],[2,1],[3,1]],//comparative
//         'response_descriptionQuestion':'گلمممم گلممممسلام به همه دوستای گلمممم سلام به همه دوستای گلمممم سلام به همه دوستای گلمممم سلام به همه دوستای گلمممم سلام به همه دوستای گلمممم سلام به همه دوستای گلمممم سلام ',
//         'response_vancyQuestion':[[0,'گلم'],[1,'نوروز'],[2,'مردم']],//vancy
//         'response_score':'2'
//         ////////////////////////////////////////
//         // 'resItems':[[0,1],[1,1],[2,1],[3,1]],
//         // 'exam_descriptionResImageLink':'https://www.woonwinkelhome.com/products/slim-pen-gold',
//         // 'exam_descriptionRes':'گلمممم گلممممسلام به همه دوستای گلمممم سلام به همه دوستای گلمممم سلام به همه دوستای گلمممم سلام به همه دوستای گلمممم سلام به همه دوستای گلمممم سلام به همه دوستای گلمممم سلام ',
//         // 'vancyItems':'سلام بر همه دوستان $%A و محترم عید $%A بر همه $%A مبارک باد سلام بر همه دوستان $%A و محترم عید $%A بر همه $%A مبارک باد سلام بر همه دوستان $%A و محترم عید $%A بر همه $%A مبارک باد سلام بر همه دوستان $%A و محترم عید $%A بر همه $%A مبارک باد',
      
//         // 'question_optionThree':'hi',
//         // 'question_optionFour':'آنیو',
//         // 'question_link':'https://www.woonwinkelhome.com/products/slim-pen-gold',
    
//     },
//     {
//         'question':' گلمممم گلممممسلام به همه دوستای گلمممم سلام به همه دوستای گلمممم سلام به همه دوستای گلمممم سلام به همه دوستای گلمممم سلام به همه دوستای گلمممم سلام به همه دوستای گلمممم سلام به همه دوستای گلمممم سلام به همه دوستای گلمممم',
//         'question_score':'2',
//         'question_explane':'توضیحات مربوط به امتحان درس ریاضی پایه اول',
//         'question_timeToSolveProblem':'20 دقیقه',
//         'exam_link':'https://www.woonwinkelhome.com/products/slim-pen-gold',
//         'question_compItems':[
//             ['توضیحات مربوط به امتحان درس ریاضی پایه دوم','توضیحات مربوط به امتحان درس ریاضی پایه اول'],
//             ['توضیحات مربوط به امتحان درس ریاضی پایه چهارم','توضیحات مربوط به امتحان درس ریاضی پایه سوم'],
//             ['توضیحات مربوط به امتحان درس ریاضی پایه ششم','توضیحات مربوط به امتحان درس ریاضی پایه پنجم'],
//             ['توضیحات مربوط به امتحان درس ریاضی پایه هشتم','توضیحات مربوط به امتحان درس ریاضی پایه هفتم'],
//             // [1,2],[3,4],[5,6],[7,8]
//         ],
//         // 'StudentItem':'2',
//         'question_correctOption':'1',
//         'question_optionOne':'سلام',
//         'question_optionTwo':'hello',
//         'question_optionThree':'سلام',
//         'question_optionFour':'hello',
//         'question_SeqItems':[
//             ['توضیحات مربوط به امتحان درس ریاضی پایه اول'],
//             ['توضیحات مربوط به امتحان درس ریاضی پایه دوم'],
//             ['توضیحات مربوط به امتحان درس ریاضی پایه سوم'],
//             ['توضیحات مربوط به امتحان درس ریاضی پایه چهارم'],
//             ['توضیحات مربوط به امتحان درس ریاضی پایه پنجم '],
//             ['توضیحات مربوط به امتحان درس ریاضی پایه ششم'],
//             ['توضیحات مربوط به امتحان درس ریاضی پایه هفتم'],
//             ['توضیحات مربوط به امتحان درس ریاضی پایه هشتم'],
//             // [1,2],[3,4],[5,6],[7,8]
//         ],
//         // 'exam_SeqResponse':[[0,2],[1,1],[2,4],[3,3]],
//         'question_vancyItems':'سلام بر همه دوستان $%A و محترم عید $%A بر همه $%A مبارک باد',
//         // 'exam_vancyRes':[[0,'گلم'],[1,'نوروز'],[2,'مردم']],
//         'question_type':'3',
//         //////////////////////////////////////////
//         'response_descriptionImageLink':'https://www.woonwinkelhome.com/products/slim-pen-gold',
//         'response_sequentialQuestion':[[0,2],[1,1],[2,4],[3,3]],
//         'response_studentItem':'2',//true
//         'response_comparativeQuestion':[[0,1],[1,1],[2,1],[3,1]],//comparative
//         'response_descriptionQuestion':'گلمممم گلممممسلام به همه دوستای گلمممم سلام به همه دوستای گلمممم سلام به همه دوستای گلمممم سلام به همه دوستای گلمممم سلام به همه دوستای گلمممم سلام به همه دوستای گلمممم سلام ',
//         'response_vancyQuestion':[[0,'گلم'],[1,'نوروز'],[2,'مردم']],//vancy
//         'response_score':'2'
//         ////////////////////////////////////////
//         // 'resItems':[[0,1],[1,1],[2,1],[3,1]],
//         // 'exam_descriptionResImageLink':'https://www.woonwinkelhome.com/products/slim-pen-gold',
//         // 'exam_descriptionRes':'گلمممم گلممممسلام به همه دوستای گلمممم سلام به همه دوستای گلمممم سلام به همه دوستای گلمممم سلام به همه دوستای گلمممم سلام به همه دوستای گلمممم سلام به همه دوستای گلمممم سلام ',
//         // 'vancyItems':'سلام بر همه دوستان $%A و محترم عید $%A بر همه $%A مبارک باد سلام بر همه دوستان $%A و محترم عید $%A بر همه $%A مبارک باد سلام بر همه دوستان $%A و محترم عید $%A بر همه $%A مبارک باد سلام بر همه دوستان $%A و محترم عید $%A بر همه $%A مبارک باد',
      
//         // 'question_optionThree':'hi',
//         // 'question_optionFour':'آنیو',
//         // 'question_link':'https://www.woonwinkelhome.com/products/slim-pen-gold',
    
//     },
//     {
//         'question':' گلمممم گلممممسلام به همه دوستای گلمممم سلام به همه دوستای گلمممم سلام به همه دوستای گلمممم سلام به همه دوستای گلمممم سلام به همه دوستای گلمممم سلام به همه دوستای گلمممم سلام به همه دوستای گلمممم سلام به همه دوستای گلمممم',
//         'question_score':'2',
//         'question_explane':'توضیحات مربوط به امتحان درس ریاضی پایه اول',
//         'question_timeToSolveProblem':'20 دقیقه',
//         'exam_link':'https://www.woonwinkelhome.com/products/slim-pen-gold',
//         'question_compItems':[
//             ['توضیحات مربوط به امتحان درس ریاضی پایه دوم','توضیحات مربوط به امتحان درس ریاضی پایه اول'],
//             ['توضیحات مربوط به امتحان درس ریاضی پایه چهارم','توضیحات مربوط به امتحان درس ریاضی پایه سوم'],
//             ['توضیحات مربوط به امتحان درس ریاضی پایه ششم','توضیحات مربوط به امتحان درس ریاضی پایه پنجم'],
//             ['توضیحات مربوط به امتحان درس ریاضی پایه هشتم','توضیحات مربوط به امتحان درس ریاضی پایه هفتم'],
//             // [1,2],[3,4],[5,6],[7,8]
//         ],
//         // 'StudentItem':'2',
//         'question_correctOption':'1',
//         'question_optionOne':'سلام',
//         'question_optionTwo':'hello',
//         'question_optionThree':'سلام',
//         'question_optionFour':'hello',
//         'question_SeqItems':[
//             ['توضیحات مربوط به امتحان درس ریاضی پایه اول'],
//             ['توضیحات مربوط به امتحان درس ریاضی پایه دوم'],
//             ['توضیحات مربوط به امتحان درس ریاضی پایه سوم'],
//             ['توضیحات مربوط به امتحان درس ریاضی پایه چهارم'],
//             ['توضیحات مربوط به امتحان درس ریاضی پایه پنجم '],
//             ['توضیحات مربوط به امتحان درس ریاضی پایه ششم'],
//             ['توضیحات مربوط به امتحان درس ریاضی پایه هفتم'],
//             ['توضیحات مربوط به امتحان درس ریاضی پایه هشتم'],
//             // [1,2],[3,4],[5,6],[7,8]
//         ],
//         // 'exam_SeqResponse':[[0,2],[1,1],[2,4],[3,3]],
//         'question_vancyItems':'سلام بر همه دوستان $%A و محترم عید $%A بر همه $%A مبارک باد',
//         // 'exam_vancyRes':[[0,'گلم'],[1,'نوروز'],[2,'مردم']],
//         'question_type':'4',
//         //////////////////////////////////////////
//         'response_descriptionImageLink':'https://www.woonwinkelhome.com/products/slim-pen-gold',
//         'response_sequentialQuestion':[[0,2],[1,1],[2,4],[3,3]],
//         'response_studentItem':'2',//true
//         'response_comparativeQuestion':[[0,1],[1,1],[2,1],[3,1]],//comparative
//         'response_descriptionQuestion':'گلمممم گلممممسلام به همه دوستای گلمممم سلام به همه دوستای گلمممم سلام به همه دوستای گلمممم سلام به همه دوستای گلمممم سلام به همه دوستای گلمممم سلام به همه دوستای گلمممم سلام ',
//         'response_vancyQuestion':[[0,'گلم'],[1,'نوروز'],[2,'مردم']],//vancy
//         'response_score':'2'
//         ////////////////////////////////////////
//         // 'resItems':[[0,1],[1,1],[2,1],[3,1]],
//         // 'exam_descriptionResImageLink':'https://www.woonwinkelhome.com/products/slim-pen-gold',
//         // 'exam_descriptionRes':'گلمممم گلممممسلام به همه دوستای گلمممم سلام به همه دوستای گلمممم سلام به همه دوستای گلمممم سلام به همه دوستای گلمممم سلام به همه دوستای گلمممم سلام به همه دوستای گلمممم سلام ',
//         // 'vancyItems':'سلام بر همه دوستان $%A و محترم عید $%A بر همه $%A مبارک باد سلام بر همه دوستان $%A و محترم عید $%A بر همه $%A مبارک باد سلام بر همه دوستان $%A و محترم عید $%A بر همه $%A مبارک باد سلام بر همه دوستان $%A و محترم عید $%A بر همه $%A مبارک باد',
      
//         // 'question_optionThree':'hi',
//         // 'question_optionFour':'آنیو',
//         // 'question_link':'https://www.woonwinkelhome.com/products/slim-pen-gold',
    
//     },
//     {
//         'question':' گلمممم گلممممسلام به همه دوستای گلمممم سلام به همه دوستای گلمممم سلام به همه دوستای گلمممم سلام به همه دوستای گلمممم سلام به همه دوستای گلمممم سلام به همه دوستای گلمممم سلام به همه دوستای گلمممم سلام به همه دوستای گلمممم',
//         'question_score':'2',
//         'question_explane':'توضیحات مربوط به امتحان درس ریاضی پایه اول',
//         'question_timeToSolveProblem':'20 دقیقه',
//         'exam_link':'https://www.woonwinkelhome.com/products/slim-pen-gold',
//         'question_compItems':[
//             ['توضیحات مربوط به امتحان درس ریاضی پایه دوم','توضیحات مربوط به امتحان درس ریاضی پایه اول'],
//             ['توضیحات مربوط به امتحان درس ریاضی پایه چهارم','توضیحات مربوط به امتحان درس ریاضی پایه سوم'],
//             ['توضیحات مربوط به امتحان درس ریاضی پایه ششم','توضیحات مربوط به امتحان درس ریاضی پایه پنجم'],
//             ['توضیحات مربوط به امتحان درس ریاضی پایه هشتم','توضیحات مربوط به امتحان درس ریاضی پایه هفتم'],
//             // [1,2],[3,4],[5,6],[7,8]
//         ],
//         // 'StudentItem':'2',
//         'question_correctOption':'1',
//         'question_optionOne':'سلام',
//         'question_optionTwo':'hello',
//         'question_optionThree':'سلام',
//         'question_optionFour':'hello',
//         'question_SeqItems':[
//             ['توضیحات مربوط به امتحان درس ریاضی پایه اول'],
//             ['توضیحات مربوط به امتحان درس ریاضی پایه دوم'],
//             ['توضیحات مربوط به امتحان درس ریاضی پایه سوم'],
//             ['توضیحات مربوط به امتحان درس ریاضی پایه چهارم'],
//             ['توضیحات مربوط به امتحان درس ریاضی پایه پنجم '],
//             ['توضیحات مربوط به امتحان درس ریاضی پایه ششم'],
//             ['توضیحات مربوط به امتحان درس ریاضی پایه هفتم'],
//             ['توضیحات مربوط به امتحان درس ریاضی پایه هشتم'],
//             // [1,2],[3,4],[5,6],[7,8]
//         ],
//         // 'exam_SeqResponse':[[0,2],[1,1],[2,4],[3,3]],
//         'question_vancyItems':'سلام بر همه دوستان $%A و محترم عید $%A بر همه $%A مبارک باد',
//         // 'exam_vancyRes':[[0,'گلم'],[1,'نوروز'],[2,'مردم']],
//         'question_type':'5',
//         //////////////////////////////////////////
//         'response_descriptionImageLink':'https://www.woonwinkelhome.com/products/slim-pen-gold',
//         'response_sequentialQuestion':[[0,2],[1,1],[2,4],[3,3]],
//         'response_studentItem':'2',//true
//         'response_comparativeQuestion':[[0,1],[1,1],[2,1],[3,1]],//comparative
//         'response_descriptionQuestion':'گلمممم گلممممسلام به همه دوستای گلمممم سلام به همه دوستای گلمممم سلام به همه دوستای گلمممم سلام به همه دوستای گلمممم سلام به همه دوستای گلمممم سلام به همه دوستای گلمممم سلام ',
//         'response_vancyQuestion':[[0,'گلم'],[1,'نوروز'],[2,'مردم']],//vancy
//         'response_score':'2'
//         ////////////////////////////////////////
//         // 'resItems':[[0,1],[1,1],[2,1],[3,1]],
//         // 'exam_descriptionResImageLink':'https://www.woonwinkelhome.com/products/slim-pen-gold',
//         // 'exam_descriptionRes':'گلمممم گلممممسلام به همه دوستای گلمممم سلام به همه دوستای گلمممم سلام به همه دوستای گلمممم سلام به همه دوستای گلمممم سلام به همه دوستای گلمممم سلام به همه دوستای گلمممم سلام ',
//         // 'vancyItems':'سلام بر همه دوستان $%A و محترم عید $%A بر همه $%A مبارک باد سلام بر همه دوستان $%A و محترم عید $%A بر همه $%A مبارک باد سلام بر همه دوستان $%A و محترم عید $%A بر همه $%A مبارک باد سلام بر همه دوستان $%A و محترم عید $%A بر همه $%A مبارک باد',
      
//         // 'question_optionThree':'hi',
//         // 'question_optionFour':'آنیو',
//         // 'question_link':'https://www.woonwinkelhome.com/products/slim-pen-gold',
    
//     },
//     {
//         'question':' گلمممم گلممممسلام به همه دوستای گلمممم سلام به همه دوستای گلمممم سلام به همه دوستای گلمممم سلام به همه دوستای گلمممم سلام به همه دوستای گلمممم سلام به همه دوستای گلمممم سلام به همه دوستای گلمممم سلام به همه دوستای گلمممم',
//         'question_score':'2',
//         'question_explane':'توضیحات مربوط به امتحان درس ریاضی پایه اول',
//         'question_timeToSolveProblem':'20 دقیقه',
//         'exam_link':'https://www.woonwinkelhome.com/products/slim-pen-gold',
//         'question_compItems':[
//             ['توضیحات مربوط به امتحان درس ریاضی پایه دوم','توضیحات مربوط به امتحان درس ریاضی پایه اول'],
//             ['توضیحات مربوط به امتحان درس ریاضی پایه چهارم','توضیحات مربوط به امتحان درس ریاضی پایه سوم'],
//             ['توضیحات مربوط به امتحان درس ریاضی پایه ششم','توضیحات مربوط به امتحان درس ریاضی پایه پنجم'],
//             ['توضیحات مربوط به امتحان درس ریاضی پایه هشتم','توضیحات مربوط به امتحان درس ریاضی پایه هفتم'],
//             // [1,2],[3,4],[5,6],[7,8]
//         ],
//         // 'StudentItem':'2',
//         'question_correctOption':'1',
//         'question_optionOne':'سلام',
//         'question_optionTwo':'hello',
//         'question_optionThree':'سلام',
//         'question_optionFour':'hello',
//         'question_SeqItems':[
//             ['توضیحات مربوط به امتحان درس ریاضی پایه اول'],
//             ['توضیحات مربوط به امتحان درس ریاضی پایه دوم'],
//             ['توضیحات مربوط به امتحان درس ریاضی پایه سوم'],
//             ['توضیحات مربوط به امتحان درس ریاضی پایه چهارم'],
//             ['توضیحات مربوط به امتحان درس ریاضی پایه پنجم '],
//             ['توضیحات مربوط به امتحان درس ریاضی پایه ششم'],
//             ['توضیحات مربوط به امتحان درس ریاضی پایه هفتم'],
//             ['توضیحات مربوط به امتحان درس ریاضی پایه هشتم'],
//             // [1,2],[3,4],[5,6],[7,8]
//         ],
//         // 'exam_SeqResponse':[[0,2],[1,1],[2,4],[3,3]],
//         'question_vancyItems':'سلام بر همه دوستان $%A و محترم عید $%A بر همه $%A مبارک باد',
//         // 'exam_vancyRes':[[0,'گلم'],[1,'نوروز'],[2,'مردم']],
//         'question_type':'6',
//         //////////////////////////////////////////
//         'response_descriptionImageLink':'https://www.woonwinkelhome.com/products/slim-pen-gold',
//         'response_sequentialQuestion':[[0,2],[1,1],[2,4],[3,3]],
//         'response_studentItem':'2',//true
//         'response_comparativeQuestion':[[0,1],[1,1],[2,1],[3,1]],//comparative
//         'response_descriptionQuestion':'گلمممم گلممممسلام به همه دوستای گلمممم سلام به همه دوستای گلمممم سلام به همه دوستای گلمممم سلام به همه دوستای گلمممم سلام به همه دوستای گلمممم سلام به همه دوستای گلمممم سلام ',
//         'response_vancyQuestion':[[0,'گلم'],[1,'نوروز'],[2,'مردم']],//vancy
//         'response_score':'2'
//         ////////////////////////////////////////
//         // 'resItems':[[0,1],[1,1],[2,1],[3,1]],
//         // 'exam_descriptionResImageLink':'https://www.woonwinkelhome.com/products/slim-pen-gold',
//         // 'exam_descriptionRes':'گلمممم گلممممسلام به همه دوستای گلمممم سلام به همه دوستای گلمممم سلام به همه دوستای گلمممم سلام به همه دوستای گلمممم سلام به همه دوستای گلمممم سلام به همه دوستای گلمممم سلام ',
//         // 'vancyItems':'سلام بر همه دوستان $%A و محترم عید $%A بر همه $%A مبارک باد سلام بر همه دوستان $%A و محترم عید $%A بر همه $%A مبارک باد سلام بر همه دوستان $%A و محترم عید $%A بر همه $%A مبارک باد سلام بر همه دوستان $%A و محترم عید $%A بر همه $%A مبارک باد',
      
//         // 'question_optionThree':'hi',
//         // 'question_optionFour':'آنیو',
//         // 'question_link':'https://www.woonwinkelhome.com/products/slim-pen-gold',
    
//     },
// ]

const ExamPageForTeacher = ({type ,examIdProps,Items}) => {
    ////////////////////////////////////////////
    // const { loading, error, data ,refetch  } = useQuery(GET_EXAMQUESTIONS_FOR_STUDENT_AND_TEACHER , {
    //     variables: {  
    //         userName: "211",
    //         password: "211",
    //         id: examIdProps,
    //     },
    //     notifyOnNetworkStatusChange: true
    // });
    ////////////////////////////////////////////
    // const [Items, setItems] = useState([]);
    ////////////////////////////////////////////
    // useEffect(()=>{
    //     console.log('data0',data);
    //     if(data){
    //         MergeQuestions(data.examParents[0]);
    //     }
        
    // },[data]);
    // useEffect(()=>{
    //     console.log('data1',examIdProps);
        
        
    // },[])

    //////////////////////////////////////////////////////
    // const MergeQuestions = async(examP) => {
    //     var mergeQ = [];
    //     var examEndDate = examP.examParent_stop_date;
    //     var examEndTime = examP.examParent_end;
    //     var allQuestons = examP.examChild;
    //     for await (let myallQuestion of allQuestons) {
    //         var examChildLink = myallQuestion.examChild_pdf;
    //         var counterQuestionsParent = myallQuestion;
    //         var courseName = myallQuestion && myallQuestion.groups && myallQuestion.groups.length > 0 ? myallQuestion.groups[0].course : '';
    //         var teacherName = myallQuestion && myallQuestion.groups && myallQuestion.groups.length > 0 && myallQuestion.groups[0].people && myallQuestion.groups[0].people.length > 0 ?  myallQuestion.groups[0].people[0].name + ' ' + myallQuestion.groups[0].people[0].surname : '';
    //         console.log('teacherName', teacherName);
    //         var questionParentForExamChild = counterQuestionsParent.questionParent;
    //         if( questionParentForExamChild && questionParentForExamChild.length > 0){
    //             for (let j = 0; j < questionParentForExamChild.length; j++) {
    //                 if(questionParentForExamChild[j].questionChild && questionParentForExamChild[j].questionChild.length > 0){
    //                     mergeQ.push({...questionParentForExamChild[j].questionChild[0] ,
    //                         // examParentId:setRefExamParentID.current,
    //                         courseName:courseName,
    //                         teacherName:teacherName,
    //                         examChildLink:examChildLink,
    //                         examEndDate :examEndDate,
    //                         examEndTime :examEndTime,
    //                     });
    //                 }
    //             }
    //         }
    //     }
    //     console.log('mergeQ',mergeQ);
    //     setItems(mergeQ);
    // }
    ///////////////////////////////////////////////////
    return(
        <ShowExamContainer>
            {
                Items && Items.length > 0 ? Items.map((question ,index) =>(
                    (() => {
                        if(question.question_type == '1'){
                            return <ShowDescriptiveQuestionForArchive type={type} key={index} question={question} number={index} 
                                responseQuestion={question.response && question.response.length > 0 ? question.response[0] : ''}
                            /> 
                        }else if(question.question_type == '2'){
                            return <ShowMultipleChoiceQuestionForArchive type={type} key={index} question={question} 
                            responseQuestion={question.response && question.response.length > 0 ? question.response[0] : ''}
                            number={index}
                            />
                            
                        }
                        else if(question.question_type == '3'){
                            return <ShowTrueAndFalseQuestionForArchive type={type} key={index} question={question} 
                            responseQuestion={question.response && question.response.length > 0 ? question.response[0] : ''}
                            number={index} 
                            />
                            // return <ShowMultipleChoiceQuestionForArchive type={type} key={index} question={question} 
                            // // responseQuestion={RsponseExam} 
                            // number={index}
                            // />
                        }
                        else if(question.question_type == '4'){
                            return <ShowVacancyQuestionForArchive type={type} question={question} 
                            responseQuestion={question.response && question.response.length > 0 ? question.response[0] : ''}
                            number={index} />
                            // return <ShowTrueAndFalseQuestionForArchive type={type} key={index} question={question} 
                            // // responseQuestion={RsponseExam} 
                            // number={index} 
                            // />
                        }
                        else if(question.question_type == '5'){
                            return <ShowComparativeQuestionForArchive type={type} key={index} question={question} number={index} 
                            responseQuestion={question.response && question.response.length > 0 ? question.response[0] : ''}
                             /> 
                            // return <ShowSequentialQuestionForArchive type={type} key={index} question={question}
                            // //  responseQuestion={RsponseExam} 
                            // number={index} 
                            // // SeqItems={SeqRandomArray(Item[index].SeqItems)}
                            //  />
                        }
                        else if(question.question_type == '6'){
                            // return <ShowVacancyQuestionForArchive type={type} question={question} 
                            // // responseQuestion={RsponseExam} 
                            // number={index} />
                            return <ShowSequentialQuestionForArchive type={type} key={index} question={question}
                            responseQuestion={question.response && question.response.length > 0 ? question.response[0] : ''}
                            number={index} 
                            // SeqItems={SeqRandomArray(Item[index].SeqItems)}
                             />
                        }
                    })()
                ))
                :''
            }
            {/* /////////////////////////////////////////// */}
            {/* {
                Item ? Item.map((question ,index) =>(
                    (() => {
                        if(question.question_type == '1'){
                            return <ShowDescriptiveQuestion question={question} number={index} 
                            ResItem = {question.response && question.response.length > 0 ?  question.response[0].response_descriptionQuestion : ''}
                            ResItemImage = {question.response && question.response.length > 0 ?  question.response[0].response_descriptionImageLink : ''}
                            /> 
                        }else if(question.question_type == '2'){
                            return <MultipleChoiceConatiner question={question} number={index} ResItem={question.response && question.response.length > 0 ?  question.response[0].response_studentItem : ''} />
                        }
                        else if(question.question_type == '3'){
                            return <ShowTrueAndFalseQuestion question={question} number={index} ResItem={ question.response && question.response.length > 0 ? question.response[0].response_studentItem : ''} />
                        }
                        else if(question.question_type == '4'){
                            return <ShowVacancyQuestion question={question} number={index} items={question.question_vancyItems} ResItem={question.response && question.response.length > 0 ?  question.response[0].response_vancyQuestion : ''}/>
                        }
                        else if(question.question_type == '5'){
                            return <ShowComparativeQuestion question={question} number={index} items={question.question_compItems} ResItem = {question.response && question.response.length > 0 ?  question.response[0].response_comparativeQuestion : []} /> 
                        }
                        else if(question.question_type == '6'){
                            return <ShowSequentialQuestion question={question} number={index} items={question.question_seqItems} ResItem={question.response && question.response.length > 0 ?  question.response[0].response_sequentialQuestion : []} />
                        }
                    })()
                ))
                :''
            } */}
            {/* {(() => {
                if(items.length > 0){
                    if(items[questionIndex].question_type == '1'){
                        return <ShowDescriptiveQuestion question={items[questionIndex]} number={questionIndex} 
                            ResItem = {items[questionIndex].response && items[questionIndex].response.length > 0 ?  items[questionIndex].response[0].response_descriptionQuestion : ''}
                            ResItemImage = {items[questionIndex].response && items[questionIndex].response.length > 0 ?  items[questionIndex].response[0].response_descriptionImageLink : ''}
                        /> 
                    }else if(items[questionIndex].question_type == '5'){
                        // return <ShowComparativeQuestion question={items[questionIndex]} number={questionIndex} items={RandomArray(items[questionIndex].question_compItems)} ResItem = {items[questionIndex].response && items[questionIndex].response.length > 0 ?  items[questionIndex].response[0].response_comparativeQuestion : []} /> 
                        return <ShowComparativeQuestion question={items[questionIndex]} number={questionIndex} items={items[questionIndex].question_compItems} ResItem = {items[questionIndex].response && items[questionIndex].response.length > 0 ?  items[questionIndex].response[0].response_comparativeQuestion : []} /> 
                    }
                    else if(items[questionIndex].question_type == '2'){
                        return <MultipleChoiceConatiner question={items[questionIndex]} number={questionIndex} ResItem={items[questionIndex].response && items[questionIndex].response.length > 0 ?  items[questionIndex].response[0].response_studentItem : ''} />
                    }
                    else if(items[questionIndex].question_type == '3'){
                        return <ShowTrueAndFalseQuestion question={items[questionIndex]} number={questionIndex} ResItem={ items[questionIndex].response && items[questionIndex].response.length > 0 ? items[questionIndex].response[0].response_studentItem : ''} />
                    }
                    else if(items[questionIndex].question_type == '6'){
                        return <ShowSequentialQuestion question={items[questionIndex]} number={questionIndex} items={items[questionIndex].question_seqItems} ResItem={items[questionIndex].response && items[questionIndex].response.length > 0 ?  items[questionIndex].response[0].response_sequentialQuestion : []} />
                        // return <ShowSequentialQuestion question={items[questionIndex]} number={questionIndex} items={SeqRandomArray(items[questionIndex].question_seqItems)} ResItem={items[questionIndex].response && items[questionIndex].response.length > 0 ?  items[questionIndex].response[0].response_sequentialQuestion : []} />
                    }
                    else if(items[questionIndex].question_type == '4'){
                        return <ShowVacancyQuestion question={items[questionIndex]} number={questionIndex} items={items[questionIndex].question_vancyItems} ResItem={items[questionIndex].response && items[questionIndex].response.length > 0 ?  items[questionIndex].response[0].response_vancyQuestion : ''}/>
                    }
                }
            })()} */}
        </ShowExamContainer>
    )
};

export default ExamPageForTeacher;