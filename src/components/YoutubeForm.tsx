import {useForm} from 'react-hook-form';
import {DevTool} from '@hookform/devtools';


type FormValues = {
    username: string;
    email: string;
    channel: string;
}

export default function YoutubeForm() {

 const form =  useForm<FormValues>();

 const {register, control, handleSubmit, formState} = form;

 const {errors} = formState;

  const onSubmit = (data: FormValues) => {
    console.log('Form Submitted', data);
  }

  return (
    <div>
      {/* noValidate : this will prevent browser validation allowing react hook form to handle the validation of the fields*/}
        <form onSubmit={handleSubmit(onSubmit)} noValidate>
            <div className='form-control'>
              <label htmlFor="username">Username</label>
              <input 
                  type="text" 
                  id="username" 
                  {...register('username',{
                    required: {
                      value: true,
                      message: "Username is required",
                    }}
                  )}
              />
             <p className='error'>{errors.username?.message}</p>
            </div>

            <div className='form-control'>
              <label htmlFor="email">E-mail</label>
              <input type="email" id="email" {...register('email',{
                pattern: {
                  value: /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
                  message: "Invalid email address"
                }
              })}/>

              <p className='error'>{errors.email?.message}</p>
            </div>

            <div className='form-control'>  
              <label htmlFor="channel">Channel</label>
              <input type="text"  id="channel" {...register('channel')} />
              <p className='error'>{errors.channel?.message}</p>
            </div>

            <button>Submit</button>
        </form>
        
        <DevTool control={control}/>
    </div>
  )
}
