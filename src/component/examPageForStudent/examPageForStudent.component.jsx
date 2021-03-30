import React , {useEffect} from 'react';
import ShowDescriptiveQuestion from './showQuestions/ShowDescriptiveQuestion/ShowDescriptiveQuestion.component';
import ShowComparativeQuestion from './showQuestions/ShowComparativeQuestion/ShowComparativeQuestion.component';

const Item ={
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
    // 'question_link':'https://www.woonwinkelhome.com/products/slim-pen-gold',

}
const  ExamPageForStudent = () =>{

    // useEffect(()=>{
    //     Item.items.forEach(item=>(

    //     ))
    // },[]);

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
        // var newItem = [];
        var newItem = Array(list.length).fill(0).map(row => new Array(2).fill(''))
        var temp =[];
       for (let index = 0; index < list.length; index++) {
        //    var element1 = list[index][0];
           newItem[index][0]=list[index][0];
           console.log('element1',list[index][0]);
           var randomItem = createRandom(list.length);
        //    var second = Math.floor(Math.random() * list.length);

           if(existence(temp,randomItem)){
                temp.push(randomItem);
                var element2 = list[randomItem][1];
        // newItem[index][0]=element1;
                newItem[index][1]=element2;
           }else{
                index --;
           }
        //    var flag=false;
        //    for (let j = 0; j < temp.length; j++) {
        //        if(temp[j] === second){
        //             flag=true;
        //        }
               
        //    }

        //    if(!flag){
        //         temp.push(second);
        //    }
        //    temp.push(second);
        //    temp.forEach(tt =>
        //     tt !== second ? temp.push(second) : null
        //     )
        //    for (let j = 0; j < array.length; j++) {
        //        const element = array[j];
               
        //    }

        
        // newItem.push([element1,element2]);
        
           
       }
       console.log('newItem',newItem);
       return newItem;
    }

    


    return(
        <div>
            {/* <ShowDescriptiveQuestion question={Item} number={48}/> */}
            <ShowComparativeQuestion question={Item} number={48} items={RandomArray(Item.items)} />
        </div>
    )
};


export default ExamPageForStudent;