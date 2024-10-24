import {useForm} from 'react-hook-form';
import {DevTool} from '@hookform/devtools';


type FormValues = {
    username: string;
    email: string;
    channel: string;
}

export default function YoutubeForm() {

 const form =  useForm<FormValues>();

 const {register, control, handleSubmit} = form;

  const onSubmit = (data: FormValues) => {
    console.log('Form Submitted', data);
  }

  return (
    <div>
      {/* noValidate : this will prevent browser validation allowing react hook form to handle the validation of the fields*/}
        <form onSubmit={handleSubmit(onSubmit)} noValidate>
            <label htmlFor="username">Username</label>
            <input 
                type="text" 
                id="username" 
                {...register('username',{
                  required: {
                    value: true,
                    message: "UserName is required",
                  }}
                 )}
             />

            <label htmlFor="email">E-mail</label>
            <input type="email" id="email" {...register('email',{
              pattern: {
                value: /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
                message: "Invalid email address"
              }
            })}/>

            <label htmlFor="channel">Channel</label>
            <input type="text"  id="channel" {...register('channel')} />

            <button>Submit</button>
        </form>
        
        <DevTool control={control}/>
    </div>
  )
}
