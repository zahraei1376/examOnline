import { gql } from 'apollo-boost';

const addNewExamMutation = gql`
    mutation addExamParent(
        $userName: String!,
        $password: String!, 
        $examParent_gId:[ID]!,
        $examParent_start_date: String!, 
        $examParent_stop_date: String!, 
        $examParent_start: String!,
        $examParent_end: String!, 
        $examParent_maxScore: String!, 
        $examParent_method:String!,
        $examParent_topic:String!
        ){
            addExamParent(
                userName: $userName, 
                password:$password, 
                examParent_gId: $examParent_gId,
                examParent_start_date: $examParent_start_date, 
                examParent_stop_date: $examParent_stop_date,
                examParent_start: $examParent_start,
                examParent_end: $examParent_end, 
                examParent_maxScore: $examParent_maxScore, 
                examParent_method: $examParent_method,
                examParent_topic: $examParent_topic
                ){
                    userName
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
      $question_seqItems: [[String]]!,
      $question_vancyItems: String!,
      $question_compItems: [[String]]!,
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

const DELETE_QUESTIONCHILD = gql`
  mutation deleteQuestionChild(
    $userName: String!,
    $password: String!,
    $id:  String!
    ){
      deleteQuestionChild(
      userName: $userName,
      password: $password,
      id:$id
      ){
        id
      }
  }
`;

const GET_QUESTIONS = gql`
  query examParents(
    $userName: String!,
    $password: String!,
    $id:  String!
    ){
    examParents(
      userName: $userName,
      password: $password,
      id:$id
    ){
      id
      examParent_start_date
      examParent_stop_date
      examParent_start
      examParent_end
      examParent_pId
      examParent_gId
      examParent_maxScore
      examParent_method
      examParent_topic
      examChild
      {
        id
        groups{
          id
          course
        }
        examChild_gId
        examChild_epId
        questionParent
        {
          id
          ecId
          questionChild
          {
            id
            qpId
            question
            question_score
            question_explain
            question_timeToSolveProblem
            question_correctOption
            question_optionOne
            question_optionTwo
            question_optionThree
            question_optionFour
            question_link
            exam_link
            question_type
            question_seqItems
            question_vancyItems
            question_compItems
          }
        }
      }
    }
  }
`;

export { SET_QUESTION_CHILD, GET_QUESTIONS ,DELETE_QUESTIONCHILD };
