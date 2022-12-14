export function getDateTime() {
    const now = new Date(); 
    let year = now.getFullYear();
    let month = now.getMonth()+1; 
    let day = now.getDate();
    let hour = now.getHours();
    let minute = now.getMinutes();
    let second = now.getSeconds(); 
    if(month.toString().length == 1) {
         month = '0'+month;
    }
    if(day.toString().length == 1) {
         day = '0'+(day-1);
    }   
    if(hour.toString().length == 1) {
         hour = '0'+hour;
    }
    if(minute.toString().length == 1) {
         minute = '0'+minute;
    }
    if(second.toString().length == 1) {
         second = '0'+second;
    }   
    let dateTime = year+'-'+month+'-'+day+'T'+hour+'%3A'+minute+'%3A'+second+'Z'; 
     return dateTime;
}