import React ,{useEffect, useState} from 'react';
import { Text, View ,SafeAreaViewS, StyleSheet, TextInput, Button, Pressable, FlatList} from 'react-native';
import { Colors } from 'react-native/Libraries/NewAppScreen';
import  AsyncStorage from '@react-native-async-storage/async-storage';
 
const YourApp = () => {
      const [todos, setTodos] = useState([{id:1, task:'first todo' },
      
    {id:2, task:'Second todo'}])
    const [textinput, settextinput] = useState('');
    const ListItem = ({todo})  =>{
      return <View style={styles.listitem}>
          <View  style={styles.view1}><Text style={styles.task2}>{todo.task}</Text>
          <Pressable style={styles.del}>
            <Text onPress={()=>deletetodo(todo?.id)}>DEL</Text>
          </Pressable>
          </View>
        </View>;
    };
    useEffect(()=>
    {
          savedata();
    },[todos]);
    useEffect(()=>
    {
          getdata();
    },[]);
    const savedata = async todos =>{
      try{
        const jsonValue = JSON.stringify(todos);
        await AsyncStorage.setItem('@storage_key', jsonValue);
      }
     catch (e) {
          console.log(e);
      }
    }
    const getdata = async todos =>{
      try{
       
               const todos = AsyncStorage.getItem('todos');
               if(todos!= null)
               {
                 setTodos(JSON.parse(todos));
               }
      }
     catch (e) {
          console.log(e);
      }
    }
    const deletetodo = (todoId)=>{
      const newtodos = todos.filter(item => item.id != todoId);
      setTodos(newtodos);

    }
    const addtodo = () =>{
      if(textinput == ""){
         alert.alert("Error", "please input todo")
      }
      else{
      const newtodo ={
        id:Math.random(),
        task:textinput,

      }
      setTodos([...todos, newtodo]);
      settextinput("")
    }

    };
 

  return (
    <View>
          <View style = {styles.body}>
      <Text style={styles.text}>TO DO LIST</Text>
      </View>
      <View>
          <View  style={styles.third}>
            <View>
            <TextInput style = {styles.input}
              onChangeText = {(text)=>settextinput(text)}
              value ={textinput}
              multiline
            />
            </View>

            <Pressable style={styles.button} onPress={addtodo}>
               <Text style={styles.btntext}>ADD </Text>
            </Pressable>
          </View>
      </View>
      <View style={styles.task}>
        <Text style={styles.task1}>
          TASKS
        </Text>
      
       
      </View>
      <View>
      <FlatList data={todos} renderItem={({item})=> <ListItem todo={item}/>}  />
      </View>
      
     
 
            
            
      
    </View>    
      
      

     
  );
}
const styles = StyleSheet.create({
  body:{
    alignItems:'center',
    justifyContent:'center',
    textAlignVertical:'center'
  },
 
  text:{
      fontSize:30,
      margin:30,
      backgroundColor:'cyan',
      

  },
  input:{
        borderWidth:1,
        width:200,
        borderRadius:5,
        marginLeft:30,
  },
  third:{
     display:'flex',
     flexDirection:'row',
  },
  button:{
     width:100,
     fontSize:60,
     height:50,
     marginLeft:10,
     backgroundColor:'blue',
     alignItems:'center',
     justifyContent:'center',
     flexDirection:'row'
  },
  btntext:{

    fontSize:20,
  },
  task:{
     
     marginTop:30,
     backgroundColor:'red',
     alignItems:'center',
     justifyContent:'center',
     
  },
  task1:{
    fontWeight:'bold',
    fontSize:30,
  },
  task2:{
    fontWeight:'bold',
    fontSize:20,
  },
  flatList:{
    
    flexDirection:'row',
    
  },
  getvalue:{
    fontSize:100,
    fontWeight:'bold',
    margin:30,
    zIndex:6,

  },
  vflat:{
    flexDirection:'row',
    justifyContent:'space-around'
  },
  listitem:{
    marginTop:20,
    padding:10,
    borderWidth:1,
    
    width:'100%'
  },

  view1:{
    flexDirection:'row',
    flex:1,
  },
  del:{
   marginLeft:'90%',
   borderWidth:1,
   backgroundColor:'red'
  }
 


})

export default YourApp;
