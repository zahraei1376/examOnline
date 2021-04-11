
export const AddStudentUtil = (students,studentsArray)=>{
    // console.log('ad',students);
    for (let index = 0; index < students.length; index++) {
        studentsArray.push({'studentId' : students[index].person_id , 'scores' : []});
    }

    return studentsArray;
    // return students.push({'studentId' : student.person_id , 'scores' : []});
}

// export const IncreaseScoreUtil = (index,score ,studentId , students)=>{
export const IncreaseScoreUtil = (scoreItem , students)=>{
    const existStudent = students.find(student => student.studentId === scoreItem.studentId);

    if(existStudent){
        students.map(student => 
            student.studentId === scoreItem.studentId ?  
            // console.log('student.score',student.score)
                student.scores[scoreItem.index] = scoreItem.score
                // return { ...student ,}
            : {...student}
        )
    }
    return students;
}

// export const DecreseScoreUtil = (index,score ,students)=>{
//     return students.push(student);
// }