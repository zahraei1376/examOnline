import React from 'react';
import  ShowComparativeQuestionForArchive from './showQuestionsForArchive/showQuestionsForArchive/ShowComparativeQuestionForArchive/ShowComparativeQuestionForArchive.component';
import ShowDescriptiveQuestionForArchive from './showQuestionsForArchive/showQuestionsForArchive/ShowDescriptiveQuestionForArchive/ShowDescriptiveQuestionForArchive.component';
import ShowMultipleChoiceQuestionForArchive from './showQuestionsForArchive/showQuestionsForArchive/ShowMultipleChoiceQuestionForArchive/ShowMultipleChoiceForArchive.component';
import ShowTrueAndFalseQuestionForArchive from './showQuestionsForArchive/showQuestionsForArchive/ShowTrueAndFalseQuestionForArchive/ShowTrueAndFalseQuestionForArchive.component';
import ShowSequentialQuestionForArchive from './showQuestionsForArchive/showQuestionsForArchive/ShowSequentialQuestionForArchive/ShowSequentialQuestionForArchive.component';
import ShowVacancyQuestionForArchive from './showQuestionsForArchive/showQuestionsForArchive/ShowVacancyQuestionForArchive/ShowVacancyuestionForArchive.component';
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
        'StudentItem':'2',
        'question__currentOption':'1',
        'question__optionOne':'سلام',
        'question__optionTwo':'hello',
        'question__optionTree':'سلام',
        'question__optionFour':'hello',
        'exam_SeqItems':[
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
        'exam_SeqResponse':[[0,2],[1,1],[2,4],[3,3]],
        'exam_vancyItems':'سلام بر همه دوستان $%A و محترم عید $%A بر همه $%A مبارک باد',
        'exam_vancyRes':[[0,'گلم'],[1,'نوروز'],[2,'مردم']],
        'question_type':'1',
        'resItems':[[0,1],[1,1],[2,1],[3,1]],
        'exam_descriptionResImageLink':'https://www.woonwinkelhome.com/products/slim-pen-gold',
        'exam_descriptionRes':'گلمممم گلممممسلام به همه دوستای گلمممم سلام به همه دوستای گلمممم سلام به همه دوستای گلمممم سلام به همه دوستای گلمممم سلام به همه دوستای گلمممم سلام به همه دوستای گلمممم سلام ',
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
        'StudentItem':'2',
        'question__currentOption':'1',
        'question__optionOne':'سلام',
        'question__optionTwo':'hello',
        'question__optionTree':'سلام',
        'question__optionFour':'hello',
        'exam_SeqItems':[
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
        'exam_SeqResponse':[[0,2],[1,1],[2,4],[3,3]],
        'exam_vancyItems':'سلام بر همه دوستان $%A و محترم عید $%A بر همه $%A مبارک باد',
        'exam_vancyRes':[[0,'گلم'],[1,'نوروز'],[2,'مردم']],
        'question_type':'2',
        'resItems':[[0,1],[1,1],[2,1],[3,1]],
        'exam_descriptionResImageLink':'https://www.woonwinkelhome.com/products/slim-pen-gold',
        'exam_descriptionRes':'گلمممم گلممممسلام به همه دوستای گلمممم سلام به همه دوستای گلمممم سلام به همه دوستای گلمممم سلام به همه دوستای گلمممم سلام به همه دوستای گلمممم سلام به همه دوستای گلمممم سلام ',
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
        'StudentItem':'2',
        'question__currentOption':'1',
        'question__optionOne':'سلام',
        'question__optionTwo':'hello',
        'question__optionTree':'سلام',
        'question__optionFour':'hello',
        'exam_SeqItems':[
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
        'exam_SeqResponse':[[0,2],[1,1],[2,4],[3,3]],
        'exam_vancyItems':'سلام بر همه دوستان $%A و محترم عید $%A بر همه $%A مبارک باد',
        'exam_vancyRes':[[0,'گلم'],[1,'نوروز'],[2,'مردم']],
        'question_type':'3',
        'resItems':[[0,1],[1,1],[2,1],[3,1]],
        'exam_descriptionResImageLink':'https://www.woonwinkelhome.com/products/slim-pen-gold',
        'exam_descriptionRes':'گلمممم گلممممسلام به همه دوستای گلمممم سلام به همه دوستای گلمممم سلام به همه دوستای گلمممم سلام به همه دوستای گلمممم سلام به همه دوستای گلمممم سلام به همه دوستای گلمممم سلام ',
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
        'StudentItem':'2',
        'question__currentOption':'1',
        'question__optionOne':'سلام',
        'question__optionTwo':'hello',
        'question__optionTree':'سلام',
        'question__optionFour':'hello',
        'exam_SeqItems':[
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
        'exam_SeqResponse':[[0,2],[1,1],[2,4],[3,3]],
        'exam_vancyItems':'سلام بر همه دوستان $%A و محترم عید $%A بر همه $%A مبارک باد',
        'exam_vancyRes':[[0,'گلم'],[1,'نوروز'],[2,'مردم']],
        'question_type':'4',
        'resItems':[[0,1],[1,1],[2,1],[3,1]],
        'exam_descriptionResImageLink':'https://www.woonwinkelhome.com/products/slim-pen-gold',
        'exam_descriptionRes':'گلمممم گلممممسلام به همه دوستای گلمممم سلام به همه دوستای گلمممم سلام به همه دوستای گلمممم سلام به همه دوستای گلمممم سلام به همه دوستای گلمممم سلام به همه دوستای گلمممم سلام ',
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
        'StudentItem':'2',
        'question__currentOption':'1',
        'question__optionOne':'سلام',
        'question__optionTwo':'hello',
        'question__optionTree':'سلام',
        'question__optionFour':'hello',
        'exam_SeqItems':[
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
        'exam_SeqResponse':[[0,2],[1,1],[2,4],[3,3]],
        'exam_vancyItems':'سلام بر همه دوستان $%A و محترم عید $%A بر همه $%A مبارک باد',
        'exam_vancyRes':[[0,'گلم'],[1,'نوروز'],[2,'مردم']],
        'question_type':'5',
        'resItems':[[0,1],[1,1],[2,1],[3,1]],
        'exam_descriptionResImageLink':'https://www.woonwinkelhome.com/products/slim-pen-gold',
        'exam_descriptionRes':'گلمممم گلممممسلام به همه دوستای گلمممم سلام به همه دوستای گلمممم سلام به همه دوستای گلمممم سلام به همه دوستای گلمممم سلام به همه دوستای گلمممم سلام به همه دوستای گلمممم سلام ',
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
        'StudentItem':'2',
        'question__currentOption':'1',
        'question__optionOne':'سلام',
        'question__optionTwo':'hello',
        'question__optionTree':'سلام',
        'question__optionFour':'hello',
        'exam_SeqItems':[
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
        'exam_SeqResponse':[[0,2],[1,1],[2,4],[3,3]],
        'exam_vancyItems':'سلام بر همه دوستان $%A و محترم عید $%A بر همه $%A مبارک باد',
        'exam_vancyRes':[[0,'گلم'],[1,'نوروز'],[2,'مردم']],
        'question_type':'6',
        'resItems':[[0,1],[1,1],[2,1],[3,1]],
        'exam_descriptionResImageLink':'https://www.woonwinkelhome.com/products/slim-pen-gold',
        'exam_descriptionRes':'گلمممم گلممممسلام به همه دوستای گلمممم سلام به همه دوستای گلمممم سلام به همه دوستای گلمممم سلام به همه دوستای گلمممم سلام به همه دوستای گلمممم سلام به همه دوستای گلمممم سلام ',
        // 'vancyItems':'سلام بر همه دوستان $%A و محترم عید $%A بر همه $%A مبارک باد سلام بر همه دوستان $%A و محترم عید $%A بر همه $%A مبارک باد سلام بر همه دوستان $%A و محترم عید $%A بر همه $%A مبارک باد سلام بر همه دوستان $%A و محترم عید $%A بر همه $%A مبارک باد',
      
        // 'question__optionTree':'hi',
        // 'question__optionFour':'آنیو',
        // 'question_link':'https://www.woonwinkelhome.com/products/slim-pen-gold',
    
    },
]
const ExamPageForTeacher = ({type}) => {
    return(
        <div>
            {/* <ShowComparativeQuestionForArchive question={Item[4]} number={1} items={Item[4]}/> */}
            {/* <ShowDescriptiveQuestionForArchive question={Item[0]} number={1} /> */}
            {/* <ShowMultipleChoiceQuestionForArchive question={Item[0]} number={1} /> */}
            {/* <ShowTrueAndFalseQuestionForArchive question={Item[0]} number={1}/> */}
            {/* <ShowSequentialQuestionForArchive question={Item[0]} number={1} /> */}
            {/* <ShowVacancyQuestionForArchive question={Item[0]} number={1} /> */}
            {
                Item ? Item.map((question ,index) =>(
                    (() => {
                        if(question.question_type == '1'){
                            return <ShowDescriptiveQuestionForArchive question={question} number={index}/> 
                        }else if(question.question_type == '2'){
                            return <ShowComparativeQuestionForArchive question={question} number={index} 
                            // items={RandomArray(Item[index].items)}
                             /> 
                        }
                        else if(question.question_type == '3'){
                            return <ShowMultipleChoiceQuestionForArchive question={question} number={index}/>
                        }
                        else if(question.question_type == '4'){
                            return <ShowTrueAndFalseQuestionForArchive question={question} number={index} />
                        }
                        else if(question.question_type == '5'){
                            return <ShowSequentialQuestionForArchive question={question} number={index} 
                            // SeqItems={SeqRandomArray(Item[index].SeqItems)}
                             />
                        }
                        else if(question.question_type == '6'){
                            return <ShowVacancyQuestionForArchive question={question} number={index} />
                        }
                    })()
                ))
                :''
            }
            {/* {(() => {
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
            })()} */}
        </div>
    )
};

export default ExamPageForTeacher;