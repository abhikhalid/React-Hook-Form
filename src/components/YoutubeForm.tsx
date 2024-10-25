import {useForm} from 'react-hook-form';
import {DevTool} from '@hookform/devtools';


type FormValues = {
    username: string;
    email: string;
    channel: string;
    social:{
      twitter: string;
      facebook: string;
    }
}

export default function YoutubeForm() {

 const form =  useForm<FormValues>({
  defaultValues: {
    username: 'Batman',
    email: '',
    channel: '',
    social: {
      twitter: '',
      facebook: ''
    }
  }

  //load saved data
  // defaultValues: async () => {
  //   const response = await fetch('https://jsonplaceholder.typicode.com/users/1');
  //   const data = await response.json();
  //   return {
  //     username: data.name,
  //     email: data.email,
  //     channel: data.username
  //   }
  // }
  }
);

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
                },
                // validate: (fieldValue) => { 
                //   return (
                //      fieldValue !== 'admin@example.com' || 'Enter a different email address'
                //   );
                // }
                validate: {
                  notAdmin: (fieldValue) => { 
                    return (
                       fieldValue !== 'admin@example.com' || 'Enter a different email address'
                    );
                  },
                  notBlackListed: (fieldValue) => {
                    return !fieldValue.endsWith('baddoamin.com') || 'This domain is not supported'
                  }
                }
              })}/>

              <p className='error'>{errors.email?.message}</p>
            </div>

            <div className='form-control'>  
              <label htmlFor="channel">Channel</label>
              <input type="text"  id="channel" {...register('channel')} />
              <p className='error'>{errors.channel?.message}</p>
            </div>
           
            <div className='form-control'>  
              <label htmlFor="twitter">Twitter</label>
              <input type="text"  id="channel" {...register('social.twitter')} />
            </div>
            
            <div className='form-control'>  
              <label htmlFor="facebook">Facebook</label>
              <input type="text"  id="channel" {...register('social.facebook')} />
            </div>

            <button>Submit</button>
        </form>
        
        <DevTool control={control}/>
    </div>
  )
}
