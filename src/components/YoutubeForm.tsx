import {useForm} from 'react-hook-form';
import {DevTool} from '@hookform/devtools';

let renderCount = 0;


type FormValues = {
    username: string;
    email: string;
    channel: string;
}

export default function YoutubeForm() {
 //useForm is a custom hook that returns an object with methods and properties that we can use to build our form; for managing 
 // i. Manage form data ii. Submit form data. iii. Enforce validations and provide visual feedback   
 const form =  useForm<FormValues>();

 const {register, control, handleSubmit} = form;

//  const {name, ref, onChange, onBlur} = register('username');

  const onSubmit = (data: FormValues) => {
    console.log('Form Submitted', data);
  }


  return (
    <div>
        {/* When I type into the form fields,  this component does not re-render */}
        {/* This is great for performance. With traditional  react forms, when you work with controlled components, every keystroke will cause the component and it's children to re-render */}
        {/* React hook form on the other hand does not do that. It follows the uncontrolled input behavior. */}
        <h1>Youtube Form ({renderCount/2})</h1>
        <form onSubmit={handleSubmit(onSubmit)}>
            <label htmlFor="username">Username</label>
            <input 
                type="text" 
                id="username" 
                // name={name} 
                // ref={ref} 
                // onChange={onChange}
                // onBlur={onBlur} 
                {...register('username')}
             />

            <label htmlFor="email">E-mail</label>
            <input type="email" id="email" {...register('email')}/>

            <label htmlFor="channel">Channel</label>
            <input type="text"  id="channel" {...register('channel')} />

            <button>Submit</button>
        </form>
        
        <DevTool control={control}/>
    </div>
  )
}
